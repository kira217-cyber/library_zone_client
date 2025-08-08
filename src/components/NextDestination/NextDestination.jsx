import React from "react";
import { Link } from "react-router";

const NextDestination = () => {
  return (
    <div className="bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-[#DBEAFE]">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
            <div className="max-w-xl mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 leading-snug">
                Discover your next <span className="text-[#2563EB]">favorite book</span> <br /> in our digital library
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                "Our library has thousands of books that you can read anytime, from any device. New books, popular authors, and your favorite topics — all in one place. Start your journey of knowledge today!"
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link
                to="/allBooks"
                className="bg-[#2563EB] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Browse Books
              </Link>
              <Link
                to="/login"
                className="border border-[#2563EB] text-[#2563EB] px-6 py-3 rounded-full font-semibold hover:bg-[#2563EB] hover:text-white transition"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="flex items-center justify-center -mx-4 lg:pl-8">
            <div className="flex flex-col items-end px-3 space-y-4">
              <img
                className="object-cover rounded shadow-lg h-28 sm:h-40 xl:h-52 w-28 sm:w-40 xl:w-52"
                src="https://i.ibb.co.com/35bK7dw4/Sept-9-Benefits-of-Group-Work-web.jpg"
                alt="library-1"
              />
              <img
                className="object-cover rounded shadow-lg h-20 sm:h-32 xl:h-40 w-20 sm:w-32 xl:w-40"
                src="https://i.ibb.co.com/vMkmgzV/image1-953x715.jpg"
                alt="library-2"
              />
            </div>
            <div className="px-3">
              <img
                className="object-cover rounded shadow-lg h-40 sm:h-64 xl:h-80 w-40 sm:w-64 xl:w-80"
                src="https://i.ibb.co.com/tp0MXHkK/istockphoto-1434742171-612x612.jpg"
                alt="library-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextDestination;
