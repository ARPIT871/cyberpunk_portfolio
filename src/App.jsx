import React from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Timeline from './components/Timeline/Timeline';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import CyberpunkBackground from './components/common/SpaceBackground';
import ChatBot from './components/common/ChatBot';

// Create cyberpunk theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0055', // Cyberpunk main pink/red
      light: '#FF2975',
      dark: '#CC003E',
    },
    secondary: {
      main: '#00FFFF', // Cyberpunk cyan
      light: '#50FFFF',
      dark: '#00C8C8',
    },
    cyberpunk: {
      neonYellow: '#FFFC00',
      neonPink: '#FF2975',
      neonBlue: '#00FFFF',
      neonGreen: '#00FF41',
      electric: '#0EF6CC',
      darkPurple: '#160029',
      mutedPurple: '#290052',
      blackBlue: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#0D0221',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C6C6C6',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Orbitron", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '0.03em',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    },
    h4: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    body1: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
    },
    button: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#FF0055',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00FFFF',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.05em',
          boxShadow: '0 0 10px rgba(255, 0, 85, 0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 15px rgba(255, 0, 85, 0.7)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, rgba(255, 0, 85, 0.05), rgba(0, 255, 255, 0.05))',
          borderRadius: 0,
          border: '1px solid rgba(255, 0, 85, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(13, 2, 33, 0.7)',
            zIndex: -1,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000000',
        overflowX: 'hidden',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(45deg, rgba(255, 0, 85, 0.03), rgba(0, 255, 255, 0.03))',
          zIndex: 0,
        },
      }}>
        {/* Global Cyberpunk Background */}
        <CyberpunkBackground />

        {/* Scanlines Overlay */}
        <Box 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: 0.15,
          }}
        />

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            position: 'relative', 
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden',
            '& > *': {
              flexShrink: 0,
              position: 'relative',
              width: '100%',
            }
          }}
        >
          {/* Hero Section */}
          <Hero />

          {/* Timeline Section */}
          <Timeline />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Contact Section */}
          <Contact />
          
          {/* Chatbot Component */}
          <ChatBot />
          
          {/* Footer Note - Simple responsive footer */}
          <Box 
            component="footer"
            sx={{ 
              py: { xs: 3, sm: 4 },
              px: { xs: 2, sm: 3 },
              textAlign: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(0, 0, 0, 0.7)',
              marginTop: 'auto',
            }}
          >
            <Typography 
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: '"Rajdhani", sans-serif',
                letterSpacing: '0.05em',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
              }}
            >
              © {new Date().getFullYear()} Cyberpunk Portfolio. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
