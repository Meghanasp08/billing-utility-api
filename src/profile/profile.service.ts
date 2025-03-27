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

}
