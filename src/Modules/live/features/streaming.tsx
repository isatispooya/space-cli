import React from 'react';
import { motion } from 'framer-motion';
import { useLiveStream } from '../hooks';

const Stream: React.FC = () => {
  // Variants for Framer Motion animations
  const screenVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  const antennaVariants = {
    wiggle: {
      rotate: [0, -10, 10, -10, 0],
      transition: { repeat: Infinity, duration: 2 },
    },
  };

  const { data: liveStream, isLoading, error } = useLiveStream.useLiveStream();

  // بررسی وضعیت بارگذاری
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // بررسی خطا
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  // بررسی وجود داده
  if (!liveStream || !liveStream.secret_url) {
    return <div className="flex justify-center items-center h-screen">No live stream data available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-white">
      {/* Television Frame */}
      <motion.div
        className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden w-[90vw] h-[70vh] max-w-[800px] max-h-[600px]"
        initial="hidden"
        animate="visible"
        variants={screenVariants}
      >
        {/* Antennas */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
          {/* Left Antenna */}
          <motion.div
            className="w-40 h-1 bg-gray-700 rounded-full md:w-56"
            style={{
              transformOrigin: 'left',
              transform: 'rotate(-45deg) translateX(-50%)',
            }}
            variants={antennaVariants}
            animate="wiggle"
          />
          {/* Right Antenna */}
          <motion.div
            className="w-40 h-1 bg-gray-700 rounded-full md:w-56"
            style={{
              transformOrigin: 'right',
              transform: 'rotate(45deg) translateX(50%)',
            }}
            variants={antennaVariants}
            animate="wiggle"
          />
          {/* Vertical Antenna Base */}
          <motion.div
            className="w-1 h-20 bg-gray-700 rounded-full md:h-32"
            variants={antennaVariants}
            animate="wiggle"
          />
        </div>
        {/* Screen */}
        <div className="w-full h-full bg-black relative overflow-hidden">
          {/* Live Video Player (Aparat Embed) */}
          <div
            className="h_iframe-aparat_embed_frame"
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <span style={{ display: 'block', paddingTop: '57%' }}></span>
            <iframe
              src={liveStream?.secret_url} 
              scrolling="no"
              allowFullScreen
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex space-x-6 absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {[1, 2, 3].map((button) => (
            <motion.button
              key={button}
              className="w-12 h-12 bg-red-600 rounded-full shadow-md md:w-16 md:h-16"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
      {/* Stand */}
      <div className="mt-6 w-56 h-12 bg-gray-700 rounded-b-lg md:w-72 md:h-16" />
    </div>
  );
};

export default Stream;