"use client";
import React from "react";
import { AnimatedTooltip } from "./Team";

// Import images from TeamImages folder
import VanshImage from "../../TeamImages/vansh.png";
import YashImage from "../../TeamImages/yash.png";
import YuvrajImage from "../../TeamImages/yuvraj.png";
import KushagraImage from "../../TeamImages/kushagra.png";

const people = [
  {
    id: 1,
    name: "Vansh Upreti",
    designation: "Full Stack Devloper",
    image: VanshImage,
  },
  {
    id: 2,
    name: "Yash Vardhan Ruia",
    designation: "Backend Developer",
    image: YashImage,
  },
  {
    id: 3,
    name: "Yuvraj Singh Parihar",
    designation: "Frontend Developer",
    image: YuvrajImage,
  },
  {
    id: 4,
    name: "Kushagra Srivastava",
    designation: "Bakchodi",
    image: KushagraImage,
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
