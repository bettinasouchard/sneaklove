require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const sneakers = [
  {
    name: "Nike",
    ref: "123456",
    size: 45,
    description: "fast shoes",
    price: 100,
    category: "men",
  },
  {
    name: "Puma",
    ref: "798456",
    size: 38,
    description: "awesome shoes",
    price: 110,
    category: "women",
  },
  {
    name: "Reebok",
    ref: "211557",
    size: 30,
    description: "slow shoes",
    price: 70,
    category: "kids",
  },
];

(async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(`seed sneakers done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
