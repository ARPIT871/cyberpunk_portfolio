import React, { memo } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const CyberpunkBackground = memo(() => {
  // Configure cyberpunk elements - reduce numbers for better performance
  const numGridLines = 6; // Further reduced from 8
  const numNeonGlows = 2; // Further reduced from 3
  const numCircuits = 4; // Further reduced from 6
  const numDataStreams = 2; // Further reduced from 4

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000', // Changed from #0D0221 to pure black
        backgroundImage: 'radial-gradient(rgba(10, 1, 20, 0.5) 15%, transparent 60%)', // Darkened the gradient
        zIndex: 1, // Ensure it's below content
        overflow: 'hidden',
        pointerEvents: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.8) 100%)', // Adjusted for black background
          zIndex: 1,
        }
      }}
    >
      {/* Grid lines - horizontal */}
      {[...Array(numGridLines)].map((_, i) => (
        <Box
          key={`h-grid-${i}`}
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '1px',
            top: `${(i * 100) / (numGridLines - 1)}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.15) 20%, rgba(0, 255, 255, 0.15) 80%, transparent 100%)', // Slightly dimmed
            opacity: i % 2 === 0 ? 0.3 : 0.15,
            transform: `perspective(500px) rotateX(80deg)`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Grid lines - vertical */}
      {[...Array(numGridLines)].map((_, i) => (
        <Box
          key={`v-grid-${i}`}
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '1px',
            left: `${(i * 100) / (numGridLines - 1)}%`,
            background: 'linear-gradient(0deg, transparent 0%, rgba(0, 255, 255, 0.2) 20%, rgba(0, 255, 255, 0.2) 80%, transparent 100%)',
            opacity: i % 2 === 0 ? 0.3 : 0.15,
            transform: `perspective(500px) rotateY(10deg)`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Neon glow spots */}
      {[...Array(numNeonGlows)].map((_, i) => {
        const colors = ['#FF0055', '#00FFFF', '#FFFC00', '#00FF41'];
        const size = 150 + Math.random() * 350;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`glow-${i}`}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}10 0%, ${color}05 40%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              zIndex: 1,
              opacity: 0.6,
              willChange: 'opacity, transform', // Added for better performance
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 5, // Slowed down animations
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Cyber circuit lines */}
      {[...Array(numCircuits)].map((_, i) => {
        const isVertical = Math.random() > 0.5;
        const size = 150 + Math.random() * 250;
        const colors = ['#FF0055', '#00FFFF', '#FFFC00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={`circuit-${i}`}
            style={{
              position: 'absolute',
              width: isVertical ? '2px' : size,
              height: isVertical ? size : '2px',
              background: `linear-gradient(${isVertical ? '0deg' : '90deg'}, transparent, ${color}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 2,
              willChange: 'opacity, width, height', // Added for better performance
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              [isVertical ? 'height' : 'width']: [size * 0.8, size, size * 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 3, // Slowed down animations
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1, // Add delay between animations
            }}
          />
        );
      })}

      {/* Data stream/code rain effect - reduce complexity */}
      {[...Array(numDataStreams)].map((_, i) => {
        const streamLength = 15 + Math.floor(Math.random() * 15); // Reduced from 30+30
        const xPos = Math.random() * 100;
        
        return (
          <Box
            key={`data-stream-${i}`}
            sx={{
              position: 'absolute',
              left: `${xPos}%`,
              top: 0,
              bottom: 0,
              width: '20px',
              zIndex: 2,
              overflow: 'hidden',
              opacity: 0.7,
            }}
          >
            {[...Array(streamLength)].map((_, j) => (
              <motion.div
                key={`data-bit-${i}-${j}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${(j * 100) / streamLength}%`,
                  transform: 'translateX(-50%)',
                  fontSize: '14px',
                  color: j % 5 === 0 ? '#00FFFF' : j % 3 === 0 ? '#FFFC00' : '#FFFFFF',
                  opacity: Math.random() * 0.8 + 0.2,
                  fontFamily: 'monospace',
                  willChange: 'opacity, transform', // Added for better performance
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: ['-100%', '20px'],
                }}
                transition={{
                  duration: 2 + Math.random(), // Slowed down animations
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                  repeatDelay: 0.5, // Add delay between animations
                }}
              >
                {Math.random() > 0.5 ? '0' : '1'}
              </motion.div>
            ))}
          </Box>
        );
      })}

      {/* Cityscape silhouette */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30vh',
          background: 'linear-gradient(0deg, #000000 0%, transparent 100%)', // Changed to pure black
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '15vh',
            backgroundImage: `
              linear-gradient(0deg, #000000, transparent),
              repeating-linear-gradient(90deg, transparent, transparent 50px, #0D0221 50px, #0D0221 100px, transparent 100px, transparent 150px, #0D0221 150px, #0D0221 200px)
            `,
            maskImage: `
              linear-gradient(0deg, #000000, transparent 100%),
              repeating-linear-gradient(90deg, 
                #000000, #000000 20px, 
                transparent 20px, transparent 30px,
                #000000 30px, #000000 70px,
                transparent 70px, transparent 80px,
                #000000 80px, #000000 120px,
                transparent 120px, transparent 140px,
                #000000 140px, #000000 180px,
                transparent 180px, transparent 200px,
                #000000 200px, #000000 250px,
                transparent 250px, transparent 300px)
            `,
            maskSize: '100% 100%, 1000px 100%',
          }
        }}
      />

      {/* Cyberpunk glitch effect overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(255, 0, 85, 0.02), rgba(0, 255, 255, 0.02))', // Slightly reduced opacity
          zIndex: 3,
          pointerEvents: 'none',
          animation: 'cyberpunk-glitch 8s infinite',
          '@keyframes cyberpunk-glitch': {
            '0%, 100%': { opacity: 0 },
            '5%, 10%': { opacity: 0.3 },
            '5.5%, 9.5%': { opacity: 0 },
            '75%': { opacity: 0 },
            '75.5%': { opacity: 0.2 },
            '76%': { opacity: 0 },
            '76.5%': { opacity: 0.1 },
            '77%': { opacity: 0 },
          }
        }}
      />
    </Box>
  );
});

export default CyberpunkBackground; 