import { NextRequest, NextResponse } from 'next/server';
import { questions } from '@/lib/questions';
import { calculateScore } from '@/lib/scoring';

const results = new Map();

export async function POST(request: NextRequest) {
  try {
    const { leadData, answers, timestamp } = await request.json();
    
    const result = calculateScore(questions, answers);
    
    const resultId = Date.now().toString();
    
    results.set(resultId, {
      leadData,
      result,
      timestamp,
      answers
    });
    
    console.log('Quiz submitted:', {
      id: resultId,
      email: leadData.email,
      score: result.percentage,
      passed: result.passed
    });
    
    if (result.passed) {
      console.log(`SWAG WINNER: ${leadData.email} scored ${result.percentage}%`);
    }
    
    return NextResponse.json({ 
      success: true,
      id: resultId,
      result
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

export { results };