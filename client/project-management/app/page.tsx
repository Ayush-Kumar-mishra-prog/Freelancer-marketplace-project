"use client";

import HomePageNavbar from "@/components/freelancer-ui/HomePageUi";
import ShowCase from "@/components/freelancer-ui/ShowCase";
import { ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Code2, PenTool, Sparkles, Video, WandSparkles } from "lucide-react";
import { Avatar, Button, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    eyebrow: "Make your next move",
    title: "Good work starts with the right people.",
    description: "Meet independent talent and teams who can turn your next big idea into something real.",
    image: "/homeHero.jpg",
    action: "Explore the community",
  },
  {
    eyebrow: "Your talent, your terms",
    title: "Build a freelance career that fits you.",
    description: "Share your best work, find clients who get it, and grow your reputation one project at a time.",
    image: "/Ayush.jpg",
    action: "Join as a freelancer",
  },
  {
    eyebrow: "A little more room to grow",
    title: "Make more space for great work.",
    description: "Go Premium for unlimited posts, freelancer chat, and a full-time seller membership.",
    image: "/bg.png",
    action: "Explore Premium",
  },
];

const clientProjects = [
  {
    projectId: "brand-identity",
    name: "A thoughtful identity for a new coffee brand",
    ownName: "Maya R.",
    image: "/homeHero.jpg",
    summary: "Looking for a brand designer to shape a warm, confident visual identity.",
    description: "We are launching a small-batch coffee company and need an identity system that feels considered, welcoming, and memorable.",
    date: "Posted 2 days ago",
    likes: 36,
  },
  {
    projectId: "product-landing-page",
    name: "Design and build a product landing page",
    ownName: "Harbor Labs",
    image: "/bg.png",
    summary: "A clear, conversion-focused landing page for an early-stage product.",
    description: "We need a responsive landing page with a simple story, feature highlights, and a polished sign-up experience.",
    date: "Posted 4 days ago",
    likes: 18,
  },
  {
    projectId: "launch-video",
    name: "A short launch film for a sustainable label",
    ownName: "Nora Patel",
    image: "/login_hero.webp",
    summary: "Seeking a video editor for a calm, story-led product launch film.",
    description: "Edit a short launch film from existing footage, with clean pacing, tasteful titles, and social-ready versions.",
    date: "Posted 1 week ago",
    likes: 29,
  },
];

const freelancerProjects = [
  {
    projectId: "studio-website",
    name: "Independent studio website with a little character",
    ownName: "Aarav Mehta",
    image: "/homeHero.jpg",
    summary: "A flexible, editorial website made for a creative studio.",
    description: "I designed and built a distinctive portfolio site with a light CMS, responsive layouts, and thoughtful interactions.",
    date: "Portfolio · 12 Feb 2026",
    likes: 84,
  },
  {
    projectId: "mobile-dashboard",
    name: "A calmer way to understand your product data",
    ownName: "Samira K.",
    image: "/bg.png",
    summary: "Product design and front-end prototype for a mobile dashboard.",
    description: "A compact, approachable mobile analytics dashboard focused on useful signals instead of noisy charts.",
    date: "Portfolio · 08 Feb 2026",
    likes: 57,
  },
  {
    projectId: "social-campaign",
    name: "Social campaign design for a local food market",
    ownName: "Leo Fernandes",
    image: "/login_hero.webp",
    summary: "A bright, flexible campaign system for a neighborhood market.",
    description: "A modular visual campaign built for social posts, stories, and print, designed to feel vibrant and consistent.",
    date: "Portfolio · 03 Feb 2026",
    likes: 42,
  },
];

const categories = [
  { label: "Design", icon: PenTool },
  { label: "Development", icon: Code2 },
  { label: "Video & motion", icon: Video },
  { label: "AI services", icon: WandSparkles },
];

const topFreelancers = [
  { name: "Aarav Mehta", role: "Brand designer", initials: "AM", color: "#dbeafe" },
  { name: "Samira Khan", role: "Product designer", initials: "SK", color: "#fce7f3" },
  { name: "Leo Fernandes", role: "Creative developer", initials: "LF", color: "#dcfce7" },
  { name: "Nina Alvarez", role: "Video editor", initials: "NA", color: "#ffedd5" },
  { name: "Dev Patel", role: "Illustrator", initials: "DP", color: "#ede9fe" },
];

