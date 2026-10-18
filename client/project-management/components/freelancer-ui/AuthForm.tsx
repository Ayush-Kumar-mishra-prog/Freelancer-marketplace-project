"use client";

import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Alert, Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({
  initialSignup,
  nextPath,
}: {
  initialSignup: boolean;
  nextPath?: string;
}) {
  const [isSignup, setIsSignup] = useState(initialSignup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { dummyLogin, setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isSignup && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    dummyLogin(true);
    setUser({ name: name || email.split("@")[0], email });
    router.push(nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
        <section className="relative hidden overflow-hidden bg-blue-950 lg:block">
          <Image src="/login_hero.webp" alt="" fill priority sizes="50vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-linear-to-br from-blue-950/95 via-blue-900/65 to-slate-900/45" />
          <div className="relative flex h-full min-h-screen flex-col justify-between p-12 xl:p-16">
            <Link href="/" className="flex w-fit items-center gap-2 text-lg font-extrabold tracking-tight text-white no-underline">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500"><Sparkles size={19} /></span>
              GigSphere
            </Link>
            <div className="max-w-lg pb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-blue-200">A community for good work</p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">Find your people. Make good work happen.</h1>
              <p className="mt-5 max-w-md text-base leading-7 text-blue-50/80">Meet clients and independent talent who care about doing their best work together.</p>
              <div className="mt-8 space-y-3">
                {["Share work and build your reputation", "Find thoughtful projects and collaborators", "Grow at your own pace"].map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm text-blue-50">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15"><Check size={14} /></span>{item}
                  </p>
                ))}
              </div>
            </div>
            <p className="text-xs text-blue-100/70">GigSphere · Good work, together.</p>
          </div>
        </section>

        <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
          <Link href="/" className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 no-underline hover:text-blue-700">
            <ArrowLeft size={17} /> Back to GigSphere
          </Link>
          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-105">
              <div className="mb-8 lg:hidden">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><Sparkles size={20} /></span>
              </div>
              <p className="mb-2 text-sm font-semibold text-blue-700">{isSignup ? "Your next chapter starts here" : "Welcome back to GigSphere"}</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{isSignup ? "Create your account" : "Sign in to your account"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isSignup ? "Join clients and freelancers making good work happen." : "Pick up where you left off and get back to great work."}
              </p>

              <div className="mt-7 flex rounded-xl bg-slate-100 p-1">
                <button type="button" onClick={() => setIsSignup(false)} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${!isSignup ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Log in</button>
                <button type="button" onClick={() => setIsSignup(true)} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${isSignup ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Create account</button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6  space-y-4">
                {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
                {isSignup && (
                  <TextField
                    fullWidth
                    label="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 }, marginBottom:"20px" }}
                  />
                )}
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 }, marginBottom:"20px" }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                  slotProps={{ htmlInput: { minLength: isSignup ? 8 : undefined } }}
                  helperText={isSignup ? "Use at least 8 characters." : undefined}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
                />
                {!isSignup && (
                  <div className="flex justify-end">
                    <Link href="/auth" className="text-xs font-semibold text-blue-700 no-underline hover:text-blue-900">Forgot password?</Link>
                  </div>
                )}
                <Button type="submit" fullWidth variant="contained" endIcon={<ArrowRight size={17} />} sx={{ mt: 1, py: 1.4, textTransform: "none", boxShadow: "none" }}>
                  {isSignup ? "Create my account" : "Sign in"}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500">
                {isSignup ? "Already have an account?" : "New to GigSphere?"}{" "}
                <button type="button" onClick={() => setIsSignup((current) => !current)} className="font-semibold text-blue-700 hover:text-blue-900">
                  {isSignup ? "Log in" : "Create an account"}
                </button>
              </p>
              <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                By continuing, you agree to GigSphere&apos;s Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
