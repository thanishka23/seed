import Employee from "../models/Employee.js";

const employees = [
  { name: "Rahul Sharma", email: "rahul.sharma@crm.com", phone: "9876543001", department: "Sales", designation: "Sales Manager", salary: 75000, joiningDate: new Date("2023-01-10"), status: "Active" },
  { name: "Priya Reddy", email: "priya.reddy@crm.com", phone: "9876543002", department: "Sales", designation: "Sales Executive", salary: 50000, joiningDate: new Date("2023-04-15"), status: "Active" },
  { name: "Amit Verma", email: "amit.verma@crm.com", phone: "9876543003", department: "Finance", designation: "Finance Manager", salary: 80000, joiningDate: new Date("2022-11-20"), status: "Active" },
  { name: "Sneha Kapoor", email: "sneha.kapoor@crm.com", phone: "9876543004", department: "HR", designation: "HR Manager", salary: 65000, joiningDate: new Date("2023-02-05"), status: "Active" },
  { name: "Karthik Rao", email: "karthik.rao@crm.com", phone: "9876543005", department: "Inventory", designation: "Inventory Manager", salary: 60000, joiningDate: new Date("2023-03-12"), status: "Active" },
  { name: "Anjali Singh", email: "anjali.singh@crm.com", phone: "9876543006", department: "Support", designation: "Support Executive", salary: 42000, joiningDate: new Date("2023-07-18"), status: "Active" },
  { name: "Vikram Patel", email: "vikram.patel@crm.com", phone: "9876543007", department: "Sales", designation: "Business Development Executive", salary: 47000, joiningDate: new Date("2024-01-08"), status: "Active" },
  { name: "Meera Nair", email: "meera.nair@crm.com", phone: "9876543008", department: "HR", designation: "HR Executive", salary: 45000, joiningDate: new Date("2024-02-12"), status: "Active" },
  { name: "Arjun Kumar", email: "arjun.kumar@crm.com", phone: "9876543009", department: "Finance", designation: "Accountant", salary: 48000, joiningDate: new Date("2024-03-01"), status: "Active" },
  { name: "Pooja Joshi", email: "pooja.joshi@crm.com", phone: "9876543010", department: "Inventory", designation: "Store Executive", salary: 38000, joiningDate: new Date("2024-01-25"), status: "Active" },
  { name: "Suresh Reddy", email: "suresh.reddy@crm.com", phone: "9876543011", department: "Sales", designation: "Regional Sales Executive", salary: 52000, joiningDate: new Date("2023-09-14"), status: "Active" },
  { name: "Neha Gupta", email: "neha.gupta@crm.com", phone: "9876543012", department: "Administration", designation: "Office Administrator", salary: 40000, joiningDate: new Date("2024-04-10"), status: "Active" },
];

export default async function seedEmployees() {
  console.log("\n🌱 Seeding Employees...");
  const insertedEmployees = [];

  for (const employeeData of employees) {
    let employee = await Employee.findOne({ email: employeeData.email });
    if (!employee) {
      employee = await Employee.create(employeeData);
      console.log(`✅ Created Employee: ${employee.name}`);
    } else {
      console.log(`⏩ Employee already exists: ${employee.name}`);
    }
    insertedEmployees.push(employee);
  }

  console.log(`🎉 ${insertedEmployees.length} employees are ready.\n`);
  return insertedEmployees;
}
