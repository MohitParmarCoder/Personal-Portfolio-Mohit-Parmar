/**
 * Every piece of copy on the site lives here so content edits never require
 * touching component code.
 *
 * Client and product names are deliberately generalised — work delivered under
 * commercial contracts is described by capability, not by the customer's name.
 */

export const profile = {
  name: 'Mohit Parmar',
  role: 'Senior Full Stack Developer',
  headline: 'React.js · Node.js · TypeScript · AWS · AI-Assisted Development',
  tagline:
    'Building scalable web applications, business automation platforms, CRM systems and modern SaaS products with nearly 5 years of professional experience.',
  location: 'Ahmedabad, Gujarat, India',
  email: 'mohitparmar9868@gmail.com',
  phone: '+91 9724787742',
  phoneHref: '+919724787742',
  github: 'https://github.com/MohitParmarCoder',
  githubUser: 'MohitParmarCoder',
  linkedin: 'https://www.linkedin.com/in/mohit-parmar-729717185',
  linkedinLabel: 'linkedin.com/in/mohit-parmar-729717185',
  resume: 'Mohit_Parmar_Resume.pdf',
  availability: 'Open to senior full stack roles',
} as const;

export const heroStats = [
  { value: '5', suffix: 'yrs', label: 'Professional experience' },
  { value: '10', suffix: '+', label: 'Products shipped' },
  { value: '8', suffix: '+', label: 'Industry domains' },
  { value: '2', suffix: '', label: 'Degrees in computing' },
] as const;

export const about = {
  intro: [
    "I'm a Full Stack Developer with nearly five years of experience building scalable business applications across HRMS, recruitment, insurance, sports management, hospitality, compliance, cryptocurrency and CRM.",
    'I enjoy designing clean architectures, solving genuinely awkward business problems, building interfaces people actually understand, and writing backends that hold up under load.',
    'My work has ranged from enterprise HR platforms to a no-code application builder and, most recently, a real-time cryptocurrency trading system.',
    'I believe in continuous learning, and I use AI development tools as a daily part of my workflow — for architecture exploration, debugging, testing and documentation, not just code generation.',
  ],
  summary:
    'Results-driven Full Stack Developer experienced in delivering enterprise-grade web applications with modern JavaScript. Comfortable leading development efforts, mentoring junior developers, designing scalable architectures and shipping production-ready software.',
  highlights: [
    'Enterprise application delivery',
    'Scalable architecture design',
    'Performance optimisation',
    'Mentoring & code review',
    'Product-minded engineering',
    'AI-driven development workflow',
  ],
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  current: boolean;
  summary: string;
  products: { name: string; points: string[] }[];
  responsibilities: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: 'Enqcode Technologies Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'August 2025 — Present',
    current: true,
    summary:
      'Building enterprise software across sales automation, legal claim processing and real-time financial trading, on a React front end with Node.js, .NET and AWS serverless behind it.',
    products: [
      {
        name: 'Lead Management Platform',
        points: [
          'Lead lifecycle management from capture to close',
          'Workflow automation across sales stages',
          'Customer interaction tracking and activity history',
        ],
      },
      {
        name: 'Insurance Claim Management System',
        points: [
          'Claim processing built for law firm workflows',
          'Document workflows and case management',
          'Dedicated client portal',
        ],
      },
      {
        name: 'Cryptocurrency Trading Platform',
        points: [
          'Real-time market data streaming',
          'Order execution and portfolio management',
          'Trading dashboard with analytics',
        ],
      },
    ],
    responsibilities: [
      'React front-end development for complex, data-dense screens',
      'Node.js backend development and .NET API integration',
      'Serverless backends on AWS Lambda with optimised database access',
      'Third-party payment and market data API integration',
      'Performance optimisation and code review',
      'Mentoring junior developers on engineering practice',
    ],
    stack: ['React.js', 'TypeScript', 'Node.js', '.NET APIs', 'AWS Lambda', 'PostgreSQL'],
  },
  {
    company: 'Karvish Enterprise Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'August 2021 — July 2025',
    current: false,
    summary:
      'Delivered a broad portfolio of enterprise products — HR, recruitment, CRM and compliance — alongside a no-code application builder that let non-developers assemble business applications.',
    products: [
      {
        name: 'HRMS Platform',
        points: [
          'Employee management and employee portal',
          'Payroll, attendance and leave management',
          'Recruitment pipeline',
        ],
      },
      {
        name: 'E-Recruitment Platform',
        points: [
          'Hiring pipeline and candidate tracking',
          'Résumé management',
          'Interview scheduling',
        ],
      },
      {
        name: 'Sports Academy CRM',
        points: [
          'Student and coach management',
          'Attendance and payments',
          'Parent communication',
        ],
      },
      {
        name: 'Salon & Gym Management CRM',
        points: [
          'Appointment booking and billing',
          'Inventory and customer management',
          'Membership, subscription and attendance',
        ],
      },
      {
        name: 'Compliance Management Platform',
        points: [
          'Workforce compliance tracking',
          'Documentation management',
          'Operational monitoring',
        ],
      },
      {
        name: 'No-Code / Low-Code Application Builder',
        points: [
          'Drag-and-drop UI builder and database designer',
          'Dynamic forms, workflow builder and report builder',
          'Role management and API integration',
        ],
      },
    ],
    responsibilities: [
      'Designed and deployed full-stack platforms that lifted operational efficiency by 20–30%',
      'Built core modules: recruitment, attendance, billing, expenses, inventory and payroll',
      'Optimised PostgreSQL schemas with TypeORM across multiple applications',
      'Integrated payment gateways, Google Maps, cloud storage and communication APIs',
      'Automated UI testing with Playwright and backend testing with Jest',
      'Built role-based dashboards and reporting for service businesses',
    ],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'TypeORM', 'Sequelize', 'Playwright', 'Jest'],
  },
];

