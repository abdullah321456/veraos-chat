'use client';

import { FadeAnimation } from "@/components/atom/fade-animatation";
import { useDarkMode } from "@/lib/contexts/dark-mode-context";

type FaqItem = {
  question: string;
  answer: string;
};

const faqList: FaqItem[] = [
  {
    question: "How do I reset my password?",
    answer: `Go to the login page and click "Forgot Password." Enter your registered email address, and we'll send you instructions to reset your password.`,
  },
  {
    question: "What is a dossier?",
    answer:
      "A dossier is a comprehensive collection of records and information about a person or case, stored for investigation or reference purposes.",
  },
  {
    question: "How do I archive a report?",
    answer: `Navigate to the report you wish to archive. Click the "Archive" button at the top-right corner. You can access archived reports from the Archive section.`,
  },
  {
    question: "How can I share a dossier with my team?",
    answer: `pen the dossier and click the "Collaborate" button. Add the names or emails of your team members and set permissions accordingly.`,
  },
  {
    question: "Is my data secure on the platform?",
    answer:
      "Yes, we use advanced encryption methods to protect your data. Access is strictly controlled, and regular security audits are conducted.",
  },
];
export default function Page() {
  const { isDarkMode } = useDarkMode();
  
  const headingColor = isDarkMode ? '#FFFFFF' : '#000000';
  const questionColor = isDarkMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.8)';
  const answerColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <>
      <FadeAnimation>
        <h1 
          className="text-lg font-bold text-center my-6"
          style={{ color: headingColor }}
        >
          Commonly Asked Questions
        </h1>
        <div className="space-y-5 w-full max-w-full sm:max-w-[450px] mx-auto">
          {faqList.map((faq, index) => (
            <article key={index} className="">
              <h2 
                className="text-base font-semibold"
                style={{ color: questionColor }}
              >
                {faq.question}
              </h2>
              <p 
                className="text-xs font-normal mt-2"
                style={{ color: answerColor }}
              >
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </FadeAnimation>
    </>
  );
}

