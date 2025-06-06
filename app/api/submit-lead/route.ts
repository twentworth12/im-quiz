import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();
    
    console.log('Lead submitted:', leadData);
    
    return NextResponse.json({ 
      success: true,
      message: 'Lead captured successfully'
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}