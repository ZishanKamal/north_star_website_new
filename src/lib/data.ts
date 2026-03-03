// North Star Academy — Website Content Data (Redesigned for Institutional Focus)
// Core Theme: "Developing Leaders, Empowering Institutions — From Classrooms to Careers"

export const siteConfig = {
  name: "North Star Academy",
  tagline: "Developing Leaders, Empowering Institutions",
  subtitle: "From Classrooms to Careers",
  description:
    "North Star partners with schools and colleges \u2014 while also empowering individual learners \u2014 to deliver transformative learning experiences that integrate emotional intelligence, technical excellence, and career readiness, with a strong mission to enhance employability and unlock opportunities in Tier-II cities.",
  url: "https://northstaronline.in",
  email: "connect@northstaronline.in",
  phone: "+91 9241959311",
  address: {
    line1: "01 4th Floor, Rali Grand Mall",
    line2: "Main Road, Ranchi 834001",
    state: "Jharkhand",
    country: "India",
    full: "01 4th Floor, Rali Grand Mall, Main Road, Ranchi 834001 (Jharkhand)",
  },
  hours: {
    weekdays: "Monday - Saturday: 9:30 AM - 6:30 PM",
    saturday: "Sunday: 10:00 AM - 2:00 PM",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/NorthStarAcademi/",
    instagram: "https://www.instagram.com/northstaracademi/?hl=en",
    linkedin: "https://www.linkedin.com/company/northstaronline/?viewAsMember=true",
    pinterest: "https://in.pinterest.com/NorthStarAcademy24/",
  },
  externalLinks: {
    careerCounselling: "https://northstaracademy.allegiance-educare.in/",
    freeDemo: "/contact",
  },
};

// --- TEAM & MENTORS ---

export const founder = {
  name: "Nadeem Akhter",
  title: "Chief Coach & Trainer",
  bio: "MIT, Ph.D. holder with 20+ years of Global IT Industry Experience. Certified Emotional Intelligence Life Coach and Cognitive Behavioural Therapy Practitioner.",
  credentials: [
    "MIT, Ph.D.",
    "Certified Emotional Intelligence Life Coach",
    "Certified Cognitive Behavioural Therapy Practitioner",
    "20+ years of Global IT Industry Experience",
  ],
  image: "/images/founder.png",
  message: "Greetings from North Star Academy! I hope this message finds you well, and I am thrilled to share with you the exciting journey we are embarking on.\n\nAs the Chief Coach and Trainer, it is my pleasure to welcome you to a realm of endless possibilities and boundless potential. We are dedicated to guiding institutions, students, and professionals on a transformative journey of skill enhancement and career readiness.\n\nWe believe in the power of holistic development. Our carefully crafted programs encompass a diverse range of subjects, designed to nurture not just technical proficiency but also emotional intelligence and cognitive readiness.\n\nWhat sets us apart is our commitment to experiential learning. Through gamification, hands-on projects, and reinforcement learning, we go beyond traditional teaching methods to ensure that participants not only grasp theoretical concepts but also acquire practical skills that are immediately applicable.\n\nWe are not just a training academy — we are partners in your institution's journey toward excellence. Our dedicated team of educators and industry experts are committed to providing a nurturing environment where talents are discovered, skills are honed, and potentials are augmented.",
};

export const teamMembers = [
  {
    id: "1",
    name: "Nadeem Akhter",
    role: "Chief Coach & Trainer",
    bio: "MIT, Ph.D. | 20+ years Global IT Experience | Certified EI Life Coach & CBT Practitioner",
    image: "/images/founder.png",
  },
  {
    id: "2",
    name: "Dr. Meera Sinha",
    role: "Head of School Programs",
    bio: "Ed.D. in Curriculum Design | 15+ years in K-12 education | Specialist in emotional intelligence and cognitive development programs",
    image: "",
  },
  {
    id: "3",
    name: "Arjun Prasad",
    role: "Technical Training Lead",
    bio: "M.Tech (CS) | Former Senior Engineer at TCS | Expert in AI/ML, System Design, and Programming pedagogy",
    image: "",
  },
  {
    id: "4",
    name: "Priyanka Das",
    role: "Career Readiness Mentor",
    bio: "MBA (HR) | 10+ years in corporate training & placement | Specialist in interview preparation and professional skills",
    image: "",
  },
];

