import Footer from '@/components/Footer';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const DEFAULT_STATS: RepoStats = {
    stargazers_count: 0,
    forks_count: 0
};

async function getRepoStats(): Promise<RepoStats> {
    try {
        const repoStats = await fetch(
            'https://api.github.com/repos/ishreyasr/portfolio-2.0',
            {
                next: {
                    revalidate: 60 * 60, // 1 hour
                },
            },
        );

        if (!repoStats.ok) {
            console.error('GitHub API error:', repoStats.statusText);
            return DEFAULT_STATS;
        }

        const data = await repoStats.json();
        return {
            stargazers_count: data.stargazers_count || 0,
            forks_count: data.forks_count || 0
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return DEFAULT_STATS;
    }
}

export default async function FooterStats() {
    const stats = await getRepoStats();
    return <Footer repoStats={stats} />;
} 