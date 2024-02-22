const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "the maxmium name length is 30"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please type a valid email"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "The passwords are not the same",
    },
  },
});

userSchema.pre("save", async (next) => {
  this.password = await bcrypt.hash(this.password);
  next();
});

userSchema.method.correctPasssword = async function (
  userPassword,
  enteredPassword
) {
  return await bcrypt.compare(userPassword, enteredPassword);
};

userSchema.method.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
