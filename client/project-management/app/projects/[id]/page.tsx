"use client";

import HomePageNavbar from "@/components/freelancer-ui/HomePageUi";
import { ArrowLeft, ArrowUpRight, Check, Clock3, Heart, MapPin, Share2, ShieldCheck, Sparkles } from "lucide-react";
import { Avatar, Button, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const projects: Record<string, {
  title: string;
  owner: string;
  initials: string;
  image: string;
  summary: string;
  description: string;
  category: string;
  date: string;
  budget: string;
  duration: string;
  isClientPost: boolean;
}> = {
  "brand-identity": {
    title: "A thoughtful identity for a new coffee brand",
    owner: "Maya R.",
    initials: "MR",
    image: "/homeHero.jpg",
    summary: "Looking for a brand designer to shape a warm, confident visual identity.",
    description: "We are launching a small-batch coffee company and need an identity system that feels considered, welcoming, and memorable. The project includes a primary logo, a small color and type system, packaging direction, and a concise brand guide. We value thoughtful process, clear communication, and work that feels made to last.",
    category: "Brand design",
    date: "Posted 2 days ago",
    budget: "₹35,000 – ₹55,000",
    duration: "2–3 weeks",
    isClientPost: true,
  },
  "product-landing-page": {
    title: "Design and build a product landing page",
    owner: "Harbor Labs",
    initials: "HL",
    image: "/bg.png",
    summary: "A clear, conversion-focused landing page for an early-stage product.",
    description: "We need a responsive landing page with a simple story, feature highlights, and a polished sign-up experience. You will work closely with our small product team and have room to make meaningful design decisions. Please share relevant product or SaaS work with your proposal.",
    category: "Web development",
    date: "Posted 4 days ago",
    budget: "₹45,000 – ₹70,000",
    duration: "3–4 weeks",
    isClientPost: true,
  },
  "launch-video": {
    title: "A short launch film for a sustainable label",
    owner: "Nora Patel",
    initials: "NP",
    image: "/login_hero.webp",
    summary: "Seeking a video editor for a calm, story-led product launch film.",
    description: "Edit a short launch film from existing footage, with clean pacing, tasteful titles, and social-ready versions. The right collaborator will be comfortable shaping a narrative from the material and delivering polished exports for web and social.",
    category: "Video editing",
    date: "Posted 1 week ago",
    budget: "₹18,000 – ₹30,000",
    duration: "1–2 weeks",
    isClientPost: true,
  },
  "studio-website": {
    title: "Independent studio website with a little character",
    owner: "Aarav Mehta",
    initials: "AM",
    image: "/homeHero.jpg",
    summary: "A flexible, editorial website made for a creative studio.",
    description: "I designed and built a distinctive portfolio site with a light CMS, responsive layouts, and thoughtful interactions. The work focused on giving the studio's projects room to breathe while making it simple for the team to publish new work.",
    category: "Web design",
    date: "Portfolio · 12 Feb 2026",
    budget: "Available for projects",
    duration: "Typically 2–4 weeks",
    isClientPost: false,
  },
  "mobile-dashboard": {
    title: "A calmer way to understand your product data",
    owner: "Samira K.",
    initials: "SK",
    image: "/bg.png",
    summary: "Product design and front-end prototype for a mobile dashboard.",
    description: "A compact, approachable mobile analytics dashboard focused on useful signals instead of noisy charts. The design includes core reporting screens, reusable interface patterns, and an interactive prototype for product testing.",
    category: "Product design",
    date: "Portfolio · 08 Feb 2026",
    budget: "Available for projects",
    duration: "Typically 1–3 weeks",
    isClientPost: false,
  },
  "social-campaign": {
    title: "Social campaign design for a local food market",
    owner: "Leo Fernandes",
    initials: "LF",
    image: "/login_hero.webp",
    summary: "A bright, flexible campaign system for a neighborhood market.",
    description: "A modular visual campaign built for social posts, stories, and print, designed to feel vibrant and consistent. The project includes a visual direction, a set of ready-to-use templates, and a short handoff guide.",
    category: "Graphic design",
    date: "Portfolio · 03 Feb 2026",
    budget: "Available for projects",
    duration: "Typically 1–2 weeks",
    isClientPost: false,
  },
};

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { checkLogin } = useAuth();
  const [liked, setLiked] = useState(false);
  const [shareLabel, setShareLabel] = useState("");
  const project = projects[params.id] ?? {
    title: params.id.replaceAll("-", " "),
    owner: "GigSphere member",
    initials: "GS",
    image: "/homeHero.jpg",
    summary: "A project shared with the GigSphere community.",
    description: "Explore the full project brief and connect with the person behind the work. Sign in to like this post or start a conversation.",
    category: "Creative services",
    date: "Recently shared",
    budget: "Discuss with the client",
    duration: "To be agreed",
    isClientPost: true,
  };

  const handleLike = () => {
    if (!checkLogin()) {
      router.push(`/auth?next=/projects/${params.id}`);
      return;
    }
    setLiked((current) => !current);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareLabel("Link copied");
      window.setTimeout(() => setShareLabel(""), 1800);
    } catch {
      setShareLabel("Could not copy link");
      window.setTimeout(() => setShareLabel(""), 2400);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <HomePageNavbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link href="/#projects" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 no-underline hover:text-blue-700">
          <ArrowLeft size={16} /> Back to explore
        </Link>
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
          <article className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative h-56 bg-blue-50 sm:h-80">
                <Image src={project.image} alt={project.title} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
                <Chip label={project.isClientPost ? "Client project" : "Freelancer portfolio"} size="small" sx={{ position: "absolute", left: 20, bottom: 18, bgcolor: "rgba(255,255,255,.95)", color: "#1d4ed8", fontWeight: 700 }} />
              </div>
              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip label={project.category} size="small" sx={{ bgcolor: "#eff6ff", color: "#1d4ed8", fontWeight: 650 }} />
                  <span className="text-xs text-slate-400">{project.date}</span>
                </div>
                <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">{project.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{project.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-slate-100 py-4">
                  <Button onClick={handleLike} startIcon={<Heart size={17} fill={liked ? "currentColor" : "none"} />} sx={{ color: liked ? "#e11d48" : "#475569", textTransform: "none", fontWeight: 650 }}>
                    {liked ? "Liked · 37" : "Like · 36"}
                  </Button>
                  <Button onClick={handleShare} startIcon={<Share2 size={17} />} sx={{ color: "#475569", textTransform: "none" }}>Share</Button>
                  {shareLabel && <span role="status" className="text-xs text-slate-500">{shareLabel}</span>}
                </div>

                <section className="pt-7">
                  <h2 className="text-lg font-bold text-slate-900">About this {project.isClientPost ? "project" : "work"}</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{project.description}</p>
                </section>

                <section className="mt-8 border-t border-slate-100 pt-7">
                  <h2 className="text-lg font-bold text-slate-900">{project.isClientPost ? "What we are looking for" : "Project highlights"}</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {(project.isClientPost
                      ? ["Relevant experience in " + project.category.toLowerCase(), "Clear communication and regular updates", "Thoughtful, original creative approach", "Final files prepared for handoff"]
                      : ["Responsive, considered execution", "A clear and collaborative process", "Reusable, polished deliverables", "Open to new collaborations"]
                    ).map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                        <Check className="mt-1 shrink-0 text-blue-600" size={16} />{item}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-slate-400">{project.isClientPost ? "Project budget" : "Availability"}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{project.budget}</p>
              <div className="mt-5 space-y-3 border-y border-slate-100 py-4">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Clock3 size={17} className="text-slate-400" />{project.duration}</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><MapPin size={17} className="text-slate-400" />Remote collaboration</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><ShieldCheck size={17} className="text-slate-400" />Secure payments on GigSphere</div>
              </div>
              <Button component={Link} href={`/auth?next=/projects/${params.id}`} fullWidth variant="contained" endIcon={<ArrowUpRight size={17} />} sx={{ mt: 4, py: 1.3, borderRadius: 2.5, bgcolor: "#2563eb", textTransform: "none", fontWeight: 700, boxShadow: "none", "&:hover": { bgcolor: "#1d4ed8", boxShadow: "none" } }}>
                {project.isClientPost ? "Send a proposal" : "Contact freelancer"}
              </Button>
              <Button component={Link} href="/auth?mode=signup" fullWidth sx={{ mt: 1, py: 1.2, borderRadius: 2.5, color: "#334155", textTransform: "none", fontWeight: 650 }}>
                Save for later
              </Button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-slate-400">{project.isClientPost ? "About the client" : "About the freelancer"}</p>
              <div className="flex items-center gap-3">
                <Avatar sx={{ width: 46, height: 46, bgcolor: "#dbeafe", color: "#1d4ed8", fontWeight: 700 }}>{project.initials}</Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900">{project.owner}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} /> India · Remote</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-800">
                <Check size={15} /> Verified GigSphere member
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-900"><Sparkles size={16} /> New to GigSphere?</div>
              <p className="mt-2 text-xs leading-5 text-blue-800/75">Create a free profile to connect with clients and share the work you are proud of.</p>
              <Link href="/auth?mode=signup" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700 no-underline hover:text-blue-900">Create an account <ArrowUpRight size={14} /></Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