// --- NAVIGATION ---

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Approach", href: "/approach" },
    {
      name: "Programs",
      href: "/institutional-programs",
      children: [
        { name: "Institutional Programs", href: "/institutional-programs" },
        { name: "For Schools", href: "/for-schools" },
        { name: "For Colleges", href: "/for-colleges" },
        { name: "Open Programs", href: "/open-programs" },
        { name: "Emotional State Assessment", href: "/assessment" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  footer: {
    programs: [
      { name: "Institutional Programs", href: "/institutional-programs" },
      { name: "For Schools", href: "/for-schools" },
      { name: "For Colleges", href: "/for-colleges" },
      { name: "Open Programs", href: "/open-programs" },
    ],
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Our Approach", href: "/approach" },
      { name: "Blog", href: "/blog" },
      { name: "Partner With Us", href: "/contact" },
      { name: "Emotional State Assessment", href: "/assessment" },
    ],
  },
};

// --- IMPACT STATISTICS (Institutional) ---

export const statistics = [
  {
    id: 1,
    value: 15,
    suffix: "+",
    label: "Partnered With",
    description: "Schools and colleges trust our programs",
  },
  {
    id: 2,
    value: 2500,
    suffix: "+",
    label: "Students Impacted",
    description: "Across schools and colleges",
  },
  {
    id: 3,
    value: 25,
    suffix: "+",
    label: "Programs Delivered",
    description: "Customized workshops and training sessions",
  },
  {
    id: 4,
    value: 90,
    suffix: "%",
    label: "CSAT Satisfaction",
    description: "Institutions recommend our programs",
  },
];

// --- PARTNER LOGOS (Trusted By) ---

export const partners = [
  { name: "CIT", initials: "CIT", color: "bg-blue-600", logo: "/images/partners/cit.png" },
  { name: "RTCIT", initials: "RTC", color: "bg-orange-600", logo: "/images/partners/rtcit.png" },
  { name: "UMU", initials: "UMU", color: "bg-teal-600", logo: "/images/partners/umu.png" },
  { name: "SBU", initials: "SBU", color: "bg-red-600", logo: "/images/partners/sbu.png" },
  { name: "Doranda College", initials: "DC", color: "bg-green-600", logo: "/images/partners/doranda-college.png" },
  { name: "St Xavier's College", initials: "SXC", color: "bg-indigo-600", logo: "/images/partners/st-xaviers-college.png" },
  { name: "St Anthony's School", initials: "SA", color: "bg-sky-600", logo: "/images/partners/st-anthonys-school.png" },
  { name: "St Francis School", initials: "SF", color: "bg-purple-600", logo: "/images/partners/st-francis-school.png" },
  { name: "Bishop Westcott Boys' School", initials: "BW", color: "bg-amber-600", logo: "/images/partners/bishop-westcott.png" },
  { name: "Firayalal Public School", initials: "FPS", color: "bg-rose-600", logo: "/images/partners/firayalal-public-school.png" },
];

// --- TESTIMONIALS ---

export const testimonials = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    role: "Principal",
    institution: "Delhi Public School, Ranchi",
    quote:
      "North Star Academy's programs have transformed how our students approach learning. The emotional harmony workshops have had a visible impact on student well-being and academic performance.",
    image: "/images/testimonials/testimonial-1.jpg",
    videoUrl: "https://www.youtube.com/embed/DIFCMtzg7xg",
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    role: "Dean of Studies",
    institution: "Birla Institute of Technology",
    quote:
      "The industry readiness programs delivered by North Star Academy have significantly improved our placement rates. Their approach bridges the gap between academics and real-world requirements.",
    image: "/images/testimonials/testimonial-2.jpg",
    videoUrl: "https://www.youtube.com/embed/R_i2B186Fus",
  },
  {
    id: "3",
    name: "Mrs. Anita Verma",
    role: "Vice Principal",
    institution: "St. Xavier's School, Ranchi",
    quote:
      "We've been partnering with North Star Academy for two years now. Their cognitive readiness programs are unique and have helped our students develop critical thinking skills.",
    image: "/images/testimonials/testimonial-3.jpg",
    videoUrl: "https://www.youtube.com/embed/L-fm0Fvygi0",
  },
  {
    id: "4",
    name: "Dr. Sunita Mahato",
    role: "Head of Department, CSE",
    institution: "Ranchi University",
    quote:
      "North Star Academy's AI Ecosystem and Data Visualization programs have been a game-changer for our final-year students. The industry alignment in their curriculum is exceptional.",
    image: "/images/testimonials/testimonial-4.jpg",
    videoUrl: "https://www.youtube.com/embed/L-fm0Fvygi0",
  },
];

