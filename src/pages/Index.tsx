
import React from "react";
import NavBar from "@/components/NavBar";
import HeroCarousel from "@/components/HeroCarousel";
import WelcomeSection from "@/components/WelcomeSection";
import CategoriesSection from "@/components/CategoriesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ResourceHubSection from "@/components/ResourceHubSection";
import PartnershipsSection from "@/components/PartnershipsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturedRecommendees from "@/components/FeaturedRecommendees";
import VideoSection from "@/components/VideoSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";

const Index = () => {
  return (
    <>
      <NavBar />
      <HeroCarousel />
      <WelcomeSection />
      <CategoriesSection />
      <WhyChooseUsSection />
      <ResourceHubSection />
      <PartnershipsSection />
      <TestimonialsSection />
      <FeaturedRecommendees />
      <VideoSection />
      <NewsletterSection />
      <Footer />
      <EmailPopup />
    </>
  );
};

export default Index;
