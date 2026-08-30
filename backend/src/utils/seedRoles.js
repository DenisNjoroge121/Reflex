const Role = require(
  "../models/Role"
);

const seedRoles = async () => {
  const count =
    await Role.countDocuments();

  if (count === 0) {
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
  }
};

module.exports = seedRoles;