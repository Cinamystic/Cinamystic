// ── Brand ──
export const brand = {
  name: 'CINAMYSTIC',
  aka: 'directed by Rahul Singh Panwar',
  tagline: "The story your footage is hiding — I find it.",
  heroSubtext: "Unforgettable editing, story-first craft, and AI used with judgment — for brands that can't afford to look average.",
  ctaPrimary: 'Watch the work',
  ctaSecondary: 'Start a project',
};

// ── Nav Links ──
export const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// ── Skills (10 items — rendered on the monitor screen) ──
export const skills = [
  { name: 'Video Editing',       shape: 'scissors' },
  { name: 'Motion Graphics',     shape: 'arrow' },
  { name: 'Color Grading',       shape: 'reel' },
  { name: 'Sound Design',        shape: 'waveform' },
  { name: 'Prompt Engineering',  shape: 'cursor' },
  { name: 'Context Engineering', shape: 'layers' },
  { name: 'AI Video Production', shape: 'playbutton' },
  { name: 'Shoot / VFX',         shape: 'clapperboard' },
  { name: 'Videography',         shape: 'camera' },
  { name: 'Cinematography',      shape: 'filmstrip' },
];

// ── About ──
export const about = {
  title: 'The editor behind the pixels.',
  paragraphs: [
    "I'm Rahul Singh Panwar. Online, I go by Cinamystic — but the work is the same in both names: I take footage people are nervous to send me and turn it into something they're proud to post.",
    "I started with brand films and real estate cuts. Then AI arrived, and instead of panicking, I learned where it helps and where it lies. Today I pair traditional editing craft — pacing, color, sound, restraint — with AI tooling that saves my clients unnecessary shoots, wasted budgets, and weeks of calendar.",
    "My job isn't to make your video look like everyone else's. It's to make the version of your story you couldn't see from inside it. If the first cut doesn't hit, we keep going. That's the whole deal.",
  ],
  stats: [
    { value: '500+', label: 'Projects delivered' },
    { value: '3+', label: 'Years refining the craft' },
    { value: '0', label: 'Missed deadlines' },
    { value: '24h', label: 'First-reply window' },
  ],
};

// ── Services ──
export const services = [
  {
    icon: '📺',
    title: "Commercials That Don't Get Skipped",
    description:
      "Built for founders, consultants, retreats, and studios who've watched their ad spend disappear into mediocre creative. I write for the hook, cut for retention, and finish with a grade that makes the scroll stop.",
  },
  {
    icon: '🏠',
    title: 'Real Estate & Interior Walkthroughs',
    description:
      "Listings that sell themselves and interiors that photograph like the brochure lied. Drone openers, smooth moves, and a grade that makes the natural light do overtime.",
  },
  {
    icon: '🤖',
    title: 'AI Video, Avatars & Synthetic Production',
    description:
      "Used correctly, AI saves your shoot budget. Used badly, it embarrasses your brand. I handle prompt engineering, post-grading, and the human judgment calls in between — avatars, commercials, interiors, short films.",
  },
  {
    icon: '🎬',
    title: 'Cinematic Brand Films',
    description:
      "You don't need another \"video.\" You need the one clip people remember at their next meeting. Story structure, pacing, color, and sound design so your film earns its runtime — frame one to end card.",
  },
];

// ── Portfolio Projects ──
export const categories = [
  'All',
  'Real Estate',
  'AI Interior',
  'AI Short Films',
  'Interior Design',
  'AI Avatar',
  'AI Commercials',
];

