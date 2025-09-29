import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../")));

app.get("/api/game/:universeId", async (req, res) => {
  try {
    const { universeId } = req.params;
    const response = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );
    const data = await response.json() as any;

    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.json({
      ccu: data.data[0].playing,
      visits: data.data[0].visits,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Roblox API" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
