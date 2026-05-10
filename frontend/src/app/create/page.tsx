'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Question {
  type: 'boolean' | 'input' | 'checkbox';
  text: string;
  options: string[]; // Only used for 'checkbox' type
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Add a new empty question to the list
  const addQuestion = () => {
    setQuestions([...questions, { type: 'boolean', text: '', options: [] }]);
  };

  // Update a specific question field
  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  // Add an option for checkbox type questions
  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push('');
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/quizzes', { title, questions });
      router.push('/'); // Redirect to home after success
    } catch (error) {
      console.error('Failed to create quiz:', error);
      alert('Error creating quiz. Check console.');
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create New Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Quiz Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="Enter quiz name"
          />
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          {questions.map((q, index) => (
            <div key={index} className="p-4 border rounded bg-gray-50 relative space-y-3">
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                Remove
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Type</label>
                  <select
                    value={q.type}
                    onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                    className="w-full p-2 border rounded text-black"
                  >
                    <option value="boolean">True/False</option>
                    <option value="input">Text Input</option>
                    <option value="checkbox">Multiple Choice (Checkbox)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">Question Text</label>
                  <input
                    type="text"
                    required
                    value={q.text}
                    onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                    className="w-full p-2 border rounded text-black"
                  />
                </div>
              </div>

              {/* Options for Checkbox type */}
              {q.type === 'checkbox' && (
                <div className="mt-2 space-y-2">
                  <label className="block text-xs font-bold">Options</label>
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...q.options];
                        newOptions[optIndex] = e.target.value;
                        updateQuestion(index, 'options', newOptions);
                      }}
                      className="w-full p-2 border rounded text-sm text-black"
                      placeholder={`Option ${optIndex + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="text-xs bg-gray-200 px-2 py-1 rounded"
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-2 border-2 border-dashed border-blue-400 text-blue-600 rounded hover:bg-blue-50"
        >
          + Add Question
        </button>

        <hr />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
          >
            Save Quiz
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-3 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}