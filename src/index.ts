import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import geminiRoutes from "./routes/geminiRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/gemini", geminiRoutes);
// ✅ Gemini test endpoint (optional)
app.post('/api/gemini', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
