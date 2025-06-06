"use client";

import { useState } from 'react';
import LeadForm from '@/components/LeadForm';
import Quiz from '@/components/Quiz';
import { LeadFormData } from '@/lib/validation';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  
  const handleLeadSubmit = async (data: LeadFormData) => {
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setLeadData(data);
        setShowQuiz(true);
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      setLeadData(data);
      setShowQuiz(true);
    }
  };
  
  if (showQuiz && leadData) {
    return <Quiz leadData={leadData} />;
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Test Your Incident Management Knowledge
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take our quiz to assess your incident response expertise and earn free incident.io SWAG if you score 80% or higher!
          </p>
        </div>
        
        <LeadForm onSubmit={handleLeadSubmit} />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by incident.io - The modern incident management platform
          </p>
        </div>
      </div>
    </main>
  );
}