import mongoose, { Schema } from "mongoose";

const friendSchema = new mongoose.Schema({

  user1: {
        type: Schema.Types.ObjectId,
        ref: "User",
  },

  user2: {
        type: Schema.Types.ObjectId,
        ref: "User",
  },

  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },

});

export default mongoose.model("Friend", friendSchema);
