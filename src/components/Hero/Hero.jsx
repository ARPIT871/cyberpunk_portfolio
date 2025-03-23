import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Timeline from "../Timeline/Timeline";
import Skills from "../Skills/Skills";

// Optimize ChatMessage with memo
const ChatMessage = memo(({ message, isUser, animate = true }) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.3 }}
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "80%",
        marginBottom: "8px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: 2,
          backgroundColor: isUser ? "rgba(60, 187, 254, 0.15)" : "rgba(30, 30, 30, 0.6)",
          boxShadow: isUser
            ? "0 2px 10px rgba(60, 187, 254, 0.2)"
            : "0 2px 10px rgba(0, 0, 0, 0.2)",
          borderLeft: isUser ? "none" : "2px solid #FF0055",
          borderRight: isUser ? "2px solid #00FFFF" : "none",
          backdropFilter: "blur(10px)",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
          wordBreak: "break-word",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: isUser ? "text.primary" : "#FFFFFF",
            fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            lineHeight: 1.5,
          }}
        >
          {message}
        </Typography>
      </Paper>
    </motion.div>
  );
});

// Animated decorative elements
const DecorativeCircle = ({ delay, size, x, y, color }) => (
  <motion.div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      position: "absolute",
      top: y,
      left: x,
      filter: "blur(1px)",
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.6, 0.4],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
    }}
  />
);

const FloatingElement = ({ children, delay }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Update the TypewriterText component with enhanced styling
const TypewriterText = memo(({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Random glitch effect
        if (Math.random() > 0.7) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 150);
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [text, currentIndex]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      textAlign: 'center', 
      mb: 2,
      // Set a fixed height to prevent layout shifts
      height: { xs: '140px', sm: '170px', md: '190px' }, // Reduced height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Data circuit lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '30px',
          background: 'linear-gradient(to top, #FF2975, transparent)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-5px',
            width: '12px',
            height: '12px',
            background: 'transparent',
            border: '2px solid #FF2975',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }
        }}
      />
      
      {/* Main text with cyberpunk styling */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontWeight: 900,
          fontFamily: '"Orbitron", sans-serif',
          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' }, // Further reduced
          background: 'linear-gradient(45deg, #FF2975 20%, #00FFFF 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(255, 41, 117, 0.7)',
          letterSpacing: '0.05em',
          position: 'relative',
          zIndex: 2,
          textTransform: 'uppercase',
          filter: glitchActive ? 'blur(3px)' : 'none',
          transform: glitchActive ? 'skew(-5deg)' : 'skew(0)',
          transition: 'filter 0.1s, transform 0.1s',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, #FF2975 20%, #00FFFF 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'blur(20px)',
            opacity: 0.7,
            zIndex: 1,
          },
          '&::after': {
            content: glitchActive ? '"CY·BER·SPACE"' : '""',
            position: 'absolute',
            top: '3px',
            left: '-3px',
            color: '#00FFFF',
            WebkitTextFillColor: '#00FFFF',
            opacity: 0.7,
            zIndex: -1,
            clipPath: 'inset(10% 0% 50% 0%)',
          }
        }}
      >
        {displayText}
        <motion.span
          animate={{ 
            opacity: [1, 0, 1],
            height: ['1em', '1.2em', '1em']
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ 
            display: 'inline-block',
            marginLeft: '4px',
            WebkitTextFillColor: '#00FFFF',
            textShadow: '0 0 10px #00FFFF',
            width: '5px'
          }}
        >
          |
        </motion.span>
      </Typography>

      {/* Decorative elements - in a fixed position container */}
      <Box sx={{ 
        position: 'relative', 
        height: '60px', 
        width: '100%',
        mt: 1 
      }}>
        {/* All decorative elements contained here */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Decorative scanline */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: currentIndex === text.length ? '250px' : '0px',
              opacity: currentIndex === text.length ? [0.7, 1, 0.7] : 0
            }}
            transition={{ 
              width: { duration: 0.5, delay: 0.2 },
              opacity: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
            }}
            style={{
              position: 'absolute',
              top: '5px',
              height: '1px',
              background: '#00FFFF',
              borderRadius: '1px',
              boxShadow: '0 0 10px #00FFFF',
              willChange: 'width, opacity',
            }}
          />
          
          {/* Central diamond */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: currentIndex === text.length ? 1 : 0,
              opacity: currentIndex === text.length ? [0.7, 1, 0.7] : 0
            }}
            transition={{ 
              scale: { duration: 0.3, delay: 0.3 },
              opacity: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
            }}
            style={{
              position: 'absolute',
              top: '0',
              width: '10px',
              height: '10px',
              background: '#00FFFF',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 15px #00FFFF',
              willChange: 'transform, opacity',
            }}
          />
          
          {/* Left line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: currentIndex === text.length ? '120px' : '0px',
              opacity: currentIndex === text.length ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{
              position: 'absolute',
              top: '5px',
              left: '50%',
              marginLeft: '-150px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #FF2975)',
              willChange: 'width, opacity',
            }}
          />
          
          {/* Right line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: currentIndex === text.length ? '120px' : '0px',
              opacity: currentIndex === text.length ? 1 : 0
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{
              position: 'absolute',
              top: '5px',
              right: '50%',
              marginRight: '-150px',
              height: '1px',
              background: 'linear-gradient(to left, transparent, #FF2975)',
              willChange: 'width, opacity',
            }}
          />
        </Box>
        
        {/* Subtitle - with fixed positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentIndex === text.length ? 1 : 0
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ 
            position: 'absolute',
            left: 0,
            right: 0,
            top: '30px',
            textAlign: 'center',
            height: '30px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(0, 255, 255, 0.9)',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
              fontFamily: '"Rajdhani", sans-serif',
              position: 'relative',
            }}
          >
            Neural Interface Connected
          </Typography>
        </motion.div>
      </Box>

      {/* Background glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(255, 41, 117, 0.1) 0%, rgba(0, 255, 255, 0.05) 30%, transparent 60%)',
          filter: 'blur(30px)',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </Box>
  );
});

// Optimize BotCharacter with memo and reduced animations
export const BotCharacter = memo(({ animated = true, scale = 1, onClick }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [expression, setExpression] = useState("normal");
  const [botMessage, setBotMessage] = useState("Hi! I'm Arpit's digital twin. Click me to chat!");
  
  // Random messages to display in the thinking box
  const randomMessages = [
    "Hi! I'm Arpit's digital twin. Click me to chat!",
    "Want to know about my skills? Ask me!",
    "Check out my cool projects! Click to chat!",
    "I'm flirty & funny, just like the real Arpit!",
    "Need a React developer? I'm your guy!",
    "I'm powered by Gemini AI! Click to chat with me!"
  ];

  useEffect(() => {
    // Simplified blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    // Simplified expressions
    const expressionInterval = setInterval(() => {
      const expressions = ["happy", "normal", "surprised"];
      setExpression(
        expressions[Math.floor(Math.random() * expressions.length)]
      );
    }, 5000);
    
    // Change bot message periodically
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      setBotMessage(randomMessages[randomIndex]);
    }, 8000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(expressionInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const getMouthStyle = () => {
    switch (expression) {
      case "happy":
        return {
          width: "45px",
          height: "20px",
          borderBottom: "4px solid white",
          borderRadius: "50%",
          transform: "translateY(-5px)",
        };
      case "sad":
        return {
          width: "35px",
          height: "15px",
          borderTop: "4px solid white",
          borderRadius: "50%",
          transform: "translateY(5px)",
        };
      case "confused":
        return {
          width: "35px",
          height: "4px",
          background: "white",
          borderRadius: "10px",
          transform: "rotate(-10deg)",
        };
      case "angry":
        return {
          width: "40px",
          height: "8px",
          background: "white",
          borderRadius: "10px",
          transform: "translateY(5px) rotate(-15deg)",
        };
      case "love":
        return {
          width: "40px",
          height: "25px",
          borderBottom: "4px solid white",
          borderRadius: "50%",
          transform: "translateY(-8px) scaleX(0.9)",
        };
      case "surprised":
        return {
          width: "25px",
          height: "25px",
          border: "4px solid white",
          borderRadius: "50%",
          transform: "translateY(0px)",
        };
      default:
        return {
          width: "35px",
          height: "4px",
          background: "white",
          borderRadius: "10px",
        };
    }
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: `${250 * scale}px`,
        height: `${350 * scale}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
      }}
      animate={animated ? {
        x: 0,
        y: 0,
      } : {}}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
        mass: 1,
        duration: 2,
      }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      {/* Thinking Box */}
      {expression === "normal" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          style={{
            position: "absolute",
            top: "130px",
            right: "-5px",
            background: "white",
            padding: "8px 12px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            minWidth: "80px",
            maxWidth: "200px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#985EFF",
              fontWeight: "bold",
            }}
          >
            {botMessage}
          </div>
          {/* Triangle pointer */}
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </motion.div>
      )}

      {/* Bot Shadow */}
      <motion.div
        style={{
          position: "absolute",
          width: `${120 * scale}px`,
          height: `${15 * scale}px`,
          background: "rgba(0, 0, 0, 0.15)",
          borderRadius: "50%",
          bottom: `${50 * scale}px`,
          filter: "blur(8px)",
          transform: "translateX(-50%)",
          left: "50%",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Bot Body */}
      <motion.div
        style={{
          position: "absolute",
          width: `${160 * scale}px`,
          height: `${160 * scale}px`,
          background: "linear-gradient(135deg, #BB86FC, #985EFF)",
          borderRadius: "50%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 8px 32px rgba(187, 134, 252, 0.3)",
        }}
        animate={animated ? {
          y: [-10, 10, -10],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Face */}
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Eyes */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "-10px",
            }}
          >
            {/* Left Eye */}
            <motion.div
              style={{
                position: "relative",
                width: `${24 * scale}px`,
                height: `${24 * scale}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                animate={{
                  height: isBlinking ? `${2 * scale}px` : `${24 * scale}px`,
                  marginTop: isBlinking ? `${11 * scale}px` : "0px",
                }}
                transition={{
                  duration: 0.1,
                }}
                style={{
                  width: `${12 * scale}px`,
                  background: "white",
                  borderRadius: "20px",
                  transform: "translate(0px, 0px)",
                  transition: "transform 0.3s ease-out",
                }}
              />
            </motion.div>

            {/* Right Eye */}
            <motion.div
              style={{
                position: "relative",
                width: `${24 * scale}px`,
                height: `${24 * scale}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                animate={{
                  height: isBlinking ? `${2 * scale}px` : `${24 * scale}px`,
                  marginTop: isBlinking ? `${11 * scale}px` : "0px",
                }}
                transition={{
                  duration: 0.1,
                }}
                style={{
                  width: `${12 * scale}px`,
                  background: "white",
                  borderRadius: "20px",
                  transform: "translate(0px, 0px)",
                  transition: "transform 0.3s ease-out",
                }}
              />
            </motion.div>
          </div>

          {/* Mouth */}
          <motion.div
            style={{
              ...getMouthStyle(),
              width: `${parseInt(getMouthStyle().width) * scale}px`,
              height: getMouthStyle().height 
                ? `${parseInt(getMouthStyle().height) * scale}px` 
                : getMouthStyle().height,
              borderBottom: getMouthStyle().borderBottom 
                ? `${parseInt(getMouthStyle().borderBottom) * scale}px solid white` 
                : getMouthStyle().borderBottom,
              borderTop: getMouthStyle().borderTop 
                ? `${parseInt(getMouthStyle().borderTop) * scale}px solid white` 
                : getMouthStyle().borderTop,
              background: getMouthStyle().background,
              borderRadius: getMouthStyle().borderRadius,
              transform: getMouthStyle().transform
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const timelineRef = useRef(null);
  const [activeTab, setActiveTab] = useState('about');
  
  // Handle bot click to open chat
  const handleBotClick = () => {
    // This will be handled by the ChatBot component which listens to this state
    window.dispatchEvent(new CustomEvent('openAIChat'));
  };

  // Optimize scroll handler with throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          // Determine which section is in view
          const heroHeight = window.innerHeight;
          if (scrollY < heroHeight * 0.7) {
            setActiveSection("hero");
          } else if (timelineRef.current) {
            const timelineRect = timelineRef.current.getBoundingClientRect();
            if (timelineRect.top < 300 && timelineRect.bottom > 0) {
              setActiveSection("timeline");
            } else {
              setActiveSection("other");
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Get reference to the timeline section
    timelineRef.current = document.getElementById("timeline");
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Personal stats to display instead of tech skills
  const personalStats = [
    { label: "Experience", value: "1+ Years", icon: "⌛", color: "#FF2975" },
    { label: "Projects", value: "20+", icon: "🚀", color: "#00FFFF" },
    { label: "Satisfaction", value: "100%", icon: "⭐", color: "#4CEF8C" },
    { label: "Coffee", value: "∞", icon: "☕", color: "#FFC837" }
  ];

  // Key achievements to display in the rotating display
  const keyAchievements = [
    "Created cutting-edge web applications with React",
    "Optimized performance for 50+ client websites",
    "Developed robust backend systems with Node.js",
    "Collaborated with teams across 3 continents",
    "Reduced loading times by 40% using code splitting"
  ];

  // Reduce number of background stars and planets
  const numStars = 50; // Reduced from 100
  const numPlanets = 2; // Reduced from 3

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        pt: { xs: 12, sm: 16, md: 20 },
        pb: { xs: 8, sm: 10, md: 12 },
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 },
        overflowX: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Cyberpunk Navigation */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '20px', md: '40px' },
          right: { xs: '16px', md: '30px' },
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 0.5, md: 0.75 },
        }}
      >
        {/* Circuit decoration elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-5px',
            right: '-15px',
            width: '120px',
            height: '300px',
            pointerEvents: 'none',
            zIndex: -1,
            opacity: 0.4,
            background: `
              linear-gradient(90deg, transparent 49%, rgba(0, 255, 255, 0.2) 50%, transparent 51%) 0 0 / 10px 1px,
              linear-gradient(0deg, transparent 49%, rgba(255, 41, 117, 0.2) 50%, transparent 51%) 0 0 / 1px 10px
            `,
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '30px',
            height: '30px',
            border: '1px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '5px',
            pointerEvents: 'none',
            zIndex: -1,
          }}
          animate={{
            rotate: 360,
            borderColor: ['rgba(0, 255, 255, 0.5)', 'rgba(255, 41, 117, 0.5)', 'rgba(0, 255, 255, 0.5)']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {['Timeline', 'Projects', 'Skills', 'Contact'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Box
              component="a"
              href={`#${item.toLowerCase()}`}
              sx={{
                position: 'relative',
                padding: { xs: '5px 8px', md: '6px 10px' },
                backgroundColor: 'rgba(13, 2, 33, 0.85)',
                color: '#fff',
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                borderLeft: '1px solid #00FFFF',
                borderBottom: '1px solid #FF2975',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                width: { xs: '80px', sm: '90px', md: '100px' },
                '&:hover': {
                  backgroundColor: 'rgba(21, 0, 50, 0.95)',
                  color: '#00FFFF',
                  transform: 'translateX(-2px)',
                  width: { xs: '90px', sm: '100px', md: '110px' },
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)',
                  borderLeft: '1px solid #00FFFF',
                  borderBottom: '1px solid #FF2975',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent 20%, rgba(0, 255, 255, 0.08) 40%, transparent 90%)',
                  clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  zIndex: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  width: 'calc(100% - 4px)',
                  height: 'calc(100% - 4px)',
                  background: 'linear-gradient(135deg, rgba(255, 41, 117, 0.08), transparent 70%)',
                  clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  zIndex: -1,
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'right' }}>
                {/* Actual text */}
                {item}
                
                {/* Data bit dot */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    left: '2px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: index % 2 === 0 ? '#00FFFF' : '#FF2975',
                    boxShadow: `0 0 5px ${index % 2 === 0 ? '#00FFFF' : '#FF2975'}`,
                  }}
                />
              </Box>
              
              {/* Scanning effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.15), transparent)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.3,
                }}
              />
              
              {/* Bottom glowing line */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '5%',
                  width: '90%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #FF2975, transparent)',
                  zIndex: 2,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            </Box>
          </motion.div>
        ))}
        
        {/* Status indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-12px', md: '-15px' },
            right: { xs: '10px', md: '15px' },
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: { xs: '0.55rem', md: '0.6rem' },
            color: '#00FFFF',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00FF66',
              boxShadow: '0 0 8px #00FF66',
            }}
          />
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            sys.online
          </motion.span>
        </Box>
      </Box>

      {/* Title with Typewriter Effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          width: '100%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          marginTop: '4rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <TypewriterText text="Arpit Rajput" />
        </Box>
      </motion.div>

      {/* Hero Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: { xs: 4, md: 6 },
          mt: { xs: 4, md: 6 },
        }}
      >
        {/* Holographic Profile Card - Replacing the tech stack */}
        <Box
          sx={{
            flex: { xs: 1, md: 1 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: { xs: '95%', sm: '85%', md: '750px' },
            mx: 'auto',
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            sx={{
              width: '100%',
              mx: 'auto',
              p: { xs: 2, sm: 2.5, md: 3 },
              bgcolor: 'rgba(13, 2, 33, 0.85)',
              borderRadius: 2,
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(60, 187, 254, 0.3)',
              border: '1px solid rgba(60, 187, 254, 0.2)',
              backdropFilter: 'blur(15px)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.55), 0 0 25px rgba(60, 187, 254, 0.4)',
                borderColor: 'rgba(60, 187, 254, 0.3)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(60, 187, 254, 0.8), transparent)',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 41, 117, 0.8), transparent)',
                zIndex: 1,
              }
            }}
          >
            {/* Scanner effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, transparent, rgba(60, 187, 254, 0.05), transparent)',
                zIndex: 0,
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Hologram grid pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.05,
                backgroundImage: `
                  linear-gradient(0deg, transparent 24%, rgba(60, 187, 254, 0.5) 25%, rgba(60, 187, 254, 0.5) 26%, transparent 27%, transparent 74%, rgba(60, 187, 254, 0.5) 75%, rgba(60, 187, 254, 0.5) 76%, transparent 77%, transparent),
                  linear-gradient(90deg, transparent 24%, rgba(60, 187, 254, 0.5) 25%, rgba(60, 187, 254, 0.5) 26%, transparent 27%, transparent 74%, rgba(60, 187, 254, 0.5) 75%, rgba(60, 187, 254, 0.5) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '50px 50px',
                zIndex: 0,
              }}
            />
            
            {/* Content tabs */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              {/* Cyberpunk City Skyline */}
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#FFFFFF',
                    fontFamily: '"Rajdhani", sans-serif',
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                  }}
                >
                  Full-Stack Developer
                </Typography>
                        
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                    lineHeight: 1.5,
                    textAlign: 'center',
                  }}
                >
                  Passionate developer creating exceptional digital experiences. Specialized in React, Node.js and modern web technologies.
                </Typography>
                
                {/* Cyberpunk City Skyline */}
                <Box 
                  sx={{
                    width: '100%',
                    height: '180px',
                    position: 'relative',
                    mt: 2,
                    overflow: 'hidden',
                    borderRadius: '4px',
                    border: '1px solid rgba(60, 187, 254, 0.3)',
                  }}
                >
                  {/* Background night sky gradient */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, #050023 0%, #1a0b2e 40%, #261a45 100%)',
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Stars in the sky */}
                  {[...Array(50)].map((_, i) => (
                    <Box
                      key={`star-${i}`}
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        width: Math.random() * 2 + 1,
                        height: Math.random() * 2 + 1,
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        zIndex: 2,
                        top: `${Math.random() * 40}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                  
                  {/* Moon */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      top: '15%',
                      right: '15%',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.9), rgba(250, 250, 210, 0.8))',
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                      zIndex: 2,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.5)',
                        '0 0 25px rgba(255, 255, 255, 0.7)',
                        '0 0 20px rgba(255, 255, 255, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Building 1 - Tallest cyberpunk tower */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: '25%',
                      width: '40px',
                      height: '150px',
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), #160029)',
                      clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
                      zIndex: 3,
                      transformOrigin: 'bottom',
                      borderTop: '1px solid rgba(60, 187, 254, 0.3)',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {/* Building windows */}
                    {[...Array(10)].map((_, i) => (
                      <Box
                        key={`b1-window-${i}`}
                        component={motion.div}
                        sx={{
                          position: 'absolute',
                          width: '4px',
                          height: '4px',
                          backgroundColor: Math.random() > 0.3 ? '#00FFFF' : '#FF2975',
                          left: `${10 + Math.random() * 20}px`,
                          top: `${15 + i * 12}px`,
                          opacity: Math.random() > 0.3 ? 1 : 0.7,
                        }}
                        animate={{
                          opacity: Math.random() > 0.7 ? [0.7, 1, 0.7] : 'inherit',
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                    {/* Top antenna */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1px',
                        height: '15px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <Box
                        component={motion.div}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: '#FF2975',
                          boxShadow: '0 0 5px #FF2975',
                        }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </Box>
                  </Box>
                  
                  {/* Building 2 - Wide corporate building */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: '40%',
                      width: '80px',
                      height: '100px',
                      background: 'linear-gradient(to bottom, #160029, #0d0221)',
                      zIndex: 3,
                      transformOrigin: 'bottom',
                      borderTop: '1px solid rgba(60, 187, 254, 0.3)',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {/* Building grid of windows */}
                    <Box sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '5px',
                      width: '70px',
                      height: '80px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gridTemplateRows: 'repeat(8, 1fr)',
                      gap: '3px',
                    }}>
                      {[...Array(56)].map((_, i) => (
                        <Box
                          key={`b2-window-${i}`}
                          component={motion.div}
                          sx={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.8)' : 'transparent',
                            opacity: Math.random() * 0.7 + 0.3,
                          }}
                          animate={Math.random() > 0.7 ? {
                            opacity: [0.3, 0.8, 0.3],
                          } : {}}
                          transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                          }}
                        />
                      ))}
                    </Box>
                    {/* Company logo/hologram */}
                    <Box
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        top: '-15px',
                        left: '40px',
                        width: '30px',
                        height: '15px',
                        borderRadius: '50%',
                        background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.2))',
                        filter: 'blur(2px)',
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        height: ['15px', '20px', '15px'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Box>
                  
                  {/* Building 3 - Slim neon cyberpunk tower */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: '30%',
                      width: '30px',
                      height: '130px',
                      background: 'linear-gradient(to bottom, #290052, #0D0221)',
                      zIndex: 3,
                      transformOrigin: 'bottom',
                      borderRight: '1px solid rgba(255, 41, 117, 0.5)',
                      clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                  >
                    {/* Vertical neon strip */}
                    <Box
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: '10px',
                        width: '2px',
                        height: '100px',
                        background: 'linear-gradient(to bottom, #FF2975, transparent)',
                        boxShadow: '0 0 8px #FF2975',
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        boxShadow: [
                          '0 0 8px #FF2975',
                          '0 0 12px #FF2975',
                          '0 0 8px #FF2975',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Scattered windows */}
                    {[...Array(8)].map((_, i) => (
                      <Box
                        key={`b3-window-${i}`}
                        sx={{
                          position: 'absolute',
                          width: '3px',
                          height: '3px',
                          backgroundColor: '#FFFC00',
                          left: `${Math.random() * 20}px`,
                          top: `${20 + i * 13}px`,
                          opacity: Math.random() > 0.5 ? 1 : 0.6,
                        }}
                      />
                    ))}
                  </Box>
                  
                  {/* Building 4 - Short retail/entertainment district */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: '10%',
                      width: '100px',
                      height: '60px',
                      background: '#0D0221',
                      zIndex: 3,
                      transformOrigin: 'bottom',
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    {/* Neon signs */}
                    <Box
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '20px',
                        width: '30px',
                        height: '10px',
                        borderRadius: '1px',
                        border: '1px solid #00FFFF',
                        boxShadow: '0 0 8px #00FFFF',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 8px #00FFFF',
                          '0 0 12px #00FFFF',
                          '0 0 8px #00FFFF',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <Box
                      component={motion.div}
                      sx={{
                        position: 'absolute',
                        top: '30px',
                        left: '60px',
                        width: '20px',
                        height: '8px',
                        borderRadius: '1px',
                        border: '1px solid #FF2975',
                        boxShadow: '0 0 6px #FF2975',
                      }}
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Box>
                  
                  {/* Foreground extra small buildings */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '30px',
                      zIndex: 4,
                      backgroundImage: `repeating-linear-gradient(90deg, 
                        #0D0221, #0D0221 5px, 
                        #160029 5px, #160029 10px,
                        #0D0221 10px, #0D0221 15px,
                        #290052 15px, #290052 20px)`,
                      clipPath: 'polygon(0% 0%, 5% 40%, 10% 20%, 15% 50%, 20% 10%, 25% 30%, 30% 0%, 35% 40%, 40% 20%, 45% 35%, 50% 0%, 55% 25%, 60% 10%, 65% 50%, 70% 30%, 75% 0%, 80% 40%, 85% 25%, 90% 50%, 95% 0%, 100% 30%, 100% 100%, 0% 100%)',
                    }}
                  />
                  
                  {/* Flying vehicles */}
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      top: '40%',
                      left: '-20px',
                      width: '8px',
                      height: '3px',
                      backgroundColor: '#FF2975',
                      zIndex: 3,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '-8px',
                        width: '8px',
                        height: '3px',
                        background: 'linear-gradient(to left, transparent, #FF2975)',
                      }
                    }}
                    animate={{
                      x: ['0vw', '110vw'],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Box
                    component={motion.div}
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      right: '-10px',
                      width: '6px',
                      height: '2px',
                      backgroundColor: '#00FFFF',
                      zIndex: 3,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: '-6px',
                        width: '6px',
                        height: '2px',
                        background: 'linear-gradient(to right, transparent, #00FFFF)',
                      }
                    }}
                    animate={{
                      x: ['0vw', '-110vw'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            
            {/* Stats grid below the skyline */}
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: 2,
                mt: 1,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {personalStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: 1,
                      border: `1px solid ${stat.color}50`,
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: `0 0 15px ${stat.color}30`,
                        '& .stat-icon': {
                          transform: 'scale(1.2) translateY(-2px)',
                          opacity: 0.9,
                        },
                        '& .stat-value': {
                          color: stat.color,
                        }
                      }
                    }}
                  >
                    <Box className="stat-icon" sx={{ 
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                      mb: 0.5,
                      transition: 'all 0.3s ease',
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      className="stat-value"
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1.1rem' },
                        fontWeight: 700,
                        color: '#FFFFFF',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                        color: 'rgba(255, 255, 255, 0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {stat.label}
                    </Typography>
                    
                    {/* Background glow */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                        opacity: 0.7,
                      }}
                    />
                  </Box>
                </motion.div>
              ))}
            </Box>
            
            {/* Footer with CTA */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  fontStyle: 'italic',
                }}
              >
                Click the robot to chat with me about my skills & projects
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right side with bot character and spaceship */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: { xs: "220px", sm: "280px", md: "320px" },
            width: { xs: "280px", sm: "350px", md: "450px" },
            mt: { xs: -2, md: 0 }, 
          }}
        >
          {/* Bot Character */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "70px", sm: "90px", md: "110px" },
              left: "0%",
              transform: "translateX(-50%)",
              width: { xs: "100px", sm: "120px", md: "140px" },
              height: { xs: "100px", sm: "120px", md: "140px" },
              zIndex: 3,
            }}
          >
            <motion.div
              style={{
                position: "relative",
                zIndex: 2,
              }}
              animate={{
                scale: scrollY > window.innerHeight * 0.3 ? [1, 0] : 1,
                y: scrollY > window.innerHeight * 0.3 ? [0, 100] : 0,
                opacity: scrollY > window.innerHeight * 0.3 ? [1, 0] : 1,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <BotCharacter onClick={handleBotClick} />
            </motion.div>
          </Box>

          {/* Spaceship */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: { xs: "40px", sm: "50px", md: "500px" },
              ml: { xs: "-100px", sm: "-1000px", md: "-800px" },
            }}
          >
            <motion.div
              style={{
                position: "relative",
                width: "300px",
                height: "220px",
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-1, 1, -1],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              {/* Spaceship Body */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  width: "240px",
                  height: "90px",
                  background: "linear-gradient(135deg, #BB86FC, #985EFF)",
                  borderRadius: "100px 100px 20px 20px",
                  left: "30px",
                  boxShadow: "0 10px 25px rgba(187, 134, 252, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  overflow: "hidden",
                }}
              >
                {/* Body shine effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "40px",
                    width: "160px",
                    height: "60px",
                    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))",
                    borderRadius: "50%",
                    transform: "rotate(-10deg)",
                    opacity: 0.4,
                  }}
                />

                {/* Detail lines */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "40px",
                    width: "160px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "25px",
                    left: "60px",
                    width: "120px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "35px",
                    left: "80px",
                    width: "80px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "1px",
                  }}
                />
              </motion.div>
              
              {/* Top Fin */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "130px",
                  left: "125px",
                  width: "50px",
                  height: "30px",
                  background: "linear-gradient(180deg, #BB86FC, #985EFF)",
                  borderRadius: "50% 50% 0 0",
                  boxShadow: "0 0 15px rgba(187, 134, 252, 0.4)",
                  zIndex: -1,
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              />
              
              {/* Antenna */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "160px",
                  left: "150px",
                  width: "2px",
                  height: "25px",
                  background: "rgba(255, 255, 255, 0.8)",
                  zIndex: -1,
                }}
              >
                {/* Antenna top */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "-4px",
                    left: "-2px",
                    width: "6px",
                    height: "6px",
                    background: "#FF9D00",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(255, 157, 0, 0.8)",
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              
              {/* Cockpit/Dome - Enhanced */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "95px",
                  left: "115px",
                  width: "70px",
                  height: "55px",
                  background: "rgba(60, 187, 254, 0.3)",
                  borderRadius: "50% 50% 0 0",
                  boxShadow: "0 0 20px rgba(60, 187, 254, 0.3)",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {/* Cockpit reflections */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(60, 187, 254, 0.2))",
                    opacity: 0.6,
                  }}
                  animate={{
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                {/* Cockpit interior details */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "1px",
                    background: "rgba(255, 255, 255, 0.6)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30px",
                    height: "1px",
                    background: "rgba(255, 255, 255, 0.4)",
                  }}
                />
                
                {/* Pilot silhouette */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "25px",
                    background: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                
                {/* Control panel lights */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`control-${i}`}
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: 25 + (i * 10),
                      width: "3px",
                      height: "3px",
                      background: i % 3 === 0 ? "#FF9D00" : i % 2 === 0 ? "#00FF00" : "#FF2D00",
                      borderRadius: "50%",
                      boxShadow: `0 0 4px ${i % 3 === 0 ? "rgba(255, 157, 0, 0.8)" : i % 2 === 0 ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 45, 0, 0.8)"}`,
                    }}
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Wings */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  left: "20px",
                  width: "100px",
                  height: "40px",
                  background: "linear-gradient(to bottom, #3CBBFE, #0066CC)",
                  borderRadius: "10px 0 20px 20px",
                  transform: "skewX(-15deg)",
                  boxShadow: "0 5px 15px rgba(60, 187, 254, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                {/* Wing detail */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    width: "60px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.7)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    right: "30px",
                    width: "40px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.4)",
                  }}
                />
              </motion.div>
              
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  right: "20px",
                  width: "100px",
                  height: "40px",
                  background: "linear-gradient(to bottom, #3CBBFE, #0066CC)",
                  borderRadius: "0 10px 20px 20px",
                  transform: "skewX(15deg)",
                  boxShadow: "0 5px 15px rgba(60, 187, 254, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                {/* Wing detail */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "20px",
                    width: "60px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.7)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    left: "30px",
                    width: "40px",
                    height: "2px",
                    background: "rgba(255, 255, 255, 0.4)",
                  }}
                />
              </motion.div>
              
              {/* Engine Glow - Enhanced */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "45px",
                  left: "95px",
                  width: "110px",
                  height: "20px",
                  background: "linear-gradient(to right, rgba(255, 157, 0, 0), rgba(255, 157, 0, 0.8), rgba(255, 157, 0, 0))",
                  borderRadius: "0 0 10px 10px",
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  width: ["100px", "120px", "100px"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`engine-${i}`}
                  style={{
                    position: "absolute",
                    bottom: "45px",
                    left: 105 + (i * 25),
                    width: "20px",
                    height: "15px",
                    background: "#FF9D00",
                    borderRadius: "0 0 10px 10px",
                    filter: "blur(3px)",
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    height: ["15px", "25px", "15px"],
                    background: [
                      "#FF9D00",
                      "#FFC837",
                      "#FF9D00",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
              
              {/* Small Details: Lights */}
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={`light-${i}`}
                  style={{
                    position: "absolute",
                    top: i < 4 ? "70px" : "80px",
                    left: 50 + (i * 30),
                    width: i % 2 === 0 ? "4px" : "3px",
                    height: i % 2 === 0 ? "4px" : "3px",
                    background: i % 3 === 0 ? "#FF9D00" : "white",
                    borderRadius: "50%",
                    boxShadow: `0 0 8px ${i % 3 === 0 ? "rgba(255, 157, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"}`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              
              {/* Clean engine trail effect */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "45px",
                  left: "55px",
                  width: "35px",
                  height: "4px",
                  background: "linear-gradient(to left, rgba(255, 157, 0, 0.7), rgba(255, 157, 0, 0))",
                  zIndex: -2,
                }}
                animate={{
                  width: ["35px", "65px", "35px"],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Particle effects - better controlled */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  style={{
                    position: "absolute",
                    left: 120 + Math.random() * 40,
                    bottom: 44 + (Math.random() * 4 - 2),
                    width: 1 + Math.random() * 2,
                    height: 1 + Math.random() * 2,
                    background: i % 2 === 0 ? "#FF9D00" : "#FFD700",
                    borderRadius: "50%",
                    zIndex: -2,
                  }}
                  animate={{
                    x: [0, -50 - Math.random() * 30],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
              
              {/* Space background glow */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "280px",
                  height: "180px",
                  background: "radial-gradient(ellipse at center, rgba(187, 134, 252, 0.03) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: -3,
                }}
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* Floating Bot Character that appears when scrolling to timeline */}
      <AnimatePresence>
        {activeSection === "timeline" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              duration: 0.5, 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{ 
              position: 'fixed',
              bottom: '100px',
              right: '50px',
              zIndex: 100,
              pointerEvents: 'auto',
            }}
          >
            <Box sx={{ transform: 'scale(0.7)' }}>
              <BotCharacter onClick={handleBotClick} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Hero;
