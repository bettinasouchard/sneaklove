const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakersSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  img: {type: String, default:"https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
});

const SneakerModel = mongoose.model("sneakers", sneakersSchema);

module.exports = SneakerModel;
