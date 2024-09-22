
export const navlinks = [
    {
        name: "About",
        path: "/about"
    },
    {
        name: "Features",
        path: "/features"
    },
    {
        name: "Contacts",
        path: "/contacts"
    },

]

export const organizations = [
    // Organization with multiple projects, some with tasks
    {
        id: crypto.randomUUID(),
        title: "Hackathon - Premium",
        description: "Hackathon - Premium is a hackathon for students and professionals to showcase their skills.",
        isPrivate: true,
        passkey: "secure123",
        projects: [
            {
                id: crypto.randomUUID(),
                title: "Project 1",
                description: "Develop a web app for project management.",
                status: "pending",
                createdAt: new Date().toISOString(),
                tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "Design UI",
                        isCompleted: false,
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Implement Authentication",
                        isCompleted: false,
                    },
                ],
            },
            {
                id: crypto.randomUUID(),
                title: "Project 2",
                description: "Create a marketing strategy for the app.",
                status: "completed",
                createdAt: new Date().toISOString(),
                tasks: [],
            },
        ],
        members: [
            {
                userId: crypto.randomUUID(),
                name: "John Doe",
            },
            {
                userId: crypto.randomUUID(),
                name: "Jane Smith",
            },
            {
                userId: crypto.randomUUID(),
                name: "Gift Jackson",
            },
        ],
    },
    // Organization without any projects
    {
        id: crypto.randomUUID(),
        title: "Open Source Initiative",
        description: "A community dedicated to promoting open-source projects.",
        isPrivate: false,
        passkey: null,
        projects: [],
        members: [
            {
                userId: crypto.randomUUID(),
                name: "Alice Brown",
            },
            {
                userId: crypto.randomUUID(),
                name: "Bob Johnson",
            },
        ],
    },
    // Organization with one project and tasks
    {
        id: crypto.randomUUID(),
        title: "Marketing Team",
        description: "Focuses on creating marketing materials and campaigns.",
        isPrivate: true,
        passkey: "market456",
        projects: [
            {
                id: crypto.randomUUID(),
                title: "Social Media Campaign",
                description: "Launch a social media campaign for the new product line.",
                status: "pending",
                createdAt: new Date().toISOString(),
                tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: "Create post designs",
                        isCompleted: false,
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Schedule posts",
                        isCompleted: false,
                    },
                ],
            },
        ],
        members: [
            {
                userId: crypto.randomUUID(),
                name: "Emily White",
            },
            {
                userId: crypto.randomUUID(),
                name: "David Green",
            },
        ],
    },
    // Organization with a project but no tasks
    {
        id: crypto.randomUUID(),
        title: "Development Team",
        description: "Team responsible for software development.",
        isPrivate: false,
        passkey: null,
        projects: [
            {
                id: crypto.randomUUID(),
                title: "Bug Fixes",
                description: "Fix bugs reported by the QA team.",
                status: "in progress",
                createdAt: new Date().toISOString(),
                tasks: [], // No tasks added yet
            },
        ],
        members: [
            {
                userId: crypto.randomUUID(),
                name: "Michael Scott",
            },
            {
                userId: crypto.randomUUID(),
                name: "Pam Beesly",
            },
        ],
    },
    // Organization with no projects and members
    {
        id: crypto.randomUUID(),
        title: "Designers Club",
        description: "A club for creative designers to share and collaborate.",
        isPrivate: true,
        passkey: "design789",
        projects: [],
        members: [
            {
                userId: crypto.randomUUID(),
                name: "Rachel Adams",
            },
        ],
    },
];

