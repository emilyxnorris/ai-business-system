const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Your AI Business System is LIVE");
});

app.get("/track", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.json({
    message: "Visitor tracked",
    ip: ip,
    time: new Date()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
