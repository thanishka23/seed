import StockMovement from "../models/StockMovement.js";

const movements = [
  { sku: "PRD-1001", quantity: 5, type: "IN", reason: "Purchase", userRole: "Inventory" },
  { sku: "PRD-1005", quantity: 8, type: "IN", reason: "Purchase", userRole: "Inventory" },
  { sku: "PRD-1003", quantity: 2, type: "OUT", reason: "Sale", userRole: "Sales Representative" },
  { sku: "PRD-1004", quantity: 4, type: "OUT", reason: "Sale", userRole: "Sales Representative" },
  { sku: "PRD-1002", quantity: 1, type: "OUT", reason: "Sale", userRole: "Manager" },
  { sku: "PRD-1008", quantity: 20, type: "IN", reason: "Adjustment", userRole: "Inventory" },
  { sku: "PRD-1010", quantity: 2, type: "OUT", reason: "Return", userRole: "Inventory" },
];

export default async function seedStockMovements(products, users) {
  console.log("\n🌱 Seeding Stock Movements...");
  const insertedMovements = [];

  for (const movementData of movements) {
    const product = products.find((p) => p.sku === movementData.sku);
    if (!product) continue;

    const user = users[movementData.userRole];
    const existing = await StockMovement.findOne({ product: product._id, quantity: movementData.quantity, type: movementData.type, reason: movementData.reason });
    if (existing) {
      console.log(`⏩ Stock movement already exists for ${product.name}`);
      insertedMovements.push(existing);
      continue;
    }

    const movement = await StockMovement.create({
      product: product._id,
      quantity: movementData.quantity,
      type: movementData.type,
      reason: movementData.reason,
      user: user?._id,
    });

    console.log(`✅ ${movement.type} movement created for ${product.name}`);
    insertedMovements.push(movement);
  }

  console.log(`🎉 ${insertedMovements.length} stock movements ready.\n`);
  return insertedMovements;
}
