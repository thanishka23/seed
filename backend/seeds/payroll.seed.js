import Payroll from "../models/Payroll.js";

export default async function seedPayroll(employees) {
  console.log("\n🌱 Seeding Payroll...");
  const insertedPayroll = [];
  const month = "July 2026";
  const year = 2026;

  for (const employee of employees) {
    const basicSalary = employee.salary;
    const allowances = Math.round(basicSalary * 0.1);
    const deductions = Math.round(basicSalary * 0.05);
    const netSalary = basicSalary + allowances - deductions;
    const status = employee.department === "Administration" ? "Processed" : "Paid";
    const paymentDate = status === "Paid" ? new Date("2026-07-31") : null;

    let payroll = await Payroll.findOne({ employee: employee._id, month, year });
    if (!payroll) {
      payroll = await Payroll.create({
        employee: employee._id,
        month,
        year,
        basicSalary,
        allowances,
        deductions,
        netSalary,
        status,
        paymentDate,
      });
      console.log(`✅ Payroll created for ${employee.name}`);
    } else {
      console.log(`⏩ Payroll already exists for ${employee.name}`);
    }

    insertedPayroll.push(payroll);
  }

  console.log(`🎉 ${insertedPayroll.length} payroll records ready.\n`);
  return insertedPayroll;
}
