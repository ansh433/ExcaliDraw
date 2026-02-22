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
import { createRoom } from "@/draw/http";

export function CreateRoomModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      setError("Room name cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { roomId } = await createRoom(name.trim());
      onClose();
      setName("");
      router.push(`/canvas/${roomId}`);
    } catch (e: any) {
      setError(
        e?.response?.data?.message ?? "Failed to create room. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new room</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-name">Room name</Label>
            <Input
              id="room-name"
              placeholder="e.g. product-brainstorm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
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
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create room"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}