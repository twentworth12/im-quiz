"use client";

import { useState } from 'react';
import { LeadFormData, companySizes, leadSources, validateLeadForm } from '@/lib/validation';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    company: '',
    companySize: '',
    role: '',
    phone: '',
    source: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLeadForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Start the incident management quiz</h2>
        <p className="text-[#666666]">Score 80% or higher to earn free incident.io swag!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Full name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.fullName ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Work email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.email ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Company name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.company ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
            required
          />
          {errors.company && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.company}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Company size *
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.companySize ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
            required
          >
            <option value="">Select company size</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.companySize && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.companySize}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Role/title *
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.role ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
            required
          />
          {errors.role && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.role}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            Phone number (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent ${
              errors.phone ? 'border-[#F25533]' : 'border-[#e5e7eb]'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-[#F25533]">{errors.phone}</p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="source" className="block text-sm font-medium text-[#1a1a1a] mb-1">
            How did you hear about us? (optional)
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#F25533] focus:border-transparent"
          >
            <option value="">Select an option</option>
            {leadSources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#F25533] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#E04429] focus:outline-none focus:ring-2 focus:ring-[#F25533] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Starting quiz...' : 'Start quiz'}
        </button>
      </div>
      
      <p className="text-xs text-[#666666] text-center">
        By submitting this form, you agree to receive communications from incident.io.
      </p>
    </form>
  );
}