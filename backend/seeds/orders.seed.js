import Order from "../models/Order.js";

const orders = [
  { orderNumber: "ORD-2026-001", quotationNumber: "QT-2026-001", customerEmail: "arjun.mehta@gmail.com", salesRole: "Sales Representative", paymentMethod: "Bank Transfer", paymentStatus: "Paid", orderStatus: "Delivered", shippingCharge: 1000, discount: 5000, tax: 18, expectedDelivery: new Date("2026-08-12"), deliveredAt: new Date("2026-08-11"), notes: "Delivered successfully." },
  { orderNumber: "ORD-2026-002", quotationNumber: "QT-2026-002", customerEmail: "priya.nair@gmail.com", salesRole: "Manager", paymentMethod: "UPI", paymentStatus: "Pending", orderStatus: "Processing", shippingCharge: 500, discount: 0, tax: 18, expectedDelivery: new Date("2026-08-18"), notes: "Preparing shipment." },
  { orderNumber: "ORD-2026-003", quotationNumber: "QT-2026-004", customerEmail: "sneha.reddy@gmail.com", salesRole: "Sales Representative", paymentMethod: "Cash", paymentStatus: "Partial", orderStatus: "Confirmed", shippingCharge: 750, discount: 1000, tax: 18, expectedDelivery: new Date("2026-08-22"), notes: "Customer paid advance." },
];

export default async function seedOrders(customers, quotations, users) {
  console.log("\n🌱 Seeding Orders...");
  const insertedOrders = [];

  for (const item of orders) {
    const customer = customers.find((c) => c.email === item.customerEmail);
    const quotation = quotations.find((q) => q.quotationNumber === item.quotationNumber);
    const salesPerson = users[item.salesRole];

    if (!customer || !quotation) continue;

    let order = await Order.findOne({ orderNumber: item.orderNumber });
    if (!order) {
      const subtotal = quotation.totalAmount;
      const totalAmount = subtotal - item.discount + item.shippingCharge + (subtotal * item.tax) / 100;

      order = await Order.create({
        orderNumber: item.orderNumber,
        customer: customer._id,
        quotation: quotation._id,
        salesPerson: salesPerson?._id,
        items: quotation.items,
        subtotal,
        discount: item.discount,
        tax: item.tax,
        shippingCharge: item.shippingCharge,
        totalAmount,
        paymentStatus: item.paymentStatus,
        orderStatus: item.orderStatus,
        paymentMethod: item.paymentMethod,
        expectedDelivery: item.expectedDelivery,
        deliveredAt: item.deliveredAt,
        notes: item.notes,
      });
      console.log(`✅ Created ${order.orderNumber}`);
    } else {
      console.log(`⏩ ${order.orderNumber} already exists`);
    }

    insertedOrders.push(order);
  }

  console.log(`🎉 ${insertedOrders.length} orders ready.\n`);
  return insertedOrders;
}
