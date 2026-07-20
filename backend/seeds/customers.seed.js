import Customer from "../models/Customer.js";

const customers = [
  { name: "Arjun Mehta", email: "arjun.mehta@gmail.com", phone: "9876100001", company: "Mehta Technologies", address: "Banjara Hills", city: "Hyderabad", state: "Telangana", gstNumber: "36ABCDE1234F1Z5", totalPurchase: 145000, status: "Active" },
  { name: "Priya Nair", email: "priya.nair@gmail.com", phone: "9876100002", company: "Nair Enterprises", address: "Kakkanad", city: "Kochi", state: "Kerala", gstNumber: "32ABCDE2345F1Z6", totalPurchase: 87000, status: "Active" },
  { name: "Rahul Verma", email: "rahul.verma@gmail.com", phone: "9876100003", company: "Verma Solutions", address: "Sector 18", city: "Noida", state: "Uttar Pradesh", gstNumber: "09ABCDE3456F1Z7", totalPurchase: 212000, status: "Active" },
  { name: "Sneha Reddy", email: "sneha.reddy@gmail.com", phone: "9876100004", company: "Reddy Industries", address: "Madhapur", city: "Hyderabad", state: "Telangana", gstNumber: "36ABCDE4567F1Z8", totalPurchase: 56000, status: "Active" },
  { name: "Karan Shah", email: "karan.shah@gmail.com", phone: "9876100005", company: "Shah Traders", address: "Navrangpura", city: "Ahmedabad", state: "Gujarat", gstNumber: "24ABCDE5678F1Z9", totalPurchase: 96000, status: "Active" },
  { name: "Anjali Gupta", email: "anjali.gupta@gmail.com", phone: "9876100006", company: "Gupta Associates", address: "Civil Lines", city: "Nagpur", state: "Maharashtra", gstNumber: "27ABCDE6789F1Z1", totalPurchase: 123500, status: "Active" },
  { name: "Vivek Rao", email: "vivek.rao@gmail.com", phone: "9876100007", company: "Rao Digital", address: "Whitefield", city: "Bengaluru", state: "Karnataka", gstNumber: "29ABCDE7890F1Z2", totalPurchase: 78500, status: "Active" },
  { name: "Pooja Sharma", email: "pooja.sharma@gmail.com", phone: "9876100008", company: "Sharma Exports", address: "Connaught Place", city: "New Delhi", state: "Delhi", gstNumber: "07ABCDE8901F1Z3", totalPurchase: 175000, status: "Active" },
  { name: "Nikhil Patel", email: "nikhil.patel@gmail.com", phone: "9876100009", company: "Patel Logistics", address: "Satellite", city: "Ahmedabad", state: "Gujarat", gstNumber: "24ABCDE9012F1Z4", totalPurchase: 92000, status: "Active" },
  { name: "Meera Joshi", email: "meera.joshi@gmail.com", phone: "9876100010", company: "Joshi Consultants", address: "Anna Nagar", city: "Chennai", state: "Tamil Nadu", gstNumber: "33ABCDE0123F1Z5", totalPurchase: 48000, status: "Active" },
];

export default async function seedCustomers() {
  console.log("\n🌱 Seeding Customers...");
  const insertedCustomers = [];

  for (const customerData of customers) {
    let customer = await Customer.findOne({ email: customerData.email });
    if (!customer) {
      customer = await Customer.create(customerData);
      console.log(`✅ Created Customer: ${customer.name}`);
    } else {
      console.log(`⏩ Customer already exists: ${customer.name}`);
    }
    insertedCustomers.push(customer);
  }

  console.log(`🎉 ${insertedCustomers.length} customers ready.\n`);
  return insertedCustomers;
}