// --- METHODOLOGY / APPROACH ---

export const methodology = [
  {
    id: 1,
    title: "Reinforcement Learning",
    description:
      "Applying learning over extended duration with continuous monitoring by our expert training staff.",
    icon: "RefreshCw",
  },
  {
    id: 2,
    title: "Complimentary Sessions",
    description:
      "Additional sessions to extend and reinforce the final outcomes of each workshop.",
    icon: "Gift",
  },
  {
    id: 3,
    title: "Mock Sessions",
    description:
      "Dramatizing real-time scenarios in training, especially for interview and job readiness.",
    icon: "Users",
  },
  {
    id: 4,
    title: "Counselling",
    description:
      "Providing guidance to reach goals by leveraging psychometry and change management.",
    icon: "MessageCircle",
  },
];

export const approachSteps = [
  {
    id: 1,
    stage: "Schools",
    title: "Foundation Building",
    description:
      "We partner with schools to build emotional intelligence, cognitive readiness, and communication skills from an early stage — setting students up for long-term success.",
    programs: ["Emotional Harmony", "Cognitive Readiness", "Business Communication"],
    icon: "School",
  },
  {
    id: 2,
    stage: "Colleges",
    title: "Technical Excellence",
    description:
      "At the college level, we deliver technical training in programming, AI, system design, and data visualization — equipping graduates with industry-relevant skills.",
    programs: ["System Analysis & Design", "Programming Languages", "AI Ecosystem", "Data Visualization"],
    icon: "GraduationCap",
  },
  {
    id: 3,
    stage: "Careers",
    title: "Industry Readiness",
    description:
      "Our career programs prepare students for the workforce through counselling, mock interviews, industry exposure, and placement assistance.",
    programs: ["Industry Readiness", "Counselling Services", "Study Abroad"],
    icon: "Briefcase",
  },
];

// --- SCHOOL PROGRAMS ---

export const schoolPrograms = [
  {
    id: "s1",
    title: "Empower - Emotional Agility",
    description:
      "Building self-reliance to understand and address underlying emotions. Equips students with tools to navigate complexities of emotions, fostering resilience and a balanced mindset.",
    outcomes: [
      "Improved emotional regulation",
      "Better peer relationships",
      "Reduced stress and anxiety",
      "Enhanced classroom participation",
    ],
    icon: "Heart",
    color: "rose",
  },
  {
    id: "s2",
    title: "NeuroLift - Cognitive Readiness through Power Skills",
    description:
      "Enhance cognitive abilities through engaging exercises and strategies designed to optimize mental performance, problem-solving, and decision-making skills.",
    outcomes: [
      "Sharpened critical thinking",
      "Improved memory retention",
      "Better decision-making skills",
      "Enhanced academic performance",
    ],
    icon: "Brain",
    color: "purple",
  },
  {
    id: "s3",
    title: "TechOrbit - Creation of Digital Eco System",
    description:
      "Creating a digital ecosystem for schools, enabling students to leverage technology for learning, collaboration, and innovation.",
    outcomes: [
      "Digital literacy enhancement",
      "Technology-enabled learning",
      "Collaborative digital projects",
      "Future-ready tech skills",
    ],
    icon: "Monitor",
    color: "blue",
  },
  {
    id: "s4",
    title: "STEMGRID - Creation and Support in STEM Lab",
    description:
      "Establishing and supporting STEM labs in schools to foster hands-on learning in science, technology, engineering, and mathematics.",
    outcomes: [
      "Hands-on STEM experimentation",
      "Scientific inquiry skills",
      "Problem-solving through engineering",
      "Cross-disciplinary thinking",
    ],
    icon: "Settings",
    color: "green",
  },
  {
    id: "s5",
    title: "FutureFit - Psychometry based Personalized Career Counselling",
    description:
      "Personalized career counselling using psychometric assessments to help students discover their strengths, interests, and ideal career paths.",
    outcomes: [
      "Self-awareness of strengths",
      "Personalized career roadmap",
      "Informed academic choices",
      "Confidence in future planning",
    ],
    icon: "TrendingUp",
    color: "orange",
  },
  {
    id: "s6",
    title: "Complimentary Programs",
    description:
      "Additional workshops and sessions that complement core programs, covering topics like communication skills, leadership, and wellness.",
    outcomes: [
      "Well-rounded skill development",
      "Enhanced soft skills",
      "Leadership foundations",
      "Holistic student growth",
    ],
    icon: "HeartHandshake",
    color: "cyan",
  },
];

