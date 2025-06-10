'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useGSAP((context, contextSafe) => {
        if (window.innerWidth < 768) return;

        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
            if (!svgRef.current) return;

            const { clientX, clientY } = e;

            gsap.to(svgRef.current, {
                x: clientX - 13.5, // Center the cursor (half of width)
                y: clientY - 15, // Center the cursor (half of height)
                ease: 'power2.out',
                duration: 0.15,
                opacity: 1,
            });
        }) as any;

        const handleMouseOver = contextSafe?.((e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        }) as any;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    });

    // Add hover effect animation
    useEffect(() => {
        if (!svgRef.current) return;

        if (isHovering) {
            gsap.to(svgRef.current, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out',
            });
        } else {
            gsap.to(svgRef.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    }, [isHovering]);

    return (
        <svg
            width="27"
            height="30"
            viewBox="0 0 27 30"
            className="hidden md:block fixed top-0 left-0 opacity-0 z-[50] pointer-events-none"
            fill="none"
            id="cursor"
            strokeWidth="2"
            opacity="0"
            xmlns="http://www.w3.org/2000/svg"
            ref={svgRef}
        >
            <path
                d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                className={`transition-colors duration-300 ${
                    isHovering 
                        ? 'fill-primary stroke-primary/50' 
                        : 'fill-foreground stroke-background/50'
                }`}
            />
        </svg>
    );
};

export default CustomCursor;
