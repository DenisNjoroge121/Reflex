require("dotenv").config();
const Role = require("./src/models/Role");

const connectDB = require("./src/config/db");

async function seed() {
  await connectDB();

  await Role.deleteMany();

  await Role.insertMany([
    {
      role_name: "Retailer",
    },
    {
      role_name: "Dispatcher",
    },
    {
      role_name: "Rider",
    },
  ]);

  console.log("Roles seeded");
  process.exit();
}

seed();