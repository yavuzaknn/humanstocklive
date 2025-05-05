const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config({ path: "/etc/secrets/.env" });

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.post("/api/gpt", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Sen genetik uzmanı bir yapay zekasın." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ output: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Ana sayfa kontrolü
app.get("/", (req, res) => {
  res.send("✅ HumanStock GPT API aktif!");
});


app.listen(port, () => {
  console.log(`✅ GPT Proxy API çalışıyor: http://localhost:${port}`);
});
