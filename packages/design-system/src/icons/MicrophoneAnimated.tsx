"use client";

import { motion } from "framer-motion";

interface MicrophoneAnimatedProps {
  size?: number;
  className?: string;
  isOff?: boolean;
}

export const MicrophoneAnimated = ({
  size = 24,
  className,
  isOff = false,
}: MicrophoneAnimatedProps) => {
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
      <title>{isOff ? "Microphone Off" : "Microphone"}</title>

      {/* Main microphone body - only visible when ON */}
      {!isOff && (
        <>
          <motion.path
            d="M12 14C13.6569 14 15 12.6569 15 11V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V11C9 12.6569 10.3431 14 12 14Z"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Microphone arc */}
          <motion.path
            d="M19 11C19 14.5304 15.866 17.8934 12 17.8934C8.13401 17.8934 5 14.5304 5 11"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Microphone stand */}
          <motion.path
            d="M12 18V22"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Microphone base */}
          <motion.path
            d="M8 22H16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Additional paths when off */}
      {isOff && (
        <>
          <motion.path
            d="m12 19.5 0 3.75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M12.56 16.47c-0.54 0.06 -5.06 0.31 -5.06 -5.22"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M15.13 18.84a7.8 7.8 0 0 1 -3.13 0.66h0a7.36 7.36 0 0 1 -7.5 -7.18V9.75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M19.5 9.75v2.57a7 7 0 0 1 -2.08 4.95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M7.5 6.94V5.25A4.49 4.49 0 0 1 12 0.75h0a4.49 4.49 0 0 1 4.5 4.5v6a5.54 5.54 0 0 1 -1.19 3.82"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Strikethrough line - animates with pathLength */}
      <motion.path
        d="M3 2.25 21 21"
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
