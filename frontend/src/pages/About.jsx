import React from 'react';
// If you have a custom illustration for your About page, import it here
// import aboutIllustration from '../assets/aboutIllustration.svg';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 lg:px-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Heading & Description */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6">About NoTiFy</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            NoTiFy is your ultimate space for seamless note-taking and 
            collaboration—empowering teams and individuals to brainstorm, 
            organize, and execute ideas efficiently. Inspired by Notion’s 
            versatility, NoTiFy provides intuitive features for every workflow.
          </p>
          <button className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded font-semibold">
            Learn More
          </button>
        </div>

        {/* Right Side - Illustration (Placeholder) */}
        <div className="flex-1">
          {/* Replace this SVG with your own illustration or an imported image */}
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
              d="M15.232 5.232l-4.464 4.464m0 0l4.464 4.464m-4.464-4.464H21M3 12h6.768"
            />
          </svg>
        </div>
      </div>

      {/* Additional Sections (Team, Mission, etc.) */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-8">
          At NoTiFy, our mission is to simplify collaboration and organization.
          We believe that powerful note-taking should be accessible to everyone,
          fostering creativity and productivity in any setting.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-gray-300 mb-8">
          Our diverse team of developers, designers, and content creators is
          dedicated to building intuitive features that help you focus on what
          matters most—turning your ideas into action.
        </p>

        {/* Team Grid with pop-up hover effect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Each card has transform and transition classes for the hover pop-up */}
          <div className="
            bg-gray-800 
            p-6 
            rounded-2xl 
            shadow-lg 
            text-center
            transform
            transition-transform
            duration-200
            hover:scale-105
            hover:shadow-xl
            cursor-pointer
          ">
            <h3 className="text-xl font-bold">Yash Vardhan Ruia</h3>
            <p className="text-gray-400">Product Designer</p>
          </div>

          <div className="
            bg-gray-800 
            p-6 
            rounded-2xl 
            shadow-lg 
            text-center
            transform
            transition-transform
            duration-200
            hover:scale-105
            hover:shadow-xl
            cursor-pointer
          ">
            <h3 className="text-xl font-bold">Vansh Upreti</h3>
            <p className="text-gray-400">Full-Stack Developer</p>
          </div>

          <div className="
            bg-gray-800 
            p-6 
            rounded-2xl 
            shadow-lg 
            text-center
            transform
            transition-transform
            duration-200
            hover:scale-105
            hover:shadow-xl
            cursor-pointer
          ">
            <h3 className="text-xl font-bold">Yuvraj Singh Parihar</h3>
            <p className="text-gray-400">Content Strategist</p>
          </div>

          {/* Add more team members as needed with the same hover classes */}
        </div>
      </div>
    </div>
  );
};

export default About;

