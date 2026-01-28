import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ScrollLink: React.FC<ScrollLinkProps> = ({ to, children, className, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClick?.();
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={cn(
        'cursor-pointer transition-colors duration-200 hover:text-accent',
        className
      )}
    >
      {children}
    </a>
  );
};
