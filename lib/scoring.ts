import { Question } from './questions';

export interface QuizResult {
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  answers: UserAnswer[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export const PASSING_SCORE = 80;

export function calculateScore(questions: Question[], userAnswers: Record<number, number>): QuizResult {
  let correctAnswers = 0;
  const answers: UserAnswer[] = [];
  
  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    answers.push({
      questionId: question.id,
      selectedAnswer: userAnswer,
      isCorrect
    });
  });
  
  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= PASSING_SCORE;
  
  return {
    score: correctAnswers,
    percentage,
    correctAnswers,
    totalQuestions,
    passed,
    answers
  };
}

export function getResultMessage(result: QuizResult): {
  title: string;
  message: string;
  showSwagMessage: boolean;
} {
  if (result.passed) {
    return {
      title: "🎉 Congratulations!",
      message: `You scored ${result.percentage}% and demonstrated excellent incident management knowledge. You've earned free incident.io SWAG!`,
      showSwagMessage: true
    };
  } else {
    return {
      title: "Thanks for participating!",
      message: `You scored ${result.percentage}%. While you didn't reach the ${PASSING_SCORE}% threshold for SWAG this time, we hope you learned something valuable about incident management best practices.`,
      showSwagMessage: false
    };
  }
}