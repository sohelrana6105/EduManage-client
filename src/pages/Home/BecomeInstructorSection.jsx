import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const BecomeInstructorSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        custom={0}
      >
        <h2 className="text-4xl md:text-5xl  font-extrabold text-gray-800 leading-tight">
          Become an Instructor
        </h2>
        <p className="mt-4 h-14 text-lg text-gray-600 max-w-2xl mx-auto">
          <Typewriter
            words={[
              "Share your expertise and inspire learners across the globe.Join our instructor community and unlock powerful tools, resources, and support.",
              "",
            ]}
            loop={100}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image with motion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={0.2}
        >
          <img
            src="https://img.freepik.com/free-photo/happy-handsome-man-isolated-yellow-wall_176420-51451.jpg"
            alt="Instructor"
            className="rounded-2xl shadow-2xl object-cover w-full h-auto"
          />
        </motion.div>

        {/* Text Content with motion */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={0.4}
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            Why Teach with Us?
          </h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Reach a global audience</li>
            <li>Earn passive income</li>
            <li>Access top-tier course creation tools</li>
            <li>Get dedicated instructor support</li>
          </ul>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/teachEdumanage"
              className="inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Start Teaching Today
            </NavLink>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeInstructorSection;