export type SkillGroup = { title: string; icon: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'layout',
    skills: [
      'React.js',
      'JavaScript (ES6+)',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'Responsive Design',
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      'Node.js',
      'Express.js',
      '.NET Integration',
      'REST APIs',
      'Serverless Framework',
    ],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'Sequelize ORM', 'TypeORM', 'Schema Design'],
  },
  {
    title: 'Cloud',
    icon: 'cloud',
    skills: ['AWS Lambda', 'EC2', 'S3', 'CloudFront', 'RDS', 'CI/CD Pipelines'],
  },
  {
    title: 'Tools & Testing',
    icon: 'tool',
    skills: ['Git', 'GitHub', 'Postman', 'Playwright', 'Jest'],
  },
  {
    title: 'AI-Assisted Development',
    icon: 'spark',
    skills: ['GitHub Copilot', 'Claude Code', 'Cursor AI', 'Amazon Q', 'Codex'],
  },
];

export const techStack = [
  'React.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MySQL',
  'TypeORM',
  'Sequelize',
  'AWS Lambda',
  'Amazon S3',
  'CloudFront',
  'Amazon RDS',
  'EC2',
  'Serverless',
  'REST APIs',
  '.NET',
  'HTML5',
  'CSS3',
  'Bootstrap',
  'Vite',
  'Git',
  'GitHub',
  'Postman',
  'Playwright',
  'Jest',
  'Razorpay',
  'Google Maps',
] as const;

