"use client";

import { motion } from "framer-motion";

interface MeetingCameraAnimatedProps {
  size?: number;
  className?: string;
  isOff?: boolean;
}

export const MeetingCameraAnimated = ({
  size = 24,
  className,
  isOff = false,
}: MeetingCameraAnimatedProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <title>{isOff ? "Meeting Camera Off" : "Meeting Camera"}</title>

      {/* Main camera body - always visible */}
      <motion.path
        d="M3.75 5.261h9s3 0 3 3v7.5s0 3 -3 3h-9s-3 0 -3 -3v-7.5s0 -3 3 -3"
        initial={false}
        animate={{
          opacity: isOff ? 0.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Camera lens/recording indicator - always visible */}
      <motion.path
        d="m18.75 15.011 3.415 1.707a0.75 0.75 0 0 0 1.085 -0.671V7.974a0.749 0.749 0 0 0 -1.085 -0.67L18.75 9.011"
        initial={false}
        animate={{
          opacity: isOff ? 0.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Additional paths when off */}
      {isOff && (
        <>
          <motion.path
            d="M15.75 11.25v-3a1.5 1.5 0 0 0 -1.5 -1.5H10.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M13.5 18.75H2.25a1.5 1.5 0 0 1 -1.5 -1.5v-9a1.5 1.5 0 0 1 1.5 -1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="m19.579 16.165 2.586 1.292a0.75 0.75 0 0 0 1.085 -0.671V8.714a0.75 0.75 0 0 0 -1.085 -0.671l-2.586 1.292a1.5 1.5 0 0 0 -0.829 1.342v4.146a1.5 1.5 0 0 0 0.829 1.342Z"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Strikethrough line - animates with pathLength */}
      <motion.path
        d="m0.75 0.75 22.5 22.5"
        stroke="#ef4444"
        initial={false}
        animate={{
          pathLength: isOff ? 1 : 0,
          opacity: isOff ? 1 : 0,
        }}
        transition={{
          pathLength: { duration: 0.4, ease: "easeInOut" },
          opacity: { duration: 0.2 },
        }}
      />
    </svg>
  );
};
