'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useEffect, useState } from 'react';

gsap.registerPlugin(useGSAP);

const MYSTERIOUS_SYMBOLS = '◈◇◆○●◎⊙◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯◰◱◲◳◴◵◶◷◸◹◺◻◼◽◾◿';
const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';
const FINAL_NAME = 'SHREYAS';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLParagraphElement>(null);
    const [displayText, setDisplayText] = useState<string[]>(Array(7).fill(''));

    // Function to get random mysterious symbol
    const getRandomSymbol = () => MYSTERIOUS_SYMBOLS[Math.floor(Math.random() * MYSTERIOUS_SYMBOLS.length)];

    // Function to create mysterious symbol effect
    const startMysteriousEffect = () => {
        let iterations = 0;
        const maxIterations = 30;
        const interval = 100;

        const mysteriousInterval = setInterval(() => {
            setDisplayText(prev => 
                prev.map(() => getRandomSymbol())
            );

            iterations++;
            if (iterations >= maxIterations) {
                clearInterval(mysteriousInterval);
                startGlitchEffect();
            }
        }, interval);
    };

    // Function to create glitch effect
    const startGlitchEffect = () => {
        let glitchIterations = 0;
        const maxGlitchIterations = 35;
        const glitchInterval = setInterval(() => {
            setDisplayText(prev => 
                prev.map((_, index) => {
                    if (Math.random() < 0.4) {
                        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    }
                    if (Math.random() < 0.2) {
                        return getRandomSymbol();
                    }
                    return prev[index];
                })
            );

            // Subtle glitch transform
            gsap.to('.name-text', {
                x: gsap.utils.random(-5, 5),
                y: gsap.utils.random(-5, 5),
                duration: 0.05,
                ease: 'none',
                onComplete: () => {
                    gsap.to('.name-text', {
                        x: 0,
                        y: 0,
                        duration: 0.05,
                        ease: 'none'
                    });
                }
            });

            glitchIterations++;
            if (glitchIterations >= maxGlitchIterations) {
                clearInterval(glitchInterval);
                revealName();
            }
        }, 40);
    };

    // Function to reveal the name
    const revealName = () => {
        let revealIterations = 0;
        const maxRevealIterations = 20;
        const revealInterval = setInterval(() => {
            setDisplayText(prev => 
                prev.map((_, index) => {
                    const progress = Math.min(1, (revealIterations - index * 2) / 5);
                    if (progress <= 0) return getRandomSymbol();
                    if (progress >= 1) return FINAL_NAME[index];
                    return Math.random() < progress ? FINAL_NAME[index] : getRandomSymbol();
                })
            );

            revealIterations++;
            if (revealIterations >= maxRevealIterations) {
                clearInterval(revealInterval);
                setDisplayText(FINAL_NAME.split(''));
                setTimeout(startUniqueOutro, 1000);
            }
        }, 100);
    };

    // Function to create unique outro
    const startUniqueOutro = () => {
        // Create a wave of particles that sweep across the screen
        const createWaveParticles = () => {
            const particles = [];
            const rows = 10;
            const cols = 20;
            const totalParticles = rows * cols;

            for (let i = 0; i < totalParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particlesRef.current?.appendChild(particle);
                
                const row = Math.floor(i / cols);
                const col = i % cols;
                
                gsap.set(particle, {
                    x: (col / cols) * window.innerWidth,
                    y: (row / rows) * window.innerHeight,
                    scale: gsap.utils.random(0.8, 1.2),
                    opacity: 0,
                    backgroundColor: '#22c55e',
                    borderRadius: '2px',
                    width: '2px',
                    height: '2px',
                });
                
                particles.push(particle);
            }
            return particles;
        };

        const particles = createWaveParticles();

        // Animate particles in a wave pattern
        gsap.to(particles, {
            opacity: 1,
            duration: 0.5,
            stagger: {
                amount: 1,
                from: "start",
                grid: [10, 20],
                axis: "x"
            },
            ease: "power2.inOut",
            onComplete: () => {
                // Fade out the name
                gsap.to('.name-text', {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                });

                // Animate particles outward
                gsap.to(particles, {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    stagger: {
                        amount: 0.5,
                        from: "center",
                        grid: [10, 20]
                    },
                    ease: "power2.in",
                    onComplete: () => {
                        // Fade out the entire preloader
                        gsap.to(preloaderRef.current, {
                            autoAlpha: 0,
                            duration: 0.5
                        });
                    }
                });
            }
        });
    };

    useGSAP(
        () => {
            gsap.set('.name-text', {
                opacity: 0.8
            });

            startMysteriousEffect();
        },
        { scope: preloaderRef },
    );

    // Cleanup particles on unmount
    useEffect(() => {
        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[6] flex bg-black overflow-hidden" ref={preloaderRef}>
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">
                <p 
                    ref={nameRef}
                    className="name-text flex items-center justify-center text-[20vw] lg:text-[200px] font-anton leading-none overflow-hidden text-primary"
                    style={{
                        minHeight: '200px',
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity'
                    }}
                >
                    {displayText.map((char, index) => (
                        <span 
                            key={index} 
                            className="inline-block transition-all duration-75"
                            style={{
                                transform: 'translateZ(0)',
                                willChange: 'transform, opacity'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default Preloader;
