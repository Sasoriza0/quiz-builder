'use client';

import Link from 'next/link';
import { useQuizzes } from '@/hooks/useQuizzes';

export default function Home() {
  const { quizzes, loading, handleDelete } = useQuizzes();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Quizzes</h1>
            <p className="text-gray-400 mt-2">Manage your quiz structures</p>
          </div>
          <Link 
            href="/create" 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> Create New
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your quizzes...</div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 border border-dashed border-gray-700 rounded-2xl">
            <p className="text-gray-400 mb-4">No quizzes found.</p>
            <Link href="/create" className="text-blue-400 hover:underline">Create your first quiz</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition flex flex-col justify-between h-full group">
                
                <button
                  onClick={(e) => handleDelete(quiz.id, e)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 bg-gray-900 hover:bg-red-900/20 p-2 rounded-full transition z-10"
                  title="Delete Quiz"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 pr-8">{quiz.title}</h2>
                  <p className="text-gray-400 text-sm font-medium bg-gray-900 inline-block px-3 py-1 rounded-full border border-gray-700">
                    {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-700">
                  <Link 
                    href={`/quizzes/${quiz.id}`} 
                    className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}