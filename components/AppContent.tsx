'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import ParticleBackground from './ParticleBackground';
import StickyEmail from '../app/_components/StickyEmail';
import FooterStats from '../app/_components/FooterStats';

interface Props {
    children: ReactNode;
}

export default function AppContent({ children }: Props) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.4,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            }}
        >
            <div className="relative min-h-screen bg-background">
                <Navbar />
                <main className="relative z-10">
                    {children}
                </main>
                <FooterStats />
                <CustomCursor />
                <Preloader />
                <ScrollProgressIndicator />
                <ParticleBackground />
                <StickyEmail />
            </div>
        </ReactLenis>
    );
} 