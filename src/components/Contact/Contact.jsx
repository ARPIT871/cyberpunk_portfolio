import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  useTheme,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';

// Memoized ContactForm component
const ContactForm = memo(({ onSubmit }) => {
  const theme = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focused, setFocused] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };
  
  const renderGlitchLine = (index) => (
    <motion.div
      key={`glitch-${index}`}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '1px',
        background: theme.palette.cyberpunk.neonBlue,
        zIndex: 1,
        top: `${Math.random() * 100}%`,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.7, 0],
        scaleX: [0, 1, 0],
        left: ['0%', `${Math.random() * 30}%`, '0%']
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 5,
      }}
    />
  );
  
  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={handleSubmit}
      sx={{
        position: 'relative',
        background: 'rgba(13, 2, 33, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.cyberpunk.neonBlue}50`,
        p: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.cyberpunk.neonBlue}10, transparent 50%)`,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '60px',
          height: '60px',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          background: theme.palette.cyberpunk.neonBlue,
          opacity: 0.2,
          zIndex: 0,
        }
      }}
    >
      {/* Glitch effect lines */}
      {[...Array(3)].map((_, i) => renderGlitchLine(i))}
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NAME"
              name="name"
              value={formState.name}
              onChange={handleChange}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              variant="outlined"
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: focused === 'name' ? theme.palette.cyberpunk.neonBlue : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                    boxShadow: `0 0 10px ${theme.palette.cyberpunk.neonBlue}80`,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.1em',
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  '&.Mui-focused': {
                    color: theme.palette.cyberpunk.neonBlue,
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.05em',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="EMAIL"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              variant="outlined"
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: focused === 'email' ? theme.palette.cyberpunk.neonBlue : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                    boxShadow: `0 0 10px ${theme.palette.cyberpunk.neonBlue}80`,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.1em',
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  '&.Mui-focused': {
                    color: theme.palette.cyberpunk.neonBlue,
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.05em',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="MESSAGE"
              name="message"
              value={formState.message}
              onChange={handleChange}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              variant="outlined"
              required
              multiline
              rows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  '& fieldset': {
                    borderColor: focused === 'message' ? theme.palette.cyberpunk.neonBlue : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                    boxShadow: `0 0 10px ${theme.palette.cyberpunk.neonBlue}80`,
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.1em',
                  color: 'text.secondary',
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                  '&.Mui-focused': {
                    color: theme.palette.cyberpunk.neonBlue,
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.05em',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.cyberpunk.neonBlue}70, ${theme.palette.cyberpunk.neonBlue}90)`,
                  color: 'white',
                  borderRadius: 0,
                  p: { xs: '8px 16px', sm: '10px 24px' },
                  fontFamily: '"Orbitron", sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    background: `linear-gradient(45deg, ${theme.palette.cyberpunk.neonBlue}00, ${theme.palette.cyberpunk.neonBlue}50, ${theme.palette.cyberpunk.neonBlue}00)`,
                    zIndex: 0,
                    transform: 'rotate(45deg)',
                    animation: 'shineEffect 3s infinite linear',
                    '@keyframes shineEffect': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' },
                    },
                  },
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.cyberpunk.neonBlue}, ${theme.palette.cyberpunk.neonBlue}70)`,
                    boxShadow: `0 0 20px ${theme.palette.cyberpunk.neonBlue}70`,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                TRANSMIT
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
});

// Memoized ContactInfo component
const ContactInfo = memo(() => {
  const theme = useTheme();
  
  const contactItems = [
    { 
      icon: <EmailIcon />, 
      text: 'arpitrajput871@gmail.com', 
      color: theme.palette.cyberpunk.neonPink,
      delay: 0.1,
      link: 'mailto:arpitrajput871@gmail.com'
    },
    { 
      icon: <LinkedInIcon />, 
      text: 'linkedin.com/in/arpit-rajput-7420b1217/', 
      color: theme.palette.cyberpunk.neonBlue,
      delay: 0.2,
      link: 'https://www.linkedin.com/in/arpit-rajput-7420b1217/'
    },
    { 
      icon: <GitHubIcon />, 
      text: 'github.com/arpit871', 
      color: theme.palette.cyberpunk.neonYellow,
      delay: 0.3,
      link: 'https://github.com/arpit871'
    },
    { 
      icon: <TwitterIcon />, 
      text: '@arpitrajput871', 
      color: theme.palette.cyberpunk.neonGreen,
      delay: 0.4,
      link: 'https://x.com/arpitrajput871'
    }
  ];
  
  return (
    <Box
      sx={{
        position: 'relative',
        p: { xs: 2, sm: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: `1px solid ${theme.palette.cyberpunk.neonPink}30`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontFamily: '"Orbitron", sans-serif',
          color: theme.palette.cyberpunk.neonPink,
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '"> "',
            color: theme.palette.cyberpunk.neonPink,
            fontFamily: 'monospace',
            marginRight: '8px',
          },
          '&::after': {
            content: '""',
            display: 'block',
            width: '50px',
            height: '2px',
            background: theme.palette.cyberpunk.neonPink,
            marginLeft: '16px',
            boxShadow: `0 0 10px ${theme.palette.cyberpunk.neonPink}`,
          }
        }}
      >
        CONNECT
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        {contactItems.map((item, index) => (
          <motion.div
            key={`contact-${index}`}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: item.delay }}
            viewport={{ once: true }}
          >
            <Box
              component="a"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mb: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
                p: { xs: 1.5, sm: 2 },
                position: 'relative',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
                border: `1px solid ${item.color}40`,
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  transform: 'translateX(5px)',
                  border: `1px solid ${item.color}90`,
                  boxShadow: `0 0 15px ${item.color}30`,
                  '& .contact-icon': {
                    color: item.color,
                    transform: 'scale(1.1)',
                    boxShadow: `0 0 15px ${item.color}`,
                  },
                  '& .contact-text': {
                    color: 'white',
                  }
                }
              }}
            >
              <Box
                className="contact-icon"
                sx={{
                  color: `${item.color}90`,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  p: { xs: 0.75, sm: 1 },
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  },
                }}
              >
                {item.icon}
              </Box>
              <Typography 
                className="contact-text"
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.text}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
      
      {/* Decorative circuit elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '150px',
          height: '150px',
          opacity: 0.2,
          pointerEvents: 'none',
          background: `
            linear-gradient(90deg, transparent 49%, rgba(255, 41, 117, 0.3) 50%, transparent 51%) 0 0 / 10px 1px,
            linear-gradient(0deg, transparent 49%, rgba(0, 255, 255, 0.3) 50%, transparent 51%) 0 0 / 1px 10px
          `,
        }}
      />
    </Box>
  );
});

// Main Contact component
const Contact = memo(() => {
  const theme = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (formData) => {
    // In a real application, you would handle the form submission here
    console.log('Form submitted:', formData);
    setShowSuccess(true);
  };
  
  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };
  
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
        overflowX: 'hidden',
        width: '100%',
      }}
      id="contact"
    >
      {/* Background circuit lines - reduced from 5 to 3 */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`circuit-${i}`}
          sx={{
            position: 'absolute',
            [i % 2 === 0 ? 'top' : 'bottom']: `${20 + i * 15}%`,
            [i % 2 === 0 ? 'left' : 'right']: '0',
            width: `${20 + i * 10}%`,
            height: '1px',
            background: `linear-gradient(${i % 2 === 0 ? 'to right' : 'to left'}, 
              transparent, 
              ${i % 3 === 0 ? theme.palette.cyberpunk.neonPink : 
                i % 3 === 1 ? theme.palette.cyberpunk.neonBlue : 
                theme.palette.cyberpunk.neonYellow}40,
              transparent)`,
            opacity: 0.5,
            zIndex: 0,
          }}
        />
      ))}
      
      {/* Title with glitch effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ 
          position: 'relative', 
          zIndex: 2,
          width: '100%',
          textAlign: 'center',
          marginBottom: '40px',
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
            NEURAL LINK
          </Typography>
          
          {/* Glitch layer */}
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
              animation: 'glitch-contact 5s infinite linear alternate-reverse',
              '@keyframes glitch-contact': {
                '0%, 100%': { clipPath: 'inset(80% 0 0 0)' },
                '20%': { clipPath: 'inset(20% 0 40% 0)' },
                '40%': { clipPath: 'inset(40% 0 20% 0)' },
                '60%': { clipPath: 'inset(0% 0 40% 0)' },
                '80%': { clipPath: 'inset(0% 0 80% 0)' },
              },
            }}
          >
            NEURAL LINK
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
            LET'S COLLABORATE ON YOUR NEXT PROJECT
          </Typography>
        </Box>
      </motion.div>
      
      {/* Main content with contact form and info */}
      <Box
        sx={{ 
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 3, sm: 4 }} 
          sx={{ 
            justifyContent: 'center',
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ height: '100%' }}
            >
              <ContactForm onSubmit={handleSubmit} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ height: '100%' }}
            >
              <ContactInfo />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      
      {/* Social Media Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 1, sm: 2 },
          mt: { xs: 4, sm: 6 },
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {[
          { icon: <GitHubIcon />, color: theme.palette.cyberpunk.neonYellow, delay: 0.3, link: 'https://github.com/yourusername' },
          { icon: <LinkedInIcon />, color: theme.palette.cyberpunk.neonBlue, delay: 0.4, link: 'https://linkedin.com/in/yourusername' },
          { icon: <TwitterIcon />, color: theme.palette.cyberpunk.neonGreen, delay: 0.5, link: 'https://twitter.com/yourusername' },
          { icon: <EmailIcon />, color: theme.palette.cyberpunk.neonPink, delay: 0.6, link: 'mailto:contact@yourusername.com' }
        ].map((social, index) => (
          <motion.div
            key={`social-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: social.delay }}
          >
            <IconButton
              component="a"
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Social media link ${index + 1}`}
              sx={{
                color: 'white',
                background: 'rgba(13, 2, 33, 0.7)',
                border: `1px solid ${social.color}50`,
                width: { xs: '40px', sm: '50px' },
                height: { xs: '40px', sm: '50px' },
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: `rgba(13, 2, 33, 0.9)`,
                  borderColor: social.color,
                  transform: 'translateY(-5px)',
                  boxShadow: `0 5px 15px ${social.color}30`,
                  '& .icon': {
                    color: social.color,
                  },
                  '&::after': {
                    transform: 'scale(1.5)',
                    opacity: 0,
                  }
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle, ${social.color}30 0%, transparent 70%)`,
                  transform: 'translate(-50%, -50%) scale(0)',
                  transformOrigin: 'center',
                  transition: 'all 0.5s ease',
                }
              }}
            >
              <Box 
                className="icon" 
                sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  transition: 'all 0.3s ease',
                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  },
                }}
              >
                {social.icon}
              </Box>
            </IconButton>
          </motion.div>
        ))}
      </Box>
      
      {/* Success message snackbar */}
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            background: theme.palette.cyberpunk.neonGreen,
            fontFamily: '"Rajdhani", sans-serif',
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            },
            '&::before': {
              content: '"> "',
              fontFamily: 'monospace',
            }
          }}
        >
          Transmission successful! Connection established.
        </Alert>
      </Snackbar>
    </Container>
  );
});

export default Contact; 