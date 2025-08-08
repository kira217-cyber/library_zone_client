import React from "react";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import ExtraSection from "../components/ExtraSection/ExtraSection";
import ExtraSection2 from "../components/ExtraSection/ExtraSection2";
import Review from "../components/Review/Review";
import FAQSection from "../components/FAQSection/FAQSection";
import NextDestination from "../components/NextDestination/NextDestination";

const Home = () => {
  return (
    <div className="pt-10">
      <Banner></Banner>
      <Categories></Categories>
      <ExtraSection></ExtraSection>
      <ExtraSection2></ExtraSection2>
      <NextDestination></NextDestination>
      <Review></Review>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
