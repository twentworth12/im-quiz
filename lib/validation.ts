export interface LeadFormData {
  fullName: string;
  email: string;
  company: string;
  companySize: string;
  role: string;
  phone?: string;
  source?: string;
}

export const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees"
];

export const leadSources = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Blog/Content",
  "Advertisement",
  "Other"
];

const businessEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'ymail.com',
  'live.com'
];

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  const domain = email.split('@')[1].toLowerCase();
  
  if (businessEmailDomains.includes(domain)) {
    return false;
  }
  
  return true;
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  
  return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

export function validateLeadForm(data: LeadFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name";
  }
  
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please use a business email address";
  }
  
  if (!data.company || data.company.trim().length < 2) {
    errors.company = "Please enter your company name";
  }
  
  if (!data.companySize) {
    errors.companySize = "Please select your company size";
  }
  
  if (!data.role || data.role.trim().length < 2) {
    errors.role = "Please enter your role";
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}