function ProjectSection({
  eyebrow,
  title,
  description,
  projects,
}: {
  eyebrow: string;
  title: string;
  description: string;
  projects: typeof clientProjects;
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">{eyebrow}</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <Link href="/#projects" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 no-underline hover:text-blue-900">
          View all <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ShowCase
            key={project.projectId}
            projectId={project.projectId}
            name={project.name}
            sortdis={project.summary}
            moredis={project.description}
            avt={project.ownName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
            imag={project.image}
            nametitle={project.ownName}
            date={project.date}
            likes={project.likes}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  const showSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <HomePageNavbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-label="GigSphere highlights" className="relative mt-6 overflow-hidden rounded-[28px] bg-blue-950">
          <Image src={slide.image} alt="" fill priority sizes="100vw" className="object-cover opacity-35 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/65 to-slate-900/10" />
          <div className="relative grid min-h-97.5 items-center gap-8 px-6 py-10 sm:102.5 sm:px-12 lg:grid-cols-[1.1fr_.9fr] lg:px-16">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Sparkles size={14} /> {slide.eyebrow}
              </div>
              <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-50/85 sm:text-base">{slide.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  component={Link}
                  href={activeSlide === 2 ? "/#premium" : "/#projects"}
                  variant="contained"
                  endIcon={<ArrowUpRight size={16} />}
                  sx={{ borderRadius: 2.5, px: 2.4, py: 1.15, textTransform: "none", bgcolor: "#2563eb", boxShadow: "none", "&:hover": { bgcolor: "#1d4ed8", boxShadow: "none" } }}
                >
                  {slide.action}
                </Button>
                <Button component={Link} href="/auth?mode=signup" sx={{ color: "white", borderColor: "rgba(255,255,255,.45)", borderRadius: 2.5, px: 2, textTransform: "none" }} variant="outlined">
                  Create an account
                </Button>
              </div>
            </div>
            <div className="hidden justify-self-end lg:block">
              <div className="w-72.5 rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-md">
                <p className="text-xs font-medium text-blue-100">A community for good work</p>
                <p className="mt-3 text-3xl font-bold">Find your people.</p>
                <div className="mt-6 flex -space-x-3">
                  {topFreelancers.slice(0, 4).map((person) => (
                    <Avatar key={person.name} sx={{ width: 40, height: 40, bgcolor: person.color, color: "#334155", border: "2px solid #fff", fontSize: 12, fontWeight: 700 }}>{person.initials}</Avatar>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-bold">+2k</div>
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-blue-50">
                  <Check size={15} /> Clients and independent talent, together
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-7 sm:right-8">
              <span className="mr-2 text-xs font-medium text-white/80">{activeSlide + 1} / {slides.length}</span>
              <button aria-label="Previous highlight" onClick={() => showSlide(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"><ArrowLeft size={17} /></button>
              <button aria-label="Next highlight" onClick={() => showSlide(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15"><ArrowRight size={17} /></button>
            </div>
          </div>
        </section>

        <section aria-label="Browse categories" className="grid grid-cols-2 gap-3 py-8 sm:grid-cols-4">
          {categories.map(({ label, icon: Icon }) => (
            <Link key={label} href="/#projects" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 no-underline transition hover:border-blue-200 hover:text-blue-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={18} /></span>
              {label}
              <ArrowUpRight className="ml-auto text-slate-400" size={16} />
            </Link>
          ))}
        </section>

        <div id="projects" className="scroll-mt-24">
          <ProjectSection
            eyebrow="Opportunities"
            title="Projects from clients"
            description="Thoughtful briefs from people looking for the right creative partner."
            projects={clientProjects}
          />
          <div className="border-t border-slate-200">
            <ProjectSection
              eyebrow="Community work"
              title="Made by freelancers"
              description="Discover the latest work, ideas, and portfolios from independent talent."
              projects={freelancerProjects}
            />
          </div>
        </div>

        <section id="freelancers" className="scroll-mt-24 border-y border-slate-200 py-12 sm:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">Meet your next collaborator</p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Freelancers to know</h2>
            </div>
            <Link href="/auth?mode=signup" className="text-sm font-semibold text-blue-700 no-underline hover:text-blue-900">Browse talent <ArrowUpRight className="ml-1 inline" size={15} /></Link>
          </div>
          <div className="overflow-hidden">
            <div className="animate-marquee flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex gap-4 pr-4">
                  {topFreelancers.map((person) => (
                    <Link key={person.name} href="/auth?mode=signup" tabIndex={copy === 1 ? -1 : undefined} className="flex min-w-56.25 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 no-underline transition hover:border-blue-200 hover:shadow-sm">
                      <Avatar sx={{ width: 45, height: 45, bgcolor: person.color, color: "#334155", fontSize: 13, fontWeight: 700 }}>{person.initials}</Avatar>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-slate-900">{person.name}</span>
                        <span className="mt-1 block text-xs text-slate-500">{person.role}</span>
                      </span>
                      <ArrowUpRight className="ml-auto shrink-0 text-slate-400" size={16} />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="premium" className="scroll-mt-24 py-14 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-blue-700 px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-38 border-white/10" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <Chip icon={<Sparkles size={14} />} label="GigSphere Premium" size="small" sx={{ mb: 2, bgcolor: "rgba(255,255,255,.16)", color: "white", "& .MuiChip-icon": { color: "white" } }} />
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">More room for your next big thing.</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100">Unlimited posts, chat with any freelancer, and full-time seller access. Start with a one-month free trial, then ₹2,000.</p>
              </div>
              <Button component={Link} href="/auth?mode=signup" variant="contained" endIcon={<ArrowUpRight size={16} />} sx={{ alignSelf: { xs: "flex-start", sm: "center" }, px: 2.3, py: 1.2, borderRadius: 2.5, bgcolor: "white", color: "#1d4ed8", textTransform: "none", fontWeight: 700, boxShadow: "none", "&:hover": { bgcolor: "#eff6ff", boxShadow: "none" } }}>
                Try Premium
              </Button>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white"><BriefcaseBusiness size={16} /></span>
            Gig<span className="text-blue-600">Sphere</span>
          </Link>
          <p className="text-sm text-slate-500">A better place for good work to happen.</p>
          <div className="flex gap-5 text-sm text-slate-500">
            <Link href="/#projects" className="no-underline hover:text-blue-700">Explore</Link>
            <Link href="/#premium" className="no-underline hover:text-blue-700">Premium</Link>
            <Link href="/auth" className="no-underline hover:text-blue-700">Sign in</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
