export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of an incident response process?",
    options: [
      "To assign blame for the incident",
      "To restore service as quickly as possible",
      "To document everything that went wrong",
      "To prevent any future incidents"
    ],
    correctAnswer: 1,
    explanation: "The primary goal is to restore service quickly. While documentation and prevention are important, the immediate priority during an incident is minimizing impact and restoring normal operations."
  },
  {
    id: 2,
    question: "When should a post-mortem be conducted after an incident?",
    options: [
      "Only for customer-facing incidents",
      "Within 24-48 hours after resolution",
      "Only when requested by management",
      "After every incident, regardless of severity"
    ],
    correctAnswer: 1,
    explanation: "Post-mortems should be conducted within 24-48 hours while details are fresh. This timeframe allows for immediate issues to be addressed while ensuring thorough analysis."
  },
  {
    id: 3,
    question: "What is the recommended approach for on-call rotations?",
    options: [
      "Have one person always on-call",
      "Rotate weekly with proper handoffs",
      "Only senior engineers should be on-call",
      "On-call is only needed during business hours"
    ],
    correctAnswer: 1,
    explanation: "Weekly rotations with proper handoffs ensure knowledge sharing, prevent burnout, and maintain consistent coverage. This approach balances responsibility across the team."
  },
  {
    id: 4,
    question: "Which severity level typically indicates a complete service outage affecting all users?",
    options: [
      "SEV-3",
      "SEV-2",
      "SEV-1",
      "SEV-0"
    ],
    correctAnswer: 2,
    explanation: "SEV-1 typically indicates a critical incident with complete service outage or major functionality loss affecting all users. SEV-0 is sometimes used for catastrophic failures."
  },
  {
    id: 5,
    question: "What is the role of an Incident Commander during a major incident?",
    options: [
      "Fix the technical issue directly",
      "Coordinate response efforts and communication",
      "Document every action taken",
      "Escalate to senior management immediately"
    ],
    correctAnswer: 1,
    explanation: "The Incident Commander coordinates the response, manages communication, and ensures the right people are involved. They don't necessarily fix the issue themselves but orchestrate the response."
  },
  {
    id: 6,
    question: "How often should runbooks be reviewed and updated?",
    options: [
      "Only when they fail during an incident",
      "Quarterly or after significant changes",
      "Annually during performance reviews",
      "Never - they should remain consistent"
    ],
    correctAnswer: 1,
    explanation: "Runbooks should be reviewed quarterly or after significant system changes to ensure they remain accurate and effective. Regular updates prevent outdated procedures during critical incidents."
  },
  {
    id: 7,
    question: "What is the best practice for incident communication with stakeholders?",
    options: [
      "Wait until the incident is resolved to communicate",
      "Send updates only when asked",
      "Provide regular updates even if there's no new information",
      "Only communicate with technical teams"
    ],
    correctAnswer: 2,
    explanation: "Regular updates, even to confirm the team is still investigating, maintain stakeholder confidence and reduce anxiety. Silence during incidents often causes more concern than the incident itself."
  },
  {
    id: 8,
    question: "What should be included in a blameless post-mortem?",
    options: [
      "Names of engineers who caused the issue",
      "Root cause analysis and timeline of events",
      "Performance reviews of involved team members",
      "Reasons why the incident was someone's fault"
    ],
    correctAnswer: 1,
    explanation: "Blameless post-mortems focus on root cause analysis, timeline of events, and system improvements. The goal is learning and prevention, not assigning blame to individuals."
  },
  {
    id: 9,
    question: "Which metric is most important for measuring incident response effectiveness?",
    options: [
      "Number of incidents per month",
      "Mean Time To Recovery (MTTR)",
      "Lines of code changed",
      "Number of people involved"
    ],
    correctAnswer: 1,
    explanation: "MTTR (Mean Time To Recovery) directly measures how quickly service is restored, which is the primary goal of incident response. It's a key indicator of response effectiveness."
  },
  {
    id: 10,
    question: "What is the purpose of conducting incident response drills?",
    options: [
      "To create more incidents for practice",
      "To test and improve response procedures",
      "To evaluate employee performance",
      "To satisfy compliance requirements only"
    ],
    correctAnswer: 1,
    explanation: "Incident response drills help teams practice procedures, identify gaps, and improve response times in a controlled environment. They're essential for maintaining readiness."
  },
  {
    id: 11,
    question: "When should you declare an incident?",
    options: [
      "Only when customers complain",
      "When there's any deviation from normal operation that impacts users",
      "Only during business hours",
      "After trying to fix it yourself for 30 minutes"
    ],
    correctAnswer: 1,
    explanation: "Incidents should be declared whenever there's a deviation from normal operation that impacts or could impact users. Early declaration enables faster resolution and proper tracking."
  },
  {
    id: 12,
    question: "What is the primary benefit of automation in incident response?",
    options: [
      "Replacing the need for on-call engineers",
      "Reducing human error and response time",
      "Eliminating all incidents",
      "Avoiding post-mortems"
    ],
    correctAnswer: 1,
    explanation: "Automation reduces human error and response time by handling routine tasks, allowing engineers to focus on complex problem-solving. It complements, not replaces, human expertise."
  }
];