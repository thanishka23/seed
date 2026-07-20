import CompanySettings from "../models/CompanySettings.js";

const companyData = {
  companyName: "Unified Business Solutions Pvt. Ltd.",
  email: "info@unifiedbusiness.com",
  phone: "+91 9876543210",
  website: "https://www.unifiedbusiness.com",
  gstNumber: "37ABCDE1234F1Z5",
  currency: "INR",
  address: "5th Floor, Tech Park, HITEC City, Hyderabad, Telangana - 500081",
  taxRate: 18,
};

export default async function seedCompanySettings() {
  console.log("\n🌱 Seeding Company Settings...");

  let settings = await CompanySettings.findOne();

  if (!settings) {
    settings = await CompanySettings.create(companyData);
    console.log("✅ Company settings created.");
  } else {
    settings.companyName = companyData.companyName;
    settings.email = companyData.email;
    settings.phone = companyData.phone;
    settings.website = companyData.website;
    settings.gstNumber = companyData.gstNumber;
    settings.currency = companyData.currency;
    settings.address = companyData.address;
    settings.taxRate = companyData.taxRate;
    await settings.save();
    console.log("♻️ Company settings updated.");
  }

  return settings;
}
