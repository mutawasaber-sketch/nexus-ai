# 🤖 Nexus AI - Intelligent Chatbot

A sophisticated AI chatbot application similar to ChatGPT with a professional, modern interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node.js-14+-green)

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- 💬 **Real-time Chat** - Instant messaging with smooth animations
- 🌍 **Bilingual** - Support for Arabic and English
- 🔄 **Conversation History** - Keep track of your conversations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🚀 **Fast & Lightweight** - Built with Express.js
- 🔐 **Secure** - CORS protection and environment variables

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mutawasaber-sketch/nexus-ai.git
cd nexus-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_api_key_here
```

4. **Start the server**
```bash
npm start
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
nexus-ai/
├── server.js              # Express server and API routes
├── package.json          # Dependencies and scripts
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore file
├── README.md            # This file
└── public/
    ├── index.html       # Main HTML interface
    ├── styles.css       # Professional styling
    └── app.js          # Client-side JavaScript
```

## 🔌 API Endpoints

### POST `/api/chat`
Send a message to the chatbot

**Request:**
```json
{
  "message": "Hello, how are you?",
  "conversationId": "unique-id"
}
```

**Response:**
```json
{
  "response": "I'm doing great, thank you for asking!",
  "conversationId": "unique-id",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### GET `/api/conversations/:id`
Get conversation history

**Response:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ],
  "conversationId": "unique-id"
}
```

### GET `/api/health`
Health check endpoint

## 🎨 Customization

### Change Colors
Edit `public/styles.css` and modify the CSS variables:
```css
:root {
    --primary: #6366f1;
    --secondary: #ec4899;
    /* ... other colors */
}
```

### Connect to OpenAI
1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env` file
3. The server will automatically use it

## 🛠️ Development

### Run in development mode
```bash
npm run dev
```

This uses nodemon for auto-reload on file changes.

## 📦 Dependencies

- **express** - Web server framework
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables management
- **axios** - HTTP client for API calls
- **nodemon** (dev) - Auto-reload during development

## 🔒 Security

- CORS protection enabled
- Environment variables for sensitive data
- Input validation on server
- XSS protection through text content

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ by Nexus AI Team**

### Quick Tips:
- Press `Enter` to send messages
- Use `Ctrl/Cmd + Enter` as alternative
- Toggle dark mode in the settings menu
- Click "New Chat" to start a fresh conversation

Happy chatting! 🚀