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
    const [userMuted, setUserMuted] = useState(true);
    const [showUnmuteText, setShowUnmuteText] = useState(true);

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
                        audioRef.current.src = ''; // Clear the source
                        setAudioStarted(false);
                        setUserMuted(true);
                    }
                }
            });
        }
    };

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
                        // Ensure audio is completely stopped before hiding preloader
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                            audioRef.current.src = '';
                            setAudioStarted(false);
                            setUserMuted(true);
                        }
                        
                        // Fade out the entire preloader
                        gsap.to(preloaderRef.current, {
                            autoAlpha: 0,
                            duration: 0.5,
                            onComplete: () => {
                                // Final cleanup - remove audio element completely
                                if (audioRef.current) {
                                    audioRef.current.remove();
                                }
                            }
                        });
                    }
                });
            }
        });
    };

    // Function to handle unmuting
    const handleUnmute = () => {
        if (audioRef.current && userMuted) {
            setUserMuted(false);
            setShowUnmuteText(false);
            
            if (!audioStarted) {
                // Start audio for the first time
                audioRef.current.volume = 0.3;
                audioRef.current.loop = true;
                audioRef.current.play()
                    .then(() => {
                        console.log('Audio started successfully');
                        setAudioStarted(true);
                    })
                    .catch((error) => {
                        console.log('Audio failed to start:', error);
                    });
            } else {
                // Resume existing audio
                audioRef.current.play()
                    .then(() => {
                        console.log('Audio resumed successfully');
                        gsap.to(audioRef.current, {
                            volume: 0.3,
                            duration: 2,
                            ease: 'power2.inOut'
                        });
                    })
                    .catch((error) => {
                        console.log('Audio failed to resume:', error);
                    });
            }
        }
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

    // Initialize audio on component mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.loop = true;
            audioRef.current.load();
            setAudioStarted(true);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Clean up audio completely
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current.src = '';
                audioRef.current.remove();
            }
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 z-[6] flex bg-black overflow-hidden cursor-pointer" 
            ref={preloaderRef}
            onClick={handleUnmute}
        >
            {/* Background Music */}
            <audio 
                ref={audioRef}
                preload="auto"
                className="hidden"
            >
                <source src="/audio/bgm.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

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

            {/* Unmute Text - Bottom of page */}
            {showUnmuteText && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <p className="text-white/60 text-sm font-medium tracking-wider">
                        ◈ TAP ANYWHERE ◈
                    </p>
                </div>
            )}

            <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        </div>
    );
};

export default Preloader;
