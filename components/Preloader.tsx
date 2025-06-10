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
    const audioRef = useRef<HTMLAudioElement>(null);
    const [displayText, setDisplayText] = useState<string[]>(Array(7).fill(''));
    const [audioStarted, setAudioStarted] = useState(false);

    // Function to start background music
    const startBackgroundMusic = () => {
        if (audioRef.current && !audioStarted) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
            
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setAudioStarted(true);
                        gsap.to(audioRef.current, {
                            volume: 0.3,
                            duration: 2,
                            ease: 'power2.inOut'
                        });
                    })
                    .catch((error) => {
                        console.log('Audio failed to start:', error);
                        // Try again after a short delay
                        setTimeout(() => {
                            if (!audioStarted && audioRef.current) {
                                audioRef.current.play()
                                    .then(() => {
                                        setAudioStarted(true);
                                        gsap.to(audioRef.current, {
                                            volume: 0.3,
                                            duration: 2,
                                            ease: 'power2.inOut'
                                        });
                                    })
                                    .catch(() => {
                                        console.log('Audio still blocked, waiting for user interaction');
                                    });
                            }
                        }, 500);
                    });
            }
        }
    };

    // Function to fade out background music
    const fadeOutBackgroundMusic = () => {
        if (audioRef.current) {
            gsap.to(audioRef.current, {
                volume: 0,
                duration: 1.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }
            });
        }
    };

    // Function to get random mysterious symbol
    const getRandomSymbol = () => MYSTERIOUS_SYMBOLS[Math.floor(Math.random() * MYSTERIOUS_SYMBOLS.length)];

    // Function to create mysterious symbol effect
    const startMysteriousEffect = () => {
        // Start background music when symbols first appear
        startBackgroundMusic();

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
                startUniqueOutro();
            }
        }, 100);
    };

    // Function to create unique outro
    const startUniqueOutro = () => {
        // Start fading out background music
        fadeOutBackgroundMusic();

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

            // Start the mysterious effect immediately when component loads
            startMysteriousEffect();
        },
        { scope: preloaderRef },
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Clean up audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[6] flex bg-black overflow-hidden pointer-events-none" ref={preloaderRef}>
            {/* Background Music */}
            <audio 
                ref={audioRef}
                preload="auto"
                className="hidden"
            >
                <source src="/audio/bgm.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Sound Symbol Button */}
            <div className="absolute top-6 right-6 pointer-events-auto z-10">
                <button
                    onClick={() => {
                        console.log('Sound button clicked!');
                        if (!audioStarted && audioRef.current) {
                            console.log('Attempting to start audio...');
                            audioRef.current.play()
                                .then(() => {
                                    console.log('Audio started successfully!');
                                    setAudioStarted(true);
                                    gsap.to(audioRef.current, {
                                        volume: 0.3,
                                        duration: 2,
                                        ease: 'power2.inOut'
                                    });
                                })
                                .catch((error) => {
                                    console.log('Audio failed to start:', error);
                                });
                        } else if (audioStarted && audioRef.current) {
                            console.log('Muting audio...');
                            audioRef.current.pause();
                            setAudioStarted(false);
                        }
                    }}
                    className="group relative w-12 h-12 bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
                    style={{ zIndex: 100 }}
                >
                    {/* Sound On Icon */}
                    {audioStarted ? (
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="text-white transition-all duration-300 group-hover:scale-110"
                        >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="m19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                    ) : (
                        /* Sound Off Icon */
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="text-white/80 transition-all duration-300 group-hover:scale-110"
                        >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-y-1 group-hover:translate-y-0">
                        {audioStarted ? 'Mute' : 'Unmute'}
                    </div>
                </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
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

            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        </div>
    );
};

export default Preloader;
