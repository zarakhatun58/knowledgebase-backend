import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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

    if (!article) return res.status(404).json({ error: 'Article not found' });

    // Dummy AI summarization (replace with real API later)
    const summary = article.body.slice(0, 100) + '...';

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: 'Summarization failed' });
  }
};
