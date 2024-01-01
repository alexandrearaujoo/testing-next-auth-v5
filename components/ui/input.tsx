import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClick = () => setShowPassword(!showPassword);

    const Icon = showPassword ? AiOutlineEyeInvisible : AiOutlineEye;
    return (
      <div className="relative w-full p-[0.15rem] rounded-xl">
        <input
          type={!icon ? type : showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            className="absolute right-[5px] bottom-[10px] border-none bg-transparent"
            type="button"
            onClick={handleClick}
          >
            <Icon className="w-5 h-5 text-black" />
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
