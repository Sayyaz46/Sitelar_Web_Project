const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "" },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  skills: { type: [String], default: [] },
  socials: {
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" }
  },
  isPermanent: { type: Boolean, default: false } // for founders
});

module.exports = mongoose.model("Employee", EmployeeSchema);
