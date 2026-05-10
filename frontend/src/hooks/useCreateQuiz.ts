import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

export interface Question {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options: string[];
  correctAnswer: string;
}

export const useCreateQuiz = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'boolean', text: '', options: [''], correctAnswer: 'true' }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | string[]) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) return alert('Add at least one question');
    
    setIsSubmitting(true);
    try {
      await api.post('/quizzes', { title, questions });
      router.push('/');
      router.refresh(); 
    } catch {
      alert('Error saving quiz. Check if all fields are filled.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    questions,
    isSubmitting,
    addQuestion,
    updateQuestion,
    handleSubmit
  };
};