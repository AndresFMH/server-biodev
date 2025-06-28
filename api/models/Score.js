const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true }
},
  { timestamps: true }
);

module.exports = mongoose.model("Score", ScoreSchema);
