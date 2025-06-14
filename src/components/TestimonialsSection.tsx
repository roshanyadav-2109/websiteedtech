import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, Users, GraduationCap, Network } from "lucide-react";

type Testimonial = {
  content: string;
  name: string;
  course: string;
  rating?: number;
  achievement?: string;
};

const testimonials: Testimonial[] = [
  {
    content: "I’ve always had trouble with maths. Group classes used to make me feel even more behind. But here, I could go topic by topic and understand at my own pace. It was simple, but powerful. I wish I had found this earlier.",
    name: "Saket",
    course: "JEE Preparation",
  },
  {
    content: "I didn’t do well in JEE the first time and felt stuck. I needed something that didn’t feel overwhelming. This website gave me just that. It felt calm, clear, and like a fresh start. I actually enjoy studying again.",
    name: "Moksha",
    course: "JEE Preparation",
  },
  {
    content: "This platform just made everything easier. No ads, no complicated logins. I could find my subject, download the notes, and get started. One of my Kota teachers suggested it and now I tell all my friends too.",
    name: "Harshita",
    course: "NEET Preparation",
  },
  {
    content: "I used to waste hours scrolling through Telegram groups looking for notes. Now, I don’t have to. Everything’s here, well arranged, and accurate. It’s like someone finally understood what we students really need.",
    name: "Tarun",
    course: "NEET Preparation",
  },
  {
    content: "Preparing for both exams used to drain me out. I didn’t know where to start or what to focus on. This site gave me a direction. I followed their study plans and just trusted the process. It worked.",
    name: "Ananya",
    course: "JEE & NEET Preparation",
  },
  {
    content: "I come from a non-maths background, so the thought of even attempting the qualifier gave me anxiety. But once I joined the classes, things actually started making sense. The way they explained every small step made me feel included, not behind. I genuinely didn’t think I’d pass, but I did.",
    name: "Aanya",
    course: "IITM BS - Qualifier",
  },
  {
    content: "I started preparing just using their free videos and notes. A week later, I joined the batch and things got even better. The teachers actually cared about what we understood. For the first time, I didn’t feel like I was studying alone.",
    name: "Riya",
    course: "IITM BS - Qualifier",
  },
  {
    content: "I’m from a non-maths background and honestly, I was scared. But the way the teachers approached maths made it so doable. The regular practice and tips actually helped me enjoy solving things.",
    name: "Yash",
    course: "IITM BS - Qualifier",
  },
  {
    content: "I’ve always struggled to stay consistent, but the way the classes were scheduled helped me build a routine. The notes were easy to refer to, especially before deadlines. It felt like everything I needed was already thought of and kept ready for me.",
    name: "Kriti",
    course: "IITM BS - Foundation",
  },
  {
    content: "Joining the classes was a good decision for me. But what made the real difference were the tools and notes. I could revise on my own between classes, and I didn’t feel lost like I usually do.",
    name: "Raghav",
    course: "IITM BS - Foundation",
  },
  {
    content: "I’m working alongside studying, so I didn’t have time to attend live lectures regularly. But their content was always updated and clear. I could watch what I needed, when I needed it, and that made a huge difference.",
    name: "Siddharth",
    course: "IITM BS - Foundation",
  },
  {
    content: "I work full-time, so I couldn’t commit to live classes. Still, the notes and tools on the website were more than enough. I didn’t need to waste time searching anywhere else. Everything was clear, simple, and exactly what I needed to stay on track.",
    name: "Divya",
    course: "IITM BS - Diploma",
  },
  {
    content: "I was just looking for good-quality notes and I ended up using almost everything they had. The mock tests helped me figure out what I was missing and I didn’t need to use any other source after that.",
    name: "Priya",
    course: "IITM BS - Diploma",
  },
  {
    content: "I didn’t attend any classes. I just used their free notes, previous year questions, and mock tests. And even then, I felt more confident this term than I ever have. Everything was neatly arranged and easy to access.",
    name: "Arjun",
    course: "IITM BS - Diploma",
  },
  {
    content: "At first, I thought I’d have to buy a bunch of courses. But the resources here were already enough. The layout of the syllabus, exam tips, and short revision notes helped me sail through without any extra pressure.",
    name: "Tanya",
    course: "IITM BS - Diploma",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 rounded-full mb-6">
            <Network className="w-8 h-8 text-royal" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Voices</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their academic journey with us and achieved their dreams
          </p>
        </div>

        <Carousel
          className="w-full max-w-6xl mx-auto"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true
            })
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="px-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-royal/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  
                  {/* Quote icon */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-10 h-10 text-royal/20" />
                    {testimonial.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-golden text-golden" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 relative flex-grow">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-1">{testimonial.name}</h4>
                      <div className="flex items-center space-x-2 text-royal">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-medium">{testimonial.course}</span>
                      </div>
                    </div>
                    {testimonial.achievement && (
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-royal to-royal-dark text-white px-4 py-2 rounded-lg text-sm font-semibold">
                          {testimonial.achievement}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
