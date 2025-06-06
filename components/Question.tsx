"use client";

import type { Question } from '@/lib/questions';

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
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center p-4 border border-[#e5e7eb] rounded-lg cursor-pointer hover:bg-[#f9fafb] transition-colors"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswer(index)}
              className="w-4 h-4 text-[#F25533] border-[#e5e7eb] focus:ring-[#F25533]"
            />
            <span className="ml-3 text-[#1a1a1a]">{option}</span>
          </label>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="px-6 py-2 text-[#666666] bg-[#f9fafb] border border-[#e5e7eb] rounded-lg hover:bg-[#e5e7eb] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={selectedAnswer === undefined}
          className="px-6 py-2 text-white bg-[#F25533] rounded-lg hover:bg-[#E04429] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLast ? 'Finish quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}