
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState("");
  const [userSession, setUserSession] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserSession(data.session);

      if (data.session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', data.session.user.id)
          .single();

        if (profileData?.full_name) {
          setUserName(profileData.full_name);
        }
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUserSession(session);
        
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .single();

          if (profileData?.full_name) {
            setUserName(profileData.full_name);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
    });
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (menu: string) => {
    setSubmenuOpen(submenuOpen === menu ? "" : menu);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setSubmenuOpen("");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-royal">Unknown IITians</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-royal px-3 py-2 rounded-md">
              Home
            </Link>
            <div 
              className="relative group" 
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-royal px-3 py-2 rounded-md">
                <span>Exam Preparation</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div 
                className={`absolute left-0 z-10 mt-2 w-48 origin-top-left bg-white border border-gray-200 rounded-md shadow-lg ${dropdownVisible ? 'block' : 'hidden'}`}
              >
                <div className="py-1">
                  <Link 
                    to="/exam-preparation/jee" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                    onClick={() => setDropdownVisible(false)}
                  >
                    JEE
                  </Link>
                  <Link 
                    to="/exam-preparation/neet" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                    onClick={() => setDropdownVisible(false)}
                  >
                    NEET
                  </Link>
                  <Link 
                    to="/exam-preparation/iitm-bs" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-royal"
                    onClick={() => setDropdownVisible(false)}
                  >
                    IITM BS
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/courses" className="text-gray-700 hover:text-royal px-3 py-2 rounded-md">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-royal px-3 py-2 rounded-md">
              About
            </Link>
            <Link to="/career" className="text-gray-700 hover:text-royal px-3 py-2 rounded-md">
              Career
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {userSession ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <Avatar className="h-8 w-8 bg-royal text-white">
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    {userName || "User"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/auth" 
                className="inline-flex items-center justify-center rounded-md bg-royal px-4 py-2 text-sm font-medium text-white hover:bg-royal-dark"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
              onClick={closeMenu}
            >
              Home
            </Link>

            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
                onClick={() => toggleSubmenu("examPrep")}
              >
                <span>Exam Preparation</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {submenuOpen === "examPrep" && (
                <div className="pl-4 space-y-1 mt-1">
                  <Link
                    to="/exam-preparation/jee"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    JEE
                  </Link>
                  <Link
                    to="/exam-preparation/neet"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    NEET
                  </Link>
                  <Link
                    to="/exam-preparation/iitm-bs"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    IITM BS
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
              onClick={closeMenu}
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
              onClick={closeMenu}
            >
              About
            </Link>
            
            <Link
              to="/career"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-royal hover:bg-gray-100"
              onClick={closeMenu}
            >
              Career
            </Link>

            {userSession ? (
              <div className="pt-2 border-t">
                <div className="px-3 py-2 text-sm font-medium">
                  {userName || "User"}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 rounded-md text-red-500 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="block mt-2 px-3 py-2 bg-royal text-white rounded-md"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
