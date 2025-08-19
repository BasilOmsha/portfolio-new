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
    title: string
    date: string
    date2?: string
    responsibilities: string[]
    showGlowCard?: boolean
    education?: Education
    certifications?: Certification[]
}

export const expCards: ExperienceCard[] = [
    {
        review: 'Contract (part-time) at Calevala Interactive Oy, Remote, Finland. Optimized the codebase by identifying unnecessary use of “useEffect” across the project. Enhanced code readability by separating UI from business logic. Fixed bugs reported in QA, identified other bugs, and resolved them. Ensured responsive and accessible experience across the web app. Implemented lazy loading with skeleton loading effects on various components across the dashboard. Re-designed the authentication system using JWTs sent in HTTP-only cookies (access-token), with refresh token logic handled securely in the backend, which allows users to have uninterrupted sessions. Actively participated in team discussions, contributing ideas and technical improvements.',
        company: 'Calevala Interactive Ltd',
        imgPath: '/images/exp1.png',
        logoPath: '/images/logos/calevalaLogo.png',
        title: 'Frontend Developer',
        date: 'June 2025 - Present',
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
            'Optimized codebase by identifying unnecessary use of useEffect across the project.',
            'Enhanced code readability by separating UI from business logic.',
            'Fixed bugs reported in a QA report, identified other bugs and resolved them.',
            'Ensured responsive and accessible experience across the web app.',
            'Implemented lazy loading with skeleton loading effects on dashboard components.',
            'Re-designed authentication system using JWTs in HTTP-only cookies and secure refresh token logic.',
            'Actively participated in team discussions, contributing ideas and technical improvements.'
        ]
    },
    {
        review: 'Provided IT support for a PhD thesis defense event at Helsinki University, ensuring all technical aspects of the auditorium were prepared and functional.',
        company: 'University of Helsinki',
        imgPath: '',
        logoPath: '/images/logos/HY__LD02_LogoFV_EN_B3____BW.png',
        title: 'IT Support Gig',
        date2: 'August 15th 2025',
        date: 'May 15th 2025',
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
            'Set up and tested Zoom conferencing for a PhD defense, including camera and microphone configuration.',
            'Prepared the auditorium by connecting the laptop to the projector and ensuring all adapters and chargers were available.',
            'Configured the MacBook, checked internet connectivity, and restarted the device if needed.',
            'Connected camera and Jabra conference microphone via USB adapters and extension cables, and positioned equipment for optimal coverage.',
            'Launched PowerPoint presentation and Zoom, selected correct camera (BCC950 Conferencecam) and microphone (Jabra) in Zoom.',
            'Enabled "Record to Cloud" in Zoom, adjusted security settings, and renamed participant as required.',
            'Shared full-screen PowerPoint presentation via Zoom, tested remote control for slide changes.',
            'Verified Zoom stream visibility on mobile device using provided Meeting ID and Passcode.'
        ]
    },
    {
        review: 'Internship at Calevala Interactive Oy, Hämeenlinna, Finland. Researched and analyzed auditing tools using online resources and free trials to evaluate their value for potential clients. Prototyped and developed APIs, including WHOIS and Backlinks, to showcase actionable insights for client offerings. Designed and implemented user interfaces with a focus on responsiveness and accessibility, adhering to Web Content Accessibility Guidelines (WCAG 2.1–2.2).',
        company: 'Calevala Interactive Ltd',
        imgPath: '/images/exp2.png',
        logoPath: '/images/logos/calevalaLogo.png',
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
        ]
    },
    {
        review: 'Internship at Häme University of Applied Sciences, Hämeenlinna, Finland. Collaborated with the supervisor to define application requirements, translating them into detailed user stories. Created an initial UI concept for the desktop application using Figma, focusing on usability and clarity. Developed functionalities to read and display live data (location, signal strength, time) from a portable LoRa scanner prototype within the application.',
        company: 'Häme University of Applied Sciences',
        imgPath: '/images/exp3.png',
        logoPath: '/images/logos/hamkLogo.jpg',
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
        ]
    },
    {
        review: 'ICT Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Provided support for Office 365, Lifecare patient information system, AD and Citrix tools, Helpdesk, and TeleQ in a demanding hospital environment.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.jpeg',
        title: 'ICT Specialist',
        date: 'May 2022 - August 2022',

        responsibilities: [
            'Handled high-priority IT ticket requests for timely resolution.',
            'Managed employee accounts and permissions in AD and LifeCare.',
            'Configured and registered new devices, ensuring readiness for use.',
            'Provided phone support and documented technical solutions.',
            'Supported COVID-19 vaccination centers by recording patient information.',
            'Utilized TeleQ to respond to requests from different departments.'
        ]
    },
    {
        review: 'Information Services Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Installed and managed mobile devices, managed IDs, handled support requests, corrected COVID certificates, and set up Teams services.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.jpeg',
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
        ]
    },
    {
        review: 'Information Services Specialist at Welfare District of Forssa (FSHKY), Forssa, Finland. Installation and management of mobile devices, account management, support requests, correcting COVID certificates, digital skills instructor, intranet updates, COVID vaccination recording, and TeleQ usage.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.jpeg',
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
        ]
    }
    // SUMMARY VERSION (commented out)
    /*
    {
        review: 'Various roles at Welfare District of Forssa (FSHKY), Forssa, Finland. ICT Specialist, Information Services Specialist, and Intern. Provided support for Office 365, Lifecare, AD, Citrix, Helpdesk, mobile devices, account management, COVID certificate correction, digital skills instruction, intranet updates, and COVID vaccination recording.',
        company: 'FSHKY – Welfare District of Forssa',
        imgPath: '/images/exp4.png',
        logoPath: '/images/logos/fshky_logo.jpeg',
        title: 'ICT Specialist / Information Services Specialist / Intern',
        date: 'May 2021 - August 2022',
        responsibilities: [
            'Provided support for Office 365, Lifecare, AD, Citrix, and Helpdesk.',
            'Installed and managed mobile devices.',
            'Account management (creation and password changes).',
            'Corrected COVID certificates.',
            'Acted as digital skills instructor in Social Services Integration Project.',
            'Updated intranet (Arabic language).',
            'Recorded COVID vaccinations during events.',
            'Learned information management department operations.'
        ]
    },
    */
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
            icon: '/images/socials/github.png'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/basil-omsha',
            icon: '/images/socials/linkedin.png'
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
    githubUrl?: string
    githubUrls?: { label: string; url: string }[]
    deployedUrl?: string
}

