import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import geminiRoutes from './routes/geminiRoutes';

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://knowledgebase-frontend.onrender.com',
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked from origin: ${origin}`);
      callback(new Error('❌ CORS blocked: Not allowed by server'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gemini', geminiRoutes);
// ✅ Gemini test endpoint (optional)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
