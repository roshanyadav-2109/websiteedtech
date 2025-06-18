import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin, Mail, MessageSquare, Send, MessageCircle } from "lucide-react";

const Footer = () => {
  const handleOpenContactForm = () => {
    window.dispatchEvent(new CustomEvent('openContactForm'));
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="/lovable-uploads/logo_ui_new.png"
              alt="unknown iitians logo"
              className="h-12 w-auto mb-4" // Adjust height as needed for footer
            />
            <p className="mb-4">
              Transforming education by providing high-quality resources and mentorship to students preparing for competitive exams.
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

export default Footer;