// --- COLLEGE PROGRAMS ---

export const collegePrograms = [
  {
    id: "c1",
    title: "NeuroLift - Cognitive Readiness through Power Skills",
    description:
      "Enhance cognitive abilities through engaging exercises and strategies designed to optimize mental performance, problem-solving, and decision-making skills.",
    outcomes: [
      "Sharpened critical thinking",
      "Improved memory retention",
      "Better decision-making skills",
      "Enhanced academic performance",
    ],
    icon: "Brain",
    color: "purple",
  },
  {
    id: "c2",
    title: "Catalyst - Job Readiness Program",
    description:
      "Comprehensive job readiness program covering technical skills, soft skills, and industry exposure to make graduates career-ready from day one.",
    outcomes: [
      "Interview preparedness",
      "Resume and profile building",
      "Workplace communication skills",
      "Career path clarity",
    ],
    icon: "TrendingUp",
    color: "orange",
  },
  {
    id: "c3",
    title: "FutureFit - Psychometry based Personalized Career Counselling",
    description:
      "Personalized career counselling using psychometric assessments to help students discover their strengths, interests, and ideal career paths.",
    outcomes: [
      "Self-awareness of strengths",
      "Personalized career roadmap",
      "Informed academic choices",
      "Confidence in future planning",
    ],
    icon: "Award",
    color: "cyan",
  },
  {
    id: "c4",
    title: "ProForge - Internships and Projects",
    description:
      "Hands-on internships and real-world projects that bridge the gap between academic learning and industry demands.",
    outcomes: [
      "Real-world project experience",
      "Industry mentorship",
      "Portfolio of completed projects",
      "Professional network building",
    ],
    icon: "Code",
    color: "green",
  },
  {
    id: "c5",
    title: "Complimentary Programs",
    description:
      "Additional workshops and sessions that complement core programs, covering topics like communication, leadership, and professional development.",
    outcomes: [
      "Well-rounded skill development",
      "Enhanced soft skills",
      "Leadership foundations",
      "Holistic professional growth",
    ],
    icon: "HeartHandshake",
    color: "amber",
  },
];

// --- OPEN PROGRAMS (Individual courses) ---

