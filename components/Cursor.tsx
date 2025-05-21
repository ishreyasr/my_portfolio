'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const Cursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return;
            
            // Update cursor position with smooth movement
            gsap.to(cursorRef.current, {
                x: e.clientX - 8, // Center the cursor (half of width)
                y: e.clientY - 8, // Center the cursor (half of height)
                duration: 0.1,
                ease: 'power2.out'
            });

            // Show cursor when moving
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Add hover detection for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    useGSAP(() => {
        if (!cursorRef.current) return;

        // Initial cursor animation
        gsap.fromTo(cursorRef.current,
            {
                scale: 0,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            }
        );
    }, { scope: cursorRef });

    return (
        <>
            {/* Main cursor */}
            <div
                ref={cursorRef}
                className={`custom-cursor fixed pointer-events-none mix-blend-difference z-[9999] transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className={`relative w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                    isHovering ? 'scale-150 bg-primary' : 'scale-100'
                }`}>
                    {/* Outer ring */}
                    <div className="absolute -inset-2 border-2 border-white rounded-full opacity-50" />
                    
                    {/* Inner dot */}
                    <div className="absolute inset-1 bg-white rounded-full" />
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-primary rounded-full transition-opacity duration-300 ${
                        isHovering ? 'opacity-20 animate-ping' : 'opacity-0'
                    }`} />
                </div>
            </div>

            {/* Cursor trail effect */}
            <div className="fixed pointer-events-none z-[9998]">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
                        style={{
                            transition: `all ${0.1 + i * 0.05}s ease-out`,
                            transform: `translate(-50%, -50%) scale(${1 - i * 0.1})`
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default Cursor; 