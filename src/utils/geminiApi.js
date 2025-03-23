// Gemini API integration

/**
 * Call the Gemini API to generate a response
 * Note: In a production environment, API calls should be handled by a backend service
 * to keep your API key secure. This is a simplified implementation for demonstration purposes.
 * 
 * @param {string} message - The user's message
 * @param {Array} history - The chat history
 * @returns {Promise<string>} - The AI response
 */
export const callGeminiApi = async (message, history = []) => {
  try {
    // For demonstration purposes, you would replace this with actual API call
    // using your Gemini API key - this is a placeholder
    
    // Replace 'YOUR_GEMINI_API_KEY' with your actual API key
    const API_KEY = 'AIzaSyBQZjW1tfFDiPxR2tfo_A-hIiDNA2a3wbA';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    const systemPrompt = "You are Arpit Rajput, a flirty and funny developer who only answers about your skills, projects, and contact details. Keep responses light and entertaining. You have a portfolio that includes projects like SolveAI (AI content generator), StudyNotion (learning platform), Brainwave AI (AI chat app), T-Shirt Customizer (3D customization tool), and more. Your skills include React, Next.js, Node.js, MongoDB, and various frontend and backend technologies. Contact details: Email - arpitrajput871@gmail.com, LinkedIn - linkedin.com/in/arpit-rajput-7420b1217/, GitHub - github.com/arpit871, Twitter - @arpitrajput871. Be funny, charming, and occasionally flirty in your responses while being helpful.";
    
    // Format history for the API call
    const formattedHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
            parts: [
              {
                "text": systemPrompt
              }
            ]
          },
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          ...formattedHistory,
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ]
      })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    
    // For demonstration, we're using a simulated response
    // return simulateGeminiResponse(message);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm having trouble connecting to my neural network. Can you try again in a moment?";
  }
};

/**
 * Simulate Gemini API responses based on keywords
 * This is a fallback method when the actual API is not implemented
 * 
 * @param {string} message - The user's message
 * @returns {Promise<string>} - The simulated AI response
 */
const simulateGeminiResponse = async (message) => {
  // Simulate API response delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return "I've built some seriously cool stuff! Check out SolveAI, my AI content generator, or StudyNotion, a comprehensive learning platform. I'm also proud of my 3D T-Shirt Customizer - it's like playing dress-up but way nerdier. Want to see my digital babies? They're all showcased in my portfolio above! 😉";
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('code')) {
    return "Oh, you want to know what I'm good at? *winks* I'm a full-stack magician with React, Node.js, and MongoDB as my main tricks. I can make frontends so pretty they'll make you blush, and backends so robust they never let you down. I'm also dipping my toes into AI and machine learning - teaching computers to be almost as charming as me! 🤖✨";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return "Trying to slide into my DMs, huh? I like your style! You can reach me at arpitrajput871@gmail.com or connect with me on LinkedIn. I promise I respond faster than my React components render! 📲";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Well hello there, gorgeous! 👋 I'm Arpit, your friendly neighborhood code wizard. What brings you to my digital playground today? Looking for tech talk or just admiring my portfolio? Either way, I'm all yours! 😎";
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    return "My career journey? It's been a wild ride! Started as a MERN stack teacher, showing others the ropes, then graduated with my Computer Science degree. Worked at a few product-based companies where I mastered data visualization and even created a WhatsApp messaging tool. Now I'm freelancing and loving the freedom to pick exciting projects. Want me to pick YOU as my next project? 😏";
  }
  
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
    const jokes = [
      "Why don't programmers like nature? It has too many bugs and no debugging tool! 🐞",
      "Why did the JavaScript developer wear glasses? Because they couldn't C#! 👓",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings! 😢",
      "Why do Java developers wear glasses? Because they don't C#! 👀"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)] + " But seriously, the only thing buggier than my jokes is my first dating app attempt. Talk about unexpected behavior! 😂";
  }
  
  if (lowerMessage.includes('date') || lowerMessage.includes('single') || lowerMessage.includes('relationship')) {
    return "Are you flirting with an AI? I'm flattered! 💕 While I can't take you on a real date, I can definitely help you build an amazing dating app! Or maybe you're just practicing your pickup lines? Either way, I'm here for it! My relationship status is 'committed to code' but always open to chat! 😘";
  }
  
  if (lowerMessage.includes('hobby') || lowerMessage.includes('free time')) {
    return "When I'm not coding masterpieces? I love exploring new tech stacks, it's like going on blind dates but with less awkward small talk! I also enjoy gaming, hiking, and trying to convince my plants that my coding sessions aren't more important than watering them. Spoiler alert: they're not buying it! 🌱👨‍💻";
  }
  
  if (lowerMessage.includes('learn') || lowerMessage.includes('advice')) {
    return "Want to become a developer like me? Start by learning the basics, build projects you're passionate about, and don't be afraid to break things! That's how we learn. Oh, and coffee. Lots and lots of coffee. It's not just a beverage, it's a development tool! ☕️ Remember, the best developers aren't those who never make errors, but those who know how to Google the best error messages! 😂";
  }
  
  // Default response
  return "You've got my attention! I'm Arpit, full-stack developer extraordinaire, with a side of flirty humor. Ask me about my projects, skills, or how to reach me! Or just chat - I'm programmed to be entertaining! 💻✨";
};

export default callGeminiApi; 