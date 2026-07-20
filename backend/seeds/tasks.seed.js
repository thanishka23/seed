import Task from "../models/Task.js";

const taskData = [
  { title: "Follow up with Arjun Mehta", description: "Call customer regarding enterprise CRM proposal.", dueDate: new Date("2026-08-02"), status: "Pending", priority: "High", role: "Sales Representative" },
  { title: "Approve July Payroll", description: "Verify payroll before salary release.", dueDate: new Date("2026-08-01"), status: "In Progress", priority: "High", role: "Finance" },
  { title: "Review Leave Requests", description: "Review pending employee leave applications.", dueDate: new Date("2026-08-03"), status: "Pending", priority: "Medium", role: "HR" },
  { title: "Verify Product Stock", description: "Check warehouse stock levels.", dueDate: new Date("2026-08-04"), status: "Completed", priority: "Medium", role: "Inventory" },
];

export default async function seedTasks(users) {
  console.log("\n🌱 Seeding Tasks...");
  const insertedTasks = [];

  for (const item of taskData) {
    const assignedUser = users[item.role];
    let task = await Task.findOne({ title: item.title });

    if (!task) {
      task = await Task.create({
        title: item.title,
        description: item.description,
        dueDate: item.dueDate,
        status: item.status,
        priority: item.priority,
        assignedTo: assignedUser?._id,
      });
      console.log(`✅ ${task.title}`);
    } else {
      console.log(`⏩ ${task.title}`);
    }

    insertedTasks.push(task);
  }

  return insertedTasks;
}
