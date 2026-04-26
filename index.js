const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FoodExpress API is running successfully!");
});

app.get("/view", (req, res) => {
  res.json({
    message: "Viewing food items",
    items: ["Pizza", "Burger", "Pasta"]
  });
});

app.get("/search", (req, res) => {
  res.send("INSIDE SEARCH API...");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FoodExpress API running on port ${PORT}`);
});