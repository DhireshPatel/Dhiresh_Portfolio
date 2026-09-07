// Add, remove or edit projects here — every project card on the site
// (Home + /projects) is generated from this array.
//
// Fields:
//   id            unique number, used for the /projects/[id] route
//   title         project name
//   description   one or two sentence summary
//   image         path inside /public/images/projects/, or a remote URL
//   category      one of: "Websites" | "Web Apps" | "Client Projects" | "Experiments"
//   technologies  array of tech tags
//   liveUrl       live demo link, or "#" as a placeholder
//   githubUrl     source code link, or "#" as a placeholder
//   featured      true = shows in the homepage "Featured Projects" section
//   features      (optional) array of bullet points for the detail page
//   challenges    (optional) short paragraph for the detail page

const projects = [
  {
    id: 1,
    title: "Dr. Ketul Kumawat",
    description:
      "Modern responsive portfolio with animations and contact form.",
    image: "/images/projects/KetulSir.png",
    category: "Web Apps",
    technologies: ["Next.js", "React", "CSS"],
    liveUrl: "https://ketulkumawat.com",
    githubUrl: "https://github.com/DhireshPatel/ketulkumawat",
    featured: true,
    features: [
      "Responsive layout across all breakpoints",
      "Smooth, purposeful animation",
      "Clean, accessible component structure",
    ],
    challenges:
      "Describe a real technical challenge you solved while building this project, and how you approached it.",
  },
  {
    id: 2,
    title: "DP Fixing",
    description:
      "Book trusted electricians for electrical repairs, installations and maintenance at your doorstep with DP Fixing.",
    image: "/images/projects/dpfixing.png",
    category: "Websites",
    technologies: ["React", "JavaScript", "Modern CSS"],
    liveUrl: "https://dp-fixing.vercel.app/",
    githubUrl: "https://github.com/DhireshPatel/DP-Fixing",
    featured: true,
    features: [
      "Fast, optimized page loads",
      "SEO-friendly structure",
      "Interactive UI details",
    ],
    challenges:
      "Describe a real technical challenge you solved while building this project, and how you approached it.",
  },
  {
    id: 3,
    title: "Study Space SaaS",
    description:
      "Complete Library management system with admin dashboard, student management and analytics.",
    image: "/images/projects/studyspace.png",
    category: "Client Projects",
    technologies: ["Next.js", "Supabase", "CSS Modules"],
    liveUrl: "https://dpworld-two.vercel.app",
    githubUrl: "https://github.com/DhireshPatel/LibrarySaaS-LocalStorage",
    featured: false,
    features: [
      "Full-stack data flow with Supabase",
      "Authenticated admin experience",
      "Production-ready form handling",
    ],
    challenges:
      "Describe a real technical challenge you solved while building this project, and how you approached it.",
  },
  {
    id: 4,
    title: "Jodhpur academy demo",
    description: "Jodhpur academy demo website for showing to Jodhpur academy.",
    image: "/images/projects/jodhpur-academy.png",
    category: "Experiments",
    technologies: ["JavaScript", "Framer Motion"],
    liveUrl: "https://jodhpuracademytest.vercel.app/",
    githubUrl: "https://github.com/DhireshPatel/Jodhpur-academy-test",
    featured: false,
    features: ["A focused exploration of one interaction or idea"],
    challenges:
      "Describe what you were exploring with this experiment and what you learned.",
  },
  {
    id: 5,
    title: "Apex Classes Demo",
    description: "Demo Website for Apex Classes & rejected 😎",
    image: "/images/projects/apexclasses.png",
    category: "Experiments",
    technologies: ["JavaScript", "Framer Motion"],
    liveUrl: "https://apex-classes-kudi.vercel.app/",
    githubUrl: "https://github.com/DhireshPatel/Service-Booking",
    featured: false,
    features: ["A focused exploration of one interaction or idea"],
    challenges:
      "Describe what you were exploring with this experiment and what you learned.",
  },
];

export default projects;
