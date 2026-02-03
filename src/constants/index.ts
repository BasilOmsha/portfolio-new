type NavLink = {
    name: string
    link: string
}

export const navLinks: NavLink[] = [
    {
        name: 'Work',
        link: '#work'
    },
    {
        name: 'Experience',
        link: '#experience'
    },
    {
        name: 'Skills',
        link: '#skills'
    }
]

type WordItem = {
    text: string
    imgPath: string
}

export const words: WordItem[] = [
    { text: 'Ideas', imgPath: '/images/hero/ideas.svg' },
    { text: 'Concepts', imgPath: '/images/hero/concepts.svg' },
    { text: 'Designs', imgPath: '/images/hero/designs.svg' },
    { text: 'Code', imgPath: '/images/hero/code.svg' },
    { text: 'Ideas', imgPath: '/images/hero/ideas.svg' },
    { text: 'Concepts', imgPath: '/images/hero/concepts.svg' },
    { text: 'Designs', imgPath: '/images/hero/designs.svg' },
    { text: 'Code', imgPath: '/images/hero/code.svg' }
]

type CounterIntems = {
    value: number
    suffix: string
    label: string
}

export const counterItems: CounterIntems[] = [
    {
        value: 3,
        suffix: '+',
        label: 'Years of Learning and Building'
    },
    // {
    //     value: 0,
    //     suffix: '+',
    //     label: 'Clients Yet. Looking forward to that first win!'
    // },
    {
        value: 30,
        suffix: '+',
        label: 'Personal, Professional & Academic Projects Completed'
    },
    {
        value: 110,
        suffix: '%',
        label: 'Commitment to Learning and Improving'
    }
]

export type TechStackIcon = {
    name: string
    modelPath: string
    scale?: number | [number, number, number]
    rotation?: [number, number, number]
}

export const techStackIcons: TechStackIcon[] = [
    {
        name: 'Frontend - React',
        modelPath: '/models/react_logo-transformed.glb',
        scale: 1,
        rotation: [0, 0, 0]
    },
    {
        name: 'C#',
        modelPath: '/models/cSharp-transformed.glb',
        scale: 0.08,
        rotation: [0, 0, 0]
    },
    // {
    //     name: "Backend Developer",
    //     modelPath: "/models/node-transformed.glb",
    //     scale: 5,
    //     rotation: [0, -Math.PI / 2, 0]
    // },
    {
        name: 'Interactive - Three.js',
        modelPath: '/models/threejs-transformed.glb',
        scale: 0.05,
        rotation: [0, 0, 0]
    },
    {
        name: 'Project Manager - Git',
        modelPath: '/models/git-svg-transformed.glb',
        scale: 0.05,
        rotation: [0, -Math.PI / 4, 0]
    }
]

export type Certification = {
    title: string
    issuer: string
    date: string
    credentialId?: string
    credentialUrl?: string
    logoPath?: string
}

export type Education = {
    degree: string
    institution: string
    location: string
    languageOfInstruction: string
    gpa: string | null
    gradingScale: string | null
    period: string
    thesis?: {
        topic: string
        description: string
        publicationUrl?: string
        grade?: string
    }
}

type ExperienceCard = {
    review: string
    company: string
    imgPath: string
    logoPath: string
    imgWidth: string
    imgHeight: string
    title: string
    date: string
    date2?: string
    date3?: string
    dates?: string[]
    responsibilities: string[]
    skills?: string[]
    showGlowCard?: boolean
    education?: Education
    certifications?: Certification[]
}

