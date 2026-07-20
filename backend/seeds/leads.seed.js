import Lead from "../models/Lead.js";

const leads = [
  { name: "Rohit Sharma", company: "Sharma Technologies", email: "rohit@sharmatech.com", phone: "9876000001", source: "Website", status: "New", notes: "Requested CRM demo.", role: "Sales Representative" },
  { name: "Ananya Gupta", company: "Gupta Industries", email: "ananya@guptaindustries.com", phone: "9876000002", source: "Referral", status: "Qualified", notes: "Interested in Enterprise plan.", role: "Manager" },
  { name: "Kiran Reddy", company: "Reddy Builders", email: "kiran@reddybuilders.com", phone: "9876000003", source: "Email", status: "Contacted", notes: "Follow up next week.", role: "Sales Representative" },
  { name: "Vijay Kumar", company: "VK Traders", email: "vijay@vktraders.com", phone: "9876000004", source: "Social Media", status: "New", notes: "Downloaded brochure.", role: "Sales Representative" },
  { name: "Sneha Rao", company: "Rao Consulting", email: "sneha@raoconsulting.com", phone: "9876000005", source: "Walk In", status: "Qualified", notes: "Requested quotation.", role: "Manager" },
  { name: "Aakash Jain", company: "Jain Exports", email: "aakash@jainexports.com", phone: "9876000006", source: "Website", status: "Contacted", notes: "Interested in annual subscription.", role: "Sales Representative" },
  { name: "Pooja Sharma", company: "PS Solutions", email: "pooja@pssolutions.com", phone: "9876000007", source: "Referral", status: "New", notes: "Waiting for first meeting.", role: "Sales Representative" },
  { name: "Arun Nair", company: "Nair Logistics", email: "arun@nairlogistics.com", phone: "9876000008", source: "Other", status: "Lost", notes: "Budget constraints.", role: "Manager" },
];

export default async function seedLeads(users) {
  console.log("\n🌱 Seeding Leads...");
  const insertedLeads = [];

  for (const leadData of leads) {
    const assignedUser = users[leadData.role];
    const payload = {
      name: leadData.name,
      company: leadData.company,
      email: leadData.email,
      phone: leadData.phone,
      source: leadData.source,
      status: leadData.status,
      notes: leadData.notes,
      assignedTo: assignedUser?._id,
    };

    let lead = await Lead.findOne({ email: payload.email });
    if (!lead) {
      lead = await Lead.create(payload);
      console.log(`✅ Lead Created : ${lead.name}`);
    } else {
      console.log(`⏩ Lead Exists : ${lead.name}`);
    }
    insertedLeads.push(lead);
  }

  console.log(`🎉 ${insertedLeads.length} leads ready.\n`);
  return insertedLeads;
}
