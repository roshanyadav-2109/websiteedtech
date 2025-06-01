
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Menu, X, ChevronDown } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-royal">
              UNKNOWN IITIANS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-royal transition-colors ${
                  location.pathname === "/" ? "text-royal" : "text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-royal transition-colors ${
                  location.pathname === "/about" ? "text-royal" : "text-gray-900"
                }`}
              >
                About
              </Link>
              
              {/* Exam Preparation Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:text-royal transition-colors flex items-center ${
                    location.pathname.includes("/exam-preparation") ? "text-royal" : "text-gray-900"
                  }`}
                >
                  Exam Preparation
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/exam-preparation/jee"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        JEE Preparation
                      </Link>
                      <Link
                        to="/exam-preparation/neet"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        NEET Preparation
                      </Link>
                      <Link
                        to="/exam-preparation/iitm-bs"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        IITM BS Preparation
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/courses"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-royal transition-colors ${
                  location.pathname === "/courses" ? "text-royal" : "text-gray-900"
                }`}
              >
                Courses
              </Link>
              <Link
                to="/career"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-royal transition-colors ${
                  location.pathname === "/career" ? "text-royal" : "text-gray-900"
                }`}
              >
                Career
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {isAuthenticated === null ? (
              <div className="animate-pulse">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            ) : isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-royal border-royal hover:bg-royal hover:text-white"
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button className="bg-royal hover:bg-royal-dark text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-royal focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-royal"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-royal"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Exam Preparation Links */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-600">Exam Preparation</div>
                <Link
                  to="/exam-preparation/jee"
                  className="block px-6 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-royal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  JEE Preparation
                </Link>
                <Link
                  to="/exam-preparation/neet"
                  className="block px-6 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-royal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NEET Preparation
                </Link>
                <Link
                  to="/exam-preparation/iitm-bs"
                  className="block px-6 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-royal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  IITM BS Preparation
                </Link>
              </div>

              <Link
                to="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-royal"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/career"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-royal"
                onClick={() => setIsMenuOpen(false)}
              >
                Career
              </Link>
              
              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2">
                {isAuthenticated === null ? (
                  <div className="animate-pulse">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                ) : isAuthenticated ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full text-royal border-royal hover:bg-royal hover:text-white"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
