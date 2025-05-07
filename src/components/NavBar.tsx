import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const NavBar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-royal">
            Unknown IITians
          </Link>

          {!isMobile ? (
            <div className="flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/about" className="text-gray-700 hover:text-royal">
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/courses" className="text-gray-700 hover:text-royal">
                      Courses
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/exam-preparation" className="text-gray-700 hover:text-royal">
                      Exam Prep
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/career" className="text-gray-700 hover:text-royal">
                      Career
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/auth" className="text-gray-700 hover:text-royal">
                      Auth
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button asChild>
                <Link to="/auth">Login/Signup</Link>
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/auth">Menu</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
