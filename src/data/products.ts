import {
  AppWindow,
  AudioLines,
  BedDouble,
  BellRing,
  Bus,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  ClipboardCheck,
  Cloud,
  CreditCard,
  Dumbbell,
  Fingerprint,
  FlaskConical,
  Gauge,
  Globe,
  KeyRound,
  Layers,
  Leaf,
  Lightbulb,
  MessageSquare,
  Mic,
  Network,
  Nfc,
  Pill,
  Radar,
  ReceiptText,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Timer,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { iotProducts, softwareProducts } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type ProductFeature = { icon: LucideIcon; title: string; text: string };
export type ProductFaq = { q: string; a: string };
export type ProductStep = { title: string; text: string };

export type ProductDetail = {
  /** Same id as the card in `softwareProducts` / `iotProducts` (site.ts) */
  id: string;
  /** URL segment: /software/<slug> or /iot-products/<slug> */
  slug: string;
  kind: "software" | "iot";
  name: string;
  tagline: string;
  /** Hero paragraph */
  summary: string;
  /** Who it is for */
  audience: string[];
  features: ProductFeature[];
  benefits: string[];
  steps: ProductStep[];
  faqs: ProductFaq[];
  /** Short labels floated over the hero photo */
  chips: string[];
  /** Slugs of sibling products to suggest at the bottom */
  related: string[];
};

/* ------------------------------------------------------------------ */
/*  Shared delivery steps                                              */
/* ------------------------------------------------------------------ */
export const softwareSteps: ProductStep[] = [
  {
    title: "Consult & Plan",
    text: "A free consultation to understand your workflow, users and goals, followed by a clear scope and plan.",
  },
  {
    title: "Design & Develop",
    text: "We configure and build the modules you need with modern technologies, sharing progress along the way.",
  },
  {
    title: "Deploy & Integrate",
    text: "Seamless implementation: data set-up, integrations, team training and a smooth go-live.",
  },
  {
    title: "Support & Grow",
    text: "Always with you. Updates, new features and 24/7 support as your needs grow.",
  },
];

export const iotSteps: ProductStep[] = [
  {
    title: "Consult & Plan",
    text: "Tell us about your space and needs. We recommend the right setup and share a clear quote.",
  },
  {
    title: "Configure",
    text: "We prepare and test the devices for your requirements so installation stays quick.",
  },
  {
    title: "Install & Connect",
    text: "Our team installs the device, pairs it with the mobile app and shows you how everything works.",
  },
  {
    title: "Support & Grow",
    text: "Always with you. Help whenever you need it and easy add-ons as your needs grow.",
  },
];

/* ------------------------------------------------------------------ */
/*  Software                                                           */
/* ------------------------------------------------------------------ */
export const softwareDetails: ProductDetail[] = [
  {
    id: "hospital",
    slug: "hospital-management-system",
    kind: "software",
    name: "Hospital Management System",
    tagline: "One connected system for every department",
    summary:
      "Manage patients, OPD/IPD, billing, lab, pharmacy and more from a single platform. Your staff spend less time on paperwork and more time with patients.",
    audience: ["Clinics", "Nursing homes", "Multi-specialty hospitals", "Diagnostic labs"],
    features: [
      {
        icon: Users,
        title: "Patient Records",
        text: "Register a patient once and keep their history, prescriptions and reports in one place.",
      },
      {
        icon: CalendarCheck,
        title: "OPD & Appointments",
        text: "Appointment booking, doctor schedules and queue tokens for a smooth outpatient flow.",
      },
      {
        icon: BedDouble,
        title: "IPD & Bed Management",
        text: "Admissions, ward and bed allocation, and clean discharge summaries.",
      },
      {
        icon: ReceiptText,
        title: "Billing & Invoices",
        text: "Fast, itemised bills with deposits, discounts and clear payment records.",
      },
      {
        icon: FlaskConical,
        title: "Laboratory",
        text: "Test orders and result entry, with reports going straight to the patient record.",
      },
      {
        icon: Pill,
        title: "Pharmacy & Stock",
        text: "Medicine stock, batch and expiry tracking, linked to prescriptions and billing.",
      },
      {
        icon: Stethoscope,
        title: "Doctors & Staff",
        text: "Role-based logins so every user sees only what their job needs.",
      },
      {
        icon: ChartColumn,
        title: "Reports & Analytics",
        text: "Daily collections, footfall and department-wise dashboards for owners and admins.",
      },
    ],
    benefits: [
      "Less paperwork and fewer billing errors",
      "Every department works from one shared patient record",
      "Role-based access helps keep patient data private",
      "Live dashboards give owners a clear view of the hospital",
      "Modules follow your workflow, not the other way around",
      "Start with the modules you need and add more as you grow",
    ],
    steps: softwareSteps,
    faqs: [
      {
        q: "Can the system be customised for our hospital?",
        a: "Yes. Modules, forms, user roles, reports and invoice formats are tailored during the consultation so the software follows the way your hospital already works.",
      },
      {
        q: "Will it suit a small clinic as well as a large hospital?",
        a: "Yes. We begin with the modules you need today, such as OPD and billing, and add IPD, lab, pharmacy and more as you grow.",
      },
      {
        q: "How do you keep patient data safe?",
        a: "Access is role-based, so each person sees only what their role requires. We also help you plan secure hosting and regular backups.",
      },
      {
        q: "Do you train our staff and provide support?",
        a: "Yes. We train your team at go-live and stay available afterwards, including 24/7 support for urgent issues.",
      },
    ],
    chips: ["OPD / IPD", "Billing", "Lab & Pharmacy"],
    related: ["school-management-system", "gym-management-system", "custom-software-development"],
  },
  {
    id: "school",
    slug: "school-management-system",
    kind: "software",
    name: "School Management System",
    tagline: "Run the whole school from one dashboard",
    summary:
      "Admissions, fees, attendance, exams, transport and more in one system that keeps administrators, teachers, students and parents on the same page.",
    audience: ["Schools", "Junior colleges", "Coaching classes", "Pre-primary schools", "Education trusts"],
    features: [
      {
        icon: UserPlus,
        title: "Admissions",
        text: "Enquiries, applications and admissions handled digitally from first contact to enrolment.",
      },
      {
        icon: Wallet,
        title: "Fees & Accounts",
        text: "Fee structures, instalments, receipts and dues tracked without registers.",
      },
      {
        icon: UserCheck,
        title: "Attendance",
        text: "Quick daily attendance for students and staff, visible to parents right away.",
      },
      {
        icon: ClipboardCheck,
        title: "Exams & Results",
        text: "Exam schedules, marks entry and report cards prepared in a few clicks.",
      },
      {
        icon: CalendarDays,
        title: "Timetable",
        text: "Class and teacher timetables that avoid clashes and adjust when plans change.",
      },
      {
        icon: Bus,
        title: "Transport",
        text: "Routes, stops, vehicles and student transport lists in one place.",
      },
      {
        icon: MessageSquare,
        title: "Parent Communication",
        text: "Notices, circulars and messages that reach every parent at once.",
      },
      {
        icon: ChartColumn,
        title: "Reports & Analytics",
        text: "Collections, attendance and performance summaries for the management.",
      },
    ],
    benefits: [
      "Faster admissions and easier fee collection",
      "Parents stay informed about attendance, fees and results",
      "Far fewer manual registers and spreadsheets",
      "Notices and circulars reach everyone instantly",
      "Separate logins for admins, teachers, students and parents",
      "Set up around your board, classes and academic calendar",
    ],
    steps: softwareSteps,
    faqs: [
      {
        q: "Can it follow our board, grading system and academic calendar?",
        a: "Yes. Classes, subjects, grading, fee heads and report card formats are configured to match your school.",
      },
      {
        q: "Is there a way for parents and students to log in?",
        a: "Yes. Parents and students can have their own logins to see attendance, fees, notices and results, on the web or their phone.",
      },
      {
        q: "Can we move our existing student data into the system?",
        a: "We will discuss your current records during the consultation and plan how to bring them across during set-up.",
      },
      {
        q: "What support do we get after go-live?",
        a: "Training for your staff at launch, then ongoing support and updates, including 24/7 help for urgent issues.",
      },
    ],
    chips: ["Admissions", "Fees", "Attendance"],
    related: ["hospital-management-system", "gym-management-system", "custom-software-development"],
  },
  {
    id: "gym",
    slug: "gym-management-system",
    kind: "software",
    name: "Gym Management System",
    tagline: "Grow your fitness business with less admin",
    summary:
      "Memberships, biometric attendance, plans, payments and reports in one simple system, so you can focus on your members instead of registers and spreadsheets.",
    audience: ["Gyms", "Fitness studios", "Yoga & Zumba centres", "Health clubs", "Personal trainers"],
    features: [
      {
        icon: Users,
        title: "Member Management",
        text: "Profiles, joining details and membership history for every member.",
      },
      {
        icon: Fingerprint,
        title: "Biometric Attendance",
        text: "Fingerprint check-ins that are quick for members and reliable for you.",
      },
      {
        icon: Layers,
        title: "Plans & Packages",
        text: "Monthly, quarterly and custom plans, with offers and add-ons.",
      },
      {
        icon: CreditCard,
        title: "Payments & Renewals",
        text: "Track payments and dues, and see who is due for renewal at a glance.",
      },
      {
        icon: Dumbbell,
        title: "Trainers & Schedules",
        text: "Assign trainers, manage batches and keep class timings organised.",
      },
      {
        icon: BellRing,
        title: "Reminders & Alerts",
        text: "Expiry and payment reminders so renewals do not slip through.",
      },
      {
        icon: ChartColumn,
        title: "Reports",
        text: "Attendance, collections and growth reports to guide your decisions.",
      },
      {
        icon: KeyRound,
        title: "Smart Entry (optional)",
        text: "Pair with a Smart Door Lock so only active members can walk in.",
      },
    ],
    benefits: [
      "No more paper registers or spreadsheets",
      "Attendance you can trust, with biometric check-ins",
      "Renewals and dues are easy to follow up",
      "Clear reports on collections and member activity",
      "Simple enough for front-desk staff to learn quickly",
      "Works for a single gym or several branches",
    ],
    steps: softwareSteps,
    faqs: [
      {
        q: "Does it work with a fingerprint device?",
        a: "Yes. Biometric attendance is part of the system, and we help you choose and set up the right device.",
      },
      {
        q: "Can I run more than one branch?",
        a: "Yes. The system can be set up for multiple branches, with reports for each one and for the business as a whole.",
      },
      {
        q: "Can I create my own plans and offers?",
        a: "Yes. Plans, durations, fees and offers are fully configurable, so you can match your pricing.",
      },
      {
        q: "Can it connect to a smart lock at the entrance?",
        a: "It can. We build both, so linking member status to a Smart Door Lock is available on request.",
      },
    ],
    chips: ["Biometric attendance", "Plans", "Payments"],
    related: ["hospital-management-system", "school-management-system", "custom-software-development"],
  },
  {
    id: "custom",
    slug: "custom-software-development",
    kind: "software",
    name: "Custom Software Development",
    tagline: "Tailor-made software for your business needs",
    summary:
      "Have a process that no off-the-shelf tool fits? We design, build and support custom web and mobile software around the way your business actually works.",
    audience: ["Startups", "Small & medium businesses", "Institutions", "Enterprises"],
    features: [
      {
        icon: AppWindow,
        title: "Web Applications",
        text: "Fast, secure web apps and portals built for your team and your customers.",
      },
      {
        icon: Smartphone,
        title: "Mobile Apps",
        text: "Android and iOS apps that put your services in your customers' hands.",
      },
      {
        icon: ChartColumn,
        title: "Dashboards & Reports",
        text: "Live views of the numbers that matter, without manual spreadsheets.",
      },
      {
        icon: Network,
        title: "Integrations & APIs",
        text: "Connect your software with payment, messaging, accounting and device systems.",
      },
      {
        icon: Workflow,
        title: "Workflow Automation",
        text: "Automate approvals, reminders and repetitive tasks to save hours every week.",
      },
      {
        icon: Cloud,
        title: "Cloud Deployment",
        text: "Reliable hosting, backups and monitoring so your software stays available.",
      },
      {
        icon: ShieldCheck,
        title: "Security & Access",
        text: "Role-based access and sensible security practices built in from day one.",
      },
      {
        icon: Wrench,
        title: "Maintenance & Upgrades",
        text: "Ongoing fixes, updates and new features after launch.",
      },
    ],
    benefits: [
      "Built around your process instead of forcing you to change it",
      "You get one team for design, development, hosting and support",
      "Modern, proven technologies that scale with your business",
      "Regular demos so you see progress early",
      "Clear scope and plan before any development begins",
      "Support and upgrades that continue after go-live",
    ],
    steps: softwareSteps,
    faqs: [
      {
        q: "How do you price a custom project?",
        a: "After a free consultation we share a scoped plan and quote based on the modules, users and timeline involved.",
      },
      {
        q: "Which technologies do you use?",
        a: "We choose modern, proven technologies that suit your needs, typically current web and mobile frameworks, secure APIs and cloud hosting.",
      },
      {
        q: "Can you improve or extend software we already have?",
        a: "Yes. Share what you have and we will suggest whether to extend it, connect it to new systems or rebuild parts of it.",
      },
      {
        q: "Will you support the software after launch?",
        a: "Yes. We offer maintenance, updates and 24/7 support so your software keeps working as your business grows.",
      },
    ],
    chips: ["Web & Mobile", "Integrations", "Automation"],
    related: ["hospital-management-system", "school-management-system", "gym-management-system"],
  },
];

/* ------------------------------------------------------------------ */
/*  IoT                                                                */
/* ------------------------------------------------------------------ */
export const iotDetails: ProductDetail[] = [
  {
    id: "door-lock",
    slug: "smart-door-lock",
    kind: "iot",
    name: "Smart Door Lock",
    tagline: "Keyless entry with fingerprint, PIN, RFID and your phone",
    summary:
      "Secure your home, office or PG with a smart lock that opens with a fingerprint, PIN, RFID card or your phone, and lets you give or remove access from anywhere.",
    audience: ["Homes", "Apartments", "Offices", "PGs & hostels", "Shops"],
    features: [
      {
        icon: Fingerprint,
        title: "Fingerprint",
        text: "Quick, keyless entry with a single touch. No keys to carry or lose.",
      },
      {
        icon: Smartphone,
        title: "Mobile App",
        text: "Lock, unlock and check the status of your door from your phone.",
      },
      {
        icon: Nfc,
        title: "PIN / RFID",
        text: "Give family, staff and guests their own PIN or RFID card.",
      },
      {
        icon: Globe,
        title: "Remote Access",
        text: "Grant or remove access from anywhere, whenever plans change.",
      },
      {
        icon: ScrollText,
        title: "Access History",
        text: "See who came in and when, useful for homes, offices and rentals.",
      },
      {
        icon: Users,
        title: "Multiple Users",
        text: "Add several users, each with their own fingerprint, PIN or card.",
      },
    ],
    benefits: [
      "No more lost, copied or forgotten keys",
      "Several ways to open the door, so you are never locked out",
      "Give and remove access in seconds",
      "A clear record of entries",
      "Sleek design that suits modern doors",
      "Professional installation and support from our team",
    ],
    steps: iotSteps,
    faqs: [
      {
        q: "What if my phone battery is dead?",
        a: "The lock also opens with your fingerprint, a PIN or an RFID card, so you never depend on the phone alone.",
      },
      {
        q: "Can I give access to guests, family or staff?",
        a: "Yes. You can add users with their own credentials and remove them again whenever you need.",
      },
      {
        q: "Do I need internet for the lock to work?",
        a: "Remote access and app control need a connection. Fingerprint, PIN and card entry are used at the door itself.",
      },
      {
        q: "Who installs it?",
        a: "Our team handles installation and set-up. Share your door type and we will recommend the right fit.",
      },
    ],
    chips: ["Fingerprint", "PIN / RFID", "Remote access"],
    related: ["smart-door-bell", "home-automation", "water-tank-level-monitor"],
  },
  {
    id: "water-tank",
    slug: "water-tank-level-monitor",
    kind: "iot",
    name: "Water Tank Level Monitor",
    tagline: "Never run dry or overflow again",
    summary:
      "A wireless sensor measures the water level in your tank and shows it live on your phone, with alerts before it runs low and protection against overflow.",
    audience: ["Homes", "Housing societies", "Farms", "Schools & institutions", "Factories"],
    features: [
      {
        icon: Gauge,
        title: "Real-time Level",
        text: "See how much water is in the tank at any moment, right on your phone.",
      },
      {
        icon: BellRing,
        title: "Mobile Alerts",
        text: "Get notified when the level is low or the tank is full.",
      },
      {
        icon: ShieldAlert,
        title: "Overflow Protection",
        text: "Avoid wasted water and wet walls by acting before the tank overflows.",
      },
      {
        icon: Wrench,
        title: "Easy Installation",
        text: "A wireless sensor that is quick to fit on your existing tank.",
      },
      {
        icon: Workflow,
        title: "Pump Automation (on request)",
        text: "Connect the monitor to your pump for automatic filling and cut-off.",
      },
      {
        icon: Smartphone,
        title: "Simple App",
        text: "A clean mobile app that anyone in the family can read at a glance.",
      },
    ],
    benefits: [
      "Stop guessing and climbing up to check the tank",
      "Save water and electricity",
      "Avoid dry taps and overflow mess",
      "Suits homes, societies, farms and institutions",
      "Quick installation on your existing tank",
      "Support from our team whenever you need it",
    ],
    steps: iotSteps,
    faqs: [
      {
        q: "Can it be fitted to my existing tank?",
        a: "In most cases yes. Tell us about your tank and we will confirm the right setup during the consultation.",
      },
      {
        q: "Will it control my water pump too?",
        a: "Pump automation is available on request, so the pump can start and stop based on the water level.",
      },
      {
        q: "Can several tanks be monitored?",
        a: "Yes. We can set up monitoring for multiple tanks, which is common in societies and institutions.",
      },
      {
        q: "How do I get alerts?",
        a: "Alerts arrive on your phone through the app, so you know about low levels or a full tank without checking.",
      },
    ],
    chips: ["Live level", "Mobile alerts", "Overflow protection"],
    related: ["home-automation", "smart-door-lock", "smart-door-bell"],
  },
  {
    id: "home-automation",
    slug: "home-automation",
    kind: "iot",
    name: "Home Automation",
    tagline: "Smarter living for a connected world",
    summary:
      "Control lights, fans and appliances from your phone or with your voice, set routines that run on their own, and save energy, all from one simple app.",
    audience: ["Villas & bungalows", "Apartments", "Offices", "Hospitality"],
    features: [
      {
        icon: Lightbulb,
        title: "Lights & Appliances",
        text: "Switch lights, fans and appliances on or off from anywhere in the house.",
      },
      {
        icon: Smartphone,
        title: "Mobile Control",
        text: "One app for every room, with scenes for morning, movie night and leaving home.",
      },
      {
        icon: Mic,
        title: "Voice Assistant",
        text: "Hands-free control with popular voice assistants.",
      },
      {
        icon: Leaf,
        title: "Energy Saving",
        text: "Schedules and automation that turn things off when you do not need them.",
      },
      {
        icon: Timer,
        title: "Schedules & Scenes",
        text: "Set routines once and let your home run them every day.",
      },
      {
        icon: ShieldCheck,
        title: "Enhanced Security",
        text: "Add smart locks and door bells to keep an eye on who comes and goes.",
      },
    ],
    benefits: [
      "Comfort and convenience at your fingertips",
      "Lower energy bills through smarter use",
      "Works alongside your existing switches",
      "Grow step by step, one room at a time",
      "Combine with smart locks and video door bells",
      "Installed and supported by our team",
    ],
    steps: iotSteps,
    faqs: [
      {
        q: "Can I automate an existing home or only a new one?",
        a: "Both. We plan the set-up around your existing wiring and can start with a few rooms, then expand.",
      },
      {
        q: "Will the normal switches still work?",
        a: "Yes. The idea is to add smart control on top, so your regular switches remain usable.",
      },
      {
        q: "Does it work with voice assistants?",
        a: "Yes. Voice control is part of the solution, so you can use simple commands to control your devices.",
      },
      {
        q: "Can I add more devices later?",
        a: "Absolutely. Start small and add lights, appliances, locks or door bells whenever you are ready.",
      },
    ],
    chips: ["Voice control", "Energy saving", "Mobile app"],
    related: ["smart-door-lock", "smart-door-bell", "water-tank-level-monitor"],
  },
  {
    id: "door-bell",
    slug: "smart-door-bell",
    kind: "iot",
    name: "Smart Door Bell",
    tagline: "See and speak to anyone at your door",
    summary:
      "A video door bell that lets you see, hear and talk to visitors from your phone, with motion detection and stored clips so you never miss a delivery or a guest.",
    audience: ["Homes", "Apartments", "Offices", "Shops"],
    features: [
      {
        icon: Video,
        title: "Video Calling",
        text: "See who is at the door and answer from your phone, wherever you are.",
      },
      {
        icon: Radar,
        title: "Motion Detection",
        text: "Get alerted when someone approaches your door.",
      },
      {
        icon: AudioLines,
        title: "Two Way Audio",
        text: "Talk to visitors and delivery staff without opening the door.",
      },
      {
        icon: Cloud,
        title: "Cloud / Local Storage",
        text: "Keep clips in the cloud or on local storage, whichever suits you.",
      },
      {
        icon: BellRing,
        title: "Instant Alerts",
        text: "Notifications on your phone so you never miss a visitor.",
      },
      {
        icon: KeyRound,
        title: "Works with Smart Lock",
        text: "Pair with a Smart Door Lock to answer and let visitors in remotely.",
      },
    ],
    benefits: [
      "Know who is at the door before you open it",
      "Never miss a delivery",
      "A safer, more private way to answer the door",
      "Review motion clips when you need them",
      "Pairs with your smart lock and home automation",
      "Professional installation and support",
    ],
    steps: iotSteps,
    faqs: [
      {
        q: "Can I answer the bell when I am not at home?",
        a: "Yes. With a connection, you can see and talk to the visitor from your phone from anywhere.",
      },
      {
        q: "Where are recordings stored?",
        a: "You can choose cloud or local storage, depending on what suits your needs and budget.",
      },
      {
        q: "Does it alert me when someone is nearby but has not rung?",
        a: "Yes. Motion detection notifies you when someone approaches the door.",
      },
      {
        q: "Can it work with the rest of my smart home?",
        a: "It can be combined with a Smart Door Lock and Home Automation for a complete connected entrance.",
      },
    ],
    chips: ["Video calling", "Motion detection", "Two way audio"],
    related: ["smart-door-lock", "home-automation", "water-tank-level-monitor"],
  },
];

/* ------------------------------------------------------------------ */
/*  Lookups                                                            */
/* ------------------------------------------------------------------ */
export const allProducts: ProductDetail[] = [...softwareDetails, ...iotDetails];

export const productHref = (product: Pick<ProductDetail, "kind" | "slug">) =>
  product.kind === "software" ? `/software/${product.slug}` : `/iot-products/${product.slug}`;

export const findProduct = (kind: ProductDetail["kind"], slug: string) =>
  allProducts.find((product) => product.kind === kind && product.slug === slug);

export const findBySlug = (slug: string) => allProducts.find((product) => product.slug === slug);

/** Options for the "I'm interested in" field on the contact and support forms. */
export const interestOptions: string[] = [
  ...allProducts.map((product) => product.name),
  "AI & Computer Vision",
  "Embedded Systems",
  "Cloud & DevOps",
  "Something else",
];

/** Photo + icon a product uses on cards and heroes (these live with the home-page card data). */
export type ProductVisual = {
  image: string;
  alt: string;
  /** object-position that keeps the subject in frame */
  position: string;
  scale?: number;
  origin?: string;
  icon: LucideIcon;
  accent: string;
};

export function visualFor(product: Pick<ProductDetail, "kind" | "id">): ProductVisual {
  if (product.kind === "software") {
    const card = softwareProducts.find((item) => item.id === product.id);
    if (!card) throw new Error(`No software card for "${product.id}" in site.ts`);
    return card;
  }
  const card = iotProducts.find((item) => item.id === product.id);
  if (!card) throw new Error(`No IoT card for "${product.id}" in site.ts`);
  return card;
}
