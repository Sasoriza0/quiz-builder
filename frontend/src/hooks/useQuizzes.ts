import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quizzes')
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch quizzes:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      await api.delete(`/quizzes/${id}`);
      setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    } catch {
      alert('Failed to delete quiz');
    }
  };

  return { quizzes, loading, handleDelete };
};