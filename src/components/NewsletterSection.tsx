
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Newsletter subscription submitted");
    // You can add toast notification here
  };

  return (
    <section className="py-16 bg-gradient-to-r from-royal to-royal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Us</h2>
            <p className="text-lg text-white/80 mb-6">
              Subscribe to our newsletter to receive the latest updates, resources, and exam tips directly in your inbox.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Weekly exam tips and strategies
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Free resources and study materials
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Updates on upcoming events and workshops
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <Mail size={24} className="mr-3 text-white" />
              <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="bg-white/10 border-white/20 placeholder:text-white/50 text-white w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-white/10 border-white/20 placeholder:text-white/50 text-white w-full"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="btn-golden w-full">
                    Subscribe Now
                  </Button>
                </div>
                <p className="text-sm text-white/70 text-center mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
