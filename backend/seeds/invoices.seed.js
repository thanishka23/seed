import Invoice from "../models/Invoice.js";

const invoiceData = [
  { orderNumber: "ORD-2026-001", invoiceNumber: "INV-2026-001", dueDays: 15, status: "Paid" },
  { orderNumber: "ORD-2026-002", invoiceNumber: "INV-2026-002", dueDays: 15, status: "Pending" },
  { orderNumber: "ORD-2026-003", invoiceNumber: "INV-2026-003", dueDays: 15, status: "Pending" },
];

export default async function seedInvoices(orders) {
  console.log("\n🌱 Seeding Invoices...");
  const insertedInvoices = [];

  for (const item of invoiceData) {
    const order = orders.find((o) => o.orderNumber === item.orderNumber);
    if (!order) continue;

    let invoice = await Invoice.findOne({ invoiceNumber: item.invoiceNumber });
    if (!invoice) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + item.dueDays);

      invoice = await Invoice.create({
        customer: order.customer,
        order: order._id,
        invoiceNumber: item.invoiceNumber,
        totalAmount: order.totalAmount,
        dueDate,
        status: item.status,
      });
      console.log(`✅ Created Invoice ${invoice.invoiceNumber}`);
    } else {
      console.log(`⏩ Invoice already exists ${invoice.invoiceNumber}`);
    }

    insertedInvoices.push(invoice);
  }

  console.log(`🎉 ${insertedInvoices.length} invoices ready.\n`);
  return insertedInvoices;
}
