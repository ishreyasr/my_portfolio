'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MoveUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import Image from 'next/image';

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
        icon: '/logo/home.svg'
    },
    {
        name: 'About Me',
        url: '/#about-me',
        icon: '/logo/user.png'
    },
    {
        name: 'Experience',
        url: '/#my-experience',
        icon: '/logo/experience.png'
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
        icon: '/logo/projects.png'
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    // Function to get icon path for social links
    const getSocialIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'github':
                return '/logo/github.png';
            case 'linkedin':
                return '/logo/linkedin.png';
            case 'instagram':
                return '/logo/instagram.png';
            default:
                return null;
        }
    };

    // Function to get icon path for menu links
    const getMenuIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'home':
                return '/logo/home.svg';
            case 'about me':
                return '/logo/user.png';
            case 'experience':
                return '/logo/experience.png';
            case 'projects':
                return '/logo/projects.png';
            default:
                return null;
        }
    };

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <button
                    className={cn(
                        'group size-12 absolute top-5 right-5 md:right-10 z-[2]',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                            {
                                'rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                            {
                                '-rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/90 transition-all duration-150',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden',
                    'flex flex-col lg:justify-center py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                {/* Animated background with floating particles */}
                <div className="fixed inset-0 z-[-1]">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-cyan-900/20"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-500/10 rounded-full blur-md animate-pulse delay-500"></div>
                </div>

                {/* Main content with glassmorphism effect */}
                <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl mx-6 p-8 border border-white/10 shadow-2xl">
                    <div className="flex gap-12 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                                <p className="text-primary/80 text-sm font-bold tracking-[0.3em] uppercase">
                                    Connect
                                </p>
                            </div>
                            <ul className="space-y-5">
                                {SOCIAL_LINKS.map((link, _index) => {
                                    const iconPath = getSocialIcon(link.name);
                                    return (
                                        <li key={link.name} className="group">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-500 group-hover:scale-105"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-all duration-500 overflow-hidden">
                                                    {iconPath ? (
                                                        <Image
                                                            src={iconPath}
                                                            alt={link.name}
                                                            width={20}
                                                            height={20}
                                                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <span className="text-primary font-bold text-sm">
                                                            {link.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-lg font-medium group-hover:text-primary transition-colors duration-500">
                                                    {link.name}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        
                        <div className="">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                                <p className="text-primary/80 text-sm font-bold tracking-[0.3em] uppercase">
                                    Navigate
                                </p>
                            </div>
                            <ul className="space-y-5">
                                {MENU_LINKS.map((link, _idx) => {
                                    const iconPath = getMenuIcon(link.name);
                                    return (
                                        <li key={link.name} className="group">
                                            <button
                                                onClick={() => {
                                                    router.push(link.url);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-500 group-hover:scale-105 w-full text-left"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/5 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-500/60 transition-all duration-500 overflow-hidden">
                                                    {iconPath ? (
                                                        <Image
                                                            src={iconPath}
                                                            alt={link.name}
                                                            width={20}
                                                            height={20}
                                                            className="object-contain group-hover:scale-110 transition-transform duration-500 brightness-0 invert"
                                                        />
                                                    ) : (
                                                        <MoveUpRight
                                                            size={16}
                                                            className="text-blue-400 group-hover:text-blue-300 transition-colors duration-500"
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-lg font-medium group-hover:text-blue-300 transition-colors duration-500">
                                                    {link.name}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Get in Touch Section */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                            <p className="text-primary/80 text-sm font-bold tracking-[0.3em] uppercase">
                                Contact
                            </p>
                        </div>
                        <a 
                            href={`mailto:${GENERAL_INFO.email}?subject=${encodeURIComponent(GENERAL_INFO.emailSubject)}&body=${encodeURIComponent(GENERAL_INFO.emailBody)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/20 hover:to-transparent transition-all duration-500 group-hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/5 flex items-center justify-center border border-green-500/30 group-hover:border-green-500/60 transition-all duration-500 group-hover:scale-110">
                                    <MoveUpRight
                                        size={18}
                                        className="text-green-400 group-hover:text-green-300 transition-colors duration-500"
                                    />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div>
                                <p className="text-sm text-white/60 mb-1">Ready to collaborate?</p>
                                <p className="text-lg font-medium group-hover:text-green-300 transition-colors duration-500">
                                    {GENERAL_INFO.email}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
