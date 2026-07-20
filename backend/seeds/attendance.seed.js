import Attendance from "../models/Attendance.js";

export default async function seedAttendance(employees) {
  console.log("\n🌱 Seeding Attendance...");
  const insertedAttendance = [];
  const today = new Date();

  for (const employee of employees) {
    for (let i = 0; i < 7; i++) {
      const attendanceDate = new Date(today);
      attendanceDate.setHours(0, 0, 0, 0);
      attendanceDate.setDate(today.getDate() - i);

      let status = "Present";
      let checkIn = "09:00";
      let checkOut = "18:00";

      if (i === 2 && employee.department === "Sales") {
        status = "Late";
        checkIn = "10:15";
      }

      if (i === 5 && employee.department === "HR") {
        status = "Half Day";
        checkOut = "13:00";
      }

      if (i === 6 && employee.department === "Administration") {
        status = "Absent";
        checkIn = "";
        checkOut = "";
      }

      const existing = await Attendance.findOne({ employee: employee._id, date: attendanceDate });
      if (existing) {
        insertedAttendance.push(existing);
        continue;
      }

      const attendance = await Attendance.create({
        employee: employee._id,
        date: attendanceDate,
        status,
        checkIn,
        checkOut,
      });

      insertedAttendance.push(attendance);
    }
  }

  console.log(`🎉 ${insertedAttendance.length} attendance records ready.\n`);
  return insertedAttendance;
}
