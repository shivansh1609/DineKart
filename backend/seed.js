const mongoose = require("mongoose");
const Menu = require("./models/menu");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const data = require("./menu.json");

const insert = async () => {
  await Menu.deleteMany(); // optional (clears old data)
  await Menu.insertMany(data);
  console.log("✅ Full menu added");
  process.exit();
};

insert();