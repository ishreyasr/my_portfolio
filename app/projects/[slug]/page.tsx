import { PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import TransitionLink from '@/components/TransitionLink';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const project = PROJECTS.find((project) => project.slug === slug);

    return {
        title: `${project?.title} - ${project?.technologies.slice(0, 3).join(', ')}`,
        description: project?.description,
    } as Metadata;
};

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="pt-header">
            <div className="px-6 sm:px-8 lg:px-12 mb-16 mt-8">
                <TransitionLink
                    href="/#selected-projects"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-white transition-colors duration-200 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="text-lg">Back to projects</span>
                </TransitionLink>
            </div>
            
            <div className="container">
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl font-anton mb-5">
                        {project.title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-muted-foreground mb-10">
                        {project.description}
                    </p>
                    <p className="text-muted-foreground mb-5">
                        {project.period}
                    </p>
                    <p className="text-lg mb-10 whitespace-pre-line">
                        {project.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-muted rounded-full text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-5">
                        {project.liveLink !== '#' && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-black rounded-full hover:bg-muted-foreground transition-colors"
                            >
                                View Live
                            </a>
                        )}
                        {project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                            >
                                Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
