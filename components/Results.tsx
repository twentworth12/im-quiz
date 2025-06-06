"use client";

import { questions } from '@/lib/questions';
import { QuizResult, getResultMessage } from '@/lib/scoring';

interface ResultsProps {
  result: QuizResult;
  leadData?: any;
}

export default function Results({ result, leadData }: ResultsProps) {
  const resultMessage = getResultMessage(result);
  
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[#1a1a1a]">{resultMessage.title}</h1>
          
          <div className="mb-6">
            <div className="text-6xl font-bold text-[#F25533] mb-2">
              {result.percentage}%
            </div>
            <p className="text-[#666666]">
              {result.correctAnswers} out of {result.totalQuestions} questions correct
            </p>
          </div>
          
          <p className="text-lg text-[#1a1a1a] mb-8 max-w-2xl mx-auto">
            {resultMessage.message}
          </p>
          
          {resultMessage.showSwagMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                🎁 Free swag unlocked!
              </h2>
              <p className="text-green-700">
                We'll be in touch via email with details about claiming your incident.io swag.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Review your answers</h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = result.answers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect || false;
              
              return (
                <div key={question.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#1a1a1a] mb-2">
                        {index + 1}. {question.question}
                      </h3>
                      
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer?.selectedAnswer === optionIndex;
                          const isCorrectAnswer = question.correctAnswer === optionIndex;
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-md ${
                                isCorrectAnswer
                                  ? 'bg-green-50 border border-green-300'
                                  : isUserAnswer && !isCorrect
                                  ? 'bg-red-50 border border-red-300'
                                  : 'bg-[#f9fafb]'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                {isCorrectAnswer && (
                                  <span className="text-green-600 font-semibold">✓</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="text-red-600 font-semibold">✗</span>
                                )}
                                {option}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-[#FFF4F1] p-4 rounded-lg">
                        <p className="text-sm text-[#1a1a1a]">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-[#F25533] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#E04429] transition-colors"
          >
            Take quiz again
          </a>
        </div>
      </div>
    </div>
  );
}