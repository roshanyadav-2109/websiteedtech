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

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-4">
          {/* First Row - Moving Left to Right */}
          <div className="flex overflow-hidden [--gap:1rem] [gap:var(--gap)] [--duration:30s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee">
              {[...Array(3)].map((_, setIndex) => (
                testimonials.slice(0, 4).map((testimonial, i) => (
                  <TestimonialCard 
                    key={`row1-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Second Row - Moving Right to Left */}
          <div className="flex overflow-hidden [--gap:1rem] [gap:var(--gap)] [--duration:35s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse">
              {[...Array(3)].map((_, setIndex) => (
                testimonials.slice(4, 8).map((testimonial, i) => (
                  <TestimonialCard 
                    key={`row2-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background via-background/80 to-transparent" />
        </div>
      </div>
    </section>
  )
}