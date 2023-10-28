const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/users");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-crud");

// Listen for successful database connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");

  // Routes

  // Get all users
  app.get("/", (req, res) => {
    UserModel.find({})
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  });

  // Get a specific user by ID
  app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });

  // Update a user by ID
  app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    const userData = req.body;

    UserModel.findByIdAndUpdate(id, userData)
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.json({ error: "Internal server error" }));
  });

  // Create a new user
  app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  });

  // Delete a user by ID
  app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
      .then(() => res.json({ message: "User deleted successfully" }))
      .catch((err) => res.json(err));
  });

  // Start the Express server
  app.listen(3001, () => {
    console.log("App running on port 3001");
  });
});

// Handle database connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
});

// Handle disconnection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Handle Node process termination due to app termination
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});
