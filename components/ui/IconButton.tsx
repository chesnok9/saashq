import { cn } from '@/lib/utils';
import type { MouseEventHandler } from 'react';

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconButton = ({ onClick, icon, className }: IconButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      'items-center justify-center rounded-full p-2 transition hover:scale-110',
      className
    )}
  >
    {icon}
  </button>
);

export default IconButton;
