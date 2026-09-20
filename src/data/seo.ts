/**
 * All search-engine copy in one place: titles, meta descriptions, keywords, share-card text,
 * on-page overview paragraphs and the home-page FAQ.
 *
 * Kept free of imports on purpose so it can be linted / length-checked with plain Node.
 * Guidelines used: title <= ~60 characters, description <= ~160 characters, every page has a
 * unique title and description, brand name + product keyword + "Pune" where it is natural.
 */

export type OgCard = {
  /** Small label above the title, e.g. "Software" */
  label: string;
  title: string;
  subtitle: string;
};

export type SeoEntry = {
  path: string;
  /** Full <title> (the brand is already included, no template is applied) */
  title: string;
  description: string;
  keywords: string[];
  /** Text of the generated 1200x630 share image served at /og/<key> */
  og: OgCard & { key: string };
};

/* ------------------------------------------------------------------ */
/*  Site-wide pages                                                    */
/* ------------------------------------------------------------------ */
export const pageSeo = {
  home: {
    path: "/",
    title: "Infiotix Technologies | Software & IoT Solutions in Pune",
    description:
      "Infiotix Technologies is a Pune software and IoT company: hospital, school & gym management software, smart door locks, water tank monitors, home automation.",
    keywords: [
      "Infiotix",
      "Infiotix Technologies",
      "Infiotix Technology",
      "Infiotix Pune",
      "software company in Pune",
      "IoT company in Pune",
      "hospital management software",
      "school management software",
      "gym management software",
      "smart door lock",
      "home automation",
    ],
    og: {
      key: "home",
      label: "Software & IoT · Pune",
      title: "Smart Software. Smarter Solutions.",
      subtitle: "Intelligent software and IoT solutions for a smarter, safer and more connected world.",
    },
  },
  about: {
    path: "/about",
    title: "About Infiotix Technologies | Software & IoT Company, Pune",
    description:
      "Infiotix Technologies is a Pune-based software and IoT company building smart, reliable, connected solutions for hospitals, schools, gyms, homes and businesses.",
    keywords: [
      "about Infiotix",
      "Infiotix Technologies Pune",
      "software and IoT company",
      "software development company Pune",
      "IoT solutions provider Pune",
    ],
    og: {
      key: "about",
      label: "About us",
      title: "About Infiotix Technologies",
      subtitle: "A Pune-based software and IoT company building connected solutions.",
    },
  },
  software: {
    path: "/software",
    title: "Hospital, School & Gym Management Software | Infiotix",
    description:
      "Hospital, school and gym management software plus custom software development from Infiotix Technologies, Pune. Free demo and 24/7 support.",
    keywords: [
      "management software",
      "hospital management software",
      "school management software",
      "gym management software",
      "custom software development",
      "software company in Pune",
      "Infiotix software",
    ],
    og: {
      key: "software",
      label: "Software",
      title: "Management Software for Hospitals, Schools & Gyms",
      subtitle: "Plus fully custom software built around your business.",
    },
  },
  iotProducts: {
    path: "/iot-products",
    title: "Smart Door Lock, Tank Monitor & Home Automation | Infiotix",
    description:
      "Smart door locks, water tank level monitors, home automation and video door bells from Infiotix Technologies, Pune. IoT products for home, office and farm.",
    keywords: [
      "IoT products",
      "smart door lock",
      "water tank level monitor",
      "home automation",
      "smart video door bell",
      "IoT company in Pune",
      "Infiotix IoT",
    ],
    og: {
      key: "iot-products",
      label: "IoT Products",
      title: "Smart Devices for a Connected World",
      subtitle: "Door locks, water tank monitors, home automation and video door bells.",
    },
  },
  solutions: {
    path: "/solutions",
    title: "Software & IoT Solutions for Every Industry | Infiotix",
    description:
      "Software and IoT solutions for healthcare, education, fitness, homes, agriculture, retail and government, plus AI, embedded and cloud. By Infiotix, Pune.",
    keywords: [
      "software solutions for hospitals",
      "software solutions for schools",
      "IoT solutions for homes",
      "IoT for agriculture",
      "AI and computer vision",
      "embedded systems",
      "cloud and DevOps",
    ],
    og: {
      key: "solutions",
      label: "Solutions",
      title: "Technology for Every Industry",
      subtitle: "Healthcare, education, fitness, homes, agriculture, retail and more.",
    },
  },
  projects: {
    path: "/projects",
    title: "Software & IoT Projects | Infiotix Technologies",
    description:
      "Explore the hospital, school and gym software and the smart IoT products designed, built and supported by Infiotix Technologies in Pune.",
    keywords: [
      "software projects",
      "IoT projects",
      "Infiotix projects",
      "hospital software project",
      "smart home project",
    ],
    og: {
      key: "projects",
      label: "Our work",
      title: "Projects Built for Real-World Needs",
      subtitle: "Software and IoT solutions designed, built and supported by Infiotix.",
    },
  },
  support: {
    path: "/support",
    title: "24/7 Support for Software & IoT Products | Infiotix",
    description:
      "Round-the-clock support for every Infiotix software and IoT solution. Call, chat on WhatsApp, email or raise a request online and our engineers will help.",
    keywords: [
      "Infiotix support",
      "software support",
      "IoT product support",
      "24/7 technical support",
      "maintenance and support",
    ],
    og: {
      key: "support",
      label: "Support",
      title: "Support That Stays With You",
      subtitle: "24/7 help by phone, WhatsApp, email or online request.",
    },
  },
  contact: {
    path: "/contact",
    title: "Contact Infiotix Technologies | Pune, Maharashtra",
    description:
      "Contact Infiotix Technologies in Pune. Call 70584 09290, WhatsApp or email info@infiotix.com for a free consultation on your software or IoT project.",
    keywords: [
      "contact Infiotix",
      "Infiotix Technologies Pune contact",
      "software company Pune contact",
      "free consultation",
      "request a quote",
    ],
    og: {
      key: "contact",
      label: "Contact",
      title: "Let's Build a Smarter Tomorrow Together",
      subtitle: "Call 70584 09290 · info@infiotix.com · Pune, Maharashtra",
    },
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy | Infiotix Technologies",
    description:
      "How Infiotix Technologies collects, uses and protects the information you share through this website.",
    keywords: ["Infiotix privacy policy"],
    og: {
      key: "privacy-policy",
      label: "Legal",
      title: "Privacy Policy",
      subtitle: "How Infiotix Technologies handles your information.",
    },
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Terms & Conditions | Infiotix Technologies",
    description:
      "The terms and conditions that apply when you use the Infiotix Technologies website and request our software, IoT products and services.",
    keywords: ["Infiotix terms and conditions"],
    og: {
      key: "terms-and-conditions",
      label: "Legal",
      title: "Terms & Conditions",
      subtitle: "Using the Infiotix Technologies website and services.",
    },
  },
  sitemap: {
    path: "/sitemap",
    title: "Sitemap | Infiotix Technologies",
    description: "Every page on the Infiotix Technologies website in one place: software, IoT products, solutions and support.",
    keywords: ["Infiotix sitemap"],
    og: {
      key: "sitemap",
      label: "Sitemap",
      title: "Find Your Way Around",
      subtitle: "Every page on the Infiotix Technologies website.",
    },
  },
} satisfies Record<string, SeoEntry>;

