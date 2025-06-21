import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
    isScrolled?: boolean;
    isLoaded?: boolean;
  }
>(({ className, children, isScrolled = false, isLoaded = true, ...props }, ref) => (
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled
      ? 'bg-black/95 backdrop-blur-md shadow-lg py-3' 
      : 'bg-transparent py-4'
  } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
    <div className="container mx-auto px-4">
      <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-full flex-1 items-center justify-between",
          className
        )}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </NavigationMenuPrimitive.Root>
    </div>
  </nav>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> & {
    position?: 'left' | 'center' | 'right';
    isLoaded?: boolean;
    delay?: number;
  }
>(({ className, position = 'center', isLoaded = true, delay = 0, ...props }, ref) => {
  const positionClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
  };

  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "group flex flex-1 list-none items-center space-x-8",
        positionClasses[position],
        `transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    />
  )
})
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group relative inline-flex h-10 w-max items-center justify-center text-white font-medium text-sm tracking-wide transition-all duration-300 hover:text-red-500 focus:text-red-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:text-red-500 data-[state=open]:text-red-500"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    isLoaded?: boolean;
    delay?: number;
    isActive?: boolean;
  }
>(({ className, children, isLoaded = true, delay = 0, isActive = false, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      navigationMenuTriggerStyle(), 
      "group px-0 py-2",
      `transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`,
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
    <span className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${
      isActive ? 'w-full' : 'w-0'
    }`}></span>
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto bg-black/95 backdrop-blur-md border border-white/20 shadow-lg",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & {
    isLoaded?: boolean;
    delay?: number;
    isActive?: boolean;
  }
>(({ className, isLoaded = true, delay = 0, isActive = false, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      "group relative text-white font-medium text-sm tracking-wide transition-all duration-300 hover:text-red-500 focus:text-red-500 focus:outline-none",
      `transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`,
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
    {...props}
  >
    {props.children}
    <span className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${
      isActive ? 'w-full' : 'w-0'
    }`}></span>
  </NavigationMenuPrimitive.Link>
))
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-white/20 bg-black/95 backdrop-blur-md text-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-red-500 shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

// Logo Component for consistency
const NavigationMenuLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt: string;
    isLoaded?: boolean;
    delay?: number;
  }
>(({ className, src, alt, isLoaded = true, delay = 100, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn(
      `flex items-center transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`,
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
    {...props}
  >
    <img 
      src={src}
      alt={alt}
      className="h-12 w-auto filter brightness-0 invert transition-transform duration-300 hover:scale-105"
    />
  </div>
))
NavigationMenuLogo.displayName = "NavigationMenuLogo"

// User Menu Component
const NavigationMenuUser = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    userName?: string;
    userType?: string;
    onSignOut?: () => void;
    isLoaded?: boolean;
    delay?: number;
  }
>(({ className, userName, userType, onSignOut, isLoaded = true, delay = 300, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn(
      `flex items-center gap-4 transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`,
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
    {...props}
  >
    {userName && (
      <div className="text-right">
        <p className="text-white text-sm font-medium">{userName}</p>
        {userType && (
          <p className="text-gray-300 text-xs capitalize">{userType}</p>
        )}
      </div>
    )}
    {onSignOut && (
      <button
        onClick={onSignOut}
        className="text-white hover:text-red-500 transition-colors p-2 hover:bg-white/10 rounded-md"
        title="Sign Out"
      >
        <LogOut size={20} />
      </button>
    )}
  </div>
))
NavigationMenuUser.displayName = "NavigationMenuUser"

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuLogo,
  NavigationMenuUser,
}
