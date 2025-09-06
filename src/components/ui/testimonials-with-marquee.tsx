import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "relative overflow-hidden",
      "bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-indigo-50/30",
      "dark:from-purple-900/10 dark:via-blue-900/10 dark:to-indigo-900/10",
      "py-16 sm:py-24 md:py-32",
      className
    )}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/10 dark:to-blue-900/10" />
      
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 text-center sm:gap-16 relative z-10">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-gray-600 dark:text-gray-300 sm:text-xl">
            {description}
          </p>
        </div>

        {/* Desktop: Two rows */}
        <div className="relative w-full overflow-hidden hidden sm:block">
          {/* First Row - Moving Left to Right */}
          <div className="flex overflow-hidden mb-6 group">
            <div className="flex shrink-0 gap-6 animate-marquee-smooth group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.slice(0, Math.ceil(testimonials.length / 2)).map((testimonial, i) => (
                  <TestimonialCard 
                    key={`row1-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right to Left */}
          <div className="flex overflow-hidden group">
            <div className="flex shrink-0 gap-6 animate-marquee-reverse-smooth group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.slice(Math.ceil(testimonials.length / 2)).map((testimonial, i) => (
                  <TestimonialCard 
                    key={`row2-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-purple-50/50 via-purple-50/30 to-transparent dark:from-purple-900/20 dark:via-purple-900/10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-purple-50/50 via-purple-50/30 to-transparent dark:from-purple-900/20 dark:via-purple-900/10" />
        </div>

        {/* Mobile: Single column with vertical scroll */}
        <div className="w-full px-4 sm:hidden">
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto scrollbar-hide">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard 
                key={`mobile-${i}`}
                {...testimonial}
                className="w-full max-w-none"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}