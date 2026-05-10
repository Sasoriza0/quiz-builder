import { useState, useEffect } from 'react';
import api from '@/services/api';

export interface QuestionDetail {
  id: number;
  type: string;
  text: string;
  options: string[] | null;
}

export interface QuizDetail {
  id: number;
  title: string;
  questions: QuestionDetail[];
}

export const useQuizDetails = (id: string) => {
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    api.get(`/quizzes/${id}`)
      .then(res => {
        setQuiz(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching quiz:', err);
        setLoading(false);
      });
  }, [id]);

  return { quiz, loading };
};