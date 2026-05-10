import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// Get all quizzes
export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: { select: { questions: true } }
      }
    });

    const result = quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Create a new quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title is too short' });
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ error: 'Quiz must have at least one question' });
    }

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            text: q.text,
            options: q.options ? JSON.stringify(q.options) : null,
            correctAnswer: String(q.correctAnswer) 
          }))
        }
      },
      include: { questions: true }
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Get single quiz details
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: { questions: true }
    });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map((q: any) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null
      }))
    };

    res.json(formattedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz details' });
  }
};

// Delete a quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};