/* ------------------------------------------------------------------ */
/*  Products (keyed by URL slug, see data/products.ts)                 */
/* ------------------------------------------------------------------ */
export type ProductSeo = Omit<SeoEntry, "path"> & {
  /** schema.org node used for the product's structured data */
  schemaType: "SoftwareApplication" | "Service" | "Product";
  /** Other names people use when searching for it */
  alternateNames: string[];
  /** Visible "About" paragraphs on the product page (natural language, keyword-rich) */
  overview: string[];
};

export const productSeo: Record<string, ProductSeo> = {
  "hospital-management-system": {
    title: "Hospital Management Software in Pune | Infiotix",
    description:
      "Hospital management software for clinics and hospitals: OPD, IPD, billing, lab, pharmacy and reports in one system. Free demo from Infiotix Technologies, Pune.",
    keywords: [
      "hospital management software",
      "hospital management system",
      "hospital software in Pune",
      "clinic management software",
      "OPD IPD billing software",
      "HMS software",
      "hospital pharmacy and lab software",
      "patient record software",
      "Infiotix hospital management system",
    ],
    og: {
      key: "hospital-management-system",
      label: "Software",
      title: "Hospital Management Software",
      subtitle: "OPD, IPD, billing, lab and pharmacy in one connected system.",
    },
    schemaType: "SoftwareApplication",
    alternateNames: ["Hospital Management Software", "Hospital Software", "HMS Software", "Clinic Management Software"],
    overview: [
      "Infiotix Hospital Management System is hospital management software that brings patient records, OPD appointments, IPD and bed management, billing, laboratory and pharmacy into one connected platform. Every department works from the same patient record, so front-desk staff, doctors, nurses, lab technicians and accounts teams spend less time on paperwork and duplicate entry.",
      "Built by Infiotix Technologies in Pune, the software suits clinics, nursing homes, multi-specialty hospitals and diagnostic labs. We configure the modules, forms, user roles, reports and invoice formats around your workflow, train your staff at go-live and stay available with 24/7 support afterwards. Start with the modules you need, such as OPD and billing, and add IPD, lab and pharmacy as you grow.",
    ],
  },
  "school-management-system": {
    title: "School Management Software in Pune | Infiotix",
    description:
      "School management software with admissions, fees, attendance, exams, transport and parent communication. Free demo from Infiotix Technologies, Pune.",
    keywords: [
      "school management software",
      "school management system",
      "school ERP software",
      "school software in Pune",
      "fee management software",
      "school attendance software",
      "exam and result software",
      "Infiotix school management system",
    ],
    og: {
      key: "school-management-system",
      label: "Software",
      title: "School Management Software",
      subtitle: "Admissions, fees, attendance, exams and transport in one dashboard.",
    },
    schemaType: "SoftwareApplication",
    alternateNames: ["School Management Software", "School Software", "School ERP", "School ERP Software"],
    overview: [
      "Infiotix School Management System is school management software (often called school ERP) that handles admissions, fee collection, attendance, exams and results, timetables, transport and parent communication from a single dashboard. Administrators, teachers, students and parents each get their own login, so everyone sees exactly what they need.",
      "Made in Pune by Infiotix Technologies, the software is set up around your board, classes, grading system and academic calendar. It suits schools, junior colleges, coaching classes, pre-primary schools and education trusts, and comes with staff training at launch and ongoing support, including 24/7 help for urgent issues.",
    ],
  },
  "gym-management-system": {
    title: "Gym Management Software with Biometric Attendance | Infiotix",
    description:
      "Gym management software for memberships, biometric attendance, plans, payments and reports. Easy for front-desk staff. From Infiotix Technologies, Pune.",
    keywords: [
      "gym management software",
      "gym management system",
      "gym membership software",
      "biometric attendance for gym",
      "fitness studio software",
      "gym software in Pune",
      "Infiotix gym management system",
    ],
    og: {
      key: "gym-management-system",
      label: "Software",
      title: "Gym Management Software",
      subtitle: "Memberships, biometric attendance, plans, payments and reports.",
    },
    schemaType: "SoftwareApplication",
    alternateNames: ["Gym Management Software", "Gym Software", "Gym Membership Software"],
    overview: [
      "Infiotix Gym Management System is gym management software for memberships, biometric fingerprint attendance, plans and packages, payments, renewals and reports. Front-desk staff can register a member, mark attendance and collect fees in a few clicks, while owners see collections and member activity at a glance.",
      "It suits gyms, fitness studios, yoga and Zumba centres, health clubs and personal trainers, and works for one branch or several. Because Infiotix builds both software and IoT, it can also be paired with a Smart Door Lock so only active members can walk in. Designed and supported from Pune.",
    ],
  },
  "custom-software-development": {
    title: "Custom Software Development Company in Pune | Infiotix",
    description:
      "Custom web and mobile software development in Pune: tailor-made apps, dashboards, integrations and automation with 24/7 support from Infiotix Technologies.",
    keywords: [
      "custom software development",
      "software development company in Pune",
      "custom web application development",
      "mobile app development Pune",
      "software development services",
      "workflow automation software",
      "Infiotix custom software",
    ],
    og: {
      key: "custom-software-development",
      label: "Software",
      title: "Custom Software Development",
      subtitle: "Tailor-made web and mobile software for your business needs.",
    },
    schemaType: "Service",
    alternateNames: ["Custom Software Development", "Software Development Company in Pune", "Custom Software Company"],
    overview: [
      "Infiotix Technologies is a software development company in Pune building custom web applications, mobile apps, dashboards, integrations and workflow automation around the way your business actually works. We plan the scope with you, build in stages with regular demos, deploy to reliable cloud hosting and support the software after launch.",
      "Whether you are a startup, a growing business, an institution or an enterprise, one team looks after design, development, hosting and support. Share your idea in a free consultation and we will suggest the right approach, a clear plan and a no-obligation quote.",
    ],
  },
  "smart-door-lock": {
    title: "Smart Door Lock with Fingerprint, PIN & RFID | Infiotix",
    description:
      "Smart door lock that opens with fingerprint, PIN, RFID card or phone. Remote access, access history and professional installation by Infiotix, Pune.",
    keywords: [
      "smart door lock",
      "fingerprint door lock",
      "RFID door lock",
      "digital door lock",
      "smart lock in Pune",
      "keyless entry door lock",
      "Infiotix smart door lock",
    ],
    og: {
      key: "smart-door-lock",
      label: "IoT Product",
      title: "Smart Door Lock",
      subtitle: "Fingerprint, PIN, RFID and mobile app with remote access.",
    },
    schemaType: "Product",
    alternateNames: ["Smart Lock", "Fingerprint Door Lock", "Digital Door Lock"],
    overview: [
      "The Infiotix Smart Door Lock is a keyless smart lock that opens with a fingerprint, PIN, RFID card or your phone. You can add several users, each with their own credentials, give or remove access remotely and review who entered and when.",
      "It suits homes, apartments, offices, PGs and hostels, and shops. Our team in Pune handles installation and set-up, pairs the lock with the mobile app and stays available for support. It can also be combined with the Smart Door Bell and Home Automation for a complete connected entrance.",
    ],
  },
  "water-tank-level-monitor": {
    title: "Water Tank Level Monitor with Mobile Alerts | Infiotix",
    description:
      "Wireless water tank level monitor with live level on your phone, low-level alerts and overflow protection for homes, societies and farms. Infiotix, Pune.",
    keywords: [
      "water tank level monitor",
      "water level indicator",
      "water tank level indicator with mobile app",
      "IoT water tank monitoring",
      "tank overflow alarm",
      "water level sensor",
      "Infiotix water tank monitor",
    ],
    og: {
      key: "water-tank-level-monitor",
      label: "IoT Product",
      title: "Water Tank Level Monitor",
      subtitle: "Live level, mobile alerts and overflow protection.",
    },
    schemaType: "Product",
    alternateNames: ["Water Level Indicator", "Water Tank Monitor", "Tank Level Sensor"],
    overview: [
      "The Infiotix Water Tank Level Monitor is a wireless water level indicator that shows the water level in your tank live on your phone. It sends alerts when the level is low or the tank is full, helping you avoid dry taps, overflow and wasted water and electricity.",
      "It suits homes, housing societies, farms, schools and institutions, and factories, and can monitor more than one tank. Pump automation is available on request so the pump starts and stops on its own. Installation and support are provided by Infiotix Technologies, Pune.",
    ],
  },
  "home-automation": {
    title: "Home Automation System for Smart Homes | Infiotix",
    description:
      "Control lights, fans and appliances from your phone or voice. Smart home automation with scenes, schedules and energy saving from Infiotix, Pune.",
    keywords: [
      "home automation",
      "home automation system",
      "smart home automation",
      "smart home in Pune",
      "voice control home automation",
      "lights and appliance control app",
      "Infiotix home automation",
    ],
    og: {
      key: "home-automation",
      label: "IoT Product",
      title: "Home Automation",
      subtitle: "Smarter living: lights, appliances, voice control and energy saving.",
    },
    schemaType: "Product",
    alternateNames: ["Smart Home Automation", "Smart Home System", "Home Automation System"],
    overview: [
      "Infiotix Home Automation lets you control lights, fans and appliances from your phone or with your voice, run schedules and scenes for morning, movie night or leaving home, and save energy by switching things off automatically. Your normal switches keep working alongside the smart control.",
      "We plan the set-up around your existing wiring for villas, bungalows, apartments, offices and hospitality spaces, start with a few rooms and let you expand step by step. Add a Smart Door Lock or a video Smart Door Bell for enhanced security. Installed and supported by Infiotix Technologies in Pune.",
    ],
  },
  "smart-door-bell": {
    title: "Smart Video Door Bell with Two-Way Audio | Infiotix",
    description:
      "Smart video door bell with live view, two-way audio, motion detection and stored clips on your phone. Installation and support by Infiotix, Pune.",
    keywords: [
      "smart door bell",
      "video door bell",
      "smart video doorbell",
      "door bell camera with two way audio",
      "wireless video door bell",
      "Infiotix smart door bell",
    ],
    og: {
      key: "smart-door-bell",
      label: "IoT Product",
      title: "Smart Video Door Bell",
      subtitle: "See, hear and talk to visitors from your phone.",
    },
    schemaType: "Product",
    alternateNames: ["Video Door Bell", "Smart Doorbell", "Video Doorbell"],
    overview: [
      "The Infiotix Smart Door Bell is a video door bell that lets you see, hear and talk to visitors from your phone with two-way audio. Motion detection alerts you when someone approaches, and clips can be stored in the cloud or on local storage.",
      "Answer the bell from anywhere, never miss a delivery and review clips when you need them. It suits homes, apartments, offices and shops, and pairs with a Smart Door Lock and Home Automation. Installation and support by Infiotix Technologies, Pune.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Home page: visible "About" copy + FAQ (also emitted as FAQPage)    */
/* ------------------------------------------------------------------ */
export const homeAbout = {
  paragraphs: [
    "Infiotix Technologies (also known as Infiotix or Infiotix Technology) is a Pune-based company that designs, builds and supports software and IoT products. Our hospital management software, school management software and gym management software help organisations run day-to-day operations from one system, while our smart door locks, water tank level monitors, home automation and video door bells make homes and workplaces safer and more connected.",
    "Have something different in mind? We also build custom software for businesses of every size, and stay with you after launch with training, updates and 24/7 support.",
  ],
};

export const homeFaqs: { q: string; a: string }[] = [
  {
    q: "What is Infiotix Technologies?",
    a: "Infiotix Technologies, also searched as Infiotix or Infiotix Technology, is a software and IoT company based in Pune, Maharashtra, India. We build hospital, school and gym management software, custom software, and smart IoT products such as smart door locks, water tank level monitors, home automation and video door bells.",
  },
  {
    q: "Which software does Infiotix offer?",
    a: "Hospital Management System, School Management System, Gym Management System and fully Custom Software Development. Each can be tailored to your workflow, and we train your team and support you after go-live.",
  },
  {
    q: "Which IoT products does Infiotix offer?",
    a: "Smart Door Lock (fingerprint, PIN, RFID and mobile app), Water Tank Level Monitor, Home Automation and Smart Door Bell (video calling with two-way audio). We handle installation and support.",
  },
  {
    q: "Can Infiotix build custom software for my business?",
    a: "Yes. We design, build and support custom web and mobile software, dashboards, integrations and workflow automation. Share your idea in a free consultation and we will suggest an approach, a clear plan and a no-obligation quote.",
  },
  {
    q: "Where is Infiotix located and how can I contact the team?",
    a: "Infiotix Technologies is based in Pune, Maharashtra, India. Call 70584 09290, chat on WhatsApp or email info@infiotix.com. Customers get 24/7 support.",
  },
];

/* ------------------------------------------------------------------ */
/*  Share cards, keyed by `og.key` (rendered by /og/[key])             */
/* ------------------------------------------------------------------ */
export const ogCards: Record<string, OgCard> = Object.fromEntries(
  [...Object.values(pageSeo), ...Object.values(productSeo)].map((entry) => [
    entry.og.key,
    { label: entry.og.label, title: entry.og.title, subtitle: entry.og.subtitle },
  ]),
);
