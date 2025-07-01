
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Mail, MessageSquare, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterWithNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleOpenContactForm = () => {
    window.dispatchEvent(new CustomEvent('openContactForm'));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-royal/90 to-royal-dark/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Unknown IITians</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive the latest resources, exam tips, and exclusive offers.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-grow relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 w-full border-white/20 focus:border-white bg-white/10 text-white placeholder:text-gray-300"
              />
            </div>
            <Button type="submit" className="bg-golden hover:bg-golden/90 text-royal px-6 h-12 rounded-md font-semibold">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="/lovable-uploads/logo_ui_new.png"
              alt="unknown iitians logo"
              className="h-12 w-auto mb-4"
            />
            <p className="mb-4">
              Where true learning meets smart decision-making, we create limitless possibilities for every student's unique educational journey, empowering them to discover their passions and build meaningful careers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/unknown_iitians/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://t.me/bsdatascience_iitm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
              <a
                href="https://www.youtube.com/@UnknownIITians"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/unknown-iitians/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://whatsapp.com/channel/0029VayHsVwIiRorIdVX9n1l"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp Channel"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/exam-preparation" className="hover:text-white transition-colors">Exam Preparation</Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-white transition-colors">Career</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/distinguished-recomendees" className="hover:text-white transition-colors">Recommendations</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/exam-preparation/jee" className="hover:text-white transition-colors">JEE Resources</Link>
              </li>
              <li>
                <Link to="/exam-preparation/neet" className="hover:text-white transition-colors">NEET Resources</Link>
              </li>
              <li>
                <Link to="/exam-preparation/iitm-bs" className="hover:text-white transition-colors">IITM BS Resources</Link>
              </li>
              <li>
                <Link to="/employment-verification" className="hover:text-white transition-colors">Employment Verification</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1" />
                <a href="mailto:help.unknowniitians@gmail.com" className="hover:text-white transition-colors">
                  help.unknowniitians@gmail.com
                </a>
              </li>
              <li>
                <button onClick={handleOpenContactForm} className="hover:text-white transition-colors text-left w-full flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  <span>Contact Form</span>
                </button>
              </li>
              <li>
                <p>IIT Madras Research Park,</p>
                <p>Chennai, Tamil Nadu, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Unknown IITians. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <Link to="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/intern-verification" className="text-sm hover:text-white transition-colors">Intern Verification</Link>
              <Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithNewsletter;
