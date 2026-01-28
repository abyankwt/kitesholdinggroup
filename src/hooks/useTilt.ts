import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const useTilt = (options = { intensity: 15 }) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const xTo = gsap.quickTo(ref.current, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        const yTo = gsap.quickTo(ref.current, 'rotationX', { duration: 0.5, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = ref.current!.getBoundingClientRect();

            const x = clientX - left;
            const y = clientY - top;

            const centerX = width / 2;
            const centerY = height / 2;

            const rotateX = ((y - centerY) / centerY) * -options.intensity;
            const rotateY = ((x - centerX) / centerX) * options.intensity;

            yTo(rotateX);
            xTo(rotateY);
        };

        const handleMouseLeave = () => {
            yTo(0);
            xTo(0);
        };

        const element = ref.current;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: ref });

    return ref;
};
