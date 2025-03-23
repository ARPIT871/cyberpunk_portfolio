import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Avatar, Drawer, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import callGeminiApi from '../../utils/geminiApi';

const ChatBot = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there! I'm Arpit's digital twin. How can I help you today? Ask me about my skills, projects, or just say hi! 😎", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [randomPrompts, setRandomPrompts] = useState([
    "Psst! Want to hear about my coolest project?",
    "I'm better at React than flirting, but I try both!",
    "Ask me anything! Except algorithms before coffee...",
    "Want to know what tech makes me excited?",
    "I can talk code all day. Try me!",
    "Need a developer? Or just a good tech joke?"
  ]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Show random prompts periodically when chat is open
    if (!isOpen) return;
    
    const promptInterval = setInterval(() => {
      if (randomPrompts.length > 0 && Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * randomPrompts.length);
        setCurrentPrompt(randomPrompts[randomIndex]);
        
        // Remove used prompt to avoid repetition
        const newPrompts = [...randomPrompts];
        newPrompts.splice(randomIndex, 1);
        setRandomPrompts(newPrompts);
        
        // Clear prompt after some time
        setTimeout(() => setCurrentPrompt(''), 5000);
      }
    }, 8000);
    
    return () => clearInterval(promptInterval);
  }, [isOpen, randomPrompts]);
  
  // Listen for the custom event from BotCharacter
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      // Add a special welcome message when opened from bot character
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "You clicked me! I knew you couldn't resist my charm! What would you like to know about Arpit today? His amazing projects? His dazzling skills? Or are you just here for my witty banter? 😏", 
          sender: 'bot' 
        }]);
      }, 500);
    };
    
    window.addEventListener('openAIChat', handleOpenChat);
    return () => window.removeEventListener('openAIChat', handleOpenChat);
  }, []);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get Gemini API response (passing message history for context)
      const response = await callGeminiApi(inputMessage, messages);
      
      // Add bot message after a short delay
      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        text: "Oops! My circuits got a bit tangled there. Can you try again?", 
        sender: 'bot' 
      }]);
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat icon button */}
      <Tooltip title="Chat with Arpit's AI">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 1 
          }}
          style={{ 
            position: 'fixed', 
            bottom: '30px', 
            right: '30px',
            zIndex: 1000
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              backgroundColor: theme.palette.cyberpunk.neonBlue,
              color: 'black',
              width: '60px',
              height: '60px',
              boxShadow: `0 0 15px ${theme.palette.cyberpunk.neonBlue}`,
              '&:hover': {
                backgroundColor: theme.palette.cyberpunk.neonPink,
                boxShadow: `0 0 15px ${theme.palette.cyberpunk.neonPink}`,
              }
            }}
          >
            <SmartToyIcon fontSize="large" />
          </IconButton>
        </motion.div>
      </Tooltip>
      
      {/* Chat bubble for random prompts */}
      <AnimatePresence>
        {currentPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{ 
              position: 'fixed', 
              bottom: '100px', 
              right: '30px',
              zIndex: 999,
              maxWidth: '200px'
            }}
          >
            <Paper 
              sx={{
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                color: 'white',
                borderRadius: '20px 20px 0 20px',
                border: `1px solid ${theme.palette.cyberpunk.neonBlue}50`,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: '-10px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  border: `1px solid ${theme.palette.cyberpunk.neonBlue}50`,
                  borderLeft: 'none',
                  borderTop: 'none',
                  transform: 'rotate(45deg)',
                  zIndex: -1
                }
              }}
            >
              <Typography variant="body2" fontFamily="'Rajdhani', sans-serif">
                {currentPrompt}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '400px' },
            maxWidth: '100%',
            backgroundColor: 'rgba(13, 2, 33, 0.9)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        {/* Chat header */}
        <Box 
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.cyberpunk.neonBlue}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(90deg, ${theme.palette.cyberpunk.neonBlue}20, transparent)`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src="/arpit-avatar.jpg" // Replace with your avatar image
              alt="Arpit Rajput"
              sx={{ 
                border: `2px solid ${theme.palette.cyberpunk.neonBlue}`,
                backgroundColor: theme.palette.cyberpunk.neonBlue,
              }}
            >
              AR
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                Arpit's Digital Twin
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: '"Rajdhani", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Box 
                  component="span"
                  sx={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#4CAF50',
                    display: 'inline-block',
                    boxShadow: '0 0 5px #4CAF50'
                  }} 
                />
                Powered by Gemini AI
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={() => setIsOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Messages container */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: 2, 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: 'calc(100% - 140px)'
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: message.sender === 'user' 
                    ? `${theme.palette.cyberpunk.neonPink}20`
                    : `${theme.palette.cyberpunk.neonBlue}20`,
                  backdropFilter: 'blur(5px)',
                  color: 'white',
                  borderRadius: message.sender === 'user'
                    ? '20px 20px 0 20px'
                    : '20px 20px 20px 0',
                  border: `1px solid ${message.sender === 'user' 
                    ? theme.palette.cyberpunk.neonPink 
                    : theme.palette.cyberpunk.neonBlue}50`,
                  position: 'relative',
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: '"Rajdhani", sans-serif',
                    fontSize: '0.95rem',
                    lineHeight: 1.5
                  }}
                >
                  {message.text}
                </Typography>
              </Paper>
            </Box>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <Box
              sx={{
                alignSelf: 'flex-start',
                maxWidth: '80%',
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: `${theme.palette.cyberpunk.neonBlue}20`,
                  backdropFilter: 'blur(5px)',
                  color: 'white',
                  borderRadius: '20px 20px 20px 0',
                  border: `1px solid ${theme.palette.cyberpunk.neonBlue}50`,
                  position: 'relative',
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'white' }}
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'white' }}
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'white' }}
                  />
                </Box>
              </Paper>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Input area */}
        <Box 
          sx={{ 
            p: 2, 
            borderTop: `1px solid ${theme.palette.cyberpunk.neonBlue}30`,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1,
              alignItems: 'center'
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(5px)',
                  color: 'white',
                  '& fieldset': {
                    borderColor: `${theme.palette.cyberpunk.neonBlue}50`,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.cyberpunk.neonBlue,
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Rajdhani", sans-serif',
                }
              }}
            />
            <IconButton 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              sx={{
                backgroundColor: theme.palette.cyberpunk.neonBlue,
                color: 'black',
                '&:hover': {
                  backgroundColor: theme.palette.cyberpunk.neonPink,
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatBot; 