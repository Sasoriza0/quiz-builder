'use client';

import { useCreateQuiz } from '@/hooks/useCreateQuiz';

export default function CreateQuizPage() {
  const {
    title,
    setTitle,
    questions,
    isSubmitting,
    addQuestion,
    updateQuestion,
    handleSubmit
  } = useCreateQuiz();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-white">Create New Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <label htmlFor="quiz-title" className="block text-sm font-semibold mb-2 text-gray-300">
              Quiz Title
            </label>
            <input
              id="quiz-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., JavaScript Basics"
            />
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor={`type-${index}`} className="block text-xs font-bold uppercase text-gray-500 mb-1">
                      Type
                    </label>
                    <select
                      id={`type-${index}`}
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
                    <label htmlFor={`text-${index}`} className="block text-xs font-bold uppercase text-gray-500 mb-1">
                      Question Text
                    </label>
                    <input
                      id={`text-${index}`}
                      type="text"
                      required
                      value={q.text}
                      onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                      className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white"
                      placeholder="Enter your question here..."
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-blue-900/30">
                  <label htmlFor={`correct-${index}`} className="block text-sm font-bold text-blue-400 mb-2">
                    Correct Answer:
                  </label>
                  
                  {q.type === 'boolean' && (
                    <select
                      id={`correct-${index}`}
                      value={q.correctAnswer}
                      onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  )}

                  {q.type === 'input' && (
                    <input
                      id={`correct-${index}`}
                      type="text"
                      required
                      value={q.correctAnswer}
                      onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                      placeholder="Type the correct answer here..."
                    />
                  )}

                  {q.type === 'checkbox' && (
                    <div className="space-y-3">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="flex gap-2 items-center">
                          <input
                            type="text"
                            aria-label={`Option ${optIndex + 1}`}
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...q.options];
                              newOpts[optIndex] = e.target.value;
                              updateQuestion(index, 'options', newOpts);
                            }}
                            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded text-sm text-white"
                            placeholder={`Option ${optIndex + 1}`}
                          />
                          <input
                            type="radio"
                            aria-label="Mark as correct"
                            name={`correct-${index}`}
                            checked={q.correctAnswer === opt && opt !== ''}
                            onChange={() => updateQuestion(index, 'correctAnswer', opt)}
                            className="w-5 h-5 accent-green-500"
                            title="Mark as correct"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => updateQuestion(index, 'options', [...q.options, ''])}
                        className="text-xs text-blue-400 hover:underline"
                      >
                        + Add Option
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="w-full py-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-blue-500 transition"
          >
            + Add Question
          </button>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 py-3 rounded-lg font-bold hover:bg-green-500 disabled:bg-gray-700 transition text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Quiz'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}