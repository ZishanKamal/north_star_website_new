// North Star Academy - Website Content Data
// This file contains all extracted content from the current website
// Ready to be used in the Next.js revamp

export const siteConfig = {
  name: "North Star Academy",
  tagline: "Discover, Build and Augment Your Potential",
  description:
    "Coaching and Training Academy for the future which will fulfill all your academic and professional dreams.",
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

export const founder = {
  name: "Nadeem Akhter",
  credentials: [
    "MIT, Ph.D.",
    "Certified Emotional Intelligence Life Coach",
    "Certified Cognitive Behavioural Therapy Practitioner",
    "20+ years of Global IT Industry Experience",
  ],
  image: "/images/founder.png",
  message: `Greetings from North Star Academy! I hope this message finds you well, and I am thrilled to share with you the exciting journey we are embarking on at North Star Academy.

As the Chief Coach and Trainer of North Star Academy, it is my pleasure to welcome you to a realm of endless possibilities and boundless potential. Our academy is dedicated to guiding individuals, whether students or professionals, on a transformative journey of self-discovery, skill enhancement, and career readiness.

At North Star, we believe in the power of holistic development. Our carefully crafted courses encompass a diverse range of subjects, designed to nurture not just technical proficiency but also emotional intelligence and cognitive readiness.

What sets us apart is our commitment to experiential learning. Through gamification, hands-on projects, and reinforcement learning, we go beyond traditional teaching methods to ensure that our students not only grasp theoretical concepts but also acquire practical skills that are immediately applicable.

At North Star, we are not just an academy; we are partners in your journey toward success. Our dedicated team of educators and industry experts are committed to providing a nurturing environment where talents are discovered, skills are honed, and potentials are augmented.

I invite you to explore the opportunities that North Star Academy has to offer. Together, let us embark on a journey of growth, learning, and achievement.

Thank you for considering North Star Academy as your partner in education and professional development.

Warm regards,
Nadeem Akhter`,
};

export const heroContent = {
  title: "Welcome to North Star Academy",
  subtitle: "Discover, Build and Augment Your Potential",
  ctaText: "Find Course",
  ctaLink: "/courses",
  image: "/images/hero-banner.png",
};

export const aboutSection = {
  title: "Who We Are",
  description: `Coaching and Training Academy for the future which will fulfill all your academic and professional dreams. We are not just an academy; we are partners in your journey toward success.

Our dedicated team of educators and industry experts are committed to providing a nurturing environment where talents are discovered, skills are honed, and potentials are augmented.`,
  belief:
    "It's a firm belief at North Star that everyone needs to operate at their best potential and we are committed to help you achieve the same.",
};

export const methodology = [
  {
    id: 1,
    title: "Reinforcement Learning",
    description:
      "Applying learning over extended duration and monitoring done by institution teaching staff.",
    icon: "RefreshCw",
    image: "/images/icons/icon-1.png",
  },
  {
    id: 2,
    title: "Complimentary Sessions",
    description:
      "Additional sessions to extend the final outcome of the workshop/training.",
    icon: "Gift",
    image: "/images/icons/icon-2.png",
  },
  {
    id: 3,
    title: "Mock Sessions",
    description:
      "Dramatizing the real time sequence in training, especially used for Job Readiness.",
    icon: "Users",
    image: "/images/icons/icon-3.png",
  },
  {
    id: 4,
    title: "Counselling",
    description:
      "Providing guidance to reach the goal by leveraging psychometry change management.",
    icon: "MessageCircle",
    image: "/images/icons/icon-4.png",
  },
];

export const whyChooseUs = [
  {
    id: 1,
    title: "In Person",
    description:
      "Build deeper connections and receive immediate feedback. Collaborate and learn from others in a dynamic environment.",
    icon: "Users",
  },
  {
    id: 2,
    title: "Reflections",
    description:
      "Gain insights and connect experiences to real-world applications. Identify strengths, weaknesses, and refine your approach.",
    icon: "Lightbulb",
  },
  {
    id: 3,
    title: "Psychometric",
    description:
      "Understand your learning style and maximize personal growth. Tailor the learning journey to your unique needs.",
    icon: "Brain",
  },
  {
    id: 4,
    title: "Role Plays",
    description:
      "Apply skills safely and receive constructive feedback. Test assumptions and explore different perspectives to gain confidence and adaptability.",
    icon: "Drama",
  },
  {
    id: 5,
    title: "Peer Learning",
    description:
      "Diverse perspectives: Learn from others' experiences and broaden your understanding. Collaborative knowledge sharing: Develop communication and teamwork skills.",
    icon: "HandshakeIcon",
  },
  {
    id: 6,
    title: "Hands-on/Projects",
    description:
      "Learn by doing: Apply knowledge, solve problems, and experience firsthand consequences.",
    icon: "Wrench",
  },
];

export const statistics = [
  {
    id: 1,
    value: 42,
    suffix: "%",
    label: "Of India's under-25 graduates are unemployed",
    source: "Azim Premji University's Centre for Sustainability",
    cta: "Equip yourself with in-demand skills and land your dream job.",
  },
  {
    id: 2,
    value: 3.8,
    suffix: "%",
    label: "Of engineers have the skills needed for software jobs",
    source: "Deccan Herald - In India, degrees of unemployability",
    cta: "Launch your career with hands-on training and expert guidance.",
  },
  {
    id: 3,
    value: 72.5,
    suffix: "%",
    label: "Of students experience negative emotions",
    source: "Researchgate - Impact of Negative Emotions on Student",
    cta: "Find a positive and engaging learning experience with us.",
  },
  {
    id: 4,
    value: 1,
    prefix: "<$",
    suffix: "Tn",
    label: "Could be AI contribution to India's economy by 2035",
    source: "The Hindu - AI could help add $957 bn to Indian economy",
    cta: "Be part of the revolution with future-proof learning skills.",
  },
];

export const courses = [
  {
    id: "1",
    slug: "emotional-harmony",
    title: "Workshop on Emotional Harmony",
    shortTitle: "Emotional Harmony",
    tagline:
      "Building Self Reliance to Understand and Address Underlying Emotions",
    description: `Explore techniques and practices to cultivate emotional balance and resilience in both personal and professional life.

This workshop delves into the nuances of emotional intelligence and harmony, offering practical strategies to manage stress, build resilience, and cultivate positive relationships. Participants will explore techniques such as mindfulness, self-awareness, and empathetic communication to navigate challenges effectively and foster emotional well-being in personal and professional life.`,
    objective:
      "Enabling students to manage their emotions better to become productive contributors to society thereby strengthening the nation.",
    category: "soft-skills",
    icon: "Heart",
    image: "/images/courses/emotional-harmony.jpg",
  },
  {
    id: "2",
    slug: "cognitive-readiness",
    title: "Workshop on Cognitive Readiness",
    shortTitle: "Cognitive Readiness",
    tagline:
      "Enhance cognitive abilities and readiness through engaging exercises",
    description: `Cognitive readiness encompasses a range of cognitive abilities, including communication, problem-solving, strategic thinking, and collaborative leadership.

Enhance cognitive abilities and readiness through engaging exercises and strategies designed to optimize mental performance and decision-making skills.

In this workshop, participants engage in activities and exercises designed to enhance cognitive readiness and mental agility. From problem-solving to decision-making, the program focuses on sharpening critical thinking skills, improving memory retention, and optimizing cognitive performance to adapt to various challenges and seize opportunities in dynamic environments.`,
    objective:
      "Helping students to assess their power skills and become self-aware and productive individuals.",
    category: "soft-skills",
    icon: "Brain",
    image: "/images/courses/cognitive-readiness.jpg",
  },
  {
    id: "3",
    slug: "business-communication",
    title: "Effective Business Communication",
    shortTitle: "Business Communication",
    tagline:
      "Using English as a medium for effective communication and story-telling",
    description: `Master the art of communication in the business world, learning to convey ideas clearly, build rapport, and navigate professional interactions effectively.

Effective communication lies at the heart of successful businesses. This course equips participants with the necessary skills and techniques to articulate ideas clearly, influence stakeholders, and foster collaborative relationships. Through interactive sessions and real-world scenarios, participants learn to craft persuasive messages, navigate conflicts, and convey complex information with clarity and confidence.`,
    objective:
      "Enable individuals to use English effectively to communicate thoughts and ideas.",
    category: "soft-skills",
    icon: "MessageSquare",
    image: "/images/courses/business-communication.jpg",
  },
  {
    id: "4",
    slug: "system-analysis-and-design",
    title: "System Analysis and Design",
    shortTitle: "System Analysis and Design",
    tagline:
      "Building understanding of System Analysis and design with Agile and Crisp-DM",
    description: `Gain insights into the principles and methodologies of system analysis and design, equipping yourself with essential skills for developing robust and scalable systems.

System analysis and design form the backbone of modern software development. In this course, participants gain a comprehensive understanding of the principles and methodologies involved in analyzing, designing, and implementing robust information systems. From requirement gathering to system testing, participants learn to develop scalable and efficient solutions tailored to organizational needs.`,
    objective:
      "Understanding System Analysis and design with delivery models, OOAD and UML. Special focus on Agile and Crisp-DM.",
    category: "technical",
    icon: "Settings",
    image: "/images/courses/system-analysis.jpg",
  },
  {
    id: "5",
    slug: "programming-languages",
    title: "Specializing in Programming Languages",
    shortTitle: "Programming Languages",
    tagline: "Building blocks of programming using Python, Java and SQL",
    description: `Dive deep into various programming languages, honing your expertise and proficiency in coding, debugging, and software development.

This course offers a deep dive into the world of programming languages, providing participants with hands-on experience and practical skills in coding and software development. From foundational concepts to advanced techniques, participants explore various programming languages, mastering the syntax, logic, and best practices essential for building innovative software solutions.`,
    objective:
      "Developing deep conceptual understanding and practical application of Python, Java and SQL.",
    category: "technical",
    icon: "Code",
    image: "/images/courses/programming.jpg",
  },
  {
    id: "6",
    slug: "data-visualization",
    title: "Data Visualization",
    shortTitle: "Data Visualization",
    tagline: "Effective visualization of Information",
    description: `Unlock the power of data visualization techniques to transform complex information into insightful visual representations, enabling better decision-making and communication.

Data visualization is a powerful tool for transforming complex data into meaningful insights. In this course, participants learn the principles and techniques of data visualization, leveraging tools and technologies to create compelling visualizations that drive informed decision-making. From interactive dashboards to compelling infographics, participants explore various visualization methods to communicate insights effectively.`,
    objective:
      "Develop understanding of tools like Tableau, Power BI and Qlik Sense for data visualization.",
    category: "technical",
    icon: "BarChart",
    image: "/images/courses/data-visualization.jpg",
  },
  {
    id: "7",
    slug: "artificial-intelligence-ecosystem",
    title: "Artificial Intelligence Eco System",
    shortTitle: "AI Ecosystem",
    tagline: "Understanding business analytics ecosystem",
    description: `Explore the intricate ecosystem of artificial intelligence, learning about its applications, advancements, and ethical considerations shaping the future of technology.

Dive into the fascinating realm of artificial intelligence (AI) with this comprehensive course. Participants explore the diverse applications and implications of AI across industries, from machine learning algorithms to natural language processing. Through case studies and discussions, participants gain insights into the ethical considerations and societal impacts shaping the AI ecosystem.`,
    objective:
      "Enable individuals to understand and apply concepts on AI/ML/DL/NLP/Gen AI/LLM",
    category: "technical",
    icon: "Cpu",
    image: "/images/courses/ai-ecosystem.jpg",
  },
  {
    id: "8",
    slug: "counselling-services",
    title: "Counselling Services",
    shortTitle: "Counselling Services",
    tagline: "Academic counselling and prepare aspiring professionals",
    description: `Develop counselling skills tailored for contexts, preparing to support individuals and teams in navigating professional challenges and achieving personal growth.

This course prepares participants to provide effective counselling and support in professional settings. Through theoretical frameworks and practical scenarios, participants develop essential counselling skills, including active listening, empathy, and rapport-building. With a focus on challenges, participants learn to facilitate personal and professional growth, supporting individuals and teams in achieving their full potential.`,
    objective:
      "Help individuals in selection of academic path through career counselling, mock interviews and assistance in applying for jobs.",
    category: "career",
    icon: "HeartHandshake",
    image: "/images/courses/counselling.jpg",
  },
  {
    id: "9",
    slug: "industry-readiness",
    title: "Industry Readiness",
    shortTitle: "Industry Readiness",
    tagline: "Prepare aspiring professionals for the industry",
    description: `Development skills tailored for industry contexts, preparing to support individuals and teams in navigating professional challenges and achieving personal growth.

This course prepares participants to provide effective support in professional settings. Through theoretical frameworks and practical scenarios, participants develop essential counselling skills, including active listening, empathy, and rapport-building. With a focus on industry-specific challenges, participants learn to facilitate personal and professional growth, supporting individuals and teams in achieving their full potential.`,
    objective:
      "Help individuals in selection of preparing for job interviews through career counselling, mock interviews and assistance in applying for jobs.",
    category: "career",
    icon: "Briefcase",
    image: "/images/courses/industry-readiness.jpg",
  },
  {
    id: "10",
    slug: "study-abroad",
    title: "Study Abroad",
    shortTitle: "Study Abroad",
    tagline: "Prepare for international opportunities",
    description: `Prepare aspiring professionals for the industry. Development skills tailored for industry contexts, preparing to support individuals and teams in navigating professional challenges and achieving personal growth.

This course prepares participants to provide effective support in professional settings. Through theoretical frameworks and practical scenarios, participants develop essential counselling skills, including active listening, empathy, and rapport-building. With a focus on industry-specific challenges, participants learn to facilitate personal and professional growth, supporting individuals and teams in achieving their full potential.`,
    objective:
      "Help individuals in selection of preparing for job interviews through career counselling, mock interviews and assistance in applying for jobs.",
    category: "career",
    icon: "Globe",
    image: "/images/courses/study-abroad.jpg",
  },
];

export const blogPosts = [
  {
    id: "1",
    slug: "restless-relentless",
    title: "Restless & Relentless",
    date: "2024-03-06",
    category: "Motivation",
    image: "/images/blog/restless-relentless.jpg",
  },
  {
    id: "2",
    slug: "outcome-based-service-delivery-model",
    title: "Outcome based Service Delivery Model",
    date: "2024-03-06",
    category: "Education",
    image: "/images/blog/outcome-based.jpg",
  },
  {
    id: "3",
    slug: "indians-more-afraid-of-ai-taking-away-jobs",
    title: "Indians more afraid of AI taking away jobs than their global peers",
    date: "2024-03-06",
    category: "AI & Jobs",
    image: "/images/blog/ai-jobs.jpg",
  },
  {
    id: "4",
    slug: "why-is-emotional-intelligence-important-for-students",
    title: "Why is emotional intelligence important for students?",
    date: "2024-03-06",
    category: "Emotional Intelligence",
    image: "/images/blog/emotional-intelligence.jpg",
  },
  {
    id: "5",
    slug: "companies-see-training-best-way-to-fill-demand-for-ai-talent",
    title:
      "Companies see training a best way to fill demand for AI talent, say educators",
    date: "2024-03-06",
    category: "AI & Training",
    image: "/images/blog/ai-training.jpg",
  },
  {
    id: "6",
    slug: "ai-to-have-positive-short-term-impact-on-jobs",
    title: "AI to have positive short-term impact on jobs, find global survey",
    date: "2024-03-07",
    category: "AI & Jobs",
    image: "/images/blog/ai-impact.jpg",
  },
  {
    id: "7",
    slug: "in-india-degrees-of-unemployability",
    title: "In India, degrees of unemployability",
    date: "2024-03-07",
    category: "Education",
    image: "/images/blog/unemployability.jpg",
  },
  {
    id: "8",
    slug: "worthless-degrees-creating-unemployable-generation",
    title:
      "Worthless degrees are creating an unemployable generation in India",
    date: "2024-03-07",
    category: "Education",
    image: "/images/blog/worthless-degrees.jpg",
  },
  {
    id: "9",
    slug: "why-indian-engineers-are-unemployable",
    title: "Why Indian Engineers are Unemployable & what's the solutions",
    date: "2024-03-07",
    category: "Career",
    image: "/images/blog/engineers-unemployable.jpg",
  },
  {
    id: "10",
    slug: "47-percent-graduates-unemployable",
    title: "47% graduates in India are unemployable for any job: Report",
    date: "2024-03-07",
    category: "Career",
    image: "/images/blog/graduates-report.jpg",
  },
  {
    id: "11",
    slug: "ais-impact-on-indias-recruitment-landscape",
    title:
      "AI's impact on India's recruitment landscape – Expectations and Beliefs",
    date: "2024-03-07",
    category: "AI & Recruitment",
    image: "/images/blog/ai-recruitment.jpg",
  },
  {
    id: "12",
    slug: "the-future-of-jobs-report-2023",
    title: "The Future of Jobs Report 2023",
    date: "2024-03-07",
    category: "Reports",
    image: "/images/blog/future-jobs.jpg",
  },
  {
    id: "13",
    slug: "fresher-must-have-skills",
    title: "Are you a fresher looking for job? These are your must-have skills",
    date: "2024-03-07",
    category: "Career",
    image: "/images/blog/fresher-skills.jpg",
  },
  {
    id: "14",
    slug: "employees-seek-personal-value-and-purpose",
    title:
      "Employees Seek Personal Value and Purpose at Work. Be Prepared to Deliver.",
    date: "2024-03-09",
    category: "Workplace",
    image: "/images/blog/personal-value.jpg",
  },
  {
    id: "15",
    slug: "use-ei-to-improve-career-prospects",
    title: "How can you use EI to improve your career prospects?",
    date: "2024-03-09",
    category: "Emotional Intelligence",
    image: "/images/blog/ei-career.jpg",
  },
];

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  footer: {
    courses: courses.map((course) => ({
      name: course.shortTitle,
      href: `/courses/${course.slug}`,
    })),
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
};

export const keyOfferings = [
  {
    title: "Emotional Harmony",
    description:
      "Equipping individuals with the tools to navigate the complexities of emotions, fostering resilience and a balanced mindset.",
  },
  {
    title: "Cognitive Readiness",
    description:
      "Building the mental agility to excel in an ever-evolving professional landscape.",
  },
  {
    title: "English Business Communication",
    description:
      "Enhancing communication skills for effective interaction in the global business arena.",
  },
  {
    title: "System Design",
    description:
      "Providing understanding of system interaction and delivery principles.",
  },
  {
    title: "Programming Languages",
    description: "Mastering the languages that drive innovation in the tech world.",
  },
  {
    title: "AI Ecosystem",
    description:
      "Create understanding of interconnected technologies, algorithms, and data-driven processes that collectively enable artificial intelligence applications and advancements.",
  },
  {
    title: "Data Visualization",
    description:
      "Developing the skills to communicate complex information through compelling visual representations.",
  },
  {
    title: "Counselling & Job Readiness",
    description:
      "Offering guidance and support for academic and professional growth. Ensuring students are well-prepared to make a lasting impression in the competitive job market.",
  },
];

// Image URLs from current website (for download reference)
export const imageAssets = {
  hero: {
    banner: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/banner4.png",
    instructor1: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/hero/1.png",
    instructor2: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/hero/2.png",
  },
  icons: {
    methodology: [
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/icon-1.png",
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/icon-2.png",
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/icon-3.png",
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/icon-4.png",
    ],
    tick: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/tick-icon.png",
    bullet: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/bullet-icon.png",
    contact: [
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/contact-icon-1.png",
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/contact-icon-2.png",
      "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/contact-icon-3.png",
    ],
    footer: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/footer-icon-3.png",
  },
  backgrounds: {
    about: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/about-bg.jpg",
    why: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/why.png",
  },
  founder: "https://northstaronline.in/wp-content/themes/northstarlive/assets/images/aurthor.png",
};
