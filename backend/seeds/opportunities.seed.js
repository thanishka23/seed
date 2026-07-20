import Opportunity from "../models/Opportunity.js";

const opportunities = [
  { customerEmail: "arjun.mehta@gmail.com", assignedRole: "Sales Representative", title: "CRM Enterprise License", expectedRevenue: 250000, probability: 80, stage: "Proposal", expectedCloseDate: new Date("2026-08-15") },
  { customerEmail: "priya.nair@gmail.com", assignedRole: "Manager", title: "Annual Support Contract", expectedRevenue: 120000, probability: 70, stage: "Negotiation", expectedCloseDate: new Date("2026-08-22") },
  { customerEmail: "rahul.verma@gmail.com", assignedRole: "Sales Representative", title: "Cloud Migration Project", expectedRevenue: 450000, probability: 60, stage: "Prospecting", expectedCloseDate: new Date("2026-09-10") },
  { customerEmail: "sneha.reddy@gmail.com", assignedRole: "Sales Representative", title: "Inventory Automation", expectedRevenue: 180000, probability: 90, stage: "Proposal", expectedCloseDate: new Date("2026-08-05") },
  { customerEmail: "karan.shah@gmail.com", assignedRole: "Manager", title: "ERP Implementation", expectedRevenue: 650000, probability: 40, stage: "Negotiation", expectedCloseDate: new Date("2026-09-01") },
  { customerEmail: "anjali.gupta@gmail.com", assignedRole: "Sales Representative", title: "HR Management Module", expectedRevenue: 95000, probability: 100, stage: "Won", expectedCloseDate: new Date("2026-07-18") },
  { customerEmail: "vivek.rao@gmail.com", assignedRole: "Sales Representative", title: "Sales Dashboard", expectedRevenue: 160000, probability: 20, stage: "Lost", expectedCloseDate: new Date("2026-07-05") },
];

export default async function seedOpportunities(customers, users) {
  console.log("\n🌱 Seeding Opportunities...");
  const insertedOpportunities = [];

  for (const item of opportunities) {
    const customer = customers.find((c) => c.email === item.customerEmail);
    if (!customer) continue;

    const assignedUser = users[item.assignedRole];
    const existing = await Opportunity.findOne({ customer: customer._id, title: item.title });
    if (existing) {
      console.log(`⏩ Opportunity already exists: ${item.title}`);
      insertedOpportunities.push(existing);
      continue;
    }

    const opportunity = await Opportunity.create({
      customer: customer._id,
      title: item.title,
      expectedRevenue: item.expectedRevenue,
      probability: item.probability,
      stage: item.stage,
      expectedCloseDate: item.expectedCloseDate,
      assignedTo: assignedUser?._id,
    });

    console.log(`✅ Created Opportunity: ${opportunity.title}`);
    insertedOpportunities.push(opportunity);
  }

  console.log(`🎉 ${insertedOpportunities.length} opportunities ready.\n`);
  return insertedOpportunities;
}
