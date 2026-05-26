const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("IDATASUBFAST API Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
