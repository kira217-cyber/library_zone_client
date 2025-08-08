import React from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

const reviews = [
  {
    id: 1,
    name: "Sarah J.",
    comment:
      "This library website changed how I read. So easy to borrow and track books!",
    image: "https://i.ibb.co.com/8yZWP0c/close-face-young-woman-beautiful-600nw-2121831296.webp",
  },
  {
    id: 2,
    name: "Tom H.",
    comment:
      "Excellent UI, helpful categories, and quick response. Highly recommend!",
    image: "https://i.ibb.co.com/vvHgC3Sy/raihan.png",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 px-5 md:px-16 py-12 space-y-20 mt-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-4">
          About Library Zone
        </h1>
        <p className="text-lg text-gray-700">
          Welcome to Library Zone! We’re passionate about promoting reading
          through technology. From exploring thousands of books to borrowing
          with ease, we make it simple for you to grow your knowledge.
        </p>
        <Link to="/allBooks">
          <button className="mt-6 px-6 py-2 bg-[#2563EB] text-white font-medium rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
            Explore Books <FaArrowRight className="inline ml-2" />
          </button>
        </Link>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mx-auto "
      >
        <WhyChooseUs />
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-[#2563EB] mb-10">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-6 shadow-md text-left space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#2563EB]">{review.name}</p>
                  <p className="text-sm text-gray-500">Library Member</p>
                </div>
              </div>
              <p className="text-gray-700">❝ {review.comment} ❞</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center bg-white rounded-xl shadow-xl py-12 px-6"
      >
        <h3 className="text-3xl font-bold text-[#2563EB] mb-4">
          Join Library Zone Today
        </h3>
        <p className="text-gray-700 mb-6">
          Discover the joy of reading and expand your knowledge.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/register">
            <button className="bg-[#2563EB] text-white px-6 py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer">
              Sign Up
            </button>
          </Link>
          <a href="https://en.wikipedia.org/wiki/Library" target="_blank" rel="noopener noreferrer">
            <button className="border hover:cursor-pointer border-[#2563EB] text-[#2563EB] px-6 py-2 rounded hover:bg-[#2563EB] hover:text-white transition">
              Learn More
            </button>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
