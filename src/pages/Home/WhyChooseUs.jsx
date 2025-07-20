import React from "react";

const WhyChooseUs = () => {
  return (
    <div>
      <section className="py-20 bg-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Why Choose EduManage?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            We empower learners and teachers with the most efficient tools,
            flexible systems, and an inspiring environment.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                Powerful Dashboards
              </h3>
              <p className="text-gray-600">
                Teachers and students get their own clean dashboards to track
                progress, submit assignments, and manage tasks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-green-700 mb-2">
                Live Feedback & TER
              </h3>
              <p className="text-gray-600">
                Students can give real-time feedback and rate teachers via
                Teaching Evaluation Reports (TER).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">
                Secure Enrollment
              </h3>
              <p className="text-gray-600">
                Easy, safe enrollment system with class details, submissions,
                and progress monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
