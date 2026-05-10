import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';


import quizRoutes from './routes/quizRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

app.use(express.json());

// Routes
app.use('/quizzes', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});