export const expCards: ExperienceCard[] = [
    {
        review: 'Part-time at Vahvero Symbiosis, Remote, Hämeenlinna, Finland. Conducting meetings with stakeholders in both Finnish (public sector) and English to understand needs, clarify feedback, and ensure solutions support real business and user requirements. Implementing new features and improvements on the existing codebase. Helping validate and write technical documentation in accordance to Finnish and EU standards for medical software.',
        company: 'Vahvero Symbiosis',
        imgPath: '',
        logoPath: '/images/logos/vahSymb.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Software Developer (Ohjelmistosuunnittelija)',
        date: 'December 2025 - Present',
        showGlowCard: false,
        responsibilities: [
            'Conduct meetings with stakeholders in both Finnish (public sector) and English to understand needs, clarify feedback, and ensure solutions support real business and user requirements.',
            'Implement new features and improvements on the existing codebase.',
            'Help validate and write technical documentation in accordance to Finnish and EU standards for medical software.'
        ],
        skills: ['PHP', 'JavaScript', 'JQuery', 'MySQL', 'Technical Documentation']
    },
    {
        review: 'IT Support gigs at HUS / Helsinki University. Offered gig work to prepare the auditorium equipment for PhD thesis defense presentations.',
        company: 'Self-Employed · Freelance',
        imgPath: '',
        logoPath: '/images/logos/HY__LD01_LogoFP_EN_B3____BW.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'IT Support Specialist (Gigs)',
        date: 'May 2025 - Present',
        dates: [
            'May 15th 2025',
            'August 15th 2025',
            'September 5th 2025',
            'October 31st 2025',
            'November 7th 2025',
            'November 28th 2025',
            'December 8th 2025',
            'December 9th 2025',
            'December 10th 2025',
            'December 12th 2025'
        ],
        showGlowCard: true,
        certifications: [
            {
                title: 'Three.js Journey Completion',
                issuer: 'Three.js Journey',
                date: 'October 2024',
                credentialId: '41612',
                credentialUrl: 'https://threejs-journey.com/certificate/view/41612'
            }
        ],
        responsibilities: [
            'Prepare auditoriums for doctoral thesis defenses: set up Zoom for online audiences, configure recording to cloud, connect laptops to projectors, and set up Jabra microphones, external cameras, and remote controls.',
            'Developed a C# tool to organize large folder structures with duplicate filenames—scanning directories, detecting matches, and copying versions with path-based suffixes for comparison.',
            'Operated medical simulation software, controlling mannequin scenarios and managing session flow during lectures.',
            'Provide on-site technical support throughout the duration of events.'
        ],
        skills: ['C#', 'Zoom', 'IT Support', 'Medical Simulation Software']
    },
    {
        review: 'Contract (part-time) at Calevala Interactive Oy, Remote, Finland. Optimized the codebase by identifying unnecessary use of “useEffect” across the project. Enhanced code readability by separating UI from business logic. Fixed bugs reported in QA, identified other bugs, and resolved them. Ensured responsive and accessible experience across the web app. Implemented lazy loading with skeleton loading effects on various components across the dashboard. Re-designed the authentication system using JWTs sent in HTTP-only cookies (access-token), with refresh token logic handled securely in the backend, which allows users to have uninterrupted sessions. Actively participated in team discussions, contributing ideas and technical improvements.',
        company: 'Calevala Interactive Ltd',
        imgPath: '/images/exp1.png',
        logoPath: '/images/logos/calevalaLogo.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Frontend Developer',
        date: 'June 2025 - December 2025',
        showGlowCard: true,
        education: {
            degree: 'Full Stack Development Bootcamp',
            institution: 'Integrify Academy',
            location: 'Helsinki, Finland',
            languageOfInstruction: 'English',
            gpa: '',
            gradingScale: '',
            period: 'October 2024 - January 2025'
        },
        responsibilities: [
            'Migrated CRA project to Vite, reducing initial server startup from over 2 minutes to 300ms.',
            'Switched package manager from npm to yarn and cached dependencies in GitHub Actions to speed up deployments.',
            'Refactored large pages (1000+ lines) into smaller, dedicated components for better readability and maintainability.',
            'Centralized API calls with Axios interceptors for error handling.',
            'Moved business logic to custom hooks with TanStack Query and created dedicated API services.',
            'Reduced unnecessary useEffect usage and applied derived state patterns where applicable.',
            'Re-designed authentication system using JWTs in HTTP-only cookies with secure refresh token logic.',
            'Implemented lazy loading with skeleton effects on dashboard components.',
            'Reviewed pull requests and fixed bugs reported in QA.',
            'Documented endpoints with Swagger and created onboarding documentation for new developers.'
        ],
        skills: [
            'React',
            'JavaScript',
            'CSS',
            'Vite',
            'TanStack Query',
            'Axios',
            'Python',
            'Flask',
            'PostgreSQL'
        ]
    },
    {
        review: 'Internship at Calevala Interactive Oy, Hämeenlinna, Finland. Researched and analyzed auditing tools using online resources and free trials to evaluate their value for potential clients. Prototyped and developed APIs, including WHOIS and Backlinks, to showcase actionable insights for client offerings. Designed and implemented user interfaces with a focus on responsiveness and accessibility, adhering to Web Content Accessibility Guidelines (WCAG 2.1–2.2).',
        company: 'Calevala Interactive Ltd',
        imgPath: '/images/exp2.png',
        logoPath: '/images/logos/calevalaLogo.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Application Developer Intern',
        date: 'October 2023 - January 2024',
        showGlowCard: true,
        education: {
            degree: 'BBA in Business Information Technology (tietojenkäsittely tradenomi)',
            institution: 'Häme University of Applied Sciences (HAMK)',
            location: 'Hämeenlinna, Finland',
            languageOfInstruction: 'Finnish / English',
            gpa: '4.78',
            gradingScale: '0-5',
            period: 'January 2022 - May 2024',
            thesis: {
                topic: 'A Comparative Study of .NET MAUI and Avalonia in Cross-Platform Mobile Application Development',
                description:
                    "A bachelor's thesis comparing two open-source .NET cross-platform application development frameworks. The comparison was done by creating a simple expense tracker application to help understand the development differences, documentation availability and quality, and third party tools available for integration into the apps.",
                publicationUrl: 'https://www.theseus.fi/handle/10024/857200',
                grade: '5/5'
            }
        },
        responsibilities: [
            'Researched and evaluated auditing tools for client use.',
            'Prototyped and developed APIs (WHOIS, Backlinks) for actionable insights.',
            'Designed and implemented responsive, accessible user interfaces (WCAG 2.1–2.2).'
        ],
        skills: ['React', 'JavaScript', 'CSS', 'REST APIs', 'WCAG']
    },
    {
        review: 'Internship at Häme University of Applied Sciences, Hämeenlinna, Finland. Collaborated with the supervisor to define application requirements, translating them into detailed user stories. Created an initial UI concept for the desktop application using Figma, focusing on usability and clarity. Developed functionalities to read and display live data (location, signal strength, time) from a portable LoRa scanner prototype within the application.',
        company: 'Häme University of Applied Sciences',
        imgPath: '/images/exp3.png',
        logoPath: '/images/logos/hamkLogo.jpg',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Student Intern',
        date: 'May 2023 - August 2023',
        showGlowCard: true,
        certifications: [
            {
                title: 'Google Cloud Fundamentals: Core Infrastructure',
                issuer: 'Google',
                date: 'September 2023',
                credentialId: '5206625',
                credentialUrl:
                    'https://www.cloudskillsboost.google/public_profiles/d9b634a8-2d78-472a-8a70-d650b8dfe45d/badges/5206625?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share'
            }
        ],
        responsibilities: [
            'Defined application requirements and user stories with supervisor.',
            'Designed UI concepts in Figma for usability and clarity.',
            'Developed features to read and display live data from LoRa scanner prototype.'
        ],
        skills: ['C#', '.NET', 'Figma', 'LoRa', 'Desktop Development']
    },
    {
        review: 'ICT Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Provided support for Office 365, Lifecare patient information system, AD and Citrix tools, Helpdesk, and TeleQ in a demanding hospital environment.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'ICT Specialist',
        date: 'May 2022 - August 2022',

        responsibilities: [
            'Handled high-priority IT ticket requests for timely resolution.',
            'Managed employee accounts and permissions in AD and LifeCare.',
            'Configured and registered new devices, ensuring readiness for use.',
            'Provided phone support and documented technical solutions.',
            'Supported COVID-19 vaccination centers by recording patient information.',
            'Utilized TeleQ to respond to requests from different departments.'
        ],
        skills: ['Office 365', 'Active Directory', 'Citrix', 'LifeCare', 'TeleQ', 'Helpdesk']
    },
    {
        review: 'Information Services Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Installed and managed mobile devices, managed IDs, handled support requests, corrected COVID certificates, and set up Teams services.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Information Services Specialist',
        date: 'December 2021',
        date2: 'October 2021',
        showGlowCard: true,
        education: {
            degree: 'Vocational Qualification in Information and Communication Technology (datanomi)',
            institution: 'Forssa Vocational Institute (FAI)',
            location: 'Forssa, Finland',
            languageOfInstruction: 'Finnish',
            gpa: '4.82',
            gradingScale: '0-5',
            period: 'August 2019 - December 2021'
        },
        responsibilities: [
            'Installed and managed mobile devices.',
            'Managed IDs (creation and password changes).',
            'Handled support requests and provided assistance.',
            'Corrected COVID certificates as required.',
            'Set up Teams services for users.'
        ],
        skills: ['Microsoft Teams', 'Mobile Device Management', 'Active Directory']
    },
    {
        review: 'Information Services Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Installation and management of mobile devices, account management, support requests, correcting COVID certificates, digital skills instructor, intranet updates, COVID vaccination recording, and TeleQ usage.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.webp',
        imgWidth: '100%',
        imgHeight: 'auto',
        title: 'Information Services Specialist',
        date: 'June 2021 - August 2021',
        date2: 'May 2021 - June 2021 (Internship)',
        responsibilities: [
            'Installation and management of mobile devices.',
            'Account management (creation and password changes).',
            'Managing support requests.',
            'Correcting COVID certificates.',
            'Acted as digital skills instructor in Social Services Integration Project.',
            'Updated intranet (Arabic language).',
            'Recorded COVID vaccinations during events.',
            'Utilized TeleQ to respond to requests from different departments.'
        ],
        skills: ['Mobile Device Management', 'Active Directory', 'TeleQ', 'Digital Training']
    }
]