export const openPrograms = [
  {
    id: "1",
    slug: "masterclass-with-ai-toolsets",
    title: "Masterclass with AI Toolsets",
    description:
      "Hands-on masterclass exploring the latest AI tools and platforms — from prompt engineering to AI-powered productivity. Learn to leverage cutting-edge AI toolsets for real-world applications.",
    outcomes: [
      "Proficiency in leading AI tools",
      "Prompt engineering mastery",
      "AI-powered workflow automation",
      "Practical AI integration skills",
    ],
    icon: "Cpu",
    color: "violet",
  },
  {
    id: "2",
    slug: "professional-diploma-in-intelligent-computing",
    title: "Professional Diploma in Intelligent Computing",
    description:
      "Comprehensive diploma program covering the foundations and applications of intelligent computing — from machine learning to deep learning and beyond.",
    outcomes: [
      "Industry-recognized diploma",
      "Deep learning fundamentals",
      "Intelligent system design",
      "Capstone project portfolio",
    ],
    icon: "Award",
    color: "blue",
  },
  {
    id: "3",
    slug: "financial-computation-tally-excel",
    title: "Financial Computation using Tally & Advance Excel",
    description:
      "Master financial computation using Tally ERP and advanced Excel techniques. Learn accounting automation, MIS reporting, and data-driven financial analysis.",
    outcomes: [
      "Tally ERP proficiency",
      "Advanced Excel formulas & macros",
      "Financial reporting automation",
      "MIS dashboard creation",
    ],
    icon: "BarChart3",
    color: "green",
  },
  {
    id: "4",
    slug: "mastering-programming-languages",
    title: "Mastering Programming in Java, Python, C++, SQL",
    description:
      "Build deep expertise across major programming languages — Java, Python, C++, and SQL. From foundational concepts to advanced techniques with hands-on projects.",
    outcomes: [
      "Multi-language proficiency",
      "Problem-solving with code",
      "Software development best practices",
      "Portfolio of coding projects",
    ],
    icon: "Code",
    color: "orange",
  },
  {
    id: "5",
    slug: "data-engineering-and-visualization",
    title: "Data Engineering & Visualization",
    description:
      "Learn to build data pipelines and create compelling visualizations using tools like Tableau, Power BI, and Python libraries for data-driven decision making.",
    outcomes: [
      "Data pipeline design",
      "Proficiency in Tableau/Power BI",
      "Data storytelling abilities",
      "ETL and data warehousing basics",
    ],
    icon: "BarChart3",
    color: "cyan",
  },
  {
    id: "6",
    slug: "ai-ml-eco-system",
    title: "AI/ML Eco System",
    description:
      "Explore the complete AI/ML ecosystem — from machine learning and deep learning to NLP, Gen AI, and large language models. Understand applications and ethical considerations.",
    outcomes: [
      "Understanding of AI/ML fundamentals",
      "Practical NLP and Gen AI exposure",
      "Model training and evaluation",
      "Industry-relevant AI skills",
    ],
    icon: "Cpu",
    color: "purple",
  },
  {
    id: "7",
    slug: "web-development-html-js-css",
    title: "Web Development with HTML, JS, CSS",
    description:
      "Master front-end web development from the ground up — HTML for structure, CSS for styling, and JavaScript for interactivity. Build responsive, modern websites.",
    outcomes: [
      "Responsive web design",
      "JavaScript programming skills",
      "Modern CSS techniques",
      "Portfolio of web projects",
    ],
    icon: "Monitor",
    color: "blue",
  },
  {
    id: "8",
    slug: "full-stack-with-mern",
    title: "Full Stack with MERN",
    description:
      "Become a full-stack developer using the MERN stack — MongoDB, Express.js, React, and Node.js. Build complete web applications from front-end to back-end.",
    outcomes: [
      "Full-stack development skills",
      "RESTful API design",
      "React front-end proficiency",
      "Database management with MongoDB",
    ],
    icon: "Code",
    color: "green",
  },
  {
    id: "9",
    slug: "computational-problem-solving-dsa",
    title: "Computational Problem Solving - Data Structures and Algorithms",
    description:
      "Strengthen your problem-solving foundation with data structures and algorithms. Essential for technical interviews and building efficient software systems.",
    outcomes: [
      "Algorithmic thinking",
      "Data structure mastery",
      "Competitive programming skills",
      "Technical interview readiness",
    ],
    icon: "Settings",
    color: "orange",
  },
  {
    id: "10",
    slug: "psychometry-based-career-pathing",
    title: "Psychometry Based Personalized Career Pathing",
    description:
      "Discover your ideal career through psychometric assessments. Personalized career counselling based on aptitude, personality, and interest profiling.",
    outcomes: [
      "Self-awareness of strengths",
      "Personalized career roadmap",
      "Informed career decisions",
      "Confidence in future planning",
    ],
    icon: "TrendingUp",
    color: "rose",
  },
  {
    id: "11",
    slug: "it-projects-internships",
    title: "IT Projects/Internships",
    description:
      "Gain real-world experience through guided IT projects and internships. Bridge the gap between academic learning and industry expectations with mentored project work.",
    outcomes: [
      "Real-world project experience",
      "Industry mentorship",
      "Portfolio of completed projects",
      "Professional network building",
    ],
    icon: "Briefcase",
    color: "amber",
  },
  {
    id: "12",
    slug: "catalyst-job-readiness-program",
    title: "Catalyst - Job Readiness Program",
    description:
      "Comprehensive job readiness program covering resume building, interview preparation, workplace communication, and professional skills to make you career-ready from day one.",
    outcomes: [
      "Interview preparedness",
      "Resume and profile building",
      "Workplace communication skills",
      "Career path clarity",
    ],
    icon: "HeartHandshake",
    color: "pink",
  },
];

