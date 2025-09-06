import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border-0",
        "bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70",
        "backdrop-blur-sm",
        "p-6 text-start",
        "shadow-lg shadow-black/5 dark:shadow-white/5",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/10",
        "hover:-translate-y-1",
        "max-w-[280px] w-[280px] min-h-[160px]",
        "group cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10 shadow-sm ring-2 ring-white/50 dark:ring-gray-700/50">
          <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-800 to-blue-800 text-purple-700 dark:text-purple-200 font-semibold text-sm">
            {author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">
            {author.name}
          </h3>
          <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">
            Student
          </p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
        {text}
      </p>
    </Card>
  )
}