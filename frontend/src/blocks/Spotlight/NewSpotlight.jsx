"use client";
import React from "react";
import { motion } from "motion/react";

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(300, 100%, 85%, .15) 0, hsla(300, 100%, 55%, .05) 50%, hsla(300, 100%, 45%, 0) 80%)", // Purple gradient
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(340, 100%, 85%, .12) 0, hsla(340, 100%, 55%, .05) 80%, transparent 100%)", // Pink gradient
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(320, 100%, 85%, .1) 0, hsla(320, 100%, 45%, .05) 80%, transparent 100%)", // Light purple/pink gradient
  translateY = -350,
  width = 720, // Increased width to make it larger
  height = 2000, // Increased height for more coverage
  smallWidth = 320, // Increased smallWidth for larger impact
  duration = 7,
  xOffset = 150 // Increased xOffset for more movement
} = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="pointer-events-none absolute inset-0 h-full w-full z-0"  // Ensuring it stays behind everything
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none"  // Keep it behind by setting z-index to 0
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 left-0 origin-top-left"
        />
      </motion.div>
      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-screen h-screen z-0 pointer-events-none"  // Keep it behind by setting z-index to 0
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
};
