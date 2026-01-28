import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MouseSpotlight: React.FC = () => {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // QuickTo for high performance mouse tracking
        const xTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
        const yTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

        const moveSpotlight = (e: MouseEvent) => {
            // Centering the spotlight on the cursor
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', moveSpotlight);

        return () => {
            window.removeEventListener('mousemove', moveSpotlight);
        };
    }, { scope: spotlightRef });

    return (
        <div
            ref={spotlightRef}
            className="fixed top-0 left-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-60"
            style={{ willChange: 'transform' }}
        />
    );
};

export default MouseSpotlight;
