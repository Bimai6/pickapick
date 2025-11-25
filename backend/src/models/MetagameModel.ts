import mongoose from "mongoose";

const embebbedViabilitySchema = new mongoose.Schema(
  {
    pokemon: { type: String, required: true },
    cost: { type: Number, required: true, min: 1, max: 8 },
  },
  { _id: false }
);

const metagameSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  format: {
    type: String,
    trim: true,
    required: true,
  },
  regulation: {
    type: String,
    trim: true,
    required: true,
  },
  allowedPokemon: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
  bannedPokemon: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
  viability: [embebbedViabilitySchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Metagame", metagameSchema);
