const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store conversations (in production, use a database)
const conversations = new Map();

// Generate unique conversation ID
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize conversation if new
    if (!conversations.has(conversationId)) {
      conversations.set(conversationId, []);
    }

    const messages = conversations.get(conversationId);
    messages.push({ role: 'user', content: message });

    // Mock AI response (Replace with actual OpenAI API call)
    const aiResponse = await generateAIResponse(message, messages);

    messages.push({ role: 'assistant', content: aiResponse });

    res.json({
      response: aiResponse,
      conversationId: conversationId,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate AI Response
async function generateAIResponse(message, context) {
  // This is a mock response. In production, connect to OpenAI API
  try {
    if (process.env.OPENAI_API_KEY) {
      // Use actual OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: context.slice(-10), // Use last 10 messages
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } else {
      // Mock response for demo
      return getMockResponse(message);
    }
  } catch (error) {
    console.error('API Error:', error);
    return getMockResponse(message);
  }
}

// Mock responses for demo
function getMockResponse(message) {
  const mockResponses = {
    'hello': 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
    'hi': 'Hi there! How can I assist you?',
    'how are you': 'I\'m doing great, thank you for asking! How can I help you?',
    'what is ai': 'AI (Artificial Intelligence) refers to computer systems designed to perform tasks that typically require human intelligence.',
    'help': 'I\'m here to help! You can ask me anything about various topics. What would you like to know?'
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, value] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  return `You said: "${message}". I'm a demo chatbot. Connect me to OpenAI API for real AI responses!`;
}

// Get conversations
app.get('/api/conversations/:id', (req, res) => {
  const { id } = req.params;
  const messages = conversations.get(id) || [];
  res.json({ messages, conversationId: id });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Nexus AI Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nexus AI Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST /api/chat - Send a message`);
  console.log(`   GET /api/conversations/:id - Get conversation history`);
  console.log(`   GET /api/health - Health check`);
});