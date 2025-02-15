import React from 'react';
// If you have an illustration for the Docs page, import it here.
// For example, if you have a docsIllustration.svg in your src/assets folder:
// import docsIllustration from '../assets/docsIllustration.svg';

const Docs = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 lg:px-20">
      {/* Container for content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Text Section */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6">Docs</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Your go-to guide for using NoTiFy. Discover how to create pages, 
            format content, collaborate in real-time, and leverage 
            advanced features like Kanban boards and database tables.
          </p>
          <div className="flex space-x-4">
            <button className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded font-semibold">
              Get Started
            </button>
            <button className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition px-6 py-3 rounded font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration (Optional) */}
        <div className="flex-1">
          {/* If you imported an illustration, use: */}
          {/* <img src={docsIllustration} alt="Docs Illustration" className="w-full h-auto" /> */}
          {/* Placeholder illustration (SVG from heroicons.dev) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-80 h-80 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h12M9 3v2m-6 4h12M3 15h12m-6 2v-2m9 2h2m-2-4h2m-2-4h2m-2-4h2"
            />
          </svg>
        </div>
      </div>

      {/* Additional content (optional) */}
      {/* 
         You can add more sections below—like an FAQ, 
         a table of contents, or step-by-step tutorials. 
      */}
    </div>
  );
};

export default Docs;
