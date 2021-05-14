require("dotenv").config();
require("../config/mongodb"); // fetch the db connection
const UserModel = require("../models/User");

const user = [
  {
    name: "Antoine",
    lastname: "Sune",
    email: "antoine@gmail.com",
    password: "inputtamere",
  },
  {
    name: "Aurélie",
    lastname: "Lopez-Vincente",
    email: "aurélie@gmail.com",
    password: "tesdanstonlit",
  },
];

(async function insertTag() {
  try {
    await UserModel.deleteMany(); // empty the styles db collection
    const inserted = await UserModel.insertMany(user); // insert docs in db
    console.log(`seed styles done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
