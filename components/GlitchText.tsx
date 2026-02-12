/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  // Use motion version of the component tag
  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent 
      className={`relative inline-block font-black tracking-tighter isolate cursor-default group ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Base layer for solid white fallback and defining dimensions */}
      <motion.span 
        className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent opacity-80"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
        variants={{
          hover: { letterSpacing: "0.02em" }
        }}
      >
        {text}
      </motion.span>

      {/* Main Animated Gradient Text */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position,letter-spacing]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        whileHover={{ letterSpacing: "0.02em" }}
        transition={{
          backgroundPosition: {
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          },
          letterSpacing: {
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Blur Glow Effect layer 1 */}
      <motion.span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-[#a8fbd3] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-2xl opacity-50 will-change-[opacity,filter,letter-spacing]"
        whileHover={{ 
          opacity: 0.8,
          filter: "blur(30px)",
          letterSpacing: "0.02em"
        }}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      />

      {/* Additional glint glow for hover intensity */}
      <motion.span
        className="absolute inset-0 -z-20 block bg-white blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        aria-hidden="true"
        style={{ borderRadius: '50%' }}
      />
    </MotionComponent>
  );
};

export default GradientText;