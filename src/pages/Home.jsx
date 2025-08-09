import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import ExtraSection from "../components/ExtraSection/ExtraSection";
import ExtraSection2 from "../components/ExtraSection/ExtraSection2";
import Review from "../components/Review/Review";
import FAQSection from "../components/FAQSection/FAQSection";
import NextDestination from "../components/NextDestination/NextDestination";
import NewsletterSection from "../components/NewsletterSection/NewsletterSection";
import useAuth from "../hooks/useAuth";


const Home = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // প্রথমবার ভিজিট করলে ১০ সেকেন্ড পরে সাবস্ক্রাইব ব্যানার দেখাবে (শুধু যদি user লগইন না থাকে)
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowSubscribe(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleSubscribe = () => {
    navigate("/register");
  };

  const handleCancel = () => {
    setShowSubscribe(false);
  };

  return (
    <div className="pt-10 relative">
      <Banner />
      <Categories />
      <ExtraSection />
      <ExtraSection2 />
      <NextDestination />
      <Review />
      <FAQSection />
      <NewsletterSection />

      {/* Subscribe Banner */}
      {showSubscribe && !user && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="relative rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-[#2563EB]"
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #26A69A 100%)",
              color: "#fff",
            }}
          >
            {/* Cancel Icon */}
            <button
              onClick={handleCancel}
              className="absolute top-3 right-3 hover:cursor-pointer text-white text-2xl font-bold hover:text-red-400 transition"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-3">
              Join Library Zone!
            </h2>
            <p className="mb-4 text-base">
              Unlock exclusive access to thousands of books, reviews, and community features.<br />
              Subscribe now and start your reading journey!
            </p>
            <button
              onClick={handleSubscribe}
              className="bg-white text-[#2563EB] px-6 py-2 rounded font-semibold hover:bg-gray-200 transition hover:cursor-pointer"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;