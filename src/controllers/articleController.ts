import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export const createArticle = async (req: Request, res: Response) => {
  const { title, body, tags } = req.body;
  const userId = (req as any).userId;
  try {
    const article = await prisma.article.create({
      data: {
        title,
        body,
        tags,
        authorId: userId,
      },
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create article' });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
    const articles = await prisma.article.findMany({
      where: { authorId: userId },
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const articleId = req.params.id;
  const userId = (req as any).userId;
  try {
    await prisma.article.deleteMany({
      where: { id: articleId, authorId: userId },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

export const summarizeArticle = async (req: Request, res: Response) => {
  const articleId = req.params.id;
  const userId = (req as any).userId;

  try {
    const article = await prisma.article.findFirst({
      where: { id: articleId, authorId: userId },
    });

    if (!article) return res.status(404).json({ error: "Article not found" });

    const geminiApiKey = process.env.GEMINI_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize the following article:\n\n${article.body}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const summary =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

    res.json({ summary }); // ✅ now declared and safe
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ error: "AI summarization failed" });
  }
};