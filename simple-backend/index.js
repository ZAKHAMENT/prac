const express = require("express");
const app = express();

app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// POST route
app.post("/add", (req, res) => {
  const { a, b } = req.body;
  const sum = a + b;
  res.json({ sum });
});
//
// Export app for testing
module.exports = app;

// Start server only if running directly
if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
