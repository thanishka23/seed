import SalesActivity from "../models/SalesActivity.js";

export default async function seedSalesActivities(users, leads, opportunities, quotations, orders) {
  console.log("\n🌱 Seeding Sales Activities...");
  const salesUser = users["Sales Representative"];
  const data = [];

  if (leads.length) data.push({ action: "Created Lead", module: "Lead", referenceId: leads[0]._id, description: `Lead ${leads[0].name} created.` });
  if (opportunities.length) data.push({ action: "Updated Opportunity", module: "Opportunity", referenceId: opportunities[0]._id, description: "Opportunity moved to Proposal stage." });
  if (quotations.length) data.push({ action: "Sent Quotation", module: "Quotation", referenceId: quotations[0]._id, description: `Quotation ${quotations[0].quotationNumber} sent.` });
  if (orders.length) data.push({ action: "Created Order", module: "Order", referenceId: orders[0]._id, description: `Order ${orders[0].orderNumber} created.` });

  const inserted = [];
  for (const activityData of data) {
    let activity = await SalesActivity.findOne({
      user: salesUser?._id,
      module: activityData.module,
      referenceId: activityData.referenceId,
      action: activityData.action,
    });

    if (!activity) {
      activity = await SalesActivity.create({
        user: salesUser?._id,
        action: activityData.action,
        module: activityData.module,
        referenceId: activityData.referenceId,
        description: activityData.description,
      });
      console.log(`✅ ${activityData.action}`);
    } else {
      console.log(`⏩ ${activityData.action}`);
    }

    inserted.push(activity);
  }

  return inserted;
}
