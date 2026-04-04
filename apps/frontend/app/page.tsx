"use client";

import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Users, Zap } from "lucide-react";

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

      {/* Hero — two-column grid */}
      <section className="flex-1 px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT: headings + para + CTA */}
          <div className="flex flex-col items-start text-left">
            <motion.h1
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl font-heading leading-tight bg-main px-2 border-2 border-border inline-block"
            >
              Draw together
              
            </motion.h1>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-xl font-heading text-foreground/70"
            >
              Your canvas. Your team. Zero friction.
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 text-base max-w-md text-foreground/60 font-base"
            >
              Drawly is a multiplayer canvas where teams sketch, diagram, and
              brainstorm — all synced live, no setup required.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex gap-4"
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
          </div>

          {/* RIGHT: canvas preview */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full h-80 bg-black border-2 border-border shadow-shadow rounded-base flex items-center justify-center relative overflow-hidden"
            aria-label="Live canvas preview showing collaborative drawing"
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <rect x="40" y="40" width="110" height="75" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="240" cy="110" r="55" fill="none" stroke="#3B82F6" strokeWidth="2" />
              <rect x="340" y="55" width="90" height="90" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="340" cy="240" r="55" fill="none" stroke="#3B82F6" strokeWidth="2" />
              <rect x="140" y="200" width="110" height="75" fill="none" stroke="white" strokeWidth="2" />

            </svg>
          
          </motion.div>

        </div>
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