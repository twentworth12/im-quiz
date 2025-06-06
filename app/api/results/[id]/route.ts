import { NextRequest, NextResponse } from 'next/server';
import { results } from '../../submit-quiz/route';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = results.get(params.id);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Results not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      result: result.result,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}