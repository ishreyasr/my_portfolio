'use client';

import { ReactNode } from 'react';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

interface FooterStatsProps {
    children: (stats: RepoStats) => ReactNode;
}

async function getRepoStats(): Promise<RepoStats> {
    const repoStats = await fetch(
        'https://api.github.com/repos/ShreyasR/portfolio-2.0',
        {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        },
    );

    return repoStats.json();
}

export default async function FooterStats({ children }: FooterStatsProps) {
    const stats = await getRepoStats();
    return <>{children(stats)}</>;
} 