export type Project = {
  title: string;
  icon: string;
  category: 'Fintech' | 'Enterprise' | 'CRM' | 'Platform' | 'Personal';
  blurb: string;
  features: string[];
  stack: string[];
  status?: string;
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    title: 'Cryptocurrency Trading Platform',
    icon: '🚀',
    category: 'Fintech',
    blurb:
      'A modern trading platform with live market data, portfolio management and order execution, built for speed under constantly changing data.',
    features: [
      'Real-time market data streaming',
      'Order execution engine',
      'Portfolio management',
      'Trading dashboard and analytics',
    ],
    stack: ['React.js', 'Node.js', '.NET', 'AWS'],
    status: 'In development',
  },
  {
    title: 'HRMS Platform',
    icon: '🏢',
    category: 'Enterprise',
    blurb:
      'An enterprise human resource management system covering the full employee lifecycle, from hiring through payroll.',
    features: ['Payroll', 'Attendance', 'Leave management', 'Recruitment', 'Employee portal'],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'TypeORM'],
  },
  {
    title: 'Lead Management System',
    icon: '📈',
    category: 'Enterprise',
    blurb:
      'A sales pipeline and workflow automation platform that tracks every customer interaction from first touch to closed deal.',
    features: [
      'Lead lifecycle management',
      'Workflow automation',
      'Interaction tracking',
      'Pipeline reporting',
    ],
    stack: ['React.js', 'Node.js', 'AWS Lambda'],
  },
  {
    title: 'Insurance Claim Management',
    icon: '⚖️',
    category: 'Enterprise',
    blurb:
      'An enterprise application for legal firms handling insurance claims, built around document-heavy case workflows.',
    features: ['Claim processing', 'Document workflows', 'Case management', 'Client portal'],
    stack: ['React.js', '.NET APIs', 'AWS'],
  },
  {
    title: 'No-Code Application Builder',
    icon: '⚙️',
    category: 'Platform',
    blurb:
      'The largest product I have worked on — a platform that lets businesses assemble working applications without writing code.',
    features: [
      'Drag-and-drop UI builder',
      'Dynamic forms and workflow builder',
      'Database designer',
      'Role management and API integration',
      'Report builder',
    ],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'E-Recruitment Platform',
    icon: '🧑‍💼',
    category: 'Enterprise',
    blurb:
      'A hiring platform that moves candidates through a structured pipeline, with résumé handling and scheduling built in.',
    features: [
      'Hiring pipeline',
      'Candidate tracking',
      'Résumé management',
      'Interview scheduling',
    ],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Sports Academy CRM',
    icon: '🎓',
    category: 'CRM',
    blurb:
      'A management solution for sports academies, connecting students, coaches and parents around a shared schedule.',
    features: [
      'Student and coach management',
      'Attendance',
      'Payments',
      'Parent communication',
    ],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'Razorpay'],
  },
  {
    title: 'Salon Management CRM',
    icon: '💇',
    category: 'CRM',
    blurb:
      'Appointment, billing and customer management for salons, designed for staff who need it to be fast at the counter.',
    features: ['Appointment booking', 'Billing', 'Inventory', 'Customer management'],
    stack: ['React.js', 'Node.js', 'MySQL'],
  },
  {
    title: 'Gym Management Software',
    icon: '🏋️',
    category: 'CRM',
    blurb:
      'Membership and attendance management with recurring subscription billing for fitness businesses.',
    features: ['Membership', 'Subscription billing', 'Attendance', 'Invoicing'],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Compliance Management Platform',
    icon: '🛡️',
    category: 'Enterprise',
    blurb:
      'Workforce compliance tracking with the documentation and operational monitoring that audits depend on.',
    features: ['Workforce compliance', 'Documentation control', 'Operational monitoring'],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'PixelNova Studios',
    icon: '🎨',
    category: 'Personal',
    blurb:
      'A full-stack JavaScript project I built to explore end-to-end React and Node application structure outside of client work.',
    features: [
      'React front end',
      'Node.js backend',
      'Full-stack data flow',
      'Personal R&D project',
    ],
    stack: ['React.js', 'Node.js', 'JavaScript'],
    link: {
      href: 'https://github.com/MohitParmarCoder/pixelnova-studios',
      label: 'View on GitHub',
    },
  },
  {
    title: 'Personal Portfolio Website',
    icon: '🌐',
    category: 'Personal',
    blurb:
      'This site — a static React and TypeScript single page application, built with Vite and deployed to GitHub Pages through GitHub Actions.',
    features: [
      'React 18 + TypeScript',
      'Zero-dependency animations',
      'Fully responsive, dark and light themes',
      'Automated deployment pipeline',
    ],
    stack: ['React.js', 'TypeScript', 'Vite', 'GitHub Actions'],
    link: {
      href: 'https://github.com/MohitParmarCoder/Personal-Portfolio-Mohit-Parmar',
      label: 'View source',
    },
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  detail: string;
  kind: 'work' | 'education';
};

