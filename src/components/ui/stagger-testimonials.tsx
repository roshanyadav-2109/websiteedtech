"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "I was literally crying over linear algebra matrices in my first term. Found your YouTube channel at 2 AM during exam prep and honestly, it saved my semester! Week 7 sequences and limits finally made sense after watching your Foundation batch. Got 85% in my linear algebra exam. My parents still can't believe it! Thank you so much sir, you're a lifesaver 🙏",
    by: "Priya Sharma, Foundation Level - Maths"
  },
  {
    tempId: 1,
    testimonial: "Bro, I failed the qualifier three times because of maths difficulty. I was about to give up on IIT Madras BS completely. Then found your Qualifier batch covering Weeks 1-4. The way you explain categorical data in Week 2 and numerical data in Week 3 is incredible! Finally passed on my 4th attempt with good marks. Your structured approach saved my academic career! 💪",
    by: "Arif Ahmed, Qualifier Batch - Statistics"
  },
  {
    tempId: 2,
    testimonial: "Honestly, I'll be real - Vaibhav sir seemed super strict and difficult initially when I started CT. Week 1-2 with variables and iterations felt overwhelming, and I used to complain about his teaching style. But my friend told me to stick with it. By Week 9 when we reached backtracking and recursion, I realized his tough approach was actually building my foundation rock solid! 🚀",
    by: "Ananya Gupta, Foundation Level - CT"
  },
  {
    tempId: 3,
    testimonial: "I'm working full-time and doing IIT Madras BS part-time. Your lectures fit perfectly into my schedule. The way you build from Week 1 set theory to Week 9 integrals in Maths is incredible. Week 4 polynomial graphs became my favorite topic after your explanation. I went from failing maths to actually enjoying calculus! 📈",
    by: "Rohit Patel, Foundation Maths + Statistics"
  },
  {
    tempId: 4,
    testimonial: "Sir, your statistics course in the Qualifier batch is pure magic. Week 1-4 content from basic data types to association between variables in Week 4 gave me such a strong foundation. I used to get panic attacks before every stats exam. Now I actually enjoy solving problems with measures of central tendency! Scored 89% in my recent term exam 📊",
    by: "Kavya Reddy, Qualifier Level - Statistics"
  },
  {
    tempId: 5,
    testimonial: "Found your channel through a Reddit recommendation and WOW! Week 2 straight lines and Week 3 quadratic functions explanations are crystal clear. I'm doing IIT Madras BS while working, and your structured batch content helped me understand coordinate geometry completely. The slope calculations that used to confuse me are now so easy! 📐",
    by: "Vikram Singh, Foundation Batch - Maths"
  },
  {
    tempId: 6,
    testimonial: "Failed qualifier twice due to maths problems. Was losing hope completely. Your Week 1-2 content on data types and categorical data helped me build confidence slowly. Week 3 numerical data and Week 4 association concepts finally clicked! Passed qualifier on 3rd attempt. Forever grateful for your clear explanations! 🎯",
    by: "Sneha Iyer, Qualifier Statistics"
  },
  {
    tempId: 7,
    testimonial: "The combination of your CT and Maths foundation courses is unbeatable! Week 5 functions in Maths and Week 5 lists in CT complement each other perfectly. Your teaching methodology makes complex concepts seem simple. Went from struggling student to helping my classmates 🤝",
    by: "Fatima Khan, Foundation CT + Maths"
  },
  {
    tempId: 8,
    testimonial: "Week 8 derivatives and tangents seemed impossible until I found your lectures. The way you explain L'Hôpital's rule and critical points is mind-blowing! I was scoring barely 40% in calculus before. After your Foundation batch, got 87% in my recent exam. My friends keep asking for your channel link! 🔗",
    by: "Aditya Joshi, Foundation Maths"
  },
  {
    tempId: 9,
    testimonial: "Struggled with qualifier for months. Your Week 4 content on association between two variables saved me! The scatterplot and correlation coefficient explanations are so clear. Finally understood what Pearson correlation actually means. Passed qualifier with 78% - never thought it was possible! 📈",
    by: "Divya Nair, Qualifier Statistics"
  },
  {
    tempId: 10,
    testimonial: "Took Foundation batches for all three subjects - best decision ever! Week 6 logarithmic functions in Maths, Week 6 permutations in Stats, and Week 6 tables in CT - all perfectly synchronized. Your teaching style across subjects maintains the same quality. Working professional doing degree part-time, and this fits perfectly! ⚡",
    by: "Karan Agarwal, Foundation Level - All Subjects"
  },
  {
    tempId: 11,
    testimonial: "Week 10 graph theory algorithms completely changed my perspective on mathematics! BFS, DFS, and Dijkstra's algorithm explanations are next level. Coming from non-CS background, I was terrified of these topics. Now I'm actually enjoying algorithmic thinking 🧠",
    by: "Omar Siddiqui, Foundation Maths"
  },
  {
    tempId: 12,
    testimonial: "Failed qualifier twice, was devastated. Your Week 1 introduction to data types gave me hope again. The way you differentiate between descriptive and inferential statistics in simple terms is amazing. Week 2 categorical data became my strength. Finally passed and now confidently moving to Foundation level! 🎉",
    by: "Meera Krishnan, Qualifier Statistics"
  },
  {
    tempId: 13,
    testimonial: "Week 11 content on message passing and multithreading blew my mind! The way you explain race conditions and deadlocks with real examples makes everything crystal clear. Other providers just throw technical terms, but your approach makes complex CS concepts feel natural 💻",
    by: "Arjun Mishra, Foundation CT"
  },
  {
    tempId: 14,
    testimonial: "Single mother pursuing IIT Madras BS while working. Your Foundation batches are my lifeline! Week 12 content across all subjects perfectly prepares for term exams. The way you connect decision trees in CT with statistical concepts is brilliant. My 8-year-old daughter now thinks mommy is a computer genius! 👩‍💻",
    by: "Riya Banerjee, Foundation All Subjects"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium mb-4",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        {testimonial.testimonial}
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};