// Nexus AI Chat Application
class NexusAI {
    constructor() {
        this.conversationId = this.generateId();
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadDarkMode();
    }

    setupElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.darkModeToggle = document.getElementById('darkMode');
    }

    setupEventListeners() {
        this.chatForm.addEventListener('submit', (e) => this.handleSendMessage(e));
        this.newChatBtn.addEventListener('click', () => this.newConversation());
        this.darkModeToggle.addEventListener('change', (e) => this.toggleDarkMode(e));
    }

    handleSendMessage(e) {
        e.preventDefault();
        const message = this.userInput.value.trim();

        if (!message || this.isLoading) return;

        // Display user message
        this.displayMessage(message, 'user');
        this.userInput.value = '';
        this.sendMessage(message);
    }

    displayMessage(content, role) {
        const messageGroup = document.createElement('div');
        messageGroup.className = `message-group ${role}`;

        const messageDiv = document.createElement('div');
        messageDiv.className = `${role}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Support markdown-like formatting
        const paragraphs = content.split('\n\n');
        paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            contentDiv.appendChild(p);
        });

        messageDiv.appendChild(contentDiv);
        messageGroup.appendChild(messageDiv);
        this.chatMessages.appendChild(messageGroup);

        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async sendMessage(message) {
        this.isLoading = true;
        this.loadingIndicator.classList.add('active');
        this.sendBtn.disabled = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationId: this.conversationId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            this.conversationId = data.conversationId;
            this.displayMessage(data.response, 'bot');

        } catch (error) {
            console.error('Error:', error);
            this.displayMessage(
                'Sorry, I encountered an error. Please try again.',
                'bot'
            );
        } finally {
            this.isLoading = false;
            this.loadingIndicator.classList.remove('active');
            this.sendBtn.disabled = false;
            this.userInput.focus();
        }
    }

    newConversation() {
        this.conversationId = this.generateId();
        this.chatMessages.innerHTML = `
            <div class="message-group welcome">
                <div class="bot-message">
                    <div class="message-content">
                        <p>مرحباً! 👋 أنا Nexus AI</p>
                        <p>يمكنك سؤالي عن أي شيء وسأحاول مساعدتك!</p>
                    </div>
                </div>
            </div>
        `;
        this.userInput.focus();
    }

    toggleDarkMode(e) {
        const isDark = e.target.checked;
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    }

    loadDarkMode() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            this.darkModeToggle.checked = true;
        }
    }

    generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.nexusAI = new NexusAI();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('chatForm').dispatchEvent(new Event('submit'));
    }
});