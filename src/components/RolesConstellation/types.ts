export interface Role {
    id: number;
    name: string;
    category: string;
    description?: string;
    responsibilities?: string[];
    links?: {
        documentation: string;
        bestPractices: string;
        tutorials: string;
    };
    requirements: {
        services: string[];
        tools: string[];
        platforms: string[];
        languages: string[];
    };
}
