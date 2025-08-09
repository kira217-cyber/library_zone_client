import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1470&q=80",
    title: "Explore Endless Stories",
    text: "Discover a world of knowledge and imagination in every book.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1470&q=80",
    title: "Start Your Book Journey",
    text: "Join the community of readers, thinkers, and dreamers.",
  },
  {
    image:
      "https://i.ibb.co/0VRntBC3/photo-1521587760476-6c12a4b040da.jpg",
    title: "Fuel Your Curiosity",
    text: "Dive into our vast collection across genres and eras.",
  },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[80vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Full overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text container with solid semi-transparent background */}
              <div className="relative z-10 text-center text-white px-6 max-w-2xl bg-black/70 rounded-lg p-6 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6">{slide.text}</p>
                <button
                  onClick={() => navigate("/allBooks")}
                  className="bg-white hover:cursor-pointer text-[#2563EB] font-semibold px-6 py-3 rounded-full hover:bg-[#2563EB] hover:text-white transition"
                >
                  All Books
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
