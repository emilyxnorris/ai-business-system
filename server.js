const express = require("express");
const app = express();

let visitors = [];

app.get("/", (req, res) => {
  res.send("🚀 Your AI Business System is LIVE");
});

app.get("/track", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const visitor = {
    ip: ip,
    time: new Date()
  };

  visitors.push(visitor);

  res.json({
    message: "Visitor tracked",
    data: visitor
  });
});

app.get("/dashboard", (req, res) => {
  res.json(visitors);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
