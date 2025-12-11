import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  pkmnSelected: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
});

export default mongoose.model("Team", teamSchema);
