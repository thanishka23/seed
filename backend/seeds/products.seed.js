import Product from "../models/Product.js";

const products = [
  { name: "Dell Latitude 5440 Laptop", sku: "PRD-1001", category: "Electronics", price: 72000, costPrice: 65000, stock: 25, minimumStock: 5, supplier: "RK Electronics Pvt. Ltd.", status: "Available" },
  { name: "HP LaserJet Pro Printer", sku: "PRD-1002", category: "Office Equipment", price: 18500, costPrice: 16000, stock: 12, minimumStock: 3, supplier: "VS Technologies", status: "Available" },
  { name: "Wireless Keyboard", sku: "PRD-1003", category: "Accessories", price: 1499, costPrice: 1000, stock: 60, minimumStock: 10, supplier: "Rao Computer World", status: "Available" },
  { name: "Wireless Mouse", sku: "PRD-1004", category: "Accessories", price: 899, costPrice: 550, stock: 85, minimumStock: 15, supplier: "Rao Computer World", status: "Available" },
  { name: "24-inch LED Monitor", sku: "PRD-1005", category: "Electronics", price: 12999, costPrice: 10800, stock: 20, minimumStock: 5, supplier: "RK Electronics Pvt. Ltd.", status: "Available" },
  { name: "Office Chair", sku: "PRD-1006", category: "Furniture", price: 6999, costPrice: 5200, stock: 18, minimumStock: 5, supplier: "Patel Office Supplies", status: "Available" },
  { name: "Office Desk", sku: "PRD-1007", category: "Furniture", price: 9999, costPrice: 8200, stock: 10, minimumStock: 3, supplier: "Patel Office Supplies", status: "Available" },
  { name: "A4 Copier Paper Box", sku: "PRD-1008", category: "Stationery", price: 320, costPrice: 240, stock: 200, minimumStock: 50, supplier: "Kerala Stationeries", status: "Available" },
  { name: "Blue Ball Pen", sku: "PRD-1009", category: "Stationery", price: 20, costPrice: 12, stock: 500, minimumStock: 100, supplier: "PV Office Essentials", status: "Available" },
  { name: "USB Flash Drive 64GB", sku: "PRD-1010", category: "Electronics", price: 799, costPrice: 600, stock: 45, minimumStock: 10, supplier: "VS Technologies", status: "Available" },
  { name: "External Hard Disk 1TB", sku: "PRD-1011", category: "Electronics", price: 4999, costPrice: 4200, stock: 14, minimumStock: 5, supplier: "RK Electronics Pvt. Ltd.", status: "Available" },
  { name: "Conference Speaker", sku: "PRD-1012", category: "Electronics", price: 3999, costPrice: 3300, stock: 8, minimumStock: 3, supplier: "VS Technologies", status: "Available" },
];

export default async function seedProducts() {
  console.log("\n🌱 Seeding Products...");
  const insertedProducts = [];

  for (const productData of products) {
    let product = await Product.findOne({ sku: productData.sku });
    if (!product) {
      product = await Product.create(productData);
      console.log(`✅ Created Product: ${product.name}`);
    } else {
      console.log(`⏩ Product already exists: ${product.name}`);
    }
    insertedProducts.push(product);
  }

  console.log(`🎉 ${insertedProducts.length} products ready.\n`);
  return insertedProducts;
}
