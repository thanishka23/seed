import User from "../models/User.js";

const users = [
  {
    name: "System Administrator",
    email: "admin@crm.com",
    password: "Password@123",
    role: "Admin",
    phone: "9876543210",
    theme: "light",
  },
  {
    name: "Rahul Sharma",
    email: "manager@crm.com",
    password: "Password@123",
    role: "Manager",
    phone: "9876543211",
    theme: "light",
  },
  {
    name: "Priya Reddy",
    email: "sales@crm.com",
    password: "Password@123",
    role: "Sales Representative",
    phone: "9876543212",
    theme: "light",
  },
  {
    name: "Sneha Kapoor",
    email: "hr@crm.com",
    password: "Password@123",
    role: "HR",
    phone: "9876543213",
    theme: "light",
  },
  {
    name: "Amit Verma",
    email: "finance@crm.com",
    password: "Password@123",
    role: "Finance",
    phone: "9876543214",
    theme: "light",
  },
  {
    name: "Karthik Rao",
    email: "inventory@crm.com",
    password: "Password@123",
    role: "Inventory",
    phone: "9876543215",
    theme: "light",
  },
  {
    name: "Anjali Singh",
    email: "employee@crm.com",
    password: "Password@123",
    role: "Employee",
    phone: "9876543216",
    theme: "light",
  },
];

export default async function seedUsers() {
  console.log("\n🌱 Seeding Users...");
  const insertedUsers = {};

  for (const userData of users) {
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = await User.create(userData);
      console.log(`✅ Created ${user.role} (${user.email})`);
    } else {
      console.log(`⏩ ${user.email} already exists`);
    }

    insertedUsers[user.role] = user;
  }

  console.log(`🎉 ${Object.keys(insertedUsers).length} user roles ready.\n`);
  return insertedUsers;
}
