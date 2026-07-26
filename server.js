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
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Nexora AI System Access',
          },
          unit_amount: 2000, // $20
        },
        quantity: 1,
      },
    ],
    success_url: 'https://ai-business-system-production.up.railway.app/success',
    cancel_url: 'https://ai-business-system-production.up.railway.app/cancel',
  });

  res.json({ url: session.url });
});
