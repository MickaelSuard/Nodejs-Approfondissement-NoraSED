const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = Article = model("Article", articleSchema);
