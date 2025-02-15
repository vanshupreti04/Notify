import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Move, Table, Trello, Layers, Users, FileText } from 'lucide-react';

const Features = () => {
  // Features array with icons
  const features = [
    {
      title: "Rich Text Editing",
      description: "Edit your notes with bold, italic, headings, and more.",
      icon: <BookOpen size={28} />
    },
    {
      title: "Drag & Drop Blocks",
      description: "Easily rearrange notes and components using drag-and-drop.",
      icon: <Move size={28} />
    },
    {
      title: "Database Tables",
      description: "Organize structured data with tables and filters.",
      icon: <Table size={28} />
    },
    {
      title: "Kanban Boards",
      description: "Manage tasks efficiently using a Kanban-style board.",
      icon: <Trello size={28} />
    },
    {
      title: "Page Nesting",
      description: "Create and manage sub-pages seamlessly.",
      icon: <Layers size={28} />
    },
    {
      title: "Real-Time Collaboration",
      description: "Work together with team members in real-time.",
      icon: <Users size={28} />
    },
    {
      title: "Markdown Support",
      description: "Write notes quickly using Markdown formatting.",
      icon: <FileText size={28} />
    },
  ];

  // Animation variants for the container and individual cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 lg:px-20">
      {/* Hero Section with a smooth fade-in */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        {/* Left Side - Heading & Description */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6">Features</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Explore a suite of powerful tools to boost your productivity.
            Write, organize, and collaborate with ease using NoTiFy’s 
            intuitive features.
          </p>

          {/* Buttons with pop-up hover effect */}
          <div className="flex space-x-4">
            <button className="
              bg-purple-600 
              text-white
              font-semibold
              px-6 
              py-3 
              rounded 
              transition-all 
              duration-200
              transform
              hover:scale-105
              hover:bg-purple-500
              shadow-md 
              hover:shadow-lg
            ">
              Get Started
            </button>

            <button className="
              bg-transparent 
              border 
              border-purple-600 
              text-purple-600 
              font-semibold 
              px-6 
              py-3 
              rounded 
              transition-all 
              duration-200 
              transform
              hover:scale-105
              hover:bg-purple-600 
              hover:text-white
              shadow-md 
              hover:shadow-lg
            ">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Illustration (Placeholder) */}
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-28 h-28 text-gray-600 lg:w-40 lg:h-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </motion.div>

      {/* Features Grid with staggered fade-in */}
      <motion.div
        className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            // 'whileHover' adds the pop-up (scale) effect using Framer Motion
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="p-6 bg-gray-800 rounded-2xl shadow-lg cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-purple-600">{feature.icon}</div>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
            </div>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
