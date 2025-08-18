import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const items = [
    // List of features
    {
      title: "Powerful Dashboards",
      desc: "Teachers and students get their own clean dashboards to track progress, submit assignments, and manage tasks.",
      bg: "bg-blue-50",
      color: "text-blue-700",
      delay: 0.3,
    },
    {
      title: "Live Feedback & TER",
      desc: "Students can give real-time feedback and rate teachers via Teaching Evaluation Reports (TER).",
      bg: "bg-green-50",
      color: "text-green-700",
      delay: 0.6,
    },
    {
      title: "Secure Enrollment",
      desc: "Easy, safe enrollment system with class details, submissions, and progress monitoring.",
      bg: "bg-yellow-50",
      color: "text-yellow-700",
      delay: 0.9,
    },
  ];
  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose EduManage?
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          We empower learners and teachers with the most efficient tools,
          flexible systems, and an inspiring environment.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {items.map((feature, i) => (
            <motion.div
              key={i}
              className={`${feature.bg} p-6 rounded-xl shadow hover:shadow-xl transition duration-300`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-xl font-bold ${feature.color} mb-2`}>
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
