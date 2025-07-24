import express from "express";
import { createArticle,getArticles, summarizeArticle, deleteArticle } from "../controllers/articleController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();
router.use(verifyToken); // Protect all below routes

router.post('/', createArticle);
router.get('/', getArticles);
router.delete('/:id', deleteArticle);
router.post('/:id/summarize', summarizeArticle);


export default router;
