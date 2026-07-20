import Expense from "../models/Expense.js";

const expenses = [
  { expenseNumber: "EXP-2026-001", title: "Office Electricity Bill", amount: 18500, category: "Utilities", expenseDate: new Date("2026-07-01"), status: "Paid", notes: "July electricity bill." },
  { expenseNumber: "EXP-2026-002", title: "Office Rent", amount: 85000, category: "Rent", expenseDate: new Date("2026-07-05"), status: "Paid", notes: "Monthly office rent." },
  { expenseNumber: "EXP-2026-003", title: "Facebook Marketing Campaign", amount: 32000, category: "Marketing", expenseDate: new Date("2026-07-08"), status: "Approved", notes: "Lead generation campaign." },
  { expenseNumber: "EXP-2026-004", title: "Employee Salary - July", amount: 465000, category: "Salaries", expenseDate: new Date("2026-07-31"), status: "Paid", notes: "Monthly payroll transfer." },
  { expenseNumber: "EXP-2026-005", title: "Client Meeting Travel", amount: 7400, category: "Travel", expenseDate: new Date("2026-07-18"), status: "Approved", notes: "Travel expenses for Hyderabad client visit." },
  { expenseNumber: "EXP-2026-006", title: "Office Stationery", amount: 3900, category: "Other", expenseDate: new Date("2026-07-14"), status: "Pending", notes: "Printer paper and office supplies." },
];

export default async function seedExpenses() {
  console.log("\n🌱 Seeding Expenses...");
  const insertedExpenses = [];

  for (const expenseData of expenses) {
    let expense = await Expense.findOne({ expenseNumber: expenseData.expenseNumber });
    if (!expense) {
      expense = await Expense.create(expenseData);
      console.log(`✅ Created ${expense.expenseNumber}`);
    } else {
      console.log(`⏩ ${expense.expenseNumber} already exists`);
    }
    insertedExpenses.push(expense);
  }

  console.log(`🎉 ${insertedExpenses.length} expenses ready.\n`);
  return insertedExpenses;
}
