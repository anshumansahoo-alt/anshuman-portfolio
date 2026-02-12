// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// ------------------- MongoDB Schemas -------------------

// Project Schema
const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  year: Number
});
const Project = mongoose.model("Project", ProjectSchema);

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", ContactSchema);

// ------------------- Routes -------------------

// Root route
app.get("/", (req, res) => {
  res.send("Portfolio backend running ✅");
});

// Add a test project
app.get("/add-project", async (req, res) => {
  try {
    const project = new Project({
      name: "Test Project",
      description: "This is a test",
      year: 2026
    });
    await project.save();
    res.send("✅ Project saved to MongoDB!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error saving project");
  }
});

// View all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error fetching projects");
  }
});

// Delete a project by ID
app.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send("✅ Project deleted!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error deleting project");
  }
});

// Save contact form submission
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.send("✅ Contact message saved!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error saving contact message");
  }
});

// ------------------- Connect to MongoDB & Start Server -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });





