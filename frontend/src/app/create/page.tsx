'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Question {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options: string[];
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'boolean', text: '', options: [''] }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Sending data to backend:", { title, questions }); // Додай це!
  
  try {
    const response = await api.post('/quizzes', { title, questions });
    console.log("Backend response:", response.data);
    router.push('/');
  } catch (error: any) {
    console.error("Full error object:", error); // Подивимось на повну помилку
    alert('Error saving quiz. Check console.');
  }
};

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-white border-b border-gray-700 pb-4">
          Create New Quiz
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Card */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <label className="block text-sm font-semibold mb-2 text-gray-300">Quiz Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white"
              placeholder="e.g., General Knowledge 101"
            />
          </div>

          {/* Questions Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-200">Questions ({questions.length})</h2>
            </div>

            {questions.map((q, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative hover:border-gray-500 transition shadow-md">
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition"
                >
                  ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Type</label>
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                      className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="boolean">True/False</option>
                      <option value="input">Text Input</option>
                      <option value="checkbox">Multiple Choice</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Question Text</label>
                    <input
                      type="text"
                      required
                      value={q.text}
                      onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                      className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white"
                      placeholder="What is the capital of..."
                    />
                  </div>
                </div>

                {q.type === 'checkbox' && (
                  <div className="pl-4 border-l-2 border-blue-500 space-y-2 mt-4">
                    <label className="block text-xs font-bold uppercase text-gray-500">Options</label>
                    {q.options.map((opt, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...q.options];
                          newOpts[optIndex] = e.target.value;
                          updateQuestion(index, 'options', newOpts);
                        }}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newOpts = [...q.options, ''];
                        updateQuestion(index, 'options', newOpts);
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      + Add another option
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="w-full py-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-900/10 transition flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Add Question
          </button>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition shadow-lg ${
                isSubmitting ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'
              } text-white`}
            >
              {isSubmitting ? 'Saving...' : 'Save Quiz'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-transparent border border-gray-600 rounded-lg hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}