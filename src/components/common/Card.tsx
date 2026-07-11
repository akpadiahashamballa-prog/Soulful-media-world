import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-smw-dark rounded-lg border border-smw-gray p-6',
        hoverable && 'transition-all duration-300 hover:border-smw-gold hover:shadow-lg hover:shadow-smw-gold/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

export default Card;
