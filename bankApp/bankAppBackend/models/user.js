const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  identity: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  iban: {
    type: Number,
    required: true,
  },
  account: {
    transactions: {
      type: [Schema.Types.ObjectId],
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
