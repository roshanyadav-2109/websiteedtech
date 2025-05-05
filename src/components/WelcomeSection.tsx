
import React from "react";
import { Button } from "@/components/ui/button";

const WelcomeSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-royal">Unknown</span>{" "}
              <span className="text-golden">IITians</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We are a premium educational platform dedicated to helping students excel in JEE, NEET, 
              and IIT Madras BS degree programs. Our resources are curated by IIT students to provide 
              you with the highest quality education and mentorship.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're preparing for competitive exams or looking to enhance your skills, 
              we're here to guide you every step of the way on your educational journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-premium">Explore Resources</Button>
              <Button variant="outline" className="border-royal text-royal hover:bg-royal/5">
                Join Our Community
              </Button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-premium animate-scale-in">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              alt="Students learning together"
              className="w-full h-auto object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
