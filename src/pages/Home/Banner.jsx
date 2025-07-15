import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";
import Img1 from "../../assets/online_edu.jpg";
import Img2 from "../../assets/virtual-classroom.jpg";
import Img3 from "../../assets/students-and-teacher-laptop-studying.jpg";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      src: Img1,
      heading: "Empowering Education Everywhere",
      sub: "Connect students and teachers to unlock learning opportunities.",
    },
    {
      src: Img2,
      heading: "Seamless Class Management",
      sub: "Organize, enroll, and collaborate easily on EduManage.",
    },
    {
      src: Img3,
      heading: "Join as a Teacher or Student",
      sub: "Teach your expertise or learn new skills — all in one place.",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={800}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        showArrows
      >
        {slides.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />

            {/* Overlay content */}
            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center px-4 select-none">
              <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold drop-shadow-md leading-tight">
                {item.heading}
              </h2>
              <p className="text-white mt-2 sm:mt-4 text-sm sm:text-lg max-w-xl drop-shadow-sm">
                {item.sub}
              </p>
              <button
                onClick={() => navigate("/all-classes")}
                className="mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Explore Classes
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
