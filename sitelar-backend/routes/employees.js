const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Employee = require("../models/Employee");

// Configure multer (image upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});
const upload = multer({ storage });

// GET all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find().sort({ isPermanent: -1 });
  res.json(employees);
});

// GET single employee
router.get("/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  res.json(emp);
});

// ADD employee
router.post("/", upload.single("image"), async (req, res) => {
  const data = req.body;
  if (req.file) data.image = "uploads/" + req.file.filename;

  if (data.skills && typeof data.skills === "string") {
    data.skills = data.skills.split(",").map((s) => s.trim());
  }

  const emp = await Employee.create(data);
  res.json(emp);
});

// UPDATE employee
router.put("/:id", upload.single("image"), async (req, res) => {
  const data = req.body;
  if (req.file) data.image = "uploads/" + req.file.filename;

  const updated = await Employee.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });

  res.json(updated);
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;
