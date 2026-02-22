"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateRoomModal } from "./CreateRoomModal";
import { getRooms } from "@/draw/http";
import { Plus, LogOut, ArrowRight } from "lucide-react";

type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

export function Dashboard() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    fetchRooms();
  }, [router]);

  async function fetchRooms() {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch {
      // token invalid or expired
      localStorage.removeItem("token");
      router.push("/signin");
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
        <span
          className="text-2xl font-heading cursor-pointer"
          onClick={() => router.push("/")}
        >
          Drawly
        </span>
        <div className="flex items-center gap-3">
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            New Room
          </Button>
          <Button variant="neutral" onClick={signOut}>
            <LogOut size={16} />
            Sign out
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading">Your Rooms</h1>
            <p className="text-sm font-base text-foreground/60 mt-1">
              Click a room to start drawing
            </p>
          </div>
          <Badge variant="neutral">{rooms.length} rooms</Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-secondary-background border-2 border-border rounded-base animate-pulse"
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="w-16 h-16 bg-main border-2 border-border rounded-base flex items-center justify-center">
              <Plus size={32} />
            </div>
            <h2 className="text-xl font-heading">No rooms yet</h2>
            <p className="text-sm font-base text-foreground/60">
              Create your first room to start drawing
            </p>
            <Button onClick={() => setModalOpen(true)}>
              Create a room
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{room.slug}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-base text-foreground/50">
                      Created{" "}
                      {new Date(room.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => router.push(`/canvas/${room.id}`)}
                    >
                      Open canvas
                      <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <CreateRoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={fetchRooms}
      />
    </div>
  );
}