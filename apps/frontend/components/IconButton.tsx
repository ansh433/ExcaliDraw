"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className={`m-1 cursor-pointer rounded-base border-2 border-border p-2 shadow-shadow transition-colors
        ${activated
          ? "bg-main text-main-foreground"
          : "bg-secondary-background text-foreground hover:bg-main/20"
        }`}
    >
      {icon}
    </motion.div>
  );
}