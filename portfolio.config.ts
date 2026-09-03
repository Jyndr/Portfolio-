export const portfolioConfig = {
    // =========================================================
    // METADATA
    // =========================================================

    metadata: {
        version: "1.0.0",
        owner: "Jayendra Patel",
        lastUpdated: "2026-09-03",
    },

    // =========================================================
    // PERSONAL INFORMATION
    // =========================================================

    personal: {
        firstName: "Jayendra",

        lastName: "Patel",

        fullName: "Jayendra Patel",

        role: "Full Stack Engineer",

        tagline:
            "Building scalable backend systems, distributed architectures, and production-grade web applications.",

        intro:
            "I build backend-heavy full-stack systems focused on scalable APIs, real-time workflows, distributed processing, AI integrations, and production-style deployment.",

        location: "Jabalpur, Madhya Pradesh, India",

        email: "jayendra.patel.dev@gmail.com",

        phone: "+91-9201693213",

        avatar: "/assets/profile/profile.png",

        heroIllustration: "/assets/profile/hero.png",

        resume: "/assets/resume/resume.pdf",

        openToWork: true,
    },

    // =========================================================
    // HERO
    // =========================================================

    hero: {
        greeting: "Hi, I'm",

        role: "Full Stack Engineer",

        primaryButton: {
            text: "View Projects",

            link: "#projects",
        },

        secondaryButton: {
            text: "Download Resume",

            link: "/assets/resume/resume.pdf",
        },

        terminalAnimation: [
            "Backend Development",
            "Problem Solving",
            "System Design",
            "Building Scalable Products",
        ],
    },

    // =========================================================
    // ABOUT
    // =========================================================

    about: {
        heading: "Building digital solutions that create real impact.",

        description:
            "I'm passionate about backend engineering, distributed systems, scalable architectures, AI applications, competitive programming, and building products that solve real-world problems.",

        cards: [
            {
                title: "2+",

                subtitle: "Years Coding",
            },

            {
                title: "5+",

                subtitle: "Projects Built",
            },

            {
                title: "1750+",

                subtitle: "Problems Solved",
            },

            {
                title: "Winner",

                subtitle: "HackCrux 2025",
            },
        ],
    },

    // =========================================================
    // SOCIAL LINKS
    // =========================================================

    socials: {
        github: {
            username: "Jyndr",

            url: "https://github.com/Jyndr",
        },

        linkedin: {
            url:
                "https://linkedin.com/in/jayendra-patel-5272b232b",
        },

        codolio: {
            username: "Jyndr_23",

            url:
                "https://codolio.com/profile/Jyndr_23",
        },

        leetcode: {
            username: "jyndr_",

            url: "https://leetcode.com/u/jyndr_/",
        },

        codeforces: {
            username: "TODO",

            url: "https://codeforces.com/profile/Jat1nX",
        },

        codechef: {
            username: "TODO",

            url: "https://www.codechef.com/users/jetstar",
        },

        twitter: "https://x.com/jyndr_1",

        instagram: "",

        youtube: "",

        portfolio: "",
    },

    // =========================================================
    // NAVIGATION
    // =========================================================

    navigation: [
        {
            title: "About",

            href: "#about",
        },

        {
            title: "Achievements",

            href: "#achievements",
        },

        {
            title: "LeetCode",

            href: "#leetcode",
        },

        {
            title: "GitHub",

            href: "#github",
        },

        {
            title: "Projects",

            href: "#projects",
        },

        {
            title: "Tech Stack",

            href: "#tech",
        },

        {
            title: "Contact",

            href: "#contact",
        },
    ],

    // =========================================================
    // GITHUB
    // =========================================================

    github: {
        username: "Jyndr",

        profile:
            "https://github.com/Jyndr",

        fetchStats: true,

        fetchHeatmap: true,

        fetchLanguages: true,

        fetchPinnedRepositories: true,

        fetchRecentActivity: true,

        fetchContributionGraph: true,
    },

    // =========================================================
    // LEETCODE
    // =========================================================

    leetcode: {
        username: "jynd_",

        profile: "https://leetcode.com/u/jyndr_/",

        fetchHeatmap: true,

        fetchContestHistory: true,

        fetchBadges: true,

        fetchRecentSubmissions: true,

        fetchSolvedStats: true,
    },

    // =========================================================
    // PROBLEM SOLVING
    // =========================================================

    problemSolving: {
        totalSolved: 1750,

        codingDays: 550,

        contestsParticipated: 130,

        leetcode: {
            maxRating: 1714,

            profile: "TODO",
        },

        codeforces: {
            maxRating: 1225,

            rank: "Pupil",

            profile: "TODO",
        },

        codechef: {
            maxRating: 1586,

            bestGlobalRank: 398,

            profile: "TODO",
        },
    },

    // =========================================================
    // ACHIEVEMENTS
    // =========================================================

    achievements: [
        {
            title: "Winner - HackCrux 2025",

            organization: "LNMIIT Jaipur",

            year: "2025",

            description:
                "Led a four-member team and secured 1st place among 90+ participating teams by building an AI-powered disaster information aggregation platform.",

            certificate:
                "https://certificate.givemycertificate.com/c/ace727b1-862f-4180-a536-e784b00f1f13",

            image:
                "/assets/certificates/hackcrux.png",
        },
    ],
    // =========================================================
    // FEATURED PROJECTS
    // =========================================================

    featuredProjects: [
        {
            id: "gpt-backend-platform",

            featured: true,

            order: 1,

            title: "GPT Backend Platform",

            shortTitle: "GPT Backend",

            category: "AI Backend",

            status: "Completed",

            year: "2026",

            image: "/assets/projects/gpt-backend.png",

            github: "https://github.com/Jyndr/ChatGPT",

            live: "",

            demoVideo: "",

            summary:
                "A backend-focused GPT application handling AI chat workflows, secure API communication, prompt orchestration, conversation management, and structured response delivery.",

            problem:
                "Most AI chat applications expose LLM APIs directly from the frontend. A production application requires a secure backend responsible for authentication, validation, request orchestration, prompt handling, and response management.",

            solution:
                "Built a dedicated backend layer that securely communicates with the LLM provider while exposing clean REST APIs for frontend applications.",

            techStack: [
                "Node.js",
                "Express.js",
                "JavaScript",
                "REST APIs",
                "OpenAI API",
            ],

            highlights: [
                "Designed secure backend APIs for GPT-style conversations.",
                "Implemented request validation and centralized API handling.",
                "Structured prompt and response management.",
                "Separated frontend from AI provider communication.",
                "Designed reusable backend architecture.",
            ],

            architecture: [
                "REST API Layer",
                "Controller-Service Architecture",
                "LLM Integration Layer",
                "Authentication",
                "Error Handling",
            ],

            learnings: [
                "Prompt Engineering",
                "API Security",
                "Backend Architecture",
                "REST API Design",
            ],

            gallery: [
                "/assets/projects/gpt/1.png",
                "/assets/projects/gpt/2.png",
            ],

            caseStudy: {
                whatItSolves:
                    "Provides a secure backend layer for GPT-powered applications.",

                whatIBuilt:
                    "Authentication, REST APIs, AI communication, request validation, response orchestration and conversation workflows.",

                howIBuiltIt:
                    "Built using Node.js, Express.js and OpenAI APIs with a clean layered backend architecture.",
            },
        },

        {
            id: "cloud-video-storage",

            featured: true,

            order: 2,

            title: "Cloud Video Storage System",

            shortTitle: "Cloud Storage",

            category: "Distributed Backend",

            status: "In Progress",

            year: "2026",

            image: "/assets/projects/cloud-storage.png",

            github: "",

            live: "",

            demoVideo: "",

            summary:
                "Production-style cloud object storage platform supporting secure uploads, metadata management, asynchronous processing and adaptive video streaming.",

            problem:
                "Large media systems require scalable uploads, asynchronous processing, efficient metadata management and secure streaming without blocking users.",

            solution:
                "Designed a distributed architecture using Redis, Kafka and Docker to separate uploads, processing and streaming responsibilities.",

            techStack: [
                "Node.js",
                "Express.js",
                "MongoDB",
                "Redis",
                "Apache Kafka",
                "Docker",
                "AWS EC2",
                "Nginx",
                "HLS",
            ],

            highlights: [
                "Multipart uploads.",
                "Secure authentication.",
                "Presigned URL generation.",
                "Metadata management.",
                "Asynchronous processing pipeline.",
                "Adaptive HLS streaming.",
            ],

            architecture: [
                "API Gateway",
                "Authentication Service",
                "Kafka Event Queue",
                "Redis Cache",
                "Storage Layer",
                "Streaming Layer",
            ],

            learnings: [
                "Distributed Systems",
                "Event Driven Architecture",
                "Scalable Upload Pipelines",
                "Media Streaming",
            ],

            gallery: [
                "/assets/projects/storage/1.png",
                "/assets/projects/storage/2.png",
            ],

            caseStudy: {
                whatItSolves:
                    "Stores and streams large media efficiently while separating metadata, processing and delivery.",

                whatIBuilt:
                    "Authentication, uploads, metadata APIs, event processing and HLS delivery.",

                howIBuiltIt:
                    "Node.js + MongoDB + Redis + Kafka + Docker + AWS EC2 + Nginx.",
            },
        },

        {
            id: "quick-commerce",

            featured: true,

            order: 3,

            title: "Quick Commerce Platform",

            shortTitle: "Quick Commerce",

            category: "Full Stack",

            status: "In Progress",

            year: "2026",

            image: "/assets/projects/qcommerce.png",

            github: "",

            live: "",

            demoVideo: "",

            summary:
                "Blinkit-inspired quick commerce platform supporting catalog management, inventory, ordering, delivery tracking, search and AI-powered recommendations.",

            problem:
                "Quick-commerce platforms require real-time inventory synchronization, reliable ordering workflows and scalable search.",

            solution:
                "Designed an event-driven full-stack architecture powered by Redis, Kafka, WebSockets and Elasticsearch.",

            techStack: [
                "React",
                "TypeScript",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Redis",
                "Apache Kafka",
                "WebSockets",
                "Elasticsearch",
                "Vector Embeddings",
            ],

            highlights: [
                "Authentication.",
                "Inventory Management.",
                "Cart System.",
                "Order Lifecycle.",
                "Delivery Tracking.",
                "Admin Dashboard.",
                "AI Search.",
            ],

            architecture: [
                "Frontend",
                "Backend APIs",
                "Redis Cache",
                "Kafka Events",
                "Search Engine",
                "Recommendation Engine",
            ],

            learnings: [
                "Distributed Design",
                "Real-time Systems",
                "Search Infrastructure",
            ],

            gallery: [
                "/assets/projects/qcommerce/1.png",
                "/assets/projects/qcommerce/2.png",
            ],

            caseStudy: {
                whatItSolves:
                    "Simplifies ordering, inventory management and real-time delivery.",

                whatIBuilt:
                    "Complete commerce workflows from authentication to delivery.",

                howIBuiltIt:
                    "React + Node.js + Redis + Kafka + Elasticsearch.",
            },
        },
        {
            id: "hackcrux",

            featured: true,

            order: 4,

            title: "HackCrux - Real-Time Disaster Information Aggregator",

            shortTitle: "HackCrux",

            category: "AI / NLP",

            status: "Completed",

            year: "2025",

            image: "/assets/projects/hackcrux.png",

            github: "https://github.com/Jyndr/HackCrux",

            live: "",

            demoVideo: "",

            summary:
                "An AI-powered disaster information aggregation platform that collects data from multiple public sources, removes duplicate information, filters unreliable content, classifies events using NLP, and presents reliable emergency updates.",

            problem:
                "During disasters, information is scattered across multiple sources, duplicated, delayed, and often unreliable, making it difficult for users to access trusted real-time updates.",

            solution:
                "Designed an automated pipeline that collects public information, preprocesses text, classifies events using BERT, removes duplicates, filters unreliable information, and presents meaningful disaster insights.",

            techStack: [
                "Python",
                "BERT",
                "Pandas",
                "REST APIs",
                "NLP",
            ],

            highlights: [
                "Winner of HackCrux 2025.",
                "Integrated multiple public APIs.",
                "Implemented duplicate detection.",
                "Used NLP preprocessing pipeline.",
                "Performed BERT based classification.",
                "Generated structured emergency insights.",
            ],

            architecture: [
                "API Collection Layer",
                "NLP Processing",
                "Duplicate Removal",
                "Classification Engine",
                "Visualization Layer",
            ],

            learnings: [
                "Natural Language Processing",
                "BERT Classification",
                "Information Retrieval",
                "Machine Learning Pipelines",
            ],

            gallery: [
                "/assets/projects/hackcrux/1.png",
                "/assets/projects/hackcrux/2.png",
            ],

            caseStudy: {
                whatItSolves:
                    "Aggregates reliable disaster information from scattered public sources.",

                whatIBuilt:
                    "API collectors, preprocessing pipeline, BERT classification, duplicate filtering and dashboard visualization.",

                howIBuiltIt:
                    "Built using Python, REST APIs, Pandas, NLP preprocessing and BERT.",
            },
        },
    ],

    // =========================================================
    // TECH STACK
    // =========================================================

    skills: {
        languages: [
            "C++",
            "JavaScript",
            "TypeScript",
            "Python",
        ],

        frontend: [
            "React.js",
            "Next.js",
            "Tailwind CSS",
            "Redux Toolkit",
        ],

        backend: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "JWT",
            "WebSockets",
        ],

        databases: [
            "MongoDB",
            "PostgreSQL",
            "Redis",
            "Elasticsearch",
        ],

        cloud: [
            "Docker",
            "AWS EC2",
            "Linux",
            "Nginx",
        ],

        devops: [
            "Git",
            "GitHub",
            "CI/CD",
        ],

        systems: [
            "Apache Kafka",
            "Event Driven Architecture",
            "Caching",
            "HLS Streaming",
            "Microservices",
        ],

        ai: [
            "OpenAI API",
            "Gemini API",
            "OpenRouter",
            "Vector Embeddings",
            "AI Agents",
        ],

        fundamentals: [
            "Data Structures",
            "Algorithms",
            "OOP",
            "DBMS",
            "Operating Systems",
            "Computer Networks",
        ],
    },

    // =========================================================
    // EDUCATION
    // =========================================================

    education: {
        college: "Jabalpur Engineering College",

        degree: "B.Tech in Computer Science & Engineering",

        location: "Jabalpur, Madhya Pradesh",

        duration: "2024 - 2028",
    },

    // =========================================================
    // CONTACT
    // =========================================================

    contact: {
        email: "jayendra.patel.dev@gmail.com",

        phone: "+91-9201693213",

        location: "Jabalpur, Madhya Pradesh, India",

        availability:
            "Open to internships, freelance opportunities and backend/full-stack collaborations.",
    },

    // =========================================================
    // SEO
    // =========================================================

    seo: {
        title:
            "Jayendra Patel | Full Stack Engineer",

        description:
            "Backend-focused Full Stack Engineer passionate about scalable systems, distributed architectures, AI applications and competitive programming.",

        keywords: [
            "Full Stack Engineer",
            "Backend Developer",
            "Node.js",
            "Express",
            "React",
            "MongoDB",
            "Redis",
            "Kafka",
            "TypeScript",
            "Portfolio",
        ],

        author: "Jayendra Patel",

        ogImage: "/assets/profile/og.png",
    },

    // =========================================================
    // THEME
    // =========================================================

    theme: {
        accent: "#5B5CF6",

        borderRadius: "18px",

        font: "Inter",

        enableAnimations: true,

        enableNekoCursor: true,

        enableScrollProgress: true,

        enableSmoothScroll: true,

        darkMode: false,
    },

    // =========================================================
    // FEATURE FLAGS
    // =========================================================

    features: {
        github: true,

        leetcode: true,

        projects: true,

        achievements: true,

        contactForm: true,

        blog: false,

        testimonials: false,

        analytics: false,
    },

    // =========================================================
    // FOOTER
    // =========================================================

    footer: {
        text:
            "Designed & Developed by Jayendra Patel",

        showSocials: true,

        showBackToTop: true,
    },
};