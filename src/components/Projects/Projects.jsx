import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, useTheme, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';

// Memoized Project Card component
const ProjectCard = memo(({ project, index }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine card color based on index
  const getColor = () => {
    const colors = [
      theme.palette.cyberpunk.neonPink,
      theme.palette.cyberpunk.neonBlue,
      theme.palette.cyberpunk.neonYellow,
      theme.palette.cyberpunk.neonGreen,
      theme.palette.cyberpunk.electric
    ];
    return colors[index % colors.length];
  };
  
  const cardColor = getColor();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      style={{ height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(13, 2, 33, 0.7)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${cardColor}50`,
          borderTop: `3px solid ${cardColor}`,
          borderRadius: 0,
          boxShadow: `0 0 20px ${cardColor}30`,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: `0 0 30px ${cardColor}50`,
            transform: 'translateY(-5px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${cardColor}10, transparent 70%)`,
            opacity: 0.6,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: -200,
            width: '80px',
            height: '200%',
            background: `linear-gradient(90deg, transparent, ${cardColor}30, transparent)`,
            transform: 'skewX(-20deg)',
            animation: isHovered ? 'cyberscan 1.5s infinite ease-out' : 'none',
            '@keyframes cyberscan': {
              '0%': { left: -200 },
              '100%': { left: '200%' },
            },
            zIndex: 1,
          }
        }}
      >
        {/* Project Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="180"
            image={project.image}
            alt={project.title}
            sx={{ 
              filter: 'contrast(1.2) saturate(1.2)',
              transition: 'all 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Scanlines overlay */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)',
              pointerEvents: 'none',
              opacity: 0.3,
              zIndex: 2,
            }}
          />
          
          {/* Project links that appear on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(13, 2, 33, 0.7)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  zIndex: 3,
                }}
              >
                {/* {project.githubUrl && (
                  <IconButton 
                    href={project.githubUrl} 
                    target="_blank"
                    aria-label="GitHub repository"
                    sx={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        background: cardColor,
                        boxShadow: `0 0 15px ${cardColor}`,
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                )} */}
                {project.liveUrl && (
                  <IconButton 
                    href={project.liveUrl} 
                    target="_blank"
                    aria-label="Live demo"
                    sx={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': {
                        background: cardColor,
                        boxShadow: `0 0 15px ${cardColor}`,
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <LaunchIcon />
                  </IconButton>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Project category tag */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'rgba(13, 2, 33, 0.7)',
              borderRight: `2px solid ${cardColor}`,
              borderBottom: `2px solid ${cardColor}`,
              color: cardColor,
              padding: '4px 10px',
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%)',
              zIndex: 4,
            }}
          >
            {project.category}
          </Box>
          
          {/* Project number marker */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'rgba(13, 2, 33, 0.7)',
              borderLeft: `2px solid ${cardColor}`,
              borderBottom: `2px solid ${cardColor}`,
              color: cardColor,
              padding: '4px 10px',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 0% 100%)',
              zIndex: 4,
            }}
          >
            {`0${index + 1}`}
          </Box>
        </Box>
        
        {/* Project content */}
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            position: 'relative',
            zIndex: 2,
            padding: { xs: 2, sm: 3 }
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{
              color: cardColor,
              fontWeight: 'bold',
              fontFamily: '"Orbitron", sans-serif',
              position: 'relative',
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '16px',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              textShadow: `0 0 5px ${cardColor}40`,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40%',
                height: '2px',
                background: cardColor,
                boxShadow: `0 0 10px ${cardColor}`,
              }
            }}
          >
            {project.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2, 
              opacity: 0.9,
              fontFamily: '"Rajdhani", sans-serif',
              lineHeight: 1.6,
              letterSpacing: '0.03em',
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
            }}
          >
            {project.description}
          </Typography>
          
          {/* Technologies used */}
          <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.technologies.map(tech => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                icon={<CodeIcon style={{ fontSize: 14 }} />}
                sx={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${cardColor}40`,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'monospace',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  height: { xs: '22px', sm: '24px' },
                  '& .MuiChip-icon': {
                    color: cardColor,
                  },
                  '&:hover': {
                    background: `${cardColor}20`,
                    borderColor: cardColor,
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
        
        {/* Corner element */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderTop: `10px solid ${cardColor}40`,
            borderLeft: `10px solid transparent`,
          }}
        />
      </Card>
    </motion.div>
  );
});

// Update the project data with the user's personal projects
const projectsData = [
  {
    title: "SolveAI",
    description: "A powerful AI content generator that helps create content for blogs, websites, and social media. Streamline your content creation process with advanced AI technology.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000", // Placeholder until solveaiImg is available
    technologies: ["React", "OpenAI API", "Node.js", "TailwindCSS"],
    category: "AI/ML",
    githubUrl: "https://github.com/yourusername/solveai",
    liveUrl: "https://solveai.netlify.app/"
  },
  {
    title: "StudyNotion",
    description: "A comprehensive online learning platform offering coding courses with self-paced learning, hands-on projects, quizzes, and personalized instructor feedback.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000", // Placeholder until studynotionImg is available
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "Full Stack",
    githubUrl: "https://github.com/yourusername/studynotion",
    liveUrl: "https://study-notion-mohan.vercel.app/"
  },
  {
    title: "Brainwave AI",
    description: "An open AI chat application designed to boost productivity. Unleash the power of AI with advanced chat capabilities and intelligent assistance.",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder until brainwaveImg is available
    technologies: ["Next.js", "OpenAI", "TailwindCSS", "Firebase"],
    category: "AI/ML",
    githubUrl: "https://github.com/yourusername/brainwave",
    liveUrl: "https://brainwave-jet-six.vercel.app/"
  },
  {
    title: "T-Shirt Customizer",
    description: "Create unique and exclusive shirts with a cutting-edge 3D customization tool. Users can unleash their imagination and define their own style with this interactive platform.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000", // Placeholder until tshirtImg is available
    technologies: ["React Three Fiber", "Three.js", "Framer Motion", "TailwindCSS"],
    category: "3D/Interactive",
    githubUrl: "https://github.com/yourusername/tshirt-customizer",
    liveUrl: "https://t-shirt-customization-ecru.vercel.app/"
  },
  {
    title: "Zentry Gaming",
    description: "A modern and dynamic gaming website landing page showcasing the latest in gaming technology and experiences.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000", // Placeholder until zenteryImg is available
    technologies: ["React", "TailwindCSS", "Framer Motion", "GSAP"],
    category: "Web App",
    githubUrl: "https://github.com/yourusername/zentry",
    liveUrl: "https://zentry-three.vercel.app/"
  },
  {
    title: "Apple Website Clone",
    description: "A pixel-perfect clone of the Apple website, demonstrating attention to detail and advanced frontend development skills.",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder until appleImg is available
    technologies: ["React", "TailwindCSS", "GSAP", "Responsive Design"],
    category: "Web App",
    githubUrl: "https://github.com/yourusername/apple-clone",
    liveUrl: "https://i-phone-peach-ten.vercel.app/#highlights"
  }
];

const Projects = memo(() => {
  const theme = useTheme();
  const [hoveredCircuit, setHoveredCircuit] = useState(null);
  
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
        overflowX: 'hidden',
      }}
      id="projects"
    >
      {/* Decorative circuit paths */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={`circuit-path-${i}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              [i % 2 === 0 ? 'top' : 'bottom']: `${20 + i * 15}%`,
              [i % 2 === 0 ? 'left' : 'right']: 0,
              width: '40%',
              height: '1px',
              background: `linear-gradient(${i % 2 === 0 ? 'to right' : 'to left'}, 
                transparent, 
                ${i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
                  i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
                  i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
                  theme.palette.cyberpunk.neonGreen}40,
                transparent)`,
            }}
          />
        </Box>
      ))}
      
      {/* Circuit nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`circuit-node-${i}`}
          onMouseEnter={() => setHoveredCircuit(i)}
          onMouseLeave={() => setHoveredCircuit(null)}
          style={{
            position: 'absolute',
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            width: '6px',
            height: '6px',
            backgroundColor: 
              i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
              i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
              i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
              theme.palette.cyberpunk.neonGreen,
            borderRadius: '50%',
            zIndex: 1,
            boxShadow: `0 0 10px ${
              i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
              i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
              i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
              theme.palette.cyberpunk.neonGreen
            }`,
          }}
          animate={hoveredCircuit === i ? {
            scale: [1, 1.5, 1],
            boxShadow: [
              `0 0 10px ${
                i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
                i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
                i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
                theme.palette.cyberpunk.neonGreen
              }`,
              `0 0 20px ${
                i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
                i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
                i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
                theme.palette.cyberpunk.neonGreen
              }`,
              `0 0 10px ${
                i % 4 === 0 ? theme.palette.cyberpunk.neonPink : 
                i % 4 === 1 ? theme.palette.cyberpunk.neonBlue : 
                i % 4 === 2 ? theme.palette.cyberpunk.neonYellow : 
                theme.palette.cyberpunk.neonGreen
              }`
            ]
          } : {}}
          transition={{ duration: 1, repeat: hoveredCircuit === i ? Infinity : 0 }}
        />
      ))}
      
      {/* Title section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          position: 'relative', 
          zIndex: 2,
          width: '100%',
          textAlign: 'center',
          marginBottom: '60px'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: theme.palette.primary.main,
              textShadow: `0 0 20px ${theme.palette.primary.main}80`,
              position: 'relative',
              zIndex: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            My Projects
          </Typography>
          
          {/* Glitch effect */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: theme.palette.secondary.main,
              position: 'absolute',
              top: '3px',
              left: '51%',
              transform: 'translateX(-50%)',
              zIndex: 9,
              opacity: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              clipPath: 'inset(0 0 0 0)',
              animation: 'glitch-projects 5s infinite linear alternate-reverse',
              '@keyframes glitch-projects': {
                '0%, 100%': { clipPath: 'inset(80% 0 0 0)' },
                '20%': { clipPath: 'inset(20% 0 40% 0)' },
                '40%': { clipPath: 'inset(40% 0 20% 0)' },
                '60%': { clipPath: 'inset(0% 0 40% 0)' },
                '80%': { clipPath: 'inset(0% 0 80% 0)' },
              },
            }}
          >
            My Projects
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
            <motion.div
              animate={{ 
                left: ['0%', '100%', '0%'],
                width: ['30%', '50%', '30%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '30%',
                background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                filter: 'blur(4px)',
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
            Recent Work & Personal Development
          </Typography>
        </Box>
      </motion.div>
      
      {/* Project grid */}
      <Box sx={{ flexGrow: 1, width: '100%', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {projectsData.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.title}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '200px',
          height: '200px',
          border: `1px solid ${theme.palette.cyberpunk.neonPink}30`,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          transform: 'rotate(45deg)',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          border: `1px solid ${theme.palette.cyberpunk.neonBlue}30`,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          transform: 'rotate(30deg)',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
});

export default Projects; 