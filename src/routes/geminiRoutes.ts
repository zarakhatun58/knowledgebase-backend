// routes/geminiRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();


router.post("/ask", async (req, res) => {
  console.log("Received POST /api/gemini/ask");

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const output = response.data;
    res.json(output);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Gemini API request failed." });
  }
});

export default router;