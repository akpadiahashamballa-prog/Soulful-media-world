import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-smw-white mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-smw-gray">{icon}</div>}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 bg-smw-dark border border-smw-gray rounded-lg',
            'text-smw-white placeholder-smw-gray',
            'focus:outline-none focus:border-smw-gold focus:ring-1 focus:ring-smw-gold/50',
            'transition-colors duration-200',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
