"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRoom } from "@/draw/http";

export function JoinRoomModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    if (!slug.trim()) {
      setError("Room name cannot be empty");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const room = await getRoom(slug.trim());
      
      if (!room) {
        setError("Room not found. Check the name and try again.");
        setLoading(false);
        return;
      }

      onClose();
      setSlug("");
      // Redirect to the room's actual ID
      router.push(`/canvas/${room.id}`);
    } catch (e: any) {
      setError("Failed to join room. Try again.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join an existing room</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="join-room-name">Room name</Label>
            <Input
              id="join-room-name"
              placeholder="e.g. product"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
          </div>
          {error && (
            <p className="text-sm font-base text-red-600 border-2 border-red-600 rounded-base px-3 py-2 bg-red-50">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="neutral" onClick={onClose}>
            Cancel
          </Button>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button onClick={handleJoin} disabled={loading}>
              {loading ? "Joining..." : "Join room"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}