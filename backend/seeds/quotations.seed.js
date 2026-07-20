import Quotation from "../models/Quotation.js";

const quotations = [
  { quotationNumber: "QT-2026-001", customerEmail: "arjun.mehta@gmail.com", items: [{ sku: "PRD-1001", quantity: 2 }, { sku: "PRD-1003", quantity: 5 }], status: "Sent", validTill: new Date("2026-08-10") },
  { quotationNumber: "QT-2026-002", customerEmail: "priya.nair@gmail.com", items: [{ sku: "PRD-1005", quantity: 3 }, { sku: "PRD-1004", quantity: 6 }], status: "Approved", validTill: new Date("2026-08-15") },
  { quotationNumber: "QT-2026-003", customerEmail: "rahul.verma@gmail.com", items: [{ sku: "PRD-1002", quantity: 1 }, { sku: "PRD-1010", quantity: 10 }], status: "Draft", validTill: new Date("2026-08-18") },
  { quotationNumber: "QT-2026-004", customerEmail: "sneha.reddy@gmail.com", items: [{ sku: "PRD-1006", quantity: 8 }], status: "Sent", validTill: new Date("2026-08-20") },
  { quotationNumber: "QT-2026-005", customerEmail: "karan.shah@gmail.com", items: [{ sku: "PRD-1007", quantity: 5 }, { sku: "PRD-1011", quantity: 2 }], status: "Rejected", validTill: new Date("2026-08-25") },
];

export default async function seedQuotations(customers, products) {
  console.log("\n🌱 Seeding Quotations...");
  const insertedQuotations = [];

  for (const quotationData of quotations) {
    const customer = customers.find((c) => c.email === quotationData.customerEmail);
    if (!customer) continue;

    const items = [];
    let totalAmount = 0;

    for (const item of quotationData.items) {
      const product = products.find((p) => p.sku === item.sku);
      if (!product) continue;

      items.push({ product: product._id, quantity: item.quantity, price: product.price });
      totalAmount += product.price * item.quantity;
    }

    let quotation = await Quotation.findOne({ quotationNumber: quotationData.quotationNumber });
    if (!quotation) {
      quotation = await Quotation.create({
        quotationNumber: quotationData.quotationNumber,
        customer: customer._id,
        items,
        totalAmount,
        validTill: quotationData.validTill,
        status: quotationData.status,
      });
      console.log(`✅ Created Quotation ${quotation.quotationNumber}`);
    } else {
      console.log(`⏩ Quotation already exists ${quotation.quotationNumber}`);
    }

    insertedQuotations.push(quotation);
  }

  console.log(`🎉 ${insertedQuotations.length} quotations ready.\n`);
  return insertedQuotations;
}
