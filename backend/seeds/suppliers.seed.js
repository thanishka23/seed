import Supplier from "../models/Supplier.js";

const suppliers = [
  { name: "Rajesh Kumar", company: "RK Electronics Pvt. Ltd.", email: "sales@rkelectronics.com", phone: "9876500001", address: "Plot 12, Electronic City, Bengaluru, Karnataka - 560100", status: "Active" },
  { name: "Suresh Patel", company: "Patel Office Supplies", email: "contact@pateloffice.com", phone: "9876500002", address: "Ashram Road, Ahmedabad, Gujarat - 380009", status: "Active" },
  { name: "Anita Sharma", company: "Sharma Industrial Solutions", email: "info@sharmaindustrial.com", phone: "9876500003", address: "Industrial Area Phase II, Chandigarh - 160002", status: "Active" },
  { name: "Vikram Singh", company: "VS Technologies", email: "support@vstech.in", phone: "9876500004", address: "Sector 62, Noida, Uttar Pradesh - 201309", status: "Active" },
  { name: "Meera Nair", company: "Kerala Stationeries", email: "sales@keralastationeries.in", phone: "9876500005", address: "MG Road, Kochi, Kerala - 682016", status: "Active" },
  { name: "Arvind Rao", company: "Rao Computer World", email: "contact@raocomputers.com", phone: "9876500006", address: "Ameerpet, Hyderabad, Telangana - 500016", status: "Active" },
  { name: "Deepak Agarwal", company: "Agarwal Distributors", email: "sales@agarwaldist.com", phone: "9876500007", address: "MI Road, Jaipur, Rajasthan - 302001", status: "Active" },
  { name: "Pooja Verma", company: "PV Office Essentials", email: "hello@pvoffice.in", phone: "9876500008", address: "Civil Lines, Nagpur, Maharashtra - 440001", status: "Active" },
];

export default async function seedSuppliers() {
  console.log("\n🌱 Seeding Suppliers...");
  const insertedSuppliers = [];

  for (const supplierData of suppliers) {
    let supplier = await Supplier.findOne({ email: supplierData.email });
    if (!supplier) {
      supplier = await Supplier.create(supplierData);
      console.log(`✅ Created Supplier: ${supplier.company}`);
    } else {
      console.log(`⏩ Supplier already exists: ${supplier.company}`);
    }
    insertedSuppliers.push(supplier);
  }

  console.log(`🎉 ${insertedSuppliers.length} suppliers ready.\n`);
  return insertedSuppliers;
}
