const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    keys: {
      type: { auth: String, p256dh: String },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BrowserSubscription", subscriptionSchema);
