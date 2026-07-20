import Notification from "../models/Notification.js";

export default async function seedNotifications(users) {
  console.log("\n🌱 Seeding Notifications...");

  const data = [
    { role: "Admin", title: "New Order", message: "A new customer order has been placed.", type: "New order" },
    { role: "Inventory", title: "Low Stock", message: "Wireless Mouse stock is below minimum level.", type: "Low stock" },
    { role: "Finance", title: "Invoice Paid", message: "Invoice INV-2026-001 has been paid.", type: "Invoice paid" },
    { role: "HR", title: "Leave Request", message: "A new leave request is awaiting approval.", type: "Employee leave" },
    { role: "Admin", title: "System Alert", message: "Daily backup completed successfully.", type: "System alert" }
  ];

  const notifications = [];

  for (const item of data) {
    const user = users[item.role];
    if (!user) continue;

    let notification = await Notification.findOne({
      userId: user._id,
      title: item.title,
      type: item.type,
    });

    if (!notification) {
      notification = await Notification.create({
        userId: user._id,
        title: item.title,
        message: item.message,
        type: item.type,
      });
      console.log(`✅ ${item.title}`);
    } else {
      console.log(`⏩ ${item.title}`);
    }

    notifications.push(notification);
  }

  return notifications;
}
