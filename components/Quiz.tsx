"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import Question from './Question';
import ProgressBar from './ProgressBar';

interface QuizProps {
  leadData: any;
}

export default function Quiz({ leadData }: QuizProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;
  
  const handleAnswer = (answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };
  
  const handleNext = async () => {
    if (isLast) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/submit-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadData,
            answers,
            timestamp: new Date().toISOString()
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          router.push(`/results?id=${result.id}`);
        }
      } catch (error) {
        console.error('Quiz submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };
  
  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Incident Management Best Practices Quiz
          </h1>
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        </div>
        
        <Question
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={isFirst}
          isLast={isLast}
        />
      </div>
    </div>
  );
}