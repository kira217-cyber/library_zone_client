import { FaEnvelope } from "react-icons/fa";

const NewsletterSection = () => {
  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Subscribe to get the latest news, book updates, and special offers directly in your inbox.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="relative w-full sm:w-2/3">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;