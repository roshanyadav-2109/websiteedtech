import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useAuth } from "@/lib/auth";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showMobileExamDropdown, setShowMobileExamDropdown] = useState(false);
  const examDropdownRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  
  const handleClickOutside = (event: MouseEvent) => {
    if (examDropdownRef.current && !examDropdownRef.current.contains(event.target as Node)) {
      setShowExamDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 bg-royal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold">
                Unknown IITians
              </Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-4 items-center">
              <Link to="/" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/courses" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </Link>
              
              {/* Dropdown for Exam Preparation */}
              <div className="relative" ref={examDropdownRef}>
                <button
                  onClick={() => setShowExamDropdown(!showExamDropdown)}
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  Exam Preparation
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showExamDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/exam-preparation/neet" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowExamDropdown(false)}
                    >
                      NEET
                    </Link>
                    <Link 
                      to="/exam-preparation/jee" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowExamDropdown(false)}
                    >
                      JEE
                    </Link>
                    <Link 
                      to="/exam-preparation/iitm-bs" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowExamDropdown(false)}
                    >
                      IIT-M BS
                    </Link>
                  </div>
                )}
              </div>
              
              {user && (
                <Link to="/career" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Career
                </Link>
              )}

              {user && (
                <Link to="/dashboard" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          
          {/* Button Section */}
          <div className="hidden md:flex items-center">
            <LoginButton />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
            >
              <svg 
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-royal-dark`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/courses" 
            className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </Link>
          <button
            onClick={() => setShowMobileExamDropdown(!showMobileExamDropdown)}
            className="text-white hover:text-gray-200 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
          >
            Exam Preparation
            <svg className={`h-4 w-4 transform ${showMobileExamDropdown ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showMobileExamDropdown && (
            <div className="pl-4 border-l-2 border-royal-light ml-3">
              <Link 
                to="/exam-preparation/neet" 
                className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NEET
              </Link>
              <Link 
                to="/exam-preparation/jee" 
                className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JEE
              </Link>
              <Link 
                to="/exam-preparation/iitm-bs" 
                className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                IIT-M BS
              </Link>
            </div>
          )}
          {user && (
            <Link 
              to="/career" 
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Career
            </Link>
          )}
          {user && (
            <Link 
              to="/dashboard" 
              className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <div className="pt-2">
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