type ContactInfo = {
    email: string
    socials: {
        name: string
        url: string
        icon: string
    }[]
}

export const contactInfo: ContactInfo = {
    email: 'basil.omsha@gmail.com', // Replace with your actual email
    socials: [
        {
            name: 'GitHub',
            url: 'https://github.com/BasilOmsha',
            icon: '/images/socials/github.webp'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/basil-omsha',
            icon: '/images/socials/linkedin.webp'
        }
    ]
}

type Tech = {
    number: string
    title: string
    href: string
    badges: string[]
    component: string
}

type ProjectLink = {
    type: 'github' | 'deploy'
    url: string
    label: string
    enabled?: boolean
}

export type ProjectChapterProps = {
    index: string
    title: string
    className: string
    imageSrc: string
    imageAlt: string
    techCount: string
    totalDuration: string
    description: string
    technologies: Tech[]
    links?: ProjectLink[]
}

export const projectChapters: ProjectChapterProps[] = [
    {
        index: '01',
        title: 'this.portfolio',
        className: 'project-01',
        imageSrc: 'images/undraw_fishing_n8vg.svg',
        imageAlt: 'Interactive Portfolio Website illustration',
        techCount: '9+ technologies',
        totalDuration: '~4 weeks time',
        description:
            '<p>An immersive portfolio website featuring <strong>3D experiences</strong>, <strong>interactive elements</strong>, and <strong>modern animations</strong>.</p><p>Built with <strong>React</strong>, <strong>TypeScript</strong>, <strong>Three.js</strong>, <strong>WebGL</strong>, <strong>Blender</strong> and <strong>GSAP</strong> for smooth animation.</p><p>Contact functionality is powered by <strong>ASP.NET Core backend</strong> built with <strong>Clean Architecture</strong> principles, with <strong>reCAPTCHA integration</strong> for enhanced security against spam and bot submissions.</p>',
        links: [],
        technologies: [
            {
                number: '01',
                title: 'TSX',
                href: '',
                badges: [''],
                component: 'Sections'
            },
            {
                number: '02',
                title: 'CSS',
                href: '',
                badges: [''],
                component: 'Styling'
            },
            {
                number: '03',
                title: 'Blender',
                href: '',
                badges: ['Core'],
                component: 'Hero 3D Model'
            },
            {
                number: '04',
                title: 'R3F & WebGL',
                href: '#',
                badges: ['Core'],
                component: 'Shader Materials'
            },
            {
                number: '05',
                title: 'TS',
                href: '#',
                badges: [''],
                component: 'Animation / Utilities'
            },
            {
                number: '06',
                title: 'GSAP',
                href: '#',
                badges: [''],
                component: 'Animation'
            },
            {
                number: '07',
                title: 'ASP.NET Core',
                href: '#',
                badges: ['Core'],
                component: 'Backend API'
            },
            {
                number: '08',
                title: 'Clean Architecture',
                href: '#',
                badges: ['Core'],
                component: 'Contact Service'
            },
            {
                number: '09',
                title: 'reCAPTCHA',
                href: '#',
                badges: ['Core'],
                component: 'Form Security'
            }
        ]
    },
    {
        index: '02',
        title: 'Kalibro',
        className: 'project-02',
        imageSrc: '/images/undraw_app-dark-mode_6ji2.svg',
        imageAlt: 'Website audit and optimization platform illustration',
        techCount: '15+ technologies',
        totalDuration: 'Late 2023 - Present (Ongoing)',
        description:
            '<p>A comprehensive website audit and optimization platform that empowers businesses to enhance their online presence through <strong>deep technical insights</strong> and <strong>actionable diagnostics</strong>.</p><p>Originally started as a <strong>school project in collaboration with Calevala Interactive</strong>, it evolved into a full-scale business platform featuring four core audit dimensions: <strong>Technical Analysis</strong> (WHOIS, DNS, SSL, IP geolocation, web stack detection), <strong>Web Diagnostics</strong> (performance metrics like LCP/CLS, WCAG accessibility compliance, SEO essentials, security audits), <strong>UI/UX Audits</strong> (color palette extraction, responsive screenshots, design system analysis), and <strong>Detailed Reports</strong> (Kalibro health scores, competitor comparisons, actionable insights).</p>',
        links: [
            {
                type: 'deploy',
                url: 'https://www.kalibro.io',
                label: 'Under Development 🚧',
                enabled: false
            }
        ],
        technologies: [
            {
                number: '01',
                title: 'JavaScript',
                href: '#',
                badges: [''],
                component: 'Core Language'
            },
            {
                number: '02',
                title: 'Python',
                href: '#',
                badges: [''],
                component: 'Backend Language'
            },
            {
                number: '03',
                title: 'Flask',
                href: '#',
                badges: [''],
                component: 'Backend API'
            },
            {
                number: '04',
                title: 'React',
                href: '#',
                badges: [''],
                component: 'Frontend Dashboard'
            },
            {
                number: '05',
                title: 'Redux',
                href: '#',
                badges: [''],
                component: 'State Management'
            },
            {
                number: '06',
                title: 'AWS',
                href: '#',
                badges: [''],
                component: 'Cloud Hosting'
            },
            {
                number: '07',
                title: 'OAuth & JWT',
                href: '#',
                badges: ['Core'],
                component: 'Authentication'
            },
            {
                number: '08',
                title: 'Stripe',
                href: '#',
                badges: ['Core'],
                component: 'Payment Integration'
            },
            {
                number: '09',
                title: 'WebSockets',
                href: '#',
                badges: ['Core'],
                component: 'Real-time Updates'
            },
            {
                number: '10',
                title: 'Lighthouse API',
                href: '#',
                badges: ['Core'],
                component: 'Performance Audits'
            },
            {
                number: '11',
                title: 'WHOIS/DNS APIs',
                href: '#',
                badges: ['Core'],
                component: 'Domain Analysis'
            },
            {
                number: '12',
                title: 'SSL Certificate APIs',
                href: '#',
                badges: ['Core'],
                component: 'Security Analysis'
            },
            {
                number: '13',
                title: 'Web Scraping',
                href: '#',
                badges: ['Core'],
                component: 'Content Analysis'
            },
            {
                number: '14',
                title: 'Screenshot APIs',
                href: '#',
                badges: ['Core'],
                component: 'Visual Testing'
            },
            {
                number: '15',
                title: 'Color Extraction',
                href: '#',
                badges: ['Core'],
                component: 'Design Analysis'
            }
        ]
    },
    {
        index: '03',
        title: 'Task Management System',
        className: 'project-03',
        imageSrc: '/images/undraw_scrum-board_uqku.svg',
        imageAlt: 'Task management system Kanban board illustration',
        techCount: '10+ technologies',
        totalDuration: '3 weeks development',
        description:
            '<p>A full-stack project management system for organizing <strong>workspaces</strong>, <strong>projects</strong>, and <strong>tasks</strong> with collaborative features.</p><p>Features <strong>drag-and-drop Kanban boards</strong>, <strong>team management</strong>, <strong>role-based permissions</strong>, and real-time updates with comprehensive backend API.</p>',
        links: [
            {
                type: 'github',
                url: 'https://github.com/BasilOmsha/Task_Management_System',
                label: 'GitHub'
            },
            {
                type: 'deploy',
                url: 'https://task-management-system-basel.vercel.app/login',
                label: 'Live Site'
            }
        ],
        technologies: [
            {
                number: '01',
                title: 'ASP.NET Core',
                href: '#',
                badges: [''],
                component: 'Backend API'
            },
            {
                number: '02',
                title: 'PostgreSQL',
                href: '#',
                badges: [''],
                component: 'Database'
            },
            {
                number: '03',
                title: 'Entity Framework',
                href: '#',
                badges: [''],
                component: 'ORM'
            },
            {
                number: '04',
                title: 'JWT Authentication',
                href: '#',
                badges: ['Core'],
                component: 'Security'
            },
            {
                number: '05',
                title: 'React/TypeScript',
                href: '#',
                badges: [''],
                component: 'Frontend'
            },
            {
                number: '06',
                title: 'TanStack Query',
                href: '#',
                badges: [''],
                component: 'Data Fetching'
            },
            {
                number: '07',
                title: 'DND-kit',
                href: '#',
                badges: ['Core'],
                component: 'Drag & Drop'
            },
            {
                number: '08',
                title: 'Azure',
                href: '#',
                badges: [''],
                component: 'Hosting'
            },
            {
                number: '09',
                title: 'GitHub Actions',
                href: '#',
                badges: [''],
                component: 'CI/CD'
            }
        ]
    },
    {
        index: '04',
        title: 'Galaxy Simulator',
        className: 'project-04',
        imageSrc: '/images/undraw_stars_5pgw.svg',
        imageAlt: '3D procedural galaxy simulation illustration',
        techCount: '8+ technologies',
        totalDuration: '~2 Days',
        description:
            '<p>A sophisticated <strong>3D galaxy simulation</strong> built with <strong>Three.js</strong> and <strong>WebGL shaders</strong> featuring procedural generation and real-time physics.</p><p>Implements advanced astrophysics concepts including <strong>spiral arm dynamics</strong>, <strong>log-normal star distribution</strong>, and solutions to the <strong>galactic winding problem</strong>.</p>',
        links: [
            {
                type: 'github',
                url: 'https://github.com/BasilOmsha/Galaxy-Simulator',
                label: 'GitHub'
            },
            {
                type: 'deploy',
                url: 'https://galaxy-simulator-ten.vercel.app/',
                label: 'Live Site'
            }
        ],
        technologies: [
            {
                number: '01',
                title: 'Three.js',
                href: '#',
                badges: [''],
                component: '3D Rendering'
            },
            {
                number: '02',
                title: 'WebGL Shaders',
                href: '#',
                badges: ['Core'],
                component: 'GLSL Rendering'
            },
            {
                number: '03',
                title: 'JavaScript ES6+',
                href: '#',
                badges: [''],
                component: 'Core Logic'
            },
            {
                number: '04',
                title: 'BufferGeometry',
                href: '#',
                badges: ['Core'],
                component: 'Particle Systems'
            },
            {
                number: '05',
                title: 'lil-gui',
                href: '#',
                badges: [''],
                component: 'Debug Controls'
            },
            {
                number: '06',
                title: 'Vite',
                href: '#',
                badges: [''],
                component: 'Build Tool'
            },
            {
                number: '07',
                title: 'Mathematical Utils',
                href: '#',
                badges: ['Core'],
                component: 'Astrophysics'
            },
            {
                number: '08',
                title: 'Factory Pattern',
                href: '#',
                badges: [''],
                component: 'Architecture'
            }
        ]
    },
    {
        index: '05',
        title: 'Haunted House Scene',
        className: 'project-05',
        imageSrc: '/images/undraw_house-searching_g2b8.svg',
        imageAlt: 'Spooky 3D haunted house scene illustration',
        techCount: '9+ technologies',
        totalDuration: '2 Days',
        description:
            '<p>An atmospheric <strong>3D haunted house scene</strong> featuring <strong>procedural geometry creation</strong>, <strong>realistic textures</strong>, and <strong>animated ghost effects</strong>.</p><p>Built with <strong>custom BufferGeometry</strong>, <strong>advanced lighting systems</strong>, <strong>shadow mapping</strong>, and <strong>atmospheric effects</strong> including fog and dynamic sky rendering.</p>',
        links: [
            {
                type: 'github',
                url: 'https://github.com/BasilOmsha/Haunted-House',
                label: 'GitHub'
            },
            {
                type: 'deploy',
                url: 'https://haunted-house-one-ashen.vercel.app/',
                label: 'Live Site'
            }
        ],
        technologies: [
            {
                number: '01',
                title: 'Three.js',
                href: '#',
                badges: [''],
                component: '3D Rendering'
            },
            {
                number: '02',
                title: 'Buffer Geometry',
                href: '#',
                badges: ['Core'],
                component: 'Custom Geometry'
            },
            {
                number: '03',
                title: 'Texture Mapping',
                href: '#',
                badges: ['Core'],
                component: 'Material System'
            },
            {
                number: '04',
                title: 'Shadow Mapping',
                href: '#',
                badges: ['Core'],
                component: 'Lighting Effects'
            },
            {
                number: '05',
                title: 'Sky Shader',
                href: '#',
                badges: ['Core'],
                component: 'Atmospheric Effects'
            },
            {
                number: '06',
                title: 'lil-gui',
                href: '#',
                badges: [''],
                component: 'Debug Interface'
            },
            {
                number: '07',
                title: 'Vite',
                href: '#',
                badges: [''],
                component: 'Build Tool'
            },
            {
                number: '08',
                title: 'Timer Animation',
                href: '#',
                badges: ['Core'],
                component: 'Ghost Movement'
            },
            {
                number: '09',
                title: 'Poly Haven Assets',
                href: '#',
                badges: [''],
                component: 'Texture Library'
            }
        ]
    },
    {
        index: '06',
        title: '.NET MAUI vs Avalonia Cross-Platform Study',
        className: 'project-06',
        imageSrc: '/images/undraw_develop-app_yg6p.svg',
        imageAlt: 'Cross-platform mobile development comparison illustration',
        techCount: '10+ technologies',
        totalDuration: '~3 Months Thesis Work',
        description:
            '<p>A comprehensive <strong>comparative study</strong> of <strong>.NET MAUI</strong> and <strong>Avalonia</strong> frameworks for cross-platform application development.</p><p>Built identical <strong>expense tracker applications</strong> in both frameworks to evaluate <strong>development experience</strong>, <strong>documentation quality</strong>, <strong>third-party integration</strong>, and <strong>cross-platform capabilities</strong>.</p>',
        links: [
            {
                type: 'github',
                url: 'https://github.com/BasilOmsha/Income-Expense-Tracker-MAUI',
                label: 'GitHub (MAUI)'
            },
            {
                type: 'github',
                url: 'https://github.com/BasilOmsha/Income-Expense-Tracker-AVALONIA',
                label: 'GitHub (Avalonia)'
            },
            {
                type: 'deploy',
                url: 'https://www.theseus.fi/handle/10024/857200',
                label: 'Thesis Publication'
            }
        ],
        technologies: [
            {
                number: '01',
                title: '.NET MAUI',
                href: '#',
                badges: [''],
                component: 'Framework'
            },
            {
                number: '02',
                title: 'Avalonia UI',
                href: '#',
                badges: [''],
                component: 'Framework'
            },
            {
                number: '03',
                title: 'C#',
                href: '#',
                badges: [''],
                component: 'Language'
            },
            {
                number: '04',
                title: 'XAML',
                href: '#',
                badges: [''],
                component: 'UI Markup'
            },
            {
                number: '05',
                title: 'SQLite',
                href: '#',
                badges: [''],
                component: 'Local Database'
            },
            {
                number: '06',
                title: 'MVVM Pattern',
                href: '#',
                badges: ['Core'],
                component: 'Architecture'
            },
            {
                number: '07',
                title: 'Data Binding',
                href: '#',
                badges: [''],
                component: 'UI Logic'
            },
            {
                number: '08',
                title: 'Maps Integration',
                href: '#',
                badges: ['Core'],
                component: 'Location Services'
            },
            {
                number: '09',
                title: 'Mapsui',
                href: '#',
                badges: ['Core'],
                component: 'Map Components'
            },
            {
                number: '10',
                title: 'Research Methodology',
                href: '#',
                badges: ['Core'],
                component: 'Academic Analysis'
            }
        ]
    }
]
