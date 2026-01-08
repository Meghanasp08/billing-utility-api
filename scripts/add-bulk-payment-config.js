/**
 * Database Migration Script
 * Purpose: Add new bulk payment configuration variables to global_configuration collection
 * 
 * These configurations implement the new pricing model:
 * - Transactions < 10: Flat fee of 250 fils (0.250 AED)
 * - Transactions >= 10: 25 fils per transaction (0.025 AED per transaction)
 * 
 * Usage:
 * 1. Connect to your MongoDB instance
 * 2. Run this script using: mongosh <your-database> < add-bulk-payment-config.js
 *    OR copy and paste into mongosh shell
 * 3. Restart your NestJS application to load the new configurations
 */

// Switch to your database
// use your_database_name;

// Insert new configuration records
db.global_configuration.insertMany([
  {
    label: "Bulk Payment Min Transaction Threshold",
    category: "Payment",
    description: "Minimum number of transactions to use per-transaction pricing instead of flat fee for bulk payments (peer-2-peer and me-2-me)",
    key: "bulkPaymentMinTransactionThreshold",
    value: 10,
    data: {},
    type: "number",
    single_update: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Bulk Payment Flat Fee (Below 10)",
    category: "Payment",
    description: "Flat fee in AED for bulk payments with less than 10 transactions (250 fils = 0.250 AED)",
    key: "bulkPaymentFlatFeeBelow10",
    value: 0.250,
    data: {},
    type: "number",
    single_update: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    label: "Bulk Payment Per Transaction Fee (10+)",
    category: "Payment",
    description: "Per-transaction fee in AED for bulk payments with 10 or more transactions (25 fils = 0.025 AED)",
    key: "bulkPaymentPerTransactionFeeAbove10",
    value: 0.025,
    data: {},
    type: "number",
    single_update: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Verify the insertion
print("\n=== Verification ===");
print("Total configuration records added: " + db.global_configuration.countDocuments({
  key: {
    $in: [
      "bulkPaymentMinTransactionThreshold",
      "bulkPaymentFlatFeeBelow10",
      "bulkPaymentPerTransactionFeeAbove10"
    ]
  }
}));

print("\n=== New Configuration Records ===");
db.global_configuration.find({
  key: {
    $in: [
      "bulkPaymentMinTransactionThreshold",
      "bulkPaymentFlatFeeBelow10",
      "bulkPaymentPerTransactionFeeAbove10"
    ]
  }
}).forEach(config => {
  print("Label: " + config.label);
  print("Key: " + config.key);
  print("Value: " + config.value);
  print("Description: " + config.description);
  print("---");
});

print("\nMigration completed successfully!");
print("Please restart your NestJS application to load the new configurations.");
