import Leave from "../models/Leave.js";

const leaveRequests = [
  { employeeEmail: "sneha.kapoor@crm.com", leaveType: "Sick", startDate: new Date("2026-07-22"), endDate: new Date("2026-07-24"), status: "Approved", reason: "Viral fever and doctor's advised rest." },
  { employeeEmail: "rahul.sharma@crm.com", leaveType: "Casual", startDate: new Date("2026-07-28"), endDate: new Date("2026-07-29"), status: "Pending", reason: "Family function." },
  { employeeEmail: "amit.verma@crm.com", leaveType: "Earned", startDate: new Date("2026-08-10"), endDate: new Date("2026-08-15"), status: "Approved", reason: "Annual vacation." },
  { employeeEmail: "karthik.rao@crm.com", leaveType: "LWP", startDate: new Date("2026-08-18"), endDate: new Date("2026-08-19"), status: "Rejected", reason: "Personal work." },
  { employeeEmail: "priya.reddy@crm.com", leaveType: "Casual", startDate: new Date("2026-08-05"), endDate: new Date("2026-08-06"), status: "Approved", reason: "Family emergency." },
];

export default async function seedLeave(employees) {
  console.log("\n🌱 Seeding Leave Requests...");
  const insertedLeaves = [];

  for (const item of leaveRequests) {
    const employee = employees.find((emp) => emp.email === item.employeeEmail);
    if (!employee) continue;

    const existing = await Leave.findOne({ employee: employee._id, startDate: item.startDate, endDate: item.endDate });
    if (existing) {
      console.log(`⏩ Leave already exists for ${employee.name}`);
      insertedLeaves.push(existing);
      continue;
    }

    const leave = await Leave.create({
      employee: employee._id,
      leaveType: item.leaveType,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
      reason: item.reason,
    });

    console.log(`✅ Leave created for ${employee.name}`);
    insertedLeaves.push(leave);
  }

  console.log(`🎉 ${insertedLeaves.length} leave requests ready.\n`);
  return insertedLeaves;
}
