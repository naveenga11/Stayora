require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to Atlas DB");
}

const initDB = async () => {
  // Find naveen11's actual _id from Atlas
  const owner = await User.findOne({ username: "naveen11" });
  if (!owner) {
    console.error('User "naveen11" not found in Atlas. Please sign up on the website first.');
    mongoose.connection.close();
    return;
  }

  console.log(`Found owner: ${owner.username} (${owner._id})`);

  await Listing.deleteMany({});
  const listings = initData.data.map((obj) => ({ ...obj, owner: owner._id }));
  await Listing.insertMany(listings);
  console.log(`${listings.length} listings inserted, all owned by naveen11.`);

  mongoose.connection.close();
};

main()
  .then(() => initDB())
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
