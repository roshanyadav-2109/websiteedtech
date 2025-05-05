
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
              <span className="text-white">Unknown</span>{" "}
              <span className="text-golden">IITians</span>
            </h2>
            <p className="mb-4">
              Transforming education by providing high-quality resources and mentorship to students preparing for competitive exams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
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
              <li>
                <Link to="/resources/skills" className="hover:text-white transition-colors">Skill Enhancement</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Blog & Articles</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1" />
                <a href="mailto:support@unknowniitians.com" className="hover:text-white transition-colors">
                  support@unknowniitians.com
                </a>
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
              <Link to="/employee-verification" className="text-sm hover:text-white transition-colors">Employee Verification</Link>
              <Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
