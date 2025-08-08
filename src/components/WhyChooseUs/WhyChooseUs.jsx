import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const WhyChooseUs = () => {
  return (
    <div className="w-full px-4 py-10 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://i.ibb.co.com/Kx9gnRs7/schedule-8744592-1280.jpg"
            alt="Library"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-[#2563EB] mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Our digital library platform offers a seamless reading experience
            for book lovers of all ages. Whether you’re a student, researcher,
            or casual reader, we provide a curated selection of books that are
            easy to find, borrow, and track. With a responsive, user-friendly
            interface and secure system, your reading journey has never been
            smoother!
          </p>
          <ul className="space-y-3 text-gray-800 text-base">
            <li>
              <FaCheckCircle className="inline text-green-500 mr-2" />
              Over 10,000+ books from various genres
            </li>
            <li>
              <FaCheckCircle className="inline text-green-500 mr-2" />
              Mobile-first & responsive design
            </li>
            <li>
              <FaCheckCircle className="inline text-green-500 mr-2" />
              Real-time book availability & tracking
            </li>
            <li>
              <FaCheckCircle className="inline text-green-500 mr-2" />
              Safe, fast, and secure platform
            </li>
            <li>
              <FaCheckCircle className="inline text-green-500 mr-2" />
              Personalized recommendations
            </li>
          </ul>
          <Link to="/login">
            <button className="mt-6 px-6 py-3 bg-[#2563EB] text-white rounded-md hover:bg-[#1D4ED8] transition duration-300">
              Start Your Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
