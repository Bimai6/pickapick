import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
  hash: {
    type: String,
    trim: true,
    minlength: 7,
    maxlength: 7,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },

  players: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    validate: {
      validator: function (arr: mongoose.Types.ObjectId[]) {
        return arr.length <= this.capacity;
      },
      message: "Room is full",
    },
  },

  state: {
    type: String,
    enum: ["LOBBY", "ONGOING", "FINISHED"],
    default: "LOBBY",
  },

  metagame: {
    type: Schema.Types.ObjectId,
    ref: "Metagame",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  timers: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Room", roomSchema);
