import React from "react";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About EduManage</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          EduManage is a modern educational management platform designed to
          empower teachers, engage students, and simplify class organization. We
          believe education should be accessible, dynamic, and efficient.
        </p>
      </section>

      {/* Mission */}
      <section className="py-12 px-4 bg-white text-center">
        <h2 className="text-2xl font-bold mb-3">🎯 Our Mission</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          To provide a powerful and intuitive platform where teachers can manage
          classes, students can engage in learning, and administrators can
          oversee performance — all in one place.
        </p>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          🚀 Why EduManage?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">All-in-One Dashboard</h3>
            <p>
              Students, Teachers, and Admins each get tailored dashboards for a
              seamless experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              Smooth Class Management
            </h3>
            <p>
              Create, update, and track class progress, enrollments, and
              assignments with ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
            <p>
              We use secure technologies and modern infrastructure to protect
              your data and ensure growth.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="py-12 px-4 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">👨‍💻 Meet the Developer</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-4">
          EduManage is built with passion by <strong>Sohel Rana</strong>, a
          dedicated web developer on a mission to improve educational technology
          through modern, user-focused design and functionality.
        </p>
        <p className="text-gray-500">
          MERN Stack Developer | Passionate about React, MongoDB, and improving
          digital learning.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to explore EduManage?</h2>
        <Link
          to="/allclass"
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold shadow hover:bg-gray-100 transition"
        >
          View Classes
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
