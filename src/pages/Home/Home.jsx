import React from "react";
import Banner from "./Banner";
import Partners from "./Partners";
import PopularClasses from "./PopularClasses";
import FeedbackSection from "./FeedbackSection";
import SiteSummarySection from "./SiteSummarySection";
import BecomeInstructorSection from "./BecomeInstructorSection";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      {/* banner section */}
      <Banner></Banner>
      {/* Partners section */}
      <Partners></Partners>
      {/* Highlight 3-6  classes or courses that are currently popular. */}
      <PopularClasses></PopularClasses>

      {/* feedback section */}
      <FeedbackSection></FeedbackSection>
      {/*  summery of the website  */}
      <SiteSummarySection></SiteSummarySection>
      {/*  section for inspiring  teachers  to join your website*/}
      <BecomeInstructorSection></BecomeInstructorSection>
      {/* Two extra section */}
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
    </>
  );
};

export default Home;