export const projects = [
  // ── Real Estate (real footage + AI integration) ──
  {
    id: 1,
    title: 'Real Estate Video 1',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/zt_7qd9Z',
    description: 'Live property, AI-enhanced interiors. The listing looked twice as expensive — and sold twice as fast.',
  },
  {
    id: 2,
    title: 'Real Estate Video 2',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/_9ute_c4',
    description: 'Drone opener, golden-hour grade, pacing tight enough to keep scrollers watching. Built to close, not decorate.',
  },
  {
    id: 3,
    title: 'Real Estate Video 3',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/-UJgwzBU',
    description: 'AI rebuilt the atmosphere the weather refused to provide. The client never knew. The buyer never cared.',
  },

  // ── AI Interior Design ──
  {
    id: 4,
    title: 'AI Interior Design Video 1',
    category: 'AI Interior',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/XPQPwStq',
    description: "A full walkthrough of a space that doesn't exist yet. Sold the concept before a single tile was ordered.",
  },
  {
    id: 5,
    title: 'AI Interior Design Video 2',
    category: 'AI Interior',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/p1AFW46j',
    description: 'Prompt to pitch film in 48 hours. Loft concept, cinematic dolly moves, approved on the first send.',
  },
  {
    id: 6,
    title: 'AI Interior Design Video 3',
    category: 'AI Interior',
    thumbnail: 'https://images.unsplash.com/photo-1616593969747-4797dc75033e?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/WiIlvZ-e',
    description: 'Master suite visualization — hand-graded after AI did the heavy lifting. The best of both timelines.',
  },

  // ── AI Short Films ──
  {
    id: 7,
    title: 'AI Short Film 1',
    category: 'AI Short Films',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/M_PHMuSb',
    description: 'A short film shot without a camera. Story first, tools second — the only order that works.',
  },
  {
    id: 8,
    title: 'AI Short Film 2',
    category: 'AI Short Films',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/l3QJh2hJ',
    description: "Proof that pacing, silence, and restraint still come from a human. AI helped. It didn't decide.",
  },

  // ── Interior Design (Non-AI) ──
  {
    id: 9,
    title: 'Interior Design Video 1',
    category: 'Interior Design',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/-WdYBGig',
    description: 'Real location, real lights, real attention to the grade. The kind of video that makes tile look like marble.',
  },
  {
    id: 10,
    title: 'Interior Design Video 2',
    category: 'Interior Design',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/pT8Kmgn4',
    description: 'Shot on location, cut like a brand film. The designer booked three leads off the first post.',
  },
  {
    id: 11,
    title: 'Interior Design Video 3',
    category: 'Interior Design',
    thumbnail: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/l85Iv9dS',
    description: 'Designer suite, cinematic pacing. Your client will watch it twice — once for the space, once for the vibe.',
  },

  // ── AI Talking Avatar (multi-language) ──
  {
    id: 12,
    title: 'AI Talking Avatar Video 1',
    category: 'AI Avatar',
    thumbnail: 'https://images.unsplash.com/photo-1696258686454-60082b2c33e2?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/2QcPWha7',
    description: 'A talking avatar that speaks any language — and sounds like it means it.',
  },
  {
    id: 13,
    title: 'AI Talking Avatar Video 2',
    category: 'AI Avatar',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/t4ONDxSW',
    description: 'One script. Unlimited takes. Zero studio bookings. Built for teams that ship faster than they budget.',
  },
  {
    id: 14,
    title: 'AI Talking Avatar Video 3',
    category: 'AI Avatar',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/DwzEIGIi',
    description: "Quarterly updates, product walkthroughs, internal comms — your leadership's face, on their schedule.",
  },
  {
    id: 15,
    title: 'AI Talking Avatar Video 4',
    category: 'AI Avatar',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/ei0KAzvT',
    description: 'Localized presenters for every market. Same brand, every accent, no re-shoots.',
  },

  // ── AI Commercials ──
  {
    id: 18,
    title: 'AI Commercial 1',
    category: 'AI Commercials',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    videoUrl: 'https://f.io/YSRsgfTb',
    description: 'A full commercial generated, scored, and graded in post. Most viewers couldn\u2019t tell. The ones who could were jealous.',
  },
];

// ── Testimonials (video + text) ──
export const testimonials = [
  {
    quote: "Rahul made me actually like watching my own reels — and that's a first. My engagement nearly doubled in a month, and half my DMs now are about the videos, not the workouts.",
    name: 'Sagar Raghuvanshi',
    role: 'Fitness Coach',
    videoUrl: null,
  },
  {
    quote: "We posted one of his cuts on a Friday. Signed the buyer on Monday. The video did more closing than I did that week.",
    name: 'Confidential',
    role: 'Real Estate Agency, Mumbai',
    videoUrl: null,
  },
  {
    quote: "We needed our CEO in five languages by Tuesday. Cinamystic delivered without us booking a single studio. The board asked if we'd quietly hired a broadcast team.",
    name: 'Confidential',
    role: 'Marketing Lead, SaaS Brand',
    videoUrl: null,
  },
];

// ── Contact ──
export const contact = {
  heading: "Most great edits start with a message.",
  subtext: "If you're serious about how your brand shows up on screen, you already know mediocre edits cost more than good ones. Tell me what you're building — I'll reply within 24 hours. No sales calls, no discovery-deck theatre.",
  email: 'studio.cinamystic@gmail.com',
  instagram: 'https://instagram.com/cinamystic',
  whatsapp: 'https://wa.me/919993437214',
  phone: '+91 9993437214',
  location: 'Mumbai, India',
};
