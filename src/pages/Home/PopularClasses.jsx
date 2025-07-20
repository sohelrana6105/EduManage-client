import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import UseAxios from "../../hooks/UseAxios";
import UseUserRole from "../../hooks/UseUserRole";
import { useNavigate } from "react-router";
import { FaDollarSign, FaFire, FaUserCheck } from "react-icons/fa";

const PopularClasses = () => {
  const axiosInstance = UseAxios();
  const [popularClasses, setPopularClasses] = useState([]);

  const { role } = UseUserRole();
  const navigate = useNavigate();

  console.log(popularClasses);

  useEffect(() => {
    axiosInstance
      .get("/popular-classes")
      .then((res) => setPopularClasses(res.data));
  }, [axiosInstance]);

  return (
    <div className="my-10 px-4 md:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaFire className="text-red-500" />
        Popular Classes
      </h2>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {popularClasses.map((cls) => (
          <SwiperSlide key={cls._id}>
            <div className="bg-white h-[280px] md:h-[360px] flex flex-col rounded-xl overflow-hidden shadow-md border">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-28 md:h-32 object-cover" // Image height কমানো হয়েছে
              />
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                  {cls.title}
                </h3>

                <p className="text-xs text-gray-700 mb-1 line-clamp-1">
                  <strong>Instructor:</strong> {cls.instructorName}
                </p>

                <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                  <strong>Email:</strong> {cls.instructorEmail}
                </p>

                <div className="relative group w-fit">
                  <p className="text-xs text-gray-500 mb-3">
                    {cls.description.split(" ").slice(0, 10).join(" ")}...
                  </p>
                  {/* Custom Tooltip */}
                  <span className="absolute hidden group-hover:block bg-black text-white text-xs rounded p-2 w-52 z-10 top-full left-0 mt-1 shadow-md">
                    {cls.description}
                  </span>
                </div>

                <div className="flex  justify-between items-center">
                  <p className="text-green-600 font-bold text-base mb-3 flex items-center gap-1">
                    <FaDollarSign /> {cls.price}
                  </p>
                  <p className="text-green-600 font-bold text-base mb-3 flex items-center gap-1">
                    <FaUserCheck /> {cls.enrolled}
                  </p>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`allclass/class/${cls._id}`)}
                    disabled={role === "admin" || role === "teacher"}
                    className={`w-full text-white text-sm font-semibold py-2 rounded-lg shadow-md transition-all duration-300
                        ${
                          role === "admin" || role === "teacher"
                            ? "bg-gray-400 opacity-60 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 hover:shadow-lg"
                        }`}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularClasses;
