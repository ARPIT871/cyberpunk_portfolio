import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BotCharacter } from '../Hero/Hero';

const TimelineItem = memo(({ item, index }) => {
  const theme = useTheme();
  const isEven = index % 2 === 0;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  
  // Generate a consistent but random-looking color for each item
  const getColor = () => {
    const colors = [
      theme.palette.cyberpunk.neonPink,  // Pink
      theme.palette.cyberpunk.neonBlue,  // Cyan
      theme.palette.cyberpunk.neonYellow, // Yellow
      theme.palette.cyberpunk.neonGreen,  // Green
    ];
    return colors[index % colors.length];
  };
  
  const itemColor = getColor();
  
  return (
    <Box sx={{ 
      width: '100%', 
      position: 'relative',
      mb: { xs: 6, sm: 7, md: 8 },
      '&:last-child': {
        mb: 0
      }
    }}>
      {/* Central line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: '-40px', // Extend below to connect to next item
          left: '50%',
          width: '1px',
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, ${itemColor}, rgba(255,255,255,0.1))`,
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: itemColor,
            boxShadow: `0 0 10px ${itemColor}`,
            zIndex: 1
          }
        }}
      />
      
      {/* Year indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-15px', md: '0' },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Orbitron", sans-serif',
            color: itemColor,
            textShadow: `0 0 10px ${itemColor}`,
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' },
            letterSpacing: '0.1em',
            textAlign: 'center',
            mb: 1,
            position: 'relative',
            zIndex: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            px: 2,
            borderRadius: '4px',
            border: `1px solid ${itemColor}50`,
          }}
        >
          {item.year}
        </Typography>
      </Box>
      
      {/* Timeline item content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: isEven ? 'flex-start' : 'flex-end' },
          position: 'relative',
          zIndex: 2,
          mt: { xs: 5, md: 10 }, // Add more top margin on mobile to account for the year
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: { xs: '90%', sm: '80%', md: '45%' },
            p: { xs: 2, sm: 3 },
            background: 'rgba(13, 2, 33, 0.7)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${itemColor}40`,
            borderLeft: `3px solid ${itemColor}`,
            borderRadius: '0',
            clipPath: { 
              xs: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)',
              md: isEven
                ? 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)'
                : 'polygon(3% 0, 100% 0, 100% 100%, 0% 100%)'
            },
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 0 20px ${itemColor}40`,
              transform: 'translateY(-5px)',
              borderColor: `${itemColor}80`,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(${isEven ? 45 : 135}deg, ${itemColor}10, transparent 70%)`,
              zIndex: 0,
            },
            ml: { md: isEven ? '0%' : 'auto' },
            mr: { md: isEven ? 'auto' : '0%' },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                color: itemColor,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textShadow: `0 0 5px ${itemColor}40`,
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                '&::before': {
                  content: '""',
                  display: 'inline-block',
                  width: '15px',
                  height: '3px',
                  backgroundColor: itemColor,
                  marginRight: '10px',
                  boxShadow: `0 0 5px ${itemColor}`,
                }
              }}
            >
              {item.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 0.5, 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                letterSpacing: '0.05em',
                fontStyle: 'italic'
              }}
            >
              {item.company}
            </Typography>
            
            <Typography 
              sx={{ 
                mb: 2, 
                color: 'text.secondary',
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                letterSpacing: '0.02em',
                lineHeight: 1.6,
              }}
            >
              {item.description}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                mt: 2,
              }}
            >
              {item.technologies.map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                    border: `1px solid ${itemColor}60`,
                    backgroundColor: theme.palette.background.paper,
                    color: itemColor,
                    letterSpacing: '0.05em',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: itemColor,
                      boxShadow: `0 0 10px ${itemColor}60`,
                      transform: 'translateY(-2px)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(45deg, ${itemColor}10, transparent 70%)`,
                      zIndex: -1,
                    }
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      position: 'relative', 
                      zIndex: 1,
                      fontFamily: 'monospace',
                    }}
                  >
                    {tech}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Corner decorations */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              borderLeft: `15px solid ${itemColor}60`,
              borderBottom: `15px solid transparent`,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              borderRight: `15px solid ${itemColor}60`,
              borderTop: `15px solid transparent`,
              zIndex: 1,
            }}
          />
        </Paper>
      </Box>
      
      {/* Connection to timeline */}
      <Box
        sx={{
          position: 'absolute',
          top: '15px',
          left: '50%',
          width: { xs: '30px', md: isEven ? '3%' : '3%' },
          height: '1px',
          background: itemColor,
          transform: { 
            xs: 'translateX(-50%)', 
            md: isEven ? 'translateX(0)' : 'translateX(-100%)'
          },
          boxShadow: `0 0 5px ${itemColor}`,
          zIndex: 2,
          ml: { md: isEven ? '0' : '0' }
        }}
      />
    </Box>
  );
});

