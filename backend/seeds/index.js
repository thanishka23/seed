import connectDB from "../config/db.js";
import seedUsers from "./users.seed.js";
import seedCompanySettings from "./companySettings.seed.js";
import seedEmployees from "./employees.seed.js";
import seedSuppliers from "./suppliers.seed.js";
import seedProducts from "./products.seed.js";
import seedCustomers from "./customers.seed.js";
import seedLeads from "./leads.seed.js";
import seedCustomerNotes from "./customerNotes.seed.js";
import seedOpportunities from "./opportunities.seed.js";
import seedQuotations from "./quotations.seed.js";
import seedOrders from "./orders.seed.js";
import seedInvoices from "./invoices.seed.js";
import seedPayments from "./payments.seed.js";
import seedExpenses from "./expenses.seed.js";
import seedPurchaseOrders from "./purchaseOrders.seed.js";
import seedStockMovements from "./stockMovements.seed.js";
import seedAttendance from "./attendance.seed.js";
import seedLeave from "./leave.seed.js";
import seedPayroll from "./payroll.seed.js";
import seedTasks from "./tasks.seed.js";
import seedNotifications from "./notifications.seed.js";
import seedSalesActivities from "./salesActivities.seed.js";

async function runSeeds() {
  try {
    console.log("==========================================");
    console.log("🚀 CRM Database Seeding Started...");
    console.log("==========================================\n");

    await connectDB();
    console.log("✅ Database Connected\n");

    const users = await seedUsers();
    const companySettings = await seedCompanySettings();
    const employees = await seedEmployees();
    const suppliers = await seedSuppliers();
    const products = await seedProducts();
    const customers = await seedCustomers();
    const leads = await seedLeads(users);
    const customerNotes = await seedCustomerNotes(customers, users);
    const opportunities = await seedOpportunities(customers, users);
    const quotations = await seedQuotations(customers, products);
    const orders = await seedOrders(customers, quotations, users);
    const invoices = await seedInvoices(orders);
    const payments = await seedPayments(invoices);
    const expenses = await seedExpenses();
    const purchaseOrders = await seedPurchaseOrders(suppliers, products);
    const stockMovements = await seedStockMovements(products, users);
    const attendance = await seedAttendance(employees);
    const leaves = await seedLeave(employees);
    const payroll = await seedPayroll(employees);
    const tasks = await seedTasks(users);
    const notifications = await seedNotifications(users);
    const salesActivities = await seedSalesActivities(users, leads, opportunities, quotations, orders);

    console.log("\n==========================================");
    console.log("🎉 Seeding Completed Successfully!");
    console.log("==========================================\n");

    console.table({
      Users: Object.keys(users).length,
      CompanySettings: companySettings ? 1 : 0,
      Employees: employees.length,
      Suppliers: suppliers.length,
      Products: products.length,
      Customers: customers.length,
      Leads: leads.length,
      CustomerNotes: customerNotes.length,
      Opportunities: opportunities.length,
      Quotations: quotations.length,
      Orders: orders.length,
      Invoices: invoices.length,
      Payments: payments.length,
      Expenses: expenses.length,
      PurchaseOrders: purchaseOrders.length,
      StockMovements: stockMovements.length,
      Attendance: attendance.length,
      Leaves: leaves.length,
      Payroll: payroll.length,
      Tasks: tasks.length,
      Notifications: notifications.length,
      SalesActivities: salesActivities.length,
    });

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding Failed\n");
    console.error(error);
    process.exit(1);
  }
}

runSeeds();
