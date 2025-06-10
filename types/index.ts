export type Next_Page_Url = string;
// UrlObject;
// | __next_route_internal_types__.StaticRoutes
// | __next_route_internal_types__.DynamicRoutes;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface IProject {
    title: string;
    slug: string;
    description: string;
    period: string;
    longDescription: string;
    thumbnail: string;
    longImage: string;
    technologies: string[];
    liveLink: string;
    githubLink: string;
    featured: boolean;
    // Additional properties used in ProjectDetails
    sourceCode?: string;
    liveUrl?: string;
    year?: string;
    techStack?: string[];
    role?: string;
    images?: string[];
}
