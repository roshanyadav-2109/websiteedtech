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
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-6">
          {/* First Row - Moving Left to Right */}
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee gap-4 whitespace-nowrap">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.slice(0, 4).map((testimonial, i) => (
                  <div key={`row1-${setIndex}-${i}`} className="flex-shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right to Left */}
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee-reverse gap-4 whitespace-nowrap">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.slice(4, 8).map((testimonial, i) => (
                  <div key={`row2-${setIndex}-${i}`} className="flex-shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}