import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UseAxios from "../../hooks/UseAxios";
import { FaBook } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";

const FeedbackSection = () => {
  const axiosInstance = UseAxios();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axiosInstance.get("/feedbacks").then((res) => {
      console.log("res", res);
      setFeedbacks(res.data);
    });
  }, [axiosInstance]);
  console.log("feedbacks", feedbacks);

  return (
    <div className="bg-gray-50  py-10  my-16 px-4 md:px-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 flex  items-center justify-center">
        <MdOutlineFeedback size={50} /> Student Feedback
      </h2>

      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div className="bg-white rounded-xl border shadow p-6 max-h-[320px] flex flex-col justify-between">
              <p className="font-semibold text-primary mb-1 flex items-center gap-1">
                <FaBook className="text-blue-600" />{" "}
                {fb.classTitle || "Unknown Class"}
              </p>

              <div>
                <p className="text-gray-700 text-sm mb-4 italic line-clamp-4">
                  “{fb.feedback}”
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={
                      fb.studentImage ||
                      "https://i.ibb.co/7N2ByWTy/default-image.jpg"
                    }
                    alt={fb.studentName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{fb.studentName}</p>
                    {/* <p className="text-xs text-gray-400">{fb.studentEmail}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSection;
