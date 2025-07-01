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

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/lovable-uploads/UI_logo.png" 
                alt="Unknown IITians Logo" 
                className={`h-10 w-auto transition-all duration-300 ${
                  isScrolled ? 'brightness-100' : 'brightness-0 invert'
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/about" 
              className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
              }`}
            >
              ABOUT
            </Link>
            <Link 
              to="/courses" 
              className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
              }`}
            >
              COURSES
            </Link>
            
            {/* Exam Prep Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 flex items-center hover:bg-transparent ${
                    isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                  }`}
                >
                  EXAM PREP
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-white/20">
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation" className="uppercase font-medium">ALL EXAMS</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/jee" className="uppercase font-medium">JEE PREPARATION</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/neet" className="uppercase font-medium">NEET PREPARATION</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/exam-preparation/iitm-bs" className="uppercase font-medium">IITM BS PREPARATION</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/career" 
              className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
              }`}
            >
              CAREER
            </Link>
            
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className={`uppercase font-medium tracking-wide transition-all duration-300 hover:opacity-80 ${
                    isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                  }`}
                >
                  DASHBOARD
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/10">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                        <AvatarFallback className={`${isScrolled ? 'bg-royal text-white' : 'bg-white text-royal'}`}>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border-white/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="uppercase font-medium">DASHBOARD</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="uppercase font-medium">ADMIN PANEL</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="uppercase font-medium">
                      LOG OUT
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  className={`uppercase font-medium tracking-wide transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-royal hover:bg-royal-dark text-white' 
                      : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                  }`}
                >
                  SIGN IN
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-all duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-md border-white/20' 
                : 'bg-black/20 backdrop-blur-md border-white/10'
            }`}>
              <Link 
                to="/" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                }`}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                }`}
              >
                ABOUT
              </Link>
              <Link 
                to="/courses" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                }`}
              >
                COURSES
              </Link>
              <Link 
                to="/exam-preparation" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                }`}
              >
                EXAM PREPARATION
              </Link>
              <Link 
                to="/exam-preparation/jee" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ml-4 ${
                  isScrolled ? 'text-gray-600 hover:text-royal' : 'text-gray-200 hover:text-white'
                }`}
              >
                JEE PREP
              </Link>
              <Link 
                to="/exam-preparation/neet" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ml-4 ${
                  isScrolled ? 'text-gray-600 hover:text-royal' : 'text-gray-200 hover:text-white'
                }`}
              >
                NEET PREP
              </Link>
              <Link 
                to="/exam-preparation/iitm-bs" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ml-4 ${
                  isScrolled ? 'text-gray-600 hover:text-royal' : 'text-gray-200 hover:text-white'
                }`}
              >
                IITM BS PREP
              </Link>
              <Link 
                to="/career" 
                className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                }`}
              >
                CAREER
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                      isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    DASHBOARD
                  </Link>
                  <Link 
                    to="/admin/dashboard" 
                    className={`block px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                      isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    ADMIN PANEL
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={`block w-full text-left px-3 py-2 uppercase font-medium tracking-wide transition-all duration-300 ${
                      isScrolled ? 'text-gray-700 hover:text-royal' : 'text-white hover:text-gray-200'
                    }`}
                  >
                    SIGN OUT
                  </button>
                </>
              ) : (
                <div className="px-3 py-2">
                  <Link to="/auth">
                    <Button 
                      className={`w-full uppercase font-medium tracking-wide transition-all duration-300 ${
                        isScrolled 
                          ? 'bg-royal hover:bg-royal-dark text-white' 
                          : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
                      }`}
                    >
                      SIGN IN
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
