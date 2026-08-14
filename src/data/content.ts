/**
 * Every piece of copy on the site lives here so content edits never require
 * touching component code.
 *
 * Client and product names are deliberately generalised — work delivered under
 * commercial contracts is described by capability, not by the customer's name.
 *
 * Every figure quoted in `impact` and in the experience entries comes from
 * Mohit's own CV. Nothing here is estimated or rounded up.
 */

export const profile = {
  name: 'Mohit Parmar',
  firstName: 'Mohit',
  role: 'Senior Full Stack Developer',
  headline: 'React.js · Node.js · TypeScript · AWS · AI-Assisted Development',
  tagline:
    'I build the systems businesses run on — CRMs, HR platforms, compliance tools and trading dashboards — with nearly five years spent shipping them to production.',
  location: 'Ahmedabad, Gujarat, India',
  email: 'mohitparmar9868@gmail.com',
  phone: '+91 9724787742',
  phoneHref: '+919724787742',
  github: 'https://github.com/MohitParmarCoder',
  instagram: 'https://www.instagram.com/mohitparmar_official',
  instagramHandle: 'mohitparmar_official',
  githubUser: 'MohitParmarCoder',
  linkedin: 'https://www.linkedin.com/in/mohitparmar9868',
  linkedinHandle: 'mohitparmar9868',
  resume: 'Mohit_Parmar_Resume.pdf',
  photo: 'profile.jpg',
  /** 4:5 crop for the tall hero tile; the square one is for the avatar and icons. */
  portrait: 'profile-portrait.jpg',
  availability: 'Open to senior full stack roles',
} as const;

export const roleRotation = [
  'Senior Full Stack Developer',
  'React.js Specialist',
  'Node.js & TypeScript Engineer',
  'AWS Serverless Developer',
  'AI-Assisted Development Advocate',
] as const;

export const heroStats = [
  { value: 5, suffix: '', label: 'Years shipping production software' },
  { value: 12, suffix: '+', label: 'Enterprise products delivered' },
  { value: 10, suffix: '', label: 'Industry domains worked in' },
  { value: 2, suffix: '', label: 'Degrees in computer applications' },
] as const;

