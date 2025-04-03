import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/upload/schemas/billing-log.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Log.name) private logModel: Model<LogDocument>,) { }

  getProfile() {
    return this.userModel.find().exec();;
  }

  async getLogData() {
    const log = await this.logModel.find().exec();
    return log;
  }

  async getBillingData() {
    try {
      const aggregateQuery = [
        {
          $group: {
            _id: "$raw_api_log_data.tpp_id",
            total_api_hub_fee: { $sum: "$api_hub_fee" },
            total_calculated_fee: { $sum: "$calculatedFee" },
            total_applicable_fee: { $sum: "$applicableFee" }
          }
        }
      ];

      const result = await this.logModel.aggregate(aggregateQuery).exec();
      return result;
    } catch (error) {
      console.error("Error fetching billing data:", error);
      throw new Error("Failed to fetch billing data");
    }
  }

  async getBillingDetails(id: string) {
    try {
      const aggregateQuery = [
        {
          $match: {
            "raw_api_log_data.tpp_id": id
          }
        },
        {
          $group: {
            _id: {
              lfi_id: "$raw_api_log_data.lfi_id",
              group: "$group",
              type: "$type"
            },
            type_applicable_fee: { $sum: "$api_hub_fee" },
            type_count: { $sum: 1 } // Count of documents contributing to type_applicable_fee
          }
        },
        {
          $group: {
            _id: {
              lfi_id: "$_id.lfi_id",
              group: "$_id.group"
            },
            group_applicable_fee: { $sum: "$type_applicable_fee" },
            group_count: { $sum: "$type_count" }, // Count of all items under this group
            types: {
              $push: {
                type: "$_id.type",
                type_applicable_fee: "$type_applicable_fee",
                type_count: "$type_count"
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id.lfi_id",
            total_applicable_fee: { $sum: "$group_applicable_fee" },
            total_count: { $sum: "$group_count" }, // Count of all items under this LFI
            groups: {
              $push: {
                group: "$_id.group",
                group_applicable_fee: "$group_applicable_fee",
                group_count: "$group_count",
                types: "$types"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            lfi_id: "$_id",
            total_applicable_fee: 1,
            total_count: 1,
            groups: 1
          }
        }
      ];

      const result = await this.logModel.aggregate(aggregateQuery).exec();
      return result;
    } catch (error) {
      console.error("Error fetching billing details:", error);
      throw new Error("Failed to fetch billing details");
    }
  }

  async getBillingHubDetails(id: string) {
    try {
      const aggregateQuery = [
        {
          "$match": {
            "raw_api_log_data.tpp_id": id // Filter by `tpp_id`
          }
        },
        {
          "$group": {
            "_id": {
              "category": {
                "$cond": [
                  { "$eq": ["$discounted", true] }, "COP / Balance Check (Discounted)",
                  {
                    "$cond": [
                      { "$eq": ["$group", "insurance"] }, "insurance",
                      {
                        "$cond": [
                          { "$eq": ["$group", "other"] }, "other",
                          null
                        ]
                      }
                    ]
                  }
                ]
              }
            },
            "totalCount": { "$sum": 1 },  // Count of records in each category
            "totalFee": { "$sum": "$api_hub_fee" },  // Sum of `api_hub_fee` per category
            "singleHubFee": { "$first": "$api_hub_fee" } // Example of a single fee
          }
        },
        {
          "$match": {
            "_id.category": { "$ne": null } // Remove null categories
          }
        },
        {
          "$project": {
            "_id": 0,
            "category": "$_id.category",
            "totalCount": 1,
            "totalFee": 1,
            "singleHubFee": 1
          }
        }
      ];

      const result = await this.logModel.aggregate(aggregateQuery).exec();
      return result;
    } catch (error) {
      console.error("Error fetching billing details:", error);
      throw new Error("Failed to fetch billing details");
    }
  }


}
