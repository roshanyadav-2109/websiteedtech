import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, Users, GraduationCap, Network } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

type Testimonial = {
  content: string;
  name: string;
  course: string;
  rating?: number;
  achievement?: string;
};

const testimonialsData = [
  {
    text: "I’ve always had trouble with maths. Group classes used to make me feel even more behind. But here, I could go topic by topic and understand at my own pace. It was simple, but powerful. I wish I had found this earlier.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    name: "Saket",
    role: "JEE Preparation",
  },
  {
    text: "I didn’t do well in JEE the first time and felt stuck. I needed something that didn’t feel overwhelming. This website gave me just that. It felt calm, clear, and like a fresh start. I actually enjoy studying again.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Moksha",
    role: "JEE Preparation",
  },
  {
    text: "This platform just made everything easier. No ads, no complicated logins. I could find my subject, download the notes, and get started. One of my Kota teachers suggested it and now I tell all my friends too.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Harshita",
    role: "NEET Preparation",
  },
  {
    text: "I used to waste hours scrolling through Telegram groups looking for notes. Now, I don’t have to. Everything’s here, well arranged, and accurate. It’s like someone finally understood what we students really need.",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Tarun",
    role: "NEET Preparation",
  },
  {
    text: "Preparing for both exams used to drain me out. I didn’t know where to start or what to focus on. This site gave me a direction. I followed their study plans and just trusted the process. It worked.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Ananya",
    role: "JEE & NEET Preparation",
  },
  {
    text: "I come from a non-maths background, so the thought of even attempting the qualifier gave me anxiety. But once I joined the classes, things actually started making sense. The way they explained every small step made me feel included, not behind. I genuinely didn’t think I’d pass, but I did.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Aanya",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I started preparing just using their free videos and notes. A week later, I joined the batch and things got even better. The teachers actually cared about what we understood. For the first time, I didn’t feel like I was studying alone.",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    name: "Riya",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I’m from a non-maths background and honestly, I was scared. But the way the teachers approached maths made it so doable. The regular practice and tips actually helped me enjoy solving things.",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    name: "Yash",
    role: "IITM BS - Qualifier",
  },
  {
    text: "I’ve always struggled to stay consistent, but the way the classes were scheduled helped me build a routine. The notes were easy to refer to, especially before deadlines. It felt like everything I needed was already thought of and kept ready for me.",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    name: "Kriti",
    role: "IITM BS - Foundation",
  },
  {
    text: "Joining the classes was a good decision for me. But what made the real difference were the tools and notes. I could revise on my own between classes, and I didn’t feel lost like I usually do.",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    name: "Raghav",
    role: "IITM BS - Foundation",
  },
  {
    text: "I’m working alongside studying, so I didn’t have time to attend live lectures regularly. But their content was always updated and clear. I could watch what I needed, when I needed it, and that made a huge difference.",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    name: "Siddharth",
    role: "IITM BS - Foundation",
  },
  {
    text: "I work full-time, so I couldn’t commit to live classes. Still, the notes and tools on the website were more than enough. I didn’t need to waste time searching anywhere else. Everything was clear, simple, and exactly what I needed to stay on track.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    name: "Divya",
    role: "IITM BS - Diploma",
  },
  {
    text: "I was just looking for good-quality notes and I ended up using almost everything they had. The mock tests helped me figure out what I was missing and I didn’t need to use any other source after that.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Priya",
    role: "IITM BS - Diploma",
  },
  {
    text: "I didn’t attend any classes. I just used their free notes, previous year questions, and mock tests. And even then, I felt more confident this term than I ever have. Everything was neatly arranged and easy to access.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Arjun",
    role: "IITM BS - Diploma",
  },
  {
    text: "At first, I thought I’d have to buy a bunch of courses. But the resources here were already enough. The layout of the syllabus, exam tips, and short revision notes helped me sail through without any extra pressure.",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    name: "Tanya",
    role: "IITM BS - Diploma",
  },
];

const firstColumn = testimonialsData.slice(0, 5);
const secondColumn = testimonialsData.slice(5, 10);
const thirdColumn = testimonialsData.slice(10, 15);

const TestimonialsSection = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg font-semibold text-royal">Testimonials</div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our community has to say about Unknown IITians.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
