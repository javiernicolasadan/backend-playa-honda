const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/weather", async (req, res) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const { lat, lon, lang } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${lang}`
    );
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

module.exports = router;
