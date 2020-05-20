// import mongoose
const mongoose = require("mongoose");

// build schema
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// model-ify the schema
const User = mongoose.model("User", UserSchema);

// export
module.exports = User;
