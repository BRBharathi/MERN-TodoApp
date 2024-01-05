const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});
//pre hook to encrpt the password before saving the record in database
userSchema.pre("save", async function (next) {
  console.log("password encryption called");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

module.exports = mongoose.model("User", userSchema);