export const projectChapters: ProjectChapterProps[] = [
    {
        index: '01',
        title: 'Portfolio (this)',
        className: 'project-01',
        imageSrc: 'images/chapter-01.webp',
        imageAlt: 'Interactive Portfolio Website illustration',
        techCount: '5+ technologies',
        totalDuration: '~4 weeks time',
        description:
            'An immersive portfolio website featuring <strong>3D experiences</strong>, <strong>interactive elements</strong>, and <strong>modern animations</strong>.<br />Built with <strong>React</strong>, <strong>TypeScript</strong>, <strong>Three.js</strong>, <strong>WebGL</strong>, <strong>Blender</strong> and <strong>GSAP</strong> for smooth animation.',
        githubUrl: '',
        deployedUrl: '',
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
            }
        ]
    },
    {
        index: '02',
        title: 'Kalibro.io',
        className: 'project-02',
        imageSrc: '/images/chapter-01.webp',
        imageAlt: 'Website audit and optimization platform illustration',
        techCount: '15+ technologies',
        totalDuration: 'Late 2023 - Present (Ongoing)',
        description:
            'A comprehensive website audit and optimization platform that empowers businesses to enhance their online presence through <strong>deep technical insights</strong> and <strong>actionable diagnostics</strong>.<br />Features multi-dimensional audits across <strong>SEO</strong>, <strong>accessibility</strong>, <strong>performance</strong>, <strong>security</strong>, and more with integrated business dashboard.',
        deployedUrl: 'https://www.kalibro.io',
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
            }
        ]
    },
    {
        index: '03',
        title: 'Task Management System',
        className: 'project-03',
        imageSrc: '/images/chapter-01.webp',
        imageAlt: 'Task management system Kanban board illustration',
        techCount: '10+ technologies',
        totalDuration: '3 weeks development',
        description:
            'A full-stack project management system for organizing <strong>workspaces</strong>, <strong>projects</strong>, and <strong>tasks</strong> with collaborative features.<br />Features <strong>drag-and-drop Kanban boards</strong>, <strong>team management</strong>, <strong>role-based permissions</strong>, and real-time updates with comprehensive backend API.',
        githubUrl: 'https://github.com/BasilOmsha/Task_Management_System',
        deployedUrl: 'https://task-management-system-basel.vercel.app/login',
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
        imageSrc: '/images/chapter-01.webp',
        imageAlt: '3D procedural galaxy simulation illustration',
        techCount: '8+ technologies',
        totalDuration: '~2 Days',
        description:
            'A sophisticated <strong>3D galaxy simulation</strong> built with <strong>Three.js</strong> and <strong>WebGL shaders</strong> featuring procedural generation and real-time physics.<br />Implements advanced astrophysics concepts including <strong>spiral arm dynamics</strong>, <strong>log-normal star distribution</strong>, and solutions to the <strong>galactic winding problem</strong>.',
        githubUrl: 'https://github.com/BasilOmsha/Galaxy-Simulator',
        deployedUrl: 'https://galaxy-simulator-ten.vercel.app/',
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
        imageSrc: '/images/chapter-01.webp',
        imageAlt: 'Spooky 3D haunted house scene illustration',
        techCount: '9+ technologies',
        totalDuration: '2 Days',
        description:
            'An atmospheric <strong>3D haunted house scene<strong> featuring <strong>procedural geometry creation<strong>, <strong>realistic textures<strong>, and <strong>animated ghost effects<strong>.<br />Built with <strong>custom BufferGeometry<strong>, <strong>advanced lighting systems<strong>, <strong>shadow mapping<strong>, and <strong>atmospheric effects<strong> including fog and dynamic sky rendering.',
        githubUrl: 'https://github.com/BasilOmsha/Haunted-House',
        deployedUrl: 'https://haunted-house-one-ashen.vercel.app/',
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
                title: 'BufferGeometry',
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
        title: 'Cross-Platform Framework Thesis',
        className: 'project-06',
        imageSrc: '/images/chapter-01.webp',
        imageAlt: 'Cross-platform mobile development framework comparison illustration',
        techCount: '12+ technologies',
        totalDuration: "Bachelor's Thesis (Academic Research)",
        description:
            'A comprehensive <strong>academic thesis</strong> comparing <strong>.NET MAUI</strong> and <strong>Avalonia</strong> frameworks for cross-platform mobile development.<br />Features two complete <strong>Income-Expense Tracker applications</strong> with <strong>geolocation mapping</strong>, <strong>Realm database</strong>, <strong>MVVM architecture</strong>, and detailed framework evaluation including documentation quality, third-party ecosystem, and development experience analysis.',
        githubUrls: [
            {
                label: 'MAUI Version',
                url: 'https://github.com/BasilOmsha/Income-Expense-Tracker-MAUI'
            },
            {
                label: 'Avalonia Version',
                url: 'https://github.com/BasilOmsha/Income-Expense-Tracker-AVALONIA'
            }
        ],
        deployedUrl: 'https://www.theseus.fi/handle/10024/857200',
        technologies: [
            {
                number: '01',
                title: '.NET MAUI',
                href: '#',
                badges: ['Core'],
                component: 'Framework A'
            },
            {
                number: '02',
                title: 'Avalonia UI',
                href: '#',
                badges: ['Core'],
                component: 'Framework B'
            },
            {
                number: '03',
                title: 'C# & .NET 8',
                href: '#',
                badges: [''],
                component: 'Core Language'
            },
            {
                number: '04',
                title: 'MVVM Pattern',
                href: '#',
                badges: ['Core'],
                component: 'Architecture'
            },
            {
                number: '05',
                title: 'Realm Database',
                href: '#',
                badges: ['Core'],
                component: 'Local Storage'
            },
            {
                number: '06',
                title: 'CommunityToolkit.Mvvm',
                href: '#',
                badges: [''],
                component: 'MVVM Framework'
            },
            {
                number: '07',
                title: 'Geolocation API',
                href: '#',
                badges: ['Core'],
                component: 'Location Services'
            },
            {
                number: '08',
                title: 'Mapsui',
                href: '#',
                badges: ['Core'],
                component: 'Map Integration'
            },
            {
                number: '09',
                title: 'Cross-Platform',
                href: '#',
                badges: ['Core'],
                component: 'Multi-Device Support'
            },
            {
                number: '10',
                title: 'Academic Research',
                href: '#',
                badges: ['Core'],
                component: 'Framework Analysis'
            }
        ]
    }
]