// Keep backward compatibility alias
export const courses = openPrograms;

// --- WHY CHOOSE US ---

export const whyChooseUs = [
  {
    id: 1,
    title: "Institutional Focus",
    description: "We specialize in partnering with schools and colleges to deliver impactful, institution-wide training programs.",
    icon: "Building2",
  },
  {
    id: 2,
    title: "Expert Facilitators",
    description: "Industry professionals and certified coaches with 20+ years of experience deliver every session.",
    icon: "Award",
  },
  {
    id: 3,
    title: "Holistic Approach",
    description: "From emotional intelligence to technical skills — our programs cover the full spectrum of student development.",
    icon: "Layers",
  },
  {
    id: 4,
    title: "Measurable Impact",
    description: "Pre and post assessments ensure tangible, trackable outcomes for every program we deliver.",
    icon: "TrendingUp",
  },
  {
    id: 5,
    title: "Flexible Delivery",
    description: "On-campus, online, or hybrid modes to suit your institution's schedule and preferences.",
    icon: "Monitor",
  },
  {
    id: 6,
    title: "Proven Track Record",
    description: "50+ institutional partners, 10000+ students impacted, 95% partner satisfaction rate.",
    icon: "CheckCircle",
  },
];

// --- PARTNERSHIP MODEL ---

export const partnershipBenefits = [
  {
    title: "Customized Curriculum",
    description: "Programs tailored to your institution's specific needs and student demographics.",
    icon: "FileText",
  },
  {
    title: "Expert Facilitators",
    description: "Industry professionals and certified coaches deliver every session.",
    icon: "Award",
  },
  {
    title: "Measurable Outcomes",
    description: "Pre and post assessments to track student development and program impact.",
    icon: "TrendingUp",
  },
  {
    title: "Flexible Delivery",
    description: "On-campus, online, or hybrid modes to suit your institution's schedule.",
    icon: "Monitor",
  },
  {
    title: "Ongoing Support",
    description: "Continuous engagement with reinforcement sessions and progress monitoring.",
    icon: "HeartHandshake",
  },
  {
    title: "Certificate Programs",
    description: "Validated certificates for students upon successful program completion.",
    icon: "GraduationCap",
  },
];

export const partnershipProcess = [
  {
    step: 1,
    title: "Connect",
    description: "Reach out to us with your institution's training needs and goals.",
  },
  {
    step: 2,
    title: "Customize",
    description: "We design a tailored program aligned with your curriculum and objectives.",
  },
  {
    step: 3,
    title: "Deliver",
    description: "Our expert facilitators conduct engaging sessions at your institution.",
  },
  {
    step: 4,
    title: "Measure",
    description: "We track outcomes and provide detailed impact reports to your institution.",
  },
];

// --- FAQ ---

export const faqs = [
  {
    question: "How does North Star Academy partner with institutions?",
    answer: "We work directly with schools and colleges to deliver customized training programs. We handle everything from curriculum design to delivery and assessment, integrating seamlessly with your academic calendar.",
  },
  {
    question: "What types of programs do you offer for schools?",
    answer: "Our school programs include:\n\n• Empower - Emotional Agility\n• NeuroLift - Cognitive Readiness through Power Skills\n• TechOrbit - Creation of Digital Eco System\n• STEMGRID - Creation and Support in STEM Lab\n• FutureFit - Psychometry based Personalized Career Counselling\n• Complimentary Programs",
  },
  {
    question: "What programs are available for colleges?",
    answer: "Our college/university programs include:\n\n• NeuroLift - Cognitive Readiness through Power Skills\n• Catalyst - Job Readiness Program\n• FutureFit - Psychometry based Personalized Career Counselling\n• ProForge - Internships and Projects\n• Complimentary Programs",
  },
  {
    question: "Can programs be customized for our institution?",
    answer: "Absolutely! Every program is tailored to your institution's specific needs, student demographics, and academic objectives. We work closely with your team to design the perfect curriculum.",
  },
  {
    question: "What is the duration of your programs?",
    answer: "Program duration varies based on the topic and depth — from single-day workshops to semester-long integrated programs. We design the schedule to fit your academic calendar.",
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes, all participants receive validated certificates upon successful completion. Certificates can be verified through our online validation system.",
  },
  {
    question: "How do you measure program effectiveness?",
    answer: "We conduct pre and post assessments, collect feedback from students and faculty, and provide detailed impact reports to your institution after each program.",
  },
  {
    question: "Can individuals enroll in your programs?",
    answer: "Yes! Our Open Programs section offers courses for individual enrollment. These include all our signature programs available for self-paced or scheduled learning.",
  },
];

// --- INDUSTRY STATISTICS ("The Numbers That Drive Us") ---

export const industryStatistics = [
  {
    id: 1,
    value: 42,
    suffix: "%",
    label: "Of India's under-25 graduates are unemployed",
    source: "Azim Premji University",
  },
  {
    id: 2,
    value: 3.8,
    suffix: "%",
    label: "Of engineers have skills needed for software jobs",
    source: "Deccan Herald",
  },
  {
    id: 3,
    value: 72.5,
    suffix: "%",
    label: "Of students experience negative emotions",
    source: "Researchgate",
  },
  {
    id: 4,
    value: 1,
    prefix: "$",
    suffix: "Tn",
    label: "AI contribution to India's economy by 2035",
    source: "The Hindu",
  },
];

// --- NEWS & BLOG ---

