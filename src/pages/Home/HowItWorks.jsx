const HowItWorks = () => {
  const steps = [
    {
      title: "1. Create Your Account",
      description:
        "Sign up as a student or instructor. Get personalized access to your dashboard instantly.",
      icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
    },
    {
      title: "2. Enroll or Teach Classes",
      description:
        "Students can explore and enroll in classes. Instructors can create and manage courses easily.",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    },
    {
      title: "3. Interact & Submit",
      description:
        "Students complete assignments, submit evaluations. Instructors provide feedback and grades.",
      icon: "https://cdn-icons-png.flaticon.com/512/2583/2583342.png",
    },
    {
      title: "4. Track Your Progress",
      description:
        "Use dashboards to monitor submissions, feedback, enrollments, and overall learning journey.",
      icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          How EduManage Works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Whether you're here to learn or to teach, EduManage makes everything
          simple and powerful.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
            >
              <img
                src={step.icon}
                alt={step.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
