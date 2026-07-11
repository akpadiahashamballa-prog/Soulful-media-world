import React from 'react';
import { cn } from '@/utils/cn';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-smw-gray',
        orientation === 'horizontal' ? 'w-full h-px' : 'w-px h-full',
        className
      )}
      {...props}
    />
  )
);

Divider.displayName = 'Divider';

export default Divider;