export const timeline: TimelineEntry[] = [
  {
    period: 'Aug 2025 — Present',
    title: 'Full Stack Developer',
    place: 'Enqcode Technologies Pvt. Ltd.',
    detail:
      'Lead management, insurance claim processing and a real-time cryptocurrency trading platform. Mentoring developers and running code reviews.',
    kind: 'work',
  },
  {
    period: 'Aug 2021 — Jul 2025',
    title: 'Full Stack Developer',
    place: 'Karvish Enterprise Pvt. Ltd.',
    detail:
      'HRMS, e-recruitment, CRM and compliance products, plus a no-code application builder used to spin up business applications quickly.',
    kind: 'work',
  },
  {
    period: '2021 — 2023',
    title: 'Master of Computer Applications (MCA)',
    place: 'Gujarat Technological University, Ahmedabad',
    detail: 'CGPA 8.0',
    kind: 'education',
  },
  {
    period: '2018 — 2021',
    title: 'Bachelor of Computer Applications (BCA)',
    place: 'Gujarat University, Ahmedabad',
    detail: 'CGPA 7.5',
    kind: 'education',
  },
];

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'Gujarat Technological University',
    period: '2021 — 2023',
    grade: 'CGPA 8.0',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Gujarat University',
    period: '2018 — 2021',
    grade: 'CGPA 7.5',
  },
] as const;

export const services = [
  {
    icon: '🏗️',
    title: 'Enterprise Web Applications',
    text: 'Large, multi-role business systems that stay maintainable as requirements grow.',
  },
  {
    icon: '📦',
    title: 'SaaS Product Development',
    text: 'Multi-tenant products from first architecture decision through to production release.',
  },
  {
    icon: '🔌',
    title: 'REST API Development',
    text: 'Well-structured APIs with sensible contracts, validation and documentation.',
  },
  {
    icon: '⚛️',
    title: 'React UI Development',
    text: 'Reusable component architectures and interfaces that stay fast with real data volumes.',
  },
  {
    icon: '🗄️',
    title: 'Database Design',
    text: 'PostgreSQL and MySQL schema design, query tuning and ORM modelling.',
  },
  {
    icon: '☁️',
    title: 'AWS Cloud Applications',
    text: 'Serverless backends on Lambda, with S3, RDS, CloudFront and EC2.',
  },
  {
    icon: '🤝',
    title: 'CRM & HRMS Development',
    text: 'Domain-specific platforms for HR, recruitment and customer relationship management.',
  },
  {
    icon: '⚡',
    title: 'Business Automation',
    text: 'Workflow engines and integrations that remove repetitive manual work.',
  },
  {
    icon: '🤖',
    title: 'AI-Assisted Development',
    text: 'Bringing AI tooling into a team workflow for real throughput and quality gains.',
  },
];

export const whyHireMe = [
  'Nearly 5 years of professional experience',
  'Full stack expertise across the whole delivery path',
  'Enterprise application development',
  'Scalable architecture design',
  'Performance optimisation',
  'Team collaboration and mentoring',
  'Strong problem solving',
  'AI-driven development workflow',
  'Product mindset, not just ticket delivery',
  'Clean code and engineering best practices',
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const;
