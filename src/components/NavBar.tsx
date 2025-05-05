
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-royal">Unknown</span>
              <span className="text-2xl font-bold text-golden">IITians</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-royal font-medium">
                Home
              </Link>
              <Link to="/courses" className="text-golden-dark font-medium border-b-2 border-golden">
                Courses
              </Link>
              <Link to="/exam-preparation" className="text-gray-700 hover:text-royal font-medium">
                Exam Preparation
              </Link>
              <Link to="/career" className="text-gray-700 hover:text-royal font-medium">
                Career
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-royal font-medium">
                About Us
              </Link>
              <div className="flex space-x-2">
                <Button variant="outline" className="rounded-md">
                  Login
                </Button>
                <Button className="bg-royal hover:bg-royal-dark rounded-md">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-1">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-base font-medium text-golden-dark hover:text-golden bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
              to="/exam-preparation"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Exam Preparation
            </Link>
            <Link
              to="/career"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              Career
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-royal hover:bg-gray-50 rounded-md"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <div className="flex flex-col space-y-2 mt-4 px-3">
              <Button variant="outline" className="w-full justify-center rounded-md">
                Login
              </Button>
              <Button className="w-full justify-center bg-royal hover:bg-royal-dark rounded-md">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