const Timeline = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = React.useState(0);
  const [botVisible, setBotVisible] = React.useState(false);
  const timelineRef = React.useRef(null);
  
  // Timeline data
  const timelineData = [   
    {
      year: '2023',
      title: 'MERN Stack Teacher',
      company: 'Web Development Academy',
      description: 'Started my career as a MERN stack teacher, helping others learn web development.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB']
    },
     {
      year: '2024',
      title: 'B.Tech in Computer Science',
      company: 'University of Bhopal',
      description: 'Completed my graduation in Computer Science from Bhopal.',
      technologies: ['Computer Science', 'Programming', 'Data Structures']
    },
       {
      year: '2024',
      title: 'Product-Based Company',
      company: 'Tech Solutions Inc.',
      description: 'Worked on creating data visualization and cost management tools. Led a team of 5 members.',
      technologies: ['Data Visualization', 'Cost Management', 'Full Stack']
    },
        {
      year: '2025',
      title: 'WhatsApp Messaging Tool',
      company: 'Product-Based Company',
      description: 'Developed a WhatsApp messaging tool using the WhatsApp API at another product-based company.',
      technologies: ['WhatsApp API', 'Messaging', 'Integration']
    },
     {
      year: '2025',
      title: 'Freelance Developer',
      company: 'Self-employed',
      description: 'Started freelancing, working on diverse projects and expanding my skill set.',
      technologies: ['Web Development', 'Mobile Apps', 'Client Projects']
    }
  ];
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Show bot character at specific scroll position
          if (timelineRef.current) {
            const timelinePos = timelineRef.current.getBoundingClientRect();
            if (timelinePos.top < 300 && timelinePos.bottom > 100) {
              setBotVisible(true);
            } else {
              setBotVisible(false);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 8, sm: 10, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      id="timeline"
      ref={timelineRef}
    >
      {/* Title section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, marginBottom: '60px', width: '100%', textAlign: 'center' }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: theme.palette.primary.main,
            textTransform: 'uppercase',
            position: 'relative',
            textShadow: `0 0 20px ${theme.palette.primary.main}80`,
            zIndex: 10,
            letterSpacing: '0.05em',
          }}
        >
          CAREER PATH
        </Typography>
        
        {/* Glitch effect */}
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            color: theme.palette.secondary.main,
            position: 'absolute',
            top: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
            opacity: 0.5,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            clipPath: 'inset(0 0 0 0)',
            animation: 'glitch-title 5s infinite linear alternate-reverse',
            '@keyframes glitch-title': {
              '0%, 100%': { clipPath: 'inset(80% 0 0 0)' },
              '20%': { clipPath: 'inset(20% 0 40% 0)' },
              '40%': { clipPath: 'inset(40% 0 20% 0)' },
              '60%': { clipPath: 'inset(0% 0 40% 0)' },
              '80%': { clipPath: 'inset(0% 0 80% 0)' },
            },
          }}
        >
          CAREER PATH
        </Typography>
        
        {/* Title decorative line */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              `0 0 2px ${theme.palette.primary.main}80`,
              `0 0 10px ${theme.palette.primary.main}80`,
              `0 0 2px ${theme.palette.primary.main}80`
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            height: '2px', 
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
            width: '200px',
            margin: '10px auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-3px',
              left: '50%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: theme.palette.primary.main,
              transform: 'translateX(-50%)',
              boxShadow: `0 0 5px ${theme.palette.primary.main}`,
            }}
          />
        </motion.div>
        
        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            fontFamily: '"Rajdhani", sans-serif',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          PROFESSIONAL JOURNEY & EDUCATION
        </Typography>
      </motion.div>
      
      {/* Main timeline container - with central vertical line */}
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 1, sm: 2, md: 3 },
          mb: { xs: 4, md: 8 },
          pt: { xs: 5, md: 8 },
        }}
      >
        {/* Central timeline line - always visible */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            background: `linear-gradient(to bottom, ${theme.palette.cyberpunk.neonPink}80, ${theme.palette.cyberpunk.neonBlue}80)`,
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        />
        
        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 50
            }}
          >
            <TimelineItem item={item} index={index} />
          </motion.div>
        ))}
      </Box>
      
      {/* Digital assistant hologram */}
      <AnimatePresence>
        {botVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{ 
              position: 'fixed',
              bottom: '5%',
              right: '5%',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '150px',
              height: '150px',
            }}
          >
            <BotCharacter animated scale={0.8} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background decorative elements */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          border: `1px solid ${theme.palette.cyberpunk.neonPink}30`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity: 0.2,
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '150px',
          height: '150px',
          border: `1px solid ${theme.palette.cyberpunk.neonBlue}30`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity: 0.2,
          transform: 'rotate(30deg)',
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
};

export default Timeline; 