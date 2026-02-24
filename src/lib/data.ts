// North Star — Website Content Data (Redesigned for Institutional Focus)
// Core Theme: "Developing Leaders, Empowering Institutions — From Classrooms to Careers"

export const siteConfig = {
  name: "North Star",
  tagline: "Developing Leaders, Empowering Institutions",
  subtitle: "From Classrooms to Careers",
  description:
    "We partner with schools and colleges to deliver transformative training programs that develop leaders, build career-ready graduates, and empower institutions to achieve excellence.",
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
    weekdays: "Monday - Friday: 09:00 - 20:00",
    saturday: "Saturday: 10:30 - 22:00",
  },
  socialLinks: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
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
  message: "Greetings from North Star! I hope this message finds you well, and I am thrilled to share with you the exciting journey we are embarking on.\n\nAs the Chief Coach and Trainer, it is my pleasure to welcome you to a realm of endless possibilities and boundless potential. We are dedicated to guiding institutions, students, and professionals on a transformative journey of skill enhancement and career readiness.\n\nWe believe in the power of holistic development. Our carefully crafted programs encompass a diverse range of subjects, designed to nurture not just technical proficiency but also emotional intelligence and cognitive readiness.\n\nWhat sets us apart is our commitment to experiential learning. Through gamification, hands-on projects, and reinforcement learning, we go beyond traditional teaching methods to ensure that participants not only grasp theoretical concepts but also acquire practical skills that are immediately applicable.\n\nWe are not just a training academy — we are partners in your institution's journey toward excellence. Our dedicated team of educators and industry experts are committed to providing a nurturing environment where talents are discovered, skills are honed, and potentials are augmented.",
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
      { name: "Partner With Us", href: "/contact" },
      { name: "Emotional State Assessment", href: "/assessment" },
    ],
  },
};

// --- IMPACT STATISTICS (Institutional) ---

export const statistics = [
  {
    id: 1,
    value: 50,
    suffix: "+",
    label: "Institutional Partners",
    description: "Schools and colleges trust our programs",
  },
  {
    id: 2,
    value: 10000,
    suffix: "+",
    label: "Students Impacted",
    description: "Across schools and universities nationwide",
  },
  {
    id: 3,
    value: 200,
    suffix: "+",
    label: "Programs Delivered",
    description: "Customized workshops and training sessions",
  },
  {
    id: 4,
    value: 95,
    suffix: "%",
    label: "Partner Satisfaction",
    description: "Institutions recommend our programs",
  },
];

// --- PARTNER LOGOS (Trusted By) ---

export const partners = [
  { name: "BIT Mesra", initials: "BIT", color: "bg-orange-600", logo: "/images/partners/bit-mesra.jpg" },
  { name: "Loyola School", initials: "LS", color: "bg-red-600", logo: "/images/partners/loyola-school.jpg" },
  { name: "IIM Ranchi", initials: "IIM", color: "bg-blue-600", logo: "/images/partners/iim-ranchi.png" },
  { name: "DPS Ranchi", initials: "DPS", color: "bg-sky-600", logo: "/images/partners/dps-ranchi.jpg" },
  { name: "Ranchi University", initials: "RU", color: "bg-teal-600", logo: "/images/partners/ranchi-university.png" },
  { name: "St. Anthony's School", initials: "SA", color: "bg-green-600", logo: "/images/partners/st-anthony.png" },
  { name: "St. Xavier's College, Ranchi", initials: "SXC", color: "bg-indigo-600", logo: "/images/partners/xavier-ranchi.png" },
];

// --- TESTIMONIALS ---

export const testimonials = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    role: "Principal",
    institution: "Delhi Public School, Ranchi",
    quote:
      "North Star's programs have transformed how our students approach learning. The emotional harmony workshops have had a visible impact on student well-being and academic performance.",
    image: "/images/testimonials/testimonial-1.jpg",
    videoUrl: "https://www.youtube.com/embed/DIFCMtzg7xg",
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    role: "Dean of Studies",
    institution: "Birla Institute of Technology",
    quote:
      "The industry readiness programs delivered by North Star have significantly improved our placement rates. Their approach bridges the gap between academics and real-world requirements.",
    image: "/images/testimonials/testimonial-2.jpg",
    videoUrl: "https://www.youtube.com/embed/R_i2B186Fus",
  },
  {
    id: "3",
    name: "Mrs. Anita Verma",
    role: "Vice Principal",
    institution: "St. Xavier's School, Ranchi",
    quote:
      "We've been partnering with North Star for two years now. Their cognitive readiness programs are unique and have helped our students develop critical thinking skills.",
    image: "/images/testimonials/testimonial-3.jpg",
    videoUrl: "https://www.youtube.com/embed/L-fm0Fvygi0",
  },
  {
    id: "4",
    name: "Dr. Sunita Mahato",
    role: "Head of Department, CSE",
    institution: "Ranchi University",
    quote:
      "North Star's AI Ecosystem and Data Visualization programs have been a game-changer for our final-year students. The industry alignment in their curriculum is exceptional.",
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
    title: "Emotional Harmony Workshop",
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
    title: "Cognitive Readiness Program",
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
    title: "Effective Communication Skills",
    description:
      "Enhancing communication skills using English as a medium for effective interaction, story-telling, and confident self-expression.",
    outcomes: [
      "Confident public speaking",
      "Clear written communication",
      "Active listening skills",
      "Persuasive presentation abilities",
    ],
    icon: "MessageSquare",
    color: "blue",
  },
];

// --- COLLEGE PROGRAMS ---

export const collegePrograms = [
  {
    id: "c1",
    title: "System Analysis & Design",
    description:
      "Building understanding of system analysis and design with Agile and Crisp-DM methodologies. From requirement gathering to system testing.",
    outcomes: [
      "Understanding of SDLC methodologies",
      "Proficiency in Agile practices",
      "UML and OOAD fundamentals",
      "Practical system design skills",
    ],
    icon: "Settings",
    color: "orange",
  },
  {
    id: "c2",
    title: "Programming Languages",
    description:
      "Building blocks of programming using Python, Java, and SQL. Hands-on experience from foundational concepts to advanced techniques.",
    outcomes: [
      "Proficiency in Python, Java, SQL",
      "Problem-solving with code",
      "Software development best practices",
      "Portfolio of coding projects",
    ],
    icon: "Code",
    color: "green",
  },
  {
    id: "c3",
    title: "AI Ecosystem",
    description:
      "Understanding business analytics and artificial intelligence ecosystem — AI/ML/DL/NLP/Gen AI/LLM concepts and applications.",
    outcomes: [
      "Understanding of AI/ML fundamentals",
      "Practical NLP and Gen AI exposure",
      "Data-driven decision making",
      "Industry-relevant AI skills",
    ],
    icon: "Cpu",
    color: "violet",
  },
  {
    id: "c4",
    title: "Data Visualization",
    description:
      "Effective visualization of information using tools like Tableau, Power BI, and Qlik Sense to communicate insights compellingly.",
    outcomes: [
      "Proficiency in Tableau/Power BI",
      "Dashboard design skills",
      "Data storytelling abilities",
      "Business intelligence fundamentals",
    ],
    icon: "BarChart3",
    color: "cyan",
  },
  {
    id: "c5",
    title: "Industry Readiness & Placement",
    description:
      "Preparing aspiring professionals for the industry through career counselling, mock interviews, and job application assistance.",
    outcomes: [
      "Interview preparedness",
      "Resume and profile building",
      "Workplace communication skills",
      "Career path clarity",
    ],
    icon: "Briefcase",
    color: "amber",
  },
];

// --- OPEN PROGRAMS (Individual courses, rebranded) ---

export const openPrograms = [
  {
    id: "1",
    slug: "emotional-harmony",
    title: "Workshop on Emotional Harmony",
    shortTitle: "Emotional Harmony",
    tagline: "Building Self Reliance to Understand and Address Underlying Emotions",
    description: "Explore techniques and practices to cultivate emotional balance and resilience in both personal and professional life.\n\nThis workshop delves into the nuances of emotional intelligence and harmony, offering practical strategies to manage stress, build resilience, and cultivate positive relationships. Participants will explore techniques such as mindfulness, self-awareness, and empathetic communication to navigate challenges effectively and foster emotional well-being in personal and professional life.",
    objective: "Enabling students to manage their emotions better to become productive contributors to society thereby strengthening the nation.",
    category: "soft-skills",
    icon: "Heart",
    color: "rose",
  },
  {
    id: "2",
    slug: "cognitive-readiness",
    title: "Workshop on Cognitive Readiness",
    shortTitle: "Cognitive Readiness",
    tagline: "Enhance cognitive abilities and readiness through engaging exercises",
    description: "Cognitive readiness encompasses a range of cognitive abilities, including communication, problem-solving, strategic thinking, and collaborative leadership.\n\nEnhance cognitive abilities and readiness through engaging exercises and strategies designed to optimize mental performance and decision-making skills.",
    objective: "Helping students to assess their power skills and become self-aware and productive individuals.",
    category: "soft-skills",
    icon: "Brain",
    color: "purple",
  },
  {
    id: "3",
    slug: "business-communication",
    title: "Effective Business Communication",
    shortTitle: "Business Communication",
    tagline: "Using English as a medium for effective communication and story-telling",
    description: "Master the art of communication in the business world, learning to convey ideas clearly, build rapport, and navigate professional interactions effectively.\n\nEffective communication lies at the heart of successful businesses. This course equips participants with the necessary skills and techniques to articulate ideas clearly, influence stakeholders, and foster collaborative relationships.",
    objective: "Enable individuals to use English effectively to communicate thoughts and ideas.",
    category: "soft-skills",
    icon: "MessageSquare",
    color: "blue",
  },
  {
    id: "4",
    slug: "system-analysis-and-design",
    title: "System Analysis and Design",
    shortTitle: "System Analysis & Design",
    tagline: "Building understanding of System Analysis and design with Agile and Crisp-DM",
    description: "Gain insights into the principles and methodologies of system analysis and design, equipping yourself with essential skills for developing robust and scalable systems.",
    objective: "Understanding System Analysis and design with delivery models, OOAD and UML. Special focus on Agile and Crisp-DM.",
    category: "technical",
    icon: "Settings",
    color: "orange",
  },
  {
    id: "5",
    slug: "programming-languages",
    title: "Specializing in Programming Languages",
    shortTitle: "Programming Languages",
    tagline: "Building blocks of programming using Python, Java and SQL",
    description: "Dive deep into various programming languages, honing your expertise and proficiency in coding, debugging, and software development.",
    objective: "Developing deep conceptual understanding and practical application of Python, Java and SQL.",
    category: "technical",
    icon: "Code",
    color: "green",
  },
  {
    id: "6",
    slug: "data-visualization",
    title: "Data Visualization",
    shortTitle: "Data Visualization",
    tagline: "Effective visualization of Information",
    description: "Unlock the power of data visualization techniques to transform complex information into insightful visual representations, enabling better decision-making and communication.",
    objective: "Develop understanding of tools like Tableau, Power BI and Qlik Sense for data visualization.",
    category: "technical",
    icon: "BarChart3",
    color: "cyan",
  },
  {
    id: "7",
    slug: "artificial-intelligence-ecosystem",
    title: "Artificial Intelligence Eco System",
    shortTitle: "AI Ecosystem",
    tagline: "Understanding business analytics ecosystem",
    description: "Explore the intricate ecosystem of artificial intelligence, learning about its applications, advancements, and ethical considerations shaping the future of technology.",
    objective: "Enable individuals to understand and apply concepts on AI/ML/DL/NLP/Gen AI/LLM",
    category: "technical",
    icon: "Cpu",
    color: "violet",
  },
  {
    id: "8",
    slug: "counselling-services",
    title: "Counselling Services",
    shortTitle: "Counselling Services",
    tagline: "Academic counselling and prepare aspiring professionals",
    description: "Develop counselling skills tailored for contexts, preparing to support individuals and teams in navigating professional challenges and achieving personal growth.",
    objective: "Help individuals in selection of academic path through career counselling, mock interviews and assistance in applying for jobs.",
    category: "career",
    icon: "HeartHandshake",
    color: "pink",
  },
  {
    id: "9",
    slug: "industry-readiness",
    title: "Industry Readiness",
    shortTitle: "Industry Readiness",
    tagline: "Prepare aspiring professionals for the industry",
    description: "Development skills tailored for industry contexts, preparing to support individuals and teams in navigating professional challenges and achieving personal growth.",
    objective: "Help individuals in preparing for job interviews through career counselling, mock interviews and assistance in applying for jobs.",
    category: "career",
    icon: "Briefcase",
    color: "amber",
  },
  {
    id: "10",
    slug: "study-abroad",
    title: "Study Abroad",
    shortTitle: "Study Abroad",
    tagline: "Prepare for international opportunities",
    description: "Prepare aspiring professionals for international academic and career opportunities through comprehensive guidance and preparation programs.",
    objective: "Help individuals in preparing for international education through counselling, test preparation, and application assistance.",
    category: "career",
    icon: "Globe",
    color: "blue",
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
    question: "How does North Star partner with institutions?",
    answer: "We work directly with schools and colleges to deliver customized training programs. We handle everything from curriculum design to delivery and assessment, integrating seamlessly with your academic calendar.",
  },
  {
    question: "What types of programs do you offer for schools?",
    answer: "For schools, we offer Emotional Harmony workshops, Cognitive Readiness programs, and Effective Communication Skills training — all designed to build a strong foundation in students.",
  },
  {
    question: "What programs are available for colleges?",
    answer: "Our college programs include System Analysis & Design, Programming Languages (Python, Java, SQL), AI Ecosystem, Data Visualization, and Industry Readiness & Placement preparation.",
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
