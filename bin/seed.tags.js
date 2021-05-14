require("dotenv").config();
require("../config/mongodb"); // fetch the db connection
const TagModel = require("../models/Tag");

const tags = [
  {
    type: "fashion",
  },
  {
    type: "running",
  },
];

(async function insertTag() {
  try {
    await TagModel.deleteMany(); // empty the styles db collection
    const inserted = await TagModel.insertMany(tags); // insert docs in db
    console.log(`seed styles done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
