'use client';

import { ReactNode } from 'react';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

interface FooterStatsProps {
    children: (_stats: RepoStats) => ReactNode;
}

export default function FooterStats({ children }: FooterStatsProps) {
    return <>{children({ stargazers_count: 0, forks_count: 0 })}</>;
} 