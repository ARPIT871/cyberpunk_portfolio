import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';

// Memoize the circuit path component
const CircuitPath = memo(({ index }) => {
  const theme = useTheme();
  const isVertical = index % 2 === 1;
  
  return (
    <Box
      sx={{
        position: 'absolute',
        [isVertical ? 'top' : 'left']: '50%',
        [isVertical ? 'height' : 'width']: '70%',
        [isVertical ? 'width' : 'height']: '1px',
        [isVertical ? 'left' : 'top']: `${10 + (index * 15)}%`,
        transform: isVertical ? 'translateX(-50%)' : 'translateY(-50%)',
        background: `linear-gradient(${isVertical ? '0deg' : '90deg'}, 
          transparent, 
          ${index % 3 === 0 ? theme.palette.cyberpunk.neonPink : index % 3 === 1 ? theme.palette.cyberpunk.neonBlue : theme.palette.cyberpunk.neonYellow}40, 
          transparent)`,
        opacity: 0.6,
        zIndex: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          [isVertical ? 'top' : 'left']: '30%',
          [isVertical ? 'left' : 'top']: 0,
          [isVertical ? 'width' : 'height']: '100%',
          [isVertical ? 'height' : 'width']: '3px',
          background: `${index % 3 === 0 ? theme.palette.cyberpunk.neonPink : index % 3 === 1 ? theme.palette.cyberpunk.neonBlue : theme.palette.cyberpunk.neonYellow}`,
          boxShadow: `0 0 10px ${index % 3 === 0 ? theme.palette.cyberpunk.neonPink : index % 3 === 1 ? theme.palette.cyberpunk.neonBlue : theme.palette.cyberpunk.neonYellow}`,
          animation: `pulse-${index} 3s infinite ease-in-out ${index * 0.5}s`,
        },
        [`@keyframes pulse-${index}`]: {
          '0%, 100%': { opacity: 0.3, [isVertical ? 'top' : 'left']: '30%' },
          '50%': { opacity: 1, [isVertical ? 'top' : 'left']: '60%' },
        },
      }}
    />
  );
});

// Memoize the skill hexagon component
const SkillHex = memo(({ skill, index, total, onSelect, isSelected }) => {
  const theme = useTheme();
  const rowCount = Math.ceil(total / 3);
  const row = Math.floor(index / 3);
  const col = index % 3;
  
  const handleClick = useCallback(() => {
    onSelect(skill);
  }, [onSelect, skill]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
      style={{
        position: 'relative',
        margin: '15px',
        cursor: 'pointer',
        zIndex: isSelected ? 10 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '180px'
      }}
      whileHover={{ y: -5, scale: 1.03 }}
      onClick={handleClick}
    >
      {/* Connection lines */}
      {index > 0 && (
        <motion.div
          style={{
            position: 'absolute',
            top: -20,
            left: '50%',
            width: '2px',
            height: '20px',
            background: `linear-gradient(0deg, ${skill.color}, transparent)`,
            zIndex: 0,
          }}
          initial={{ height: 0 }}
          animate={{ height: 20 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
        />
      )}
      
      {/* Hexagon container */}
      <motion.div
        style={{
          position: 'relative',
          width: skill.size || 140,
          height: (skill.size || 140) * 0.87, // Height of a hexagon is ~87% of width
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
        animate={{
          boxShadow: isSelected 
            ? [
                `0 0 10px ${skill.color}80`,
                `0 0 20px ${skill.color}80`,
                `0 0 10px ${skill.color}80`
              ]
            : `0 0 5px ${skill.color}40`
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Hexagon outline */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            border: `1px solid ${skill.color}70`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '1px',
              left: '1px',
              right: '1px',
              bottom: '1px',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
              opacity: 0.9,
              zIndex: 1,
            },
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: skill.color,
              boxShadow: `0 0 15px ${skill.color}80`,
            }
          }}
        />
        
        {/* Inner content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography
            sx={{
              color: isSelected ? skill.color : 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '5px',
              userSelect: 'none',
              textShadow: isSelected ? `0 0 10px ${skill.color}` : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {skill.name}
          </Typography>
          
          {/* Decorative line */}
          <motion.div 
            style={{
              width: '60%',
              height: '2px',
              background: skill.color,
              margin: '5px 0',
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              width: ['40%', '60%', '40%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Skill level indicator dots */}
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              marginTop: '5px',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`dot-${index}-${i}`}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: i < skill.level ? skill.color : 'rgba(255, 255, 255, 0.2)',
                }}
                animate={i < skill.level ? {
                  boxShadow: [`0 0 0px ${skill.color}`, `0 0 5px ${skill.color}`, `0 0 0px ${skill.color}`]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Corner dots for decoration */}
        {[0, 1, 2, 3, 4, 5].map(corner => (
          <Box
            key={`hex-corner-${index}-${corner}`}
            sx={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: skill.color,
              boxShadow: `0 0 5px ${skill.color}`,
              zIndex: 3,
              ...(corner === 0 && { top: '0%', left: '50%', transform: 'translate(-50%, 0)' }),
              ...(corner === 1 && { top: '25%', right: '0%', transform: 'translate(0, -50%)' }),
              ...(corner === 2 && { top: '75%', right: '0%', transform: 'translate(0, -50%)' }),
              ...(corner === 3 && { bottom: '0%', left: '50%', transform: 'translate(-50%, 0)' }),
              ...(corner === 4 && { top: '75%', left: '0%', transform: 'translate(0, -50%)' }),
              ...(corner === 5 && { top: '25%', left: '0%', transform: 'translate(0, -50%)' }),
            }}
          />
        ))}
      </motion.div>
      
      {/* Skill name below hexagon */}
      <Typography
        variant="body2"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          fontSize: '0.75rem',
          maxWidth: '150px',
        }}
      >
        {skill.subtitle || ''}
      </Typography>
    </motion.div>
  );
});

// Memoize the skill details component
const SkillDetails = memo(({ skill }) => {
  const theme = useTheme();
  
  if (!skill) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          background: 'rgba(22, 0, 41, 0.8)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${skill.color}40`,
          borderLeft: `3px solid ${skill.color}`,
          borderRadius: '0',
          clipPath: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)',
          maxWidth: '800px',
          margin: '0 auto',
          mt: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${skill.color}10, transparent 70%)`,
            zIndex: 0,
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: skill.color,
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: `0 0 10px ${skill.color}40`,
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: '15px',
                height: '3px',
                backgroundColor: skill.color,
                marginRight: '10px',
                boxShadow: `0 0 5px ${skill.color}`,
              }
            }}
          >
            {skill.name}
          </Typography>
          <Typography 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              lineHeight: 1.6,
            }}
          >
            {skill.description}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              mt: 3,
            }}
          >
            {skill.technologies.map((tech) => (
              <Box
                key={tech.name}
                sx={{
                  px: 2,
                  py: 0.5,
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                  fontSize: '0.85rem',
                  border: `1px solid ${skill.color}60`,
                  backgroundColor: theme.palette.background.paper,
                  color: skill.color,
                  letterSpacing: '0.05em',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}60`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(45deg, ${skill.color}10, transparent 70%)`,
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
                  {tech.name}
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
            borderLeft: `15px solid ${skill.color}60`,
            borderBottom: `15px solid transparent`,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderRight: `15px solid ${skill.color}60`,
            borderTop: `15px solid transparent`,
            zIndex: 1,
          }}
        />
      </Paper>
    </motion.div>
  );
});

// Update with user's personal skill data organized by categories
const skillsData = [
  {
    name: 'Frontend Development',
    subtitle: '💻 User Interface',
    color: theme => theme.palette.cyberpunk.neonBlue,
    level: 90,
    size: { xs: 140, sm: 160, md: 180 },
    description: 'Creating modern, responsive, and interactive user interfaces with the latest frontend technologies.',
    technologies: [
      { name: 'React.js', level: 90, description: 'Building modern and responsive user interfaces' },
      { name: 'Next.js', level: 85, description: 'Server-side rendering and static site generation' },
      { name: 'TypeScript', level: 85, description: 'Type-safe JavaScript development' },
      { name: 'Tailwind CSS', level: 90, description: 'Utility-first CSS framework' },
      { name: 'Redux', level: 80, description: 'State management for large applications' }
    ]
  },
  {
    name: 'Backend Development',
    subtitle: '⚙️ Server-side',
    color: theme => theme.palette.cyberpunk.neonPink,
    level: 85,
    size: { xs: 140, sm: 160, md: 180 },
    description: 'Building robust, scalable server-side applications and APIs to power modern web applications.',
    technologies: [
      { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', level: 85, description: 'Web application framework' },
      { name: 'Python', level: 80, description: 'General-purpose programming' },
      { name: 'Django', level: 75, description: 'High-level Python web framework' },
      { name: 'RESTful APIs', level: 90, description: 'API design and implementation' }
    ]
  },
  {
    name: 'Database & DevOps',
    subtitle: '🗄️ Data Management',
    color: theme => theme.palette.cyberpunk.neonYellow,
    level: 80,
    size: { xs: 140, sm: 160, md: 180 },
    description: 'Storing, managing, and deploying applications with modern database and DevOps practices.',
    technologies: [
      { name: 'MongoDB', level: 85, description: 'NoSQL database management' },
      { name: 'PostgreSQL', level: 80, description: 'Relational database management' },
      { name: 'Docker', level: 75, description: 'Containerization and deployment' },
      { name: 'AWS', level: 70, description: 'Cloud infrastructure and services' },
      { name: 'CI/CD', level: 75, description: 'Automated deployment pipelines' }
    ]
  },
  {
    name: 'Tools & Others',
    subtitle: '🛠️ Development Tools',
    color: theme => theme.palette.cyberpunk.neonGreen,
    level: 85,
    size: { xs: 140, sm: 160, md: 180 },
    description: 'Utilizing modern development tools and methodologies to optimize the development workflow.',
    technologies: [
      { name: 'Git', level: 90, description: 'Version control and collaboration' },
      { name: 'Webpack', level: 75, description: 'Module bundling and optimization' },
      { name: 'Jest', level: 80, description: 'JavaScript testing framework' },
      { name: 'Figma', level: 75, description: 'UI/UX design and prototyping' },
      { name: 'Agile/Scrum', level: 85, description: 'Project management methodology' }
    ]
  }
];

// Optimize the main Skills component
const Skills = memo(() => {
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const theme = useTheme();

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
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      id="skills"
    >
      {/* Background circuit paths */}
      {[...Array(5)].map((_, i) => (
        <CircuitPath key={`circuit-${i}`} index={i} />
      ))}
      
      {/* Title with glitch effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          willChange: 'transform, opacity', 
          position: 'relative', 
          zIndex: 3,
          width: '100%',
          textAlign: 'center',
          marginBottom: '40px'
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
            Neural Network
          </Typography>
          
          {/* Glitch layers */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              color: theme.palette.secondary.main,
              position: 'absolute',
              top: '2px',
              left: '52%',
              transform: 'translateX(-50%)',
              zIndex: 9,
              opacity: 0.4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              clipPath: 'inset(0 0 0 0)',
              animation: 'glitch-title 5s infinite linear alternate-reverse',
              '@keyframes glitch-title': {
                '0%, 100%': { clipPath: 'inset(80% 0 0 0)' },
                '20%': { clipPath: 'inset(30% 0 40% 0)' },
                '41%': { clipPath: 'inset(10% 0 60% 0)' },
                '62%': { clipPath: 'inset(60% 0 10% 0)' },
                '83%': { clipPath: 'inset(0 0 80% 0)' },
              },
            }}
          >
            Neural Network
          </Typography>
          
          {/* Title decorative line */}
          <motion.div
            style={{ 
              height: '2px', 
              background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
              width: '200px',
              margin: '10px auto',
              position: 'relative',
            }}
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
            Professional Skills & Expertise
          </Typography>
        </Box>
      </motion.div>

      {/* Skills Hexagon Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
          px: { xs: 1, sm: 2, md: 3 },
          width: '100%',
        }}
      >
        {skillsData.map((skill, index) => (
          <SkillHex
            key={skill.name}
            skill={{
              ...skill,
              size: { xs: 120, sm: 130, md: 150 }[
                Object.keys({ xs: 120, sm: 130, md: 150 }).find(
                  key => window.innerWidth >= { xs: 0, sm: 600, md: 900 }[key]
                ) || 'xs'
              ]
            }}
            index={index}
            total={skillsData.length}
            onSelect={setSelectedSkill}
            isSelected={selectedSkill?.name === skill.name}
          />
        ))}
      </Box>

      {/* Skill details */}
      <AnimatePresence mode="wait">
        {selectedSkill && (
          <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto' }}>
            <SkillDetails skill={selectedSkill} />
          </Box>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '40px',
          width: '150px',
          height: '150px',
          border: `1px solid ${theme.palette.cyberpunk.neonPink}40`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40px',
          left: '100px',
          width: '100px',
          height: '100px',
          border: `1px solid ${theme.palette.cyberpunk.neonBlue}40`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
    </Container>
  );
});

export default Skills;