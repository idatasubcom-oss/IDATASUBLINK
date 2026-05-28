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
