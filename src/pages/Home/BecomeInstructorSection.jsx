import React from "react";

const BecomeInstructorSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Become an instructor
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <img
            src="https://img.freepik.com/free-photo/happy-handsome-man-isolated-yellow-wall_176420-51451.jpg"
            alt="Instructor"
            className="rounded-xl shadow-xl object-cover w-full"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            Share your knowledge with the world. Join our teaching community and
            inspire the next generation of learners. We provide you with tools,
            resources, and support.
          </p>
          <button className="px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition duration-300">
            Start teaching today
          </button>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorSection;
