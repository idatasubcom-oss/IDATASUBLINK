const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    message: "User registered successfully",
    user: {
      name,
      email
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/register", async (req, res) => {

  const { name, email, password } = req.body;

  res.json({
    message: "User registered successfully",
    user: {
      name,
      email
    }
  });

});

app.get("/api/dashboard", authMiddleware, (req, res) => {

  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });
});
