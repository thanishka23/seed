import Payment from "../models/Payment.js";

const paymentData = [
  { paymentNumber: "PAY-2026-001", invoiceNumber: "INV-2026-001", paymentMethod: "Bank Transfer", notes: "Full payment received." },
  { paymentNumber: "PAY-2026-002", invoiceNumber: "INV-2026-002", paymentMethod: "UPI", notes: "Advance payment received." },
  { paymentNumber: "PAY-2026-003", invoiceNumber: "INV-2026-003", paymentMethod: "Cash", notes: "Payment collected at office." },
];

export default async function seedPayments(invoices) {
  console.log("\n🌱 Seeding Payments...");
  const insertedPayments = [];

  for (const item of paymentData) {
    const invoice = invoices.find((inv) => inv.invoiceNumber === item.invoiceNumber);
    if (!invoice) continue;

    let payment = await Payment.findOne({ paymentNumber: item.paymentNumber });
    if (!payment) {
      payment = await Payment.create({
        paymentNumber: item.paymentNumber,
        invoice: invoice._id,
        customer: invoice.customer,
        amount: invoice.totalAmount,
        paymentMethod: item.paymentMethod,
        paymentDate: new Date(),
        notes: item.notes,
      });
      console.log(`✅ Created Payment ${payment.paymentNumber}`);
    } else {
      console.log(`⏩ Payment already exists ${payment.paymentNumber}`);
    }

    insertedPayments.push(payment);
  }

  console.log(`🎉 ${insertedPayments.length} payments ready.\n`);
  return insertedPayments;
}
