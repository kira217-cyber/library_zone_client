import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUserFriends, FaBook, FaBookReader, FaThumbsUp } from "react-icons/fa";

const stats = [
  { id: 1, label: "Active Users", value: 2500, icon: <FaUserFriends className="text-3xl text-[#2563EB]" /> },
  { id: 2, label: "Books Available", value: 1200, icon: <FaBook className="text-3xl text-[#2563EB]" /> },
  { id: 3, label: "Books Borrowed", value: 980, icon: <FaBookReader className="text-3xl text-[#2563EB]" /> },
  { id: 4, label: "Positive Feedback", value: 870, icon: <FaThumbsUp className="text-3xl text-[#2563EB]" /> },
];

const Review = () => {
  return (
    <div className="py-16 px-4 md:px-10 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#2563EB]">
        What People Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className="bg-white rounded-xl shadow-lg p-6 text-center min-h-[240px] flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className="mb-4">{stat.icon}</div>

            {/* CountUp Number */}
            <h3 className="text-4xl font-extrabold text-[#2563EB]">
              <CountUp end={stat.value} duration={20}>
                {({ countUpRef }) => (
                  <span>
                    <span ref={countUpRef} />+
                  </span>
                )}
              </CountUp>
            </h3>

            {/* Label */}
            <p className="text-xl font-bold text-gray-700 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Review;
