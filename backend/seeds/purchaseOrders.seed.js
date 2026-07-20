import PurchaseOrder from "../models/PurchaseOrder.js";

const purchaseOrders = [
  { poNumber: "PO-2026-001", supplierCompany: "RK Electronics Pvt. Ltd.", status: "Received", expectedDate: new Date("2026-07-15"), receivedAt: new Date("2026-07-14"), items: [{ sku: "PRD-1001", quantity: 5 }, { sku: "PRD-1005", quantity: 8 }] },
  { poNumber: "PO-2026-002", supplierCompany: "VS Technologies", status: "Ordered", expectedDate: new Date("2026-08-05"), items: [{ sku: "PRD-1002", quantity: 3 }, { sku: "PRD-1012", quantity: 6 }] },
  { poNumber: "PO-2026-003", supplierCompany: "Patel Office Supplies", status: "Draft", expectedDate: new Date("2026-08-18"), items: [{ sku: "PRD-1006", quantity: 10 }, { sku: "PRD-1007", quantity: 5 }] },
];

export default async function seedPurchaseOrders(suppliers, products) {
  console.log("\n🌱 Seeding Purchase Orders...");
  const insertedPurchaseOrders = [];

  for (const po of purchaseOrders) {
    const supplier = suppliers.find((s) => s.company === po.supplierCompany);
    if (!supplier) {
      console.log(`⚠️ Supplier not found: ${po.supplierCompany}`);
      continue;
    }

    const items = [];
    let totalAmount = 0;
    for (const item of po.items) {
      const product = products.find((p) => p.sku === item.sku);
      if (!product) continue;
      items.push({ product: product._id, quantity: item.quantity, costPrice: product.costPrice });
      totalAmount += product.costPrice * item.quantity;
    }

    let purchaseOrder = await PurchaseOrder.findOne({ poNumber: po.poNumber });
    if (!purchaseOrder) {
      purchaseOrder = await PurchaseOrder.create({
        poNumber: po.poNumber,
        supplier: supplier._id,
        items,
        totalAmount,
        status: po.status,
        expectedDate: po.expectedDate,
        receivedAt: po.receivedAt,
      });
      console.log(`✅ Created ${purchaseOrder.poNumber}`);
    } else {
      console.log(`⏩ ${purchaseOrder.poNumber} already exists`);
    }
    insertedPurchaseOrders.push(purchaseOrder);
  }

  console.log(`🎉 ${insertedPurchaseOrders.length} purchase orders ready.\n`);
  return insertedPurchaseOrders;
}
