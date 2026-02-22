"use client";

import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Users, Zap } from "lucide-react";

// The fixed fadeUp object with proper TypeScript typing for the easing array
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const, 
    },
  }),
};

const features = [
  {
    icon: <Zap size={28} />,
    title: "Real-time sync",
    description: "Every stroke appears instantly on every connected screen.",
  },
  {
    icon: <Users size={28} />,
    title: "Multi-user rooms",
    description: "Invite anyone to a room and draw together simultaneously.",
  },
  {
    icon: <Pencil size={28} />,
    title: "Persistent canvas",
    description: "Your drawings are saved and restored when you rejoin.",
  },
];

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-heading"
        >
          Drawly
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex gap-3"
        >
          <Button variant="neutral" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
          <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 flex-1">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge className="mb-6 text-sm px-4 py-1">
            Now in beta — free forever
          </Badge>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-6xl font-heading leading-tight max-w-3xl"
        >
          Draw together,{" "}
          <span className="bg-main px-2 border-2 border-border inline-block">
            in real time
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg max-w-xl text-foreground/70 font-base"
        >
          Drawly is a multiplayer canvas where teams sketch, diagram, and
          brainstorm — all synced live, no setup required.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex gap-4"
        >
          <Button size="lg" onClick={() => router.push("/signup")}>
            Start drawing free
          </Button>
          <Button
            size="lg"
            variant="neutral"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </Button>
        </motion.div>

        {/* Mock canvas preview */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 w-full max-w-3xl h-64 bg-black border-2 border-border shadow-shadow rounded-base flex items-center justify-center relative overflow-hidden"
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <rect x="60" y="40" width="120" height="80" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="320" cy="100" r="50" fill="none" stroke="#3B82F6" strokeWidth="2" />
            <rect x="480" y="60" width="100" height="100" fill="none" stroke="white" strokeWidth="2" />
            <line x1="60" y1="160" x2="600" y2="200" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4" />
          </svg>
          <span className="text-white/30 font-base text-sm z-10">
            live canvas preview
          </span>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 border-t-2 border-border">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading text-center mb-12"
          >
            Everything you need to collaborate
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-secondary-background border-2 border-border shadow-shadow rounded-base p-6 flex flex-col gap-3"
              >
                <div className="w-12 h-12 bg-main border-2 border-border rounded-base flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-lg font-heading">{f.title}</h3>
                <p className="text-sm font-base text-foreground/70">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border px-6 py-6 flex items-center justify-between">
        <span className="font-heading text-lg">Drawly</span>
        <span className="text-sm font-base text-foreground/60">
          Built with Next.js, WebSockets, and Prisma
        </span>
      </footer>
    </div>
  );
}