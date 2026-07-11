import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variants = {
      default: 'bg-smw-gray text-smw-white',
      success: 'bg-emerald-900 text-emerald-100',
      warning: 'bg-amber-900 text-amber-100',
      error: 'bg-red-900 text-red-100',
      gold: 'bg-smw-gold/20 text-smw-gold',
    };

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
