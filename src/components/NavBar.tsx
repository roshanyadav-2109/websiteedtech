
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Courses",
      href: "/courses",
    },
    {
      title: "Exam Preparation",
      href: "/exam-preparation",
      items: [
        {
          title: "JEE Preparation",
          href: "/exam-preparation/jee",
          description: "Complete JEE preparation resources and materials",
        },
        {
          title: "NEET Preparation", 
          href: "/exam-preparation/neet",
          description: "Comprehensive NEET study materials and practice tests",
        },
        {
          title: "IITM BS Program",
          href: "/exam-preparation/iitm-bs", 
          description: "Resources for IIT Madras BS degree program",
        },
      ],
    },
    {
      title: "Communities",
      href: "/communities",
    },
    {
      title: "Career",
      href: "/career",
    },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-royal">UnknownIITians</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-700 hover:text-royal transition-colors">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4">
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                                className="hover:bg-royal/5"
                              >
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="text-gray-700 hover:text-royal transition-colors px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-royal text-white">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                  <Link to="/auth">Login</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div className="space-y-1">
                      <div className="text-gray-700 font-medium px-3 py-2 text-sm">
                        {item.title}
                      </div>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="text-gray-600 hover:text-royal block px-6 py-2 text-sm"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-royal block px-3 py-2 text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-royal block px-3 py-2 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-700 hover:text-royal block px-3 py-2 text-sm font-medium"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="text-gray-700 hover:text-royal block px-3 py-2 text-sm font-medium w-full text-left"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="bg-royal hover:bg-royal-dark text-white block px-3 py-2 text-sm font-medium rounded-md mx-3"
                  >
                    Login
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
