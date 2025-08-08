import { useState } from "react";

const faqData = [
  {
    question: "How can I borrow a book from this library?",
    answer: "To borrow a book, go to the book details page and click on the 'Borrow' button. Then fill in your information and select a return date.",
  },
  {
    question: "What happens if a book is out of stock?",
    answer: "If a book's quantity is 0, it will be shown as unavailable. You won’t be able to borrow it until it’s restocked.",
  },
  {
    question: "How do I return a borrowed book?",
    answer: "Go to your profile or borrowed books section and click the 'Return' button. The book will be marked as returned and quantity will update.",
  },
  {
    question: "Can I update my profile information?",
    answer: "Yes, go to the 'Profile' page, update your name or photo, and click the 'Update Profile' button. Changes will be saved to both Firebase and the database.",
  },
  {
    question: "What is the benefit of a premium subscription?",
    answer: "Premium users can read exclusive articles, post unlimited content, and enjoy ad-free reading experience.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-5 mb-10">
      <h2 className="text-3xl font-bold text-center mb-10">📚 Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm bg-white"
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full flex justify-between hover:cursor-pointer items-center p-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50"
            >
              {item.question}
              <span className="text-2xl transition-transform duration-300">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 transition-all duration-300 ease-in-out">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
