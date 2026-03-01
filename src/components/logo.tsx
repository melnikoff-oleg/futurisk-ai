import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl sm:text-5xl',
}

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline whitespace-nowrap font-sans',
        sizeClasses[size],
        className
      )}
    >
      <span className="font-light tracking-normal">futu</span>
      <span className="font-bold tracking-tight">risk</span>
      <span className="font-medium text-accent">.ai</span>
    </span>
  )
}
