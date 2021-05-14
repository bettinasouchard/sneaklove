require("dotenv").config();
require("./../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const sneakers = [
    {
        name: "Nike",
        ref: "123456",
        size: 45,
        description: 'fast shoes',
        price: Number,
        category: {
          type: "men",
          enum: ["men", "women", "kids"],
        },
        id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
      }
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