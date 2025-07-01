
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const TransparentNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/lovable-uploads/UI_logo.png" 
                alt="Unknown IITians Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`uppercase font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
            }`}>
              HOME
            </Link>
            <Link to="/about" className={`uppercase font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
            }`}>
              ABOUT
            </Link>
            <Link to="/courses" className={`uppercase font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
            }`}>
              COURSES
            </Link>
            
            {/* Exam Prep Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`uppercase font-medium transition-colors flex items-center ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
                }`}>
                  EXAM PREP
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md">
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation">All Exams</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/jee">JEE Preparation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/neet">NEET Preparation</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/iitm-bs">IITM BS Preparation</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/career" className={`uppercase font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
            }`}>
              CAREER
            </Link>

            <Link to="/distinguished-recomendees" className={`uppercase font-medium transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
            }`}>
              RECOMMENDATIONS
            </Link>
            
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className={`uppercase font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
                }`}>
                  DASHBOARD
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth">
                <Button className={`uppercase font-medium ${
                  isScrolled ? 'bg-royal hover:bg-royal-dark text-white' : 'bg-golden hover:bg-golden/90 text-royal'
                }`}>
                  SIGN IN
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors focus:outline-none ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-golden'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                HOME
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                ABOUT
              </Link>
              <Link to="/courses" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                COURSES
              </Link>
              <Link to="/exam-preparation" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                EXAM PREPARATION
              </Link>
              <Link to="/career" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                CAREER
              </Link>
              <Link to="/distinguished-recomendees" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                RECOMMENDATIONS
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium">
                    DASHBOARD
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-royal uppercase font-medium"
                  >
                    SIGN OUT
                  </button>
                </>
              ) : (
                <Link to="/auth" className="block px-3 py-2">
                  <Button className="w-full bg-royal hover:bg-royal-dark text-white uppercase font-medium">
                    SIGN IN
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TransparentNavBar;
