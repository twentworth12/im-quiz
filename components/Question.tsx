"use client";

import { Question } from '@/lib/questions';

interface QuestionProps {
  question: Question;
  selectedAnswer?: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function Question({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswer(index)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={selectedAnswer === undefined}
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLast ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}