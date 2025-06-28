const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  email: { type: String, required: true },
  displayName: { type: String, required: true }, // Puedes poner required si siempre lo tienes
  score: { type: Number, required: true },
  total: { type: Number, required: true }
},
  { timestamps: true }
);

module.exports = mongoose.model("Score", ScoreSchema);
