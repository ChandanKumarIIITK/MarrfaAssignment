const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path"); 

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;  


app.get("/proxy/countries", async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    res.json(response.data);
  } catch (error) {
    console.error("Error in proxy:", error.message);
    res.status(500).send("Failed to fetch countries");
  }
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
