
import React from "react";
import TransparentNavBar from "@/components/TransparentNavBar";
import HeroCarousel from "@/components/HeroCarousel";
import WelcomeSection from "@/components/WelcomeSection";
import CategoriesSection from "@/components/CategoriesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ResourceHubSectionUpdated from "@/components/ResourceHubSectionUpdated";
import PartnershipsSection from "@/components/PartnershipsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoSection from "@/components/VideoSection";
import FooterWithNewsletter from "@/components/FooterWithNewsletter";

const Index = () => {
  return (
    <>
      <TransparentNavBar />
      <HeroCarousel />
      <WelcomeSection />
      <CategoriesSection />
      <WhyChooseUsSection />
      <ResourceHubSectionUpdated />
      <PartnershipsSection />
      <TestimonialsSection />
      <VideoSection />
      <FooterWithNewsletter />
    </>
  );
};

export default Index;
