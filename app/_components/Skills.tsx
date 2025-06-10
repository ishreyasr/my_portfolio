'use client';
import SectionTitle from '../../components/SectionTitle';
import { MY_STACK } from '../../lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleSkillHover = (skillName: string) => {
        setHoveredSkill(skillName);
    };

    const handleSkillLeave = () => {
        setHoveredSkill(null);
    };

    const handleSectionHover = (sectionKey: string) => {
        setHoveredSection(sectionKey);
    };

    const handleSectionLeave = () => {
        setHoveredSection(null);
    };

    // Function to get the section key for a skill
    const getSectionKey = (skillName: string) => {
        for (const [key, skills] of Object.entries(MY_STACK)) {
            if (skills.some(skill => skill.name === skillName)) {
                return key;
            }
        }
        return null;
    };

    // Function to format section title
    const formatSectionTitle = (key: string) => {
        if (key === 'programming languages') return 'PROGRAMMING LANGUAGES';
        if (key === 'frontend') return 'FRONTEND';
        if (key === 'backend') return 'BACKEND';
        if (key === 'database') return 'DATABASE';
        if (key === 'tools') return 'TOOLS';
        return key.toUpperCase();
    };

    const currentHoveredSection = hoveredSkill ? getSectionKey(hoveredSkill) : hoveredSection;

    return (
        <section id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />

                <div className="space-y-20">
                    {Object.entries(MY_STACK).map(([key, value]) => (
                        <div 
                            className="grid sm:grid-cols-12" 
                            key={key}
                            onMouseEnter={() => handleSectionHover(key)}
                            onMouseLeave={handleSectionLeave}
                        >
                            <div className="sm:col-span-5">
                                <p className={`text-5xl font-anton leading-none text-muted-foreground uppercase transition-all duration-500 cursor-pointer ${
                                    currentHoveredSection && currentHoveredSection !== key
                                        ? 'opacity-30 scale-95 blur-[1px]'
                                        : currentHoveredSection === key
                                        ? 'opacity-100 scale-105 text-white'
                                        : 'opacity-100 scale-100'
                                }`}>
                                    {formatSectionTitle(key)}
                                </p>
                            </div>

                            <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
                                {value.map((item) => (
                                    <div
                                        className={`flex gap-3.5 items-center leading-none transition-all duration-500 ${
                                            currentHoveredSection && currentHoveredSection !== key
                                                ? 'opacity-30 scale-90 blur-[1px]'
                                                : hoveredSkill && hoveredSkill !== item.name
                                                ? 'opacity-40 scale-90 blur-[1px]'
                                                : hoveredSkill === item.name
                                                ? 'opacity-100 scale-110 z-10'
                                                : 'opacity-100 scale-100'
                                        }`}
                                        key={item.name}
                                        onMouseEnter={() => handleSkillHover(item.name)}
                                        onMouseLeave={handleSkillLeave}
                                    >
                                        <div className="transition-transform duration-300">
                                            <Image
                                                src={item.icon}
                                                alt={item.name}
                                                width="40"
                                                height="40"
                                                className={`max-h-10 transition-all duration-300 ${
                                                    hoveredSkill === item.name
                                                        ? 'scale-125 drop-shadow-lg'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                        <span className={`text-2xl capitalize transition-all duration-300 ${
                                            hoveredSkill === item.name
                                                ? 'text-primary font-semibold'
                                                : ''
                                        }`}>
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
