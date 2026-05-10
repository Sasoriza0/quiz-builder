'use client';

import { use } from 'react';
import Link from 'next/link';
import { useQuizDetails } from '@/hooks/useQuizDetails';

export default function QuizDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { quiz, loading } = useQuizDetails(id);

  if (loading) return <div className="min-h-screen bg-gray-900 p-8 text-center text-white">Loading quiz structure...</div>;
  if (!quiz) return <div className="min-h-screen bg-gray-900 p-8 text-center text-white">Quiz not found.</div>;

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 hover:underline transition">
            ← Back to Quizzes
          </Link>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl mb-8 shadow-lg">
          <h1 className="text-4xl font-extrabold text-white mb-2">{quiz.title}</h1>
          <p className="text-gray-400">Preview Mode (Structure Only)</p>
        </div>
        
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className="p-6 border border-gray-700 rounded-xl bg-gray-800 shadow-md">
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-medium text-white pr-4">
                  <span className="text-blue-400 mr-2">{index + 1}.</span> 
                  {q.text}
                </h3>
                <span className="bg-gray-900 text-gray-400 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border border-gray-700 whitespace-nowrap">
                  {q.type}
                </span>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                
                {q.type === 'boolean' && (
                  <div className="flex gap-3">
                    <div className="flex-1 py-2 text-center border border-gray-600 rounded-lg text-gray-400 bg-gray-900 cursor-not-allowed">
                      ⚪ True
                    </div>
                    <div className="flex-1 py-2 text-center border border-gray-600 rounded-lg text-gray-400 bg-gray-900 cursor-not-allowed">
                      ⚪ False
                    </div>
                  </div>
                )}

                {q.type === 'input' && (
                  <div className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-500 cursor-not-allowed italic">
                    Expected: Short text answer
                  </div>
                )}

                {q.type === 'checkbox' && q.options && (
                  <div className="space-y-3">
                    {q.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300 bg-gray-900 p-3 rounded-lg border border-gray-700">
                        <div className="w-5 h-5 rounded bg-gray-700 border border-gray-500 flex-shrink-0"></div>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}