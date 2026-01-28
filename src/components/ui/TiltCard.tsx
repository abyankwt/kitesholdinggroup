import React, { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, intensity = 15 }) => {
    const ref = useTilt({ intensity });

    return (
        <div ref={ref} className={cn("transform-style-3d", className)} style={{ transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

export default TiltCard;