export const blogs = [
  {
    id: "1",
    slug: "restless-relentless",
    title: "Restless & Relentless",
    excerpt:
      "Discover the mindset that drives success in today's competitive world. Learn how to channel your inner drive into productive outcomes.",
    date: "March 6, 2024",
    readTime: "5 min read",
    category: "Career Growth",
    image: "blog-1.png",
  },
  {
    id: "2",
    slug: "outcome-based-service-delivery-model",
    title: "Outcome based Service Delivery Model",
    excerpt:
      "Learn how outcome-based approaches transform education delivery and create measurable results for learners.",
    date: "March 6, 2024",
    readTime: "7 min read",
    category: "Professional Development",
    image: "blog-2.png",
  },
  {
    id: "3",
    slug: "indians-more-afraid-of-ai-taking-away-jobs",
    title: "Indians more afraid of AI taking away jobs than their global peers",
    excerpt:
      "A Randstad survey reveals 1 in 2 Indians are worried about AI taking their jobs — significantly higher than the global average.",
    date: "March 6, 2024",
    readTime: "6 min read",
    category: "AI & Jobs",
    image: "blog-3.png",
  },
  {
    id: "4",
    slug: "why-is-emotional-intelligence-important-for-students",
    title: "Why is emotional intelligence important for students?",
    excerpt:
      "The crucial role of EI in academic and professional success. Discover how emotional intelligence shapes better outcomes for students.",
    date: "March 6, 2024",
    readTime: "8 min read",
    category: "Soft Skills",
    image: "blog-4.png",
  },
  {
    id: "5",
    slug: "companies-see-training-best-way-to-fill-demand-for-ai-talent",
    title: "Companies see training a best way to fill demand for AI talent, say educators",
    excerpt:
      "With a 74% growth in AI/ML roles, organizations are increasingly investing in upskilling programs to bridge the AI talent gap.",
    date: "March 6, 2024",
    readTime: "5 min read",
    category: "AI & Jobs",
    image: "blog-5.png",
  },
  {
    id: "6",
    slug: "ai-to-have-positive-short-term-impact-on-jobs",
    title: "AI to have positive short-term impact on jobs, find global survey",
    excerpt:
      "An Indeed/Censuswide survey finds 85% of employers believe AI will have a positive impact on hiring and job creation in the near term.",
    date: "March 7, 2024",
    readTime: "5 min read",
    category: "AI & Jobs",
    image: "blog-6.png",
  },
  {
    id: "7",
    slug: "in-india-degrees-of-unemployability",
    title: "In India, degrees of unemployability",
    excerpt:
      "A Bloomberg investigation reveals the depth of India's education-to-employment crisis and the growing gap between degrees and employability.",
    date: "March 7, 2024",
    readTime: "8 min read",
    category: "Education",
    image: "blog-7.png",
  },
  {
    id: "8",
    slug: "worthless-degrees-creating-unemployable-generation",
    title: "Worthless degrees are creating an unemployable generation in India",
    excerpt:
      "India's $117 billion education industry is producing graduates who lack the skills employers need, creating a systemic employability crisis.",
    date: "March 7, 2024",
    readTime: "9 min read",
    category: "Education",
    image: "blog-8.png",
  },
  {
    id: "9",
    slug: "why-indian-engineers-are-unemployable",
    title: "Why Indian Engineers are Unemployable & what's the solutions",
    excerpt:
      "India produces 1.5 million engineers annually, yet only 3.8% are employable. An in-depth analysis of the root causes and actionable solutions.",
    date: "March 7, 2024",
    readTime: "15 min read",
    category: "Education",
    image: "blog-9.png",
  },
  {
    id: "10",
    slug: "47-graduates-in-india-unemployable",
    title: "47% graduates in India are unemployable for any job: Report",
    excerpt:
      "The Wheebox India Skills Report reveals that nearly half of Indian graduates lack the skills required for employment, with employability varying widely by sector.",
    date: "March 7, 2024",
    readTime: "6 min read",
    category: "Education",
    image: "blog-10-1.png",
  },
  {
    id: "11",
    slug: "ais-impact-on-indias-recruitment-landscape",
    title: "AI's impact on India's recruitment landscape – Expectations and Beliefs",
    excerpt:
      "An Indeed report shows 85% of Indian employers expect AI to create more jobs than it displaces, reshaping the country's recruitment practices.",
    date: "March 7, 2024",
    readTime: "6 min read",
    category: "AI & Jobs",
    image: "blog-11.png",
  },
  {
    id: "12",
    slug: "indians-more-afraid-of-ai-2",
    title: "Indians more afraid of AI taking away jobs than their global peers",
    excerpt:
      "A deeper look at the Randstad Workmonitor survey and why Indian workers' fear of AI-driven job displacement exceeds the global average.",
    date: "March 7, 2024",
    readTime: "5 min read",
    category: "AI & Jobs",
    image: "blog-12.png",
  },
  {
    id: "13",
    slug: "the-future-of-jobs-report-2023",
    title: "The Future of Jobs Report 2023",
    excerpt:
      "Key insights from the World Economic Forum's fourth edition survey of 803 companies across 45 economies on macrotrends shaping the future of work.",
    date: "March 7, 2024",
    readTime: "10 min read",
    category: "Career Growth",
    image: "blog-13.png",
  },
  {
    id: "14",
    slug: "are-you-a-fresher-looking-for-job",
    title: "Are you a fresher looking for job? These are your must-have skills",
    excerpt:
      "In today's competitive employment landscape, a degree alone isn't enough. Discover the essential skills freshers need to stay relevant and job-ready.",
    date: "March 7, 2024",
    readTime: "7 min read",
    category: "Career Growth",
    image: "blog-14.png",
  },
  {
    id: "15",
    slug: "employees-seek-personal-value-and-purpose",
    title: "Employees Seek Personal Value and Purpose at Work. Be Prepared to Deliver.",
    excerpt:
      "Gartner research reveals that 82% of employees want to be seen as people, not just workers. The era of the traditional employment contract is over.",
    date: "March 9, 2024",
    readTime: "8 min read",
    category: "Workplace Culture",
    image: "blog-15-1.png",
  },
  {
    id: "16",
    slug: "how-can-you-use-ei-to-improve-career",
    title: "How can you use EI to improve your career prospects?",
    excerpt:
      "Emotional intelligence is a dynamic skill you can develop throughout your life. Learn six practical steps to leverage EI for career success.",
    date: "March 9, 2024",
    readTime: "7 min read",
    category: "Soft Skills",
    image: "blog-16.png",
  },
];

export const blogPosts = blogs;
