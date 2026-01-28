import React, { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    // Allow passing style or other divs
    [key: string]: any;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", ...props }) => {
    const magnetic = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            // Pull movement
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        if (magnetic.current) {
            magnetic.current.addEventListener("mousemove", mouseMove);
            magnetic.current.addEventListener("mouseleave", mouseLeave);
        }

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", mouseMove);
                magnetic.current.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, { scope: magnetic });

    return (
        <div ref={magnetic} className={`relative inline-block ${className}`} {...props}>
            {children}
        </div>
    );
};

export default MagneticButton;