export const about = {
  intro: [
    "I'm a Full Stack Developer with nearly five years spent building the software businesses actually run on — HR platforms, recruitment pipelines, insurance claim systems, CRMs, compliance tooling and, most recently, a real-time cryptocurrency trading platform.",
    'What I enjoy is the part most people skip: understanding the business problem well enough that the architecture falls out of it naturally. Clean data models, APIs that make sense a year later, and interfaces the people who use them all day do not have to fight.',
    'The largest thing I have built is a no-code application platform — a system that let non-developers assemble working business applications from a drag-and-drop builder, dynamic forms, a workflow engine and a database designer.',
    'I use AI development tools as a genuine part of my workflow — for architecture exploration, debugging, test generation and documentation, not just autocomplete. It is a large part of how I ship as much as I do without cutting corners.',
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

/** Measured outcomes, each one quoted from Mohit's CV. */
export const impact = [
  {
    value: '20–30%',
    label: 'Operational efficiency gained',
    detail:
      'Across the sports, gym and salon management platforms, measured against the manual processes they replaced.',
  },
  {
    value: '30%',
    label: 'Less development time',
    detail:
      'Custom applications assembled on the no-code platform instead of being built from scratch each time.',
  },
  {
    value: '40%',
    label: 'Faster API integration',
    detail:
      'Standardised integration and testing workflow across modules, cutting the time to wire up each new service.',
  },
  {
    value: '25%',
    label: 'Efficiency on large-scale apps',
    detail:
      'CRM, HRMS and e-recruitment platforms, through better data modelling and automated workflows.',
  },
  {
    value: '15%',
    label: 'Team productivity lift',
    detail:
      'Automating routine work — email and SMS notification pipelines that previously ran by hand.',
  },
  {
    value: '3+',
    label: 'Databases tuned for scale',
    detail:
      'PostgreSQL schemas optimised with TypeORM for performance across concurrently running applications.',
  },
] as const;

export type Industry = {
  name: string;
  icon: string;
  blurb: string;
  built: string[];
};

/** The domains the work spans — the breadth is the point of this section. */
export const industries: Industry[] = [
  {
    name: 'Fintech & Trading',
    icon: '📈',
    blurb: 'Real-time market systems where latency and correctness both matter.',
    built: ['Live market data', 'Order execution', 'Portfolio management', 'Trading analytics'],
  },
  {
    name: 'Insurance & Legal',
    icon: '⚖️',
    blurb: 'Document-heavy claim processing built around how law firms actually work.',
    built: ['Claim workflows', 'Case management', 'Document handling', 'Client portal'],
  },
  {
    name: 'Human Resources',
    icon: '👥',
    blurb: 'The full employee lifecycle, from offer letter through payroll.',
    built: ['Payroll', 'Attendance', 'Leave management', 'Employee portal'],
  },
  {
    name: 'Recruitment & Talent',
    icon: '🎯',
    blurb: 'Structured hiring pipelines with candidates moving through defined stages.',
    built: ['Hiring pipeline', 'Candidate tracking', 'Résumé management', 'Interview scheduling'],
  },
  {
    name: 'Sales & CRM',
    icon: '🤝',
    blurb: 'Lead lifecycle and workflow automation from first touch to closed deal.',
    built: ['Lead lifecycle', 'Workflow automation', 'Interaction tracking', 'Pipeline reporting'],
  },
  {
    name: 'Sports & Education',
    icon: '🎓',
    blurb: 'Academy management connecting students, coaches and parents on one schedule.',
    built: ['Student records', 'Coach management', 'Attendance', 'Parent communication'],
  },
  {
    name: 'Health & Fitness',
    icon: '🏋️',
    blurb: 'Membership businesses with recurring billing and access control.',
    built: ['Memberships', 'Subscription billing', 'Attendance', 'Invoicing'],
  },
  {
    name: 'Beauty & Hospitality',
    icon: '💇',
    blurb: 'Counter-speed software — fast enough for staff to use with a client waiting.',
    built: ['Appointment booking', 'Billing', 'Inventory', 'Customer records'],
  },
  {
    name: 'Compliance & Workforce',
    icon: '🛡️',
    blurb: 'Documentation and monitoring that holds up when an audit arrives.',
    built: ['Compliance tracking', 'Document control', 'Operational monitoring'],
  },
  {
    name: 'Developer Platforms',
    icon: '⚙️',
    blurb: 'A no-code builder letting non-developers assemble working applications.',
    built: ['Drag-and-drop builder', 'Workflow engine', 'Database designer', 'Report builder'],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  duration: string;
  current: boolean;
  summary: string;
  metrics: { value: string; label: string }[];
  products: { name: string; points: string[] }[];
  responsibilities: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: 'Enqcode Technologies Pvt. Ltd.',
    role: 'Full Stack Developer',
    period: 'August 2025 — Present',
    duration: 'Current role',
    current: true,
    summary:
      'Building enterprise software across sales automation, legal claim processing and real-time financial trading — React on the front, Node.js and .NET services behind it, AWS serverless underneath.',
    metrics: [
      { value: '3', label: 'Platforms in flight' },
      { value: '2', label: 'Backend stacks integrated' },
      { value: 'Lambda', label: 'Serverless architecture' },
    ],
    products: [
      {
        name: 'Cryptocurrency Trading Platform',
        points: [
          'Real-time market data streaming',
          'Order execution and portfolio management',
          'Trading dashboard with analytics',
        ],
      },
      {
        name: 'Insurance Claim Management',
        points: [
          'Claim processing built for law firm workflows',
          'Document workflows and case management',
          'Dedicated client portal',
        ],
      },
      {
        name: 'Lead Management Platform',
        points: [
          'Lead lifecycle from capture to close',
          'Workflow automation across sales stages',
          'Customer interaction tracking',
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
    duration: '3 years 11 months',
    current: false,
    summary:
      'Delivered a broad portfolio of enterprise products — HR, recruitment, CRM and compliance — alongside a no-code application builder that let non-developers assemble business applications without writing code.',
    metrics: [
      { value: '20–30%', label: 'Efficiency gained' },
      { value: '40%', label: 'Faster integrations' },
      { value: '8+', label: 'Products shipped' },
    ],
    products: [
      {
        name: 'No-Code Application Builder',
        points: [
          'Drag-and-drop UI builder and database designer',
          'Dynamic forms, workflow builder and report builder',
          'Role management and API integration',
        ],
      },
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
        points: ['Student and coach management', 'Attendance and payments', 'Parent communication'],
      },
      {
        name: 'Salon & Gym Management',
        points: [
          'Appointment booking and billing',
          'Inventory and customer management',
          'Membership, subscription and attendance',
        ],
      },
      {
        name: 'Compliance Management',
        points: ['Workforce compliance tracking', 'Documentation management', 'Operational monitoring'],
      },
    ],
    responsibilities: [
      'Designed and deployed full-stack platforms that lifted operational efficiency by 20–30%',
      'Built core modules: recruitment, attendance, billing, expenses, inventory and payroll',
      'Optimised PostgreSQL schemas with TypeORM across 3+ concurrent applications',
      'Integrated payment gateways, Google Maps, cloud storage and communication APIs',
      'Automated UI testing with Playwright and backend testing with Jest',
      'Automated email and SMS notification pipelines, lifting team productivity by 15%',
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
    skills: ['Node.js', 'Express.js', '.NET Integration', 'REST APIs', 'Serverless Framework'],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'Sequelize ORM', 'TypeORM', 'Schema Design'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS Lambda', 'EC2', 'S3', 'CloudFront', 'RDS', 'CI/CD Pipelines'],
  },
  {
    title: 'Testing & Tools',
    icon: 'tool',
    skills: ['Playwright', 'Jest', 'Git', 'GitHub', 'Postman'],
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
  domain: string;
  blurb: string;
  impact?: string;
  features: string[];
  stack: string[];
  status?: string;
  links?: { href: string; label: string }[];
};

export const projects: Project[] = [
  {
    title: 'Cryptocurrency Trading Platform',
    icon: '🚀',
    category: 'Fintech',
    domain: 'Fintech & Trading',
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
    title: 'No-Code Application Builder',
    icon: '⚙️',
    category: 'Platform',
    domain: 'Developer Platforms',
    blurb:
      'The largest product I have worked on — a platform that lets businesses assemble working applications without writing code.',
    impact: 'Cut development time by 30% on custom applications',
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
    title: 'HRMS Platform',
    icon: '🏢',
    category: 'Enterprise',
    domain: 'Human Resources',
    blurb:
      'An enterprise human resource management system covering the full employee lifecycle, from hiring through payroll.',
    impact: 'Part of the platform set that lifted efficiency by 25%',
    features: ['Payroll', 'Attendance', 'Leave management', 'Recruitment', 'Employee portal'],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'TypeORM'],
  },
  {
    title: 'Lead Management System',
    icon: '📊',
    category: 'Enterprise',
    domain: 'Sales & CRM',
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
    domain: 'Insurance & Legal',
    blurb:
      'An enterprise application for legal firms handling insurance claims, built around document-heavy case workflows.',
    features: ['Claim processing', 'Document workflows', 'Case management', 'Client portal'],
    stack: ['React.js', '.NET APIs', 'AWS'],
  },
  {
    title: 'E-Recruitment Platform',
    icon: '🎯',
    category: 'Enterprise',
    domain: 'Recruitment & Talent',
    blurb:
      'A hiring platform that moves candidates through a structured pipeline, with résumé handling and scheduling built in.',
    features: ['Hiring pipeline', 'Candidate tracking', 'Résumé management', 'Interview scheduling'],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Sports Academy CRM',
    icon: '🎓',
    category: 'CRM',
    domain: 'Sports & Education',
    blurb:
      'A management solution for sports academies, connecting students, coaches and parents around a shared schedule.',
    impact: 'Improved day-to-day operational efficiency by 20–30%',
    features: ['Student and coach management', 'Attendance', 'Payments', 'Parent communication'],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'Razorpay'],
  },
  {
    title: 'Salon Management CRM',
    icon: '💇',
    category: 'CRM',
    domain: 'Beauty & Hospitality',
    blurb:
      'Appointment, billing and customer management for salons, designed for staff who need it to be fast at the counter.',
    impact: 'Improved day-to-day operational efficiency by 20–30%',
    features: ['Appointment booking', 'Billing', 'Inventory', 'Customer management'],
    stack: ['React.js', 'Node.js', 'MySQL'],
  },
  {
    title: 'Gym Management Software',
    icon: '🏋️',
    category: 'CRM',
    domain: 'Health & Fitness',
    blurb:
      'Membership and attendance management with recurring subscription billing for fitness businesses.',
    impact: 'Improved day-to-day operational efficiency by 20–30%',
    features: ['Membership', 'Subscription billing', 'Attendance', 'Invoicing'],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Compliance Management Platform',
    icon: '🛡️',
    category: 'Enterprise',
    domain: 'Compliance & Workforce',
    blurb:
      'Workforce compliance tracking with the documentation and operational monitoring that audits depend on.',
    features: ['Workforce compliance', 'Documentation control', 'Operational monitoring'],
    stack: ['React.js', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'PixelNova Studios',
    icon: '🎨',
    category: 'Personal',
    domain: 'Personal R&D',
    blurb:
      'A full-stack JavaScript project I built to explore end-to-end React and Node application structure outside of client work.',
    features: ['React front end', 'Node.js backend', 'Full-stack data flow', 'Personal R&D project'],
    stack: ['React.js', 'Node.js', 'JavaScript'],
    links: [
      { href: 'https://mohitparmarcoder.github.io/pixelnova-studios/', label: 'Live site' },
      { href: 'https://github.com/MohitParmarCoder/pixelnova-studios', label: 'Source' },
    ],
  },
  {
    title: 'Personal Portfolio Website',
    icon: '🌐',
    category: 'Personal',
    domain: 'Personal R&D',
    blurb:
      'This site — a static React and TypeScript single page application, built with Vite and deployed to GitHub Pages through GitHub Actions.',
    features: [
      'React 18 + TypeScript',
      'Zero-dependency animations',
      'Fully responsive, dark and light themes',
      'Automated deployment pipeline',
    ],
    stack: ['React.js', 'TypeScript', 'Vite', 'GitHub Actions'],
    links: [
      { href: 'https://github.com/MohitParmarCoder/Personal-Portfolio-Mohit-Parmar', label: 'Source' },
    ],
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

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * The blog is a set of static pages generated by scripts/build-blog.mjs, not a
 * SPA section — so it lives outside navLinks, whose ids drive scroll tracking.
 */
export const writingLink = { href: 'writing/', label: 'Writing' } as const;
