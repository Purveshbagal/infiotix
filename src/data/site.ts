import {
  AudioLines,
  BellRing,
  Blocks,
  ChartColumnIncreasing,
  CircuitBoard,
  Cloud,
  CodeXml,
  Database,
  Dumbbell,
  Fingerprint,
  Gauge,
  Globe,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Headset,
  Hospital,
  House,
  Landmark,
  Leaf,
  Lightbulb,
  Lock,
  Mic,
  Nfc,
  Puzzle,
  Radar,
  ScanEye,
  School,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  SquareMousePointer,
  Sprout,
  Store,
  Video,
  Wrench,
  Cpu,
  Droplet,
  Bell,
  Code,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Company                                                            */
/* ------------------------------------------------------------------ */
export const company = {
  name: "Infiotix Technologies",
  tagline: "Innovating Connected Lives",
  phone: "70584 09290",
  phoneHref: "tel:+917058409290",
  whatsappHref: "https://wa.me/917058409290",
  email: "info@infiotix.com",
  location: "Pune, Maharashtra, India",
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Software", href: "/software" },
  { label: "IoT Products", href: "/iot-products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const heroFeatures: {
  lines: string[];
  icon: LucideIcon;
  color: string;
}[] = [
  { lines: ["Software", "Development"], icon: SquareMousePointer, color: "#4f8cff" },
  { lines: ["IoT & Automation"], icon: CircuitBoard, color: "#f5a524" },
  { lines: ["AI & Computer Vision"], icon: ScanEye, color: "#3aa0ff" },
  { lines: ["Custom Solutions"], icon: Puzzle, color: "#2dd4a7" },
];

export const heroStats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support" },
] as const;

export const heroTags = [
  "Software",
  "IoT",
  "Automation",
  "AI",
  "For a Smarter",
  "Tomorrow",
] as const;

/* ------------------------------------------------------------------ */
/*  Process strip                                                      */
/* ------------------------------------------------------------------ */
export const processSteps: {
  title: string;
  text: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { title: "Consult & Plan", text: "Understand your needs", icon: Lightbulb, color: "#fbbf24" },
  { title: "Design & Develop", text: "Modern technologies", icon: CodeXml, color: "#34d399" },
  { title: "Deploy & Integrate", text: "Seamless implementation", icon: Database, color: "#22d3ee" },
  { title: "Support & Grow", text: "Always with you", icon: ChartColumnIncreasing, color: "#f59e0b" },
];

/* ------------------------------------------------------------------ */
/*  Software solutions                                                 */
/* ------------------------------------------------------------------ */
export const softwareProducts: {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** object-position of the photo inside the card */
  position: string;
  /** extra zoom + its anchor, used to crop out text baked into a photo */
  scale?: number;
  origin?: string;
  icon: LucideIcon;
  accent: string;
  cta: { label: string; href: string };
}[] = [
  {
    id: "hospital",
    title: "Hospital Management System",
    description: "Manage patients, OPD/IPD, billing,\nlab, pharmacy and more.",
    image: "/images/software-hospital.png",
    alt: "Doctor standing beside the Infiotix hospital management software dashboard",
    position: "50% 30%",
    icon: Hospital,
    accent: "#34d399",
    cta: { label: "View Details", href: "/software/hospital-management-system" },
  },
  {
    id: "school",
    title: "School Management System",
    description: "Admissions, fees, attendance,\nexams, transport and more.",
    image: "/images/software-school.png",
    alt: "Student using the Infiotix school management software on a desktop and tablet",
    position: "50% 30%",
    icon: School,
    accent: "#4f8cff",
    cta: { label: "View Details", href: "/software/school-management-system" },
  },
  {
    id: "gym",
    title: "Gym Management System",
    description: "Membership, biometric attendance,\nplans, payments and reports.",
    image: "/images/software-gym.png",
    alt: "Trainer checking the Infiotix gym management software dashboard on a tablet",
    position: "50% 30%",
    icon: Dumbbell,
    accent: "#a855f7",
    cta: { label: "View Details", href: "/software/gym-management-system" },
  },
  {
    id: "custom",
    title: "Custom Software Development",
    description: "Tailor-made software for your\nbusiness needs.",
    image: "/images/software-custom.png",
    alt: "Laptop showing code for a custom software development project by Infiotix",
    position: "50% 40%",
    scale: 1.35,
    origin: "76% 45%",
    icon: Code,
    accent: "#2dd4bf",
    cta: { label: "Get a Quote", href: "/contact?interest=Custom%20Software%20Development" },
  },
];

/* ------------------------------------------------------------------ */
/*  IoT products                                                       */
/* ------------------------------------------------------------------ */
export const iotProducts: {
  id: string;
  title: string;
  /** detail page */
  href: string;
  image: string;
  alt: string;
  position: string;
  scale?: number;
  origin?: string;
  icon: LucideIcon;
  /** tint used for this product on its own pages */
  accent: string;
  features: { icon: LucideIcon; label: string }[];
  /** floating labels drawn on top of the photo (Smart Door Lock only) */
  callouts?: string[];
}[] = [
  {
    id: "door-lock",
    title: "Smart Door Lock",
    href: "/iot-products/smart-door-lock",
    image: "/images/iot-door-lock.png",
    alt: "Finger on the fingerprint sensor of an Infiotix smart door lock",
    position: "0% 40%",
    icon: Lock,
    accent: "#f5a524",
    features: [
      { icon: Fingerprint, label: "Fingerprint" },
      { icon: Smartphone, label: "Mobile App" },
      { icon: Nfc, label: "PIN / RFID" },
      { icon: Globe, label: "Remote Access" },
    ],
    callouts: ["Fingerprint", "Mobile App", "PIN / RFID", "Remote Access"],
  },
  {
    id: "water-tank",
    title: "Water Tank Level Monitor",
    href: "/iot-products/water-tank-level-monitor",
    image: "/images/iot-water-tank.png",
    alt: "Infiotix water tank level monitor: wireless sensor on a tank and a phone app showing 75% water level",
    position: "50% 40%",
    icon: Droplet,
    accent: "#22c8f5",
    features: [
      { icon: Gauge, label: "Real-time Level" },
      { icon: BellRing, label: "Mobile Alerts" },
      { icon: ShieldAlert, label: "Overflow Protection" },
      { icon: Wrench, label: "Easy Installation" },
    ],
  },
  {
    id: "home-automation",
    title: "Home Automation",
    href: "/iot-products/home-automation",
    image: "/images/iot-home-automation.png",
    alt: "Modern villa with the Infiotix home automation app controlling lights and appliances on a phone",
    position: "100% 40%",
    scale: 1.55,
    origin: "100% 38%",
    icon: House,
    accent: "#a78bfa",
    features: [
      { icon: Lightbulb, label: "Lights & Appliances" },
      { icon: Smartphone, label: "Mobile Control" },
      { icon: Mic, label: "Voice Assistant" },
      { icon: Leaf, label: "Energy Saving" },
    ],
  },
  {
    id: "door-bell",
    title: "Smart Door Bell",
    href: "/iot-products/smart-door-bell",
    image: "/images/iot-door-bell.png",
    alt: "Infiotix smart video door bell with a phone showing a delivery person at the door",
    position: "50% 40%",
    icon: Bell,
    accent: "#2dd4a7",
    features: [
      { icon: Video, label: "Video Calling" },
      { icon: Radar, label: "Motion Detection" },
      { icon: AudioLines, label: "Two Way Audio" },
      { icon: Cloud, label: "Cloud / Local Storage" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Industries + Why choose                                            */
/* ------------------------------------------------------------------ */
export const industries: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "Healthcare", icon: HeartPulse, color: "#f472b6" },
  { label: "Education", icon: GraduationCap, color: "#38bdf8" },
  { label: "Fitness & Wellness", icon: Dumbbell, color: "#c4b5fd" },
  { label: "Homes & Buildings", icon: House, color: "#fbbf24" },
  { label: "Agriculture", icon: Sprout, color: "#4ade80" },
  { label: "Retail & Business", icon: Store, color: "#34d399" },
  { label: "Government", icon: Landmark, color: "#facc15" },
  { label: "Custom Domains", icon: Blocks, color: "#22d3ee" },
];

export const whyChoose: { lines: [string, string]; icon: LucideIcon }[] = [
  { lines: ["Reliable", "Solutions"], icon: ShieldCheck },
  { lines: ["Modern", "Technology"], icon: Cpu },
  { lines: ["Expert", "Support"], icon: Headset },
  { lines: ["Client", "Focused"], icon: HeartHandshake },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export const footerLinks = {
  quick: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Software", href: "/software" },
    { label: "IoT Products", href: "/iot-products" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Software Development", href: "/software" },
    { label: "IoT & Automation", href: "/iot-products" },
    { label: "AI & Computer Vision", href: "/solutions#ai-computer-vision" },
    { label: "Embedded Systems", href: "/solutions#embedded-systems" },
    { label: "Cloud & DevOps", href: "/solutions#cloud-devops" },
    { label: "Maintenance & Support", href: "/support" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Sitemap", href: "/sitemap" },
  ],
} as const;
