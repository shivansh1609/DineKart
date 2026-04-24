const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const Menu = require('./models/menu');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get('/', (req, res) => {
  res.send("🚀 SmartServe AI Backend Running");
});

// ================= MENU APIs =================

// ✅ Add Menu Item
app.post('/api/menu', async (req, res) => {
  try {
    const item = await Menu.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Menu by Restaurant
app.get('/api/menu/:restaurantId', async (req, res) => {
  try {
    const items = await Menu.find({
      restaurantId: req.params.restaurantId
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================= IMAGE API (PEXELS) =================

app.get('/api/image', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    );

    const image = response.data.photos[0]?.src.medium;

    res.json({ image });

  } catch (err) {
    console.log("❌ Image API Error:", err.message);
    res.json({
      image: "https://via.placeholder.com/400x300"
    });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});