const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Register Route
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

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  res.json({
    message: "Login successful",
    user: {
      email
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
