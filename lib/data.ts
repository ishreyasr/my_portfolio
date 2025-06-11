import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'ishreyasr@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Shreyas, I am reaching out to you because...',

    oldPortfolio: 'https://www.legacy.shreyas.dev',
    upworkProfile: 'https://www.upwork.com/freelancers/shreyas',
};

export const SOCIAL_LINKS = [
    { name: 'GitHub', url: 'https://github.com/shreyas162004' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shreyu' },
    { name: 'Instagram', url: 'https://www.instagram.com/shreyas_chinnu16' }
];

export const MY_STACK = {
    'programming languages': [
        {
            name: 'Java',
            icon: '/logo/java.svg',
        },
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'C',
            icon: '/logo/c.svg',
        },
        {
            name: 'C++',
            icon: '/logo/cpp.svg',
        },
    ],
    frontend: [
        {
            name: 'HTML',
            icon: '/logo/html.png',
        },
        {
            name: 'Javascript',
            icon: '/logo/js.png',
        },
        {
            name: 'Typescript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Frammer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'SASS',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Nest.js',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
        {
            name: 'Azure',
            icon: '/logo/azure.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Akhyana',
        slug: 'akhyana',
        description: 'Vehicle-to-Vehicle (V2V) Communication - IOT, Machine Learning',
        period: 'Jan 2025 - Present',
        longDescription: `A wireless protocol enabling real-time exchange of data, including speed, location, driving conditions, voice communication. It enhances road safety, prevents collisions, supports autonomous driving, and enables cooperative awareness for smarter traffic management.`,
        thumbnail: '/projects/thumbnail/property-pro.jpg',
        longImage: '/projects/long/property-pro.jpg',
        technologies: ['IoT', 'Machine Learning', 'Real-time Communication', 'Vehicle Safety', 'Autonomous Systems'],
        liveLink: '#',
        githubLink: '#',
        featured: true,
    },
    {
        title: 'KavachEye',
        slug: 'kavacheye',
        description: 'Women safety analytics system - Full Stack, Artificial intelligence',
        period: 'Aug 2024 - Jan 2025',
        longDescription: `An advanced safety and surveillance solution providing real-time monitoring through video feeds, voice communication, and intelligent analytics. It leverages AI to detect threats, ensure safety, and deliver instant alerts, enabling proactive responses for personal and community security.`,
        thumbnail: '/projects/thumbnail/resume-roaster.jpg',
        longImage: '/projects/long/resume-roaster.jpg',
        technologies: ['Full Stack', 'Artificial Intelligence', 'Real-time Analytics', 'Video Processing', 'Security Systems'],
        liveLink: '#',
        githubLink: '#',
        featured: true,
    },
    {
        title: 'Suraksha',
        slug: 'suraksha',
        description: 'Secure Document Verification System - Cyber Security, Blockchain',
        period: 'Mar 2024 - Aug 2024',
        longDescription: `Built a decentralized system for tamper-proof document verification using smart contracts and cryptography, ensuring authenticity, integrity, and secure ownership.`,
        thumbnail: '/projects/thumbnail/mti-electronics.webp',
        longImage: '/projects/long/mti-electronics.webp',
        technologies: ['Blockchain', 'Smart Contracts', 'Cryptography', 'Document Verification', 'Security'],
        liveLink: '#',
        githubLink: '#',
        featured: true,
    }
];

export const MY_EXPERIENCE = [
    { title: 'Data Science Intern', company: 'Zeta Coding Innovative Solutions', duration: 'Dec 2023 - Feb 2024' },
    { title: 'Artificial Intelligence Intern', company: 'DxMinds', duration: 'Nov 2022 - Jan 2023' }
];
