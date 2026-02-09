/**
 * Main Application Logic
 * Handles UI interactions, GitHub Models API calls, and conversation management.
 */

class MealPlannerApp {
  constructor() {
    this.conversationHistory = [];
    this.rag = new RAGPipeline(RECIPE_DATABASE);
    this.apiToken = localStorage.getItem('github_pat') || '';
    this.selectedModel = localStorage.getItem('selected_model') || 'openai/gpt-4o-mini';
    this.isProcessing = false;
    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.checkApiToken();
    this.showWelcomeMessage();
  }

  cacheDOM() {
    this.chatContainer = document.getElementById('chat-container');
    this.chatMessages = document.getElementById('chat-messages');
    this.userInput = document.getElementById('user-input');
    this.sendBtn = document.getElementById('send-btn');
    this.settingsBtn = document.getElementById('settings-btn');
    this.settingsModal = document.getElementById('settings-modal');
    this.settingsClose = document.getElementById('settings-close');
    this.tokenInput = document.getElementById('api-token');
    this.modelSelect = document.getElementById('model-select');
    this.saveSettingsBtn = document.getElementById('save-settings');
    this.clearChatBtn = document.getElementById('clear-chat');
    this.suggestionChips = document.querySelectorAll('.suggestion-chip');
    this.connectionStatus = document.getElementById('connection-status');
    this.themeToggle = document.getElementById('theme-toggle');
  }

  bindEvents() {
    this.sendBtn.addEventListener('click', () => this.handleSend());
    this.userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });
    this.userInput.addEventListener('input', () => this.autoResize());

    this.settingsBtn.addEventListener('click', () => this.openSettings());
    this.settingsClose.addEventListener('click', () => this.closeSettings());
    this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
    this.clearChatBtn.addEventListener('click', () => this.clearChat());

    this.suggestionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.userInput.value = chip.dataset.query;
        this.handleSend();
      });
    });

    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    // Close modal on outside click
    this.settingsModal.addEventListener('click', (e) => {
      if (e.target === this.settingsModal) this.closeSettings();
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeSettings();
    });
  }

  // ==================== THEME ====================

  toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    this.themeToggle.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  }

  // ==================== SETTINGS ====================

  checkApiToken() {
    if (this.apiToken) {
      this.tokenInput.value = this.apiToken;
      this.updateConnectionStatus(true);
    } else {
      this.updateConnectionStatus(false);
    }
    if (this.selectedModel) {
      this.modelSelect.value = this.selectedModel;
    }

    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }

  openSettings() {
    this.settingsModal.classList.add('active');
    this.tokenInput.value = this.apiToken;
  }

  closeSettings() {
    this.settingsModal.classList.remove('active');
  }

  saveSettings() {
    this.apiToken = this.tokenInput.value.trim();
    this.selectedModel = this.modelSelect.value;
    localStorage.setItem('github_pat', this.apiToken);
    localStorage.setItem('selected_model', this.selectedModel);
    this.updateConnectionStatus(!!this.apiToken);
    this.closeSettings();

    if (this.apiToken) {
      this.addBotMessage("Settings saved! I'm connected to the AI model now. Ask me anything about cooking! 🍳");
    }
  }

  updateConnectionStatus(connected) {
    if (connected) {
      this.connectionStatus.innerHTML = '<span class="status-dot connected"></span> AI Connected';
      this.connectionStatus.classList.add('connected');
    } else {
      this.connectionStatus.innerHTML = '<span class="status-dot"></span> No API Key';
      this.connectionStatus.classList.remove('connected');
    }
  }

  // ==================== CHAT ====================

  showWelcomeMessage() {
    // Welcome message is in the HTML already
  }

  async handleSend() {
    const message = this.userInput.value.trim();
    if (!message || this.isProcessing) return;

    this.userInput.value = '';
    this.autoResize();
    this.addUserMessage(message);
    this.hideSuggestions();

    // Add to conversation history
    this.conversationHistory.push({ role: 'user', content: message });

    this.isProcessing = true;
    this.showTypingIndicator();

    try {
      // Build RAG context
      const { messages, retrieved } = this.rag.buildPrompt(message, this.conversationHistory);

      let response;
      if (this.apiToken) {
        // Use GitHub Models API
        response = await this.callGitHubModels(messages);
      } else {
        // Fallback: Use retrieved recipes directly without LLM
        response = this.generateFallbackResponse(message, retrieved);
      }

      this.removeTypingIndicator();
      this.addBotMessage(response, retrieved);

      // Add to conversation history
      this.conversationHistory.push({ role: 'assistant', content: response });

    } catch (error) {
      this.removeTypingIndicator();
      console.error('Error:', error);

      if (error.message.includes('401') || error.message.includes('403')) {
        this.addBotMessage("It looks like there's an issue with your API token. Please check your settings and make sure your GitHub Personal Access Token is valid and has the `models:read` scope. Click the gear icon to update it.");
      } else if (error.message.includes('429')) {
        this.addBotMessage("We've hit the rate limit. GitHub's free tier has usage limits. Please wait a moment and try again, or consider upgrading your plan.");
      } else {
        // Fall back to local retrieval
        const { retrieved } = this.rag.buildPrompt(message, this.conversationHistory);
        const fallback = this.generateFallbackResponse(message, retrieved);
        this.addBotMessage(fallback, retrieved);
        this.conversationHistory.push({ role: 'assistant', content: fallback });
      }
    }

    this.isProcessing = false;
  }

  /**
   * Call GitHub Models API for chat completions.
   */
  async callGitHubModels(messages) {
    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        model: this.selectedModel,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Generate a response without LLM, using only retrieved recipes.
   */
  generateFallbackResponse(query, retrieved) {
    if (retrieved.length === 0) {
      return `I couldn't find recipes matching those specific ingredients in my cookbook. 📖\n\nHere are some tips:\n- Try listing your ingredients separated by commas (e.g., "chicken, rice, garlic")\n- Ask for a meal type like "quick breakfast" or "easy dinner"\n- Try broader ingredients like "pasta" or "chicken"\n\n**Connect an AI model** via Settings (gear icon) for smarter suggestions and creative recipes! 🧠`;
    }

    const ingredients = this.rag.extractIngredients(query);
    let response = '';

    if (ingredients.length > 0) {
      response += `Great news! I found **${retrieved.length} recipe${retrieved.length > 1 ? 's' : ''}** matching your ingredients: **${ingredients.join(', ')}** 🎉\n\n`;
    } else {
      response += `Here are **${retrieved.length} recipe${retrieved.length > 1 ? 's' : ''}** I think you'll love:\n\n`;
    }

    retrieved.forEach(({ recipe, ingredientMatch }, i) => {
      const matchPct = Math.round(ingredientMatch * 100);
      response += `### ${recipe.emoji} ${recipe.name}\n`;
      response += `*${recipe.cuisine} • ${recipe.difficulty} • ${recipe.prepTime} prep + ${recipe.cookTime} cook • Serves ${recipe.servings}*\n`;
      if (matchPct > 0) response += `**Ingredient match: ${matchPct}%**\n`;
      response += `\n${recipe.description}\n\n`;

      response += `**Ingredients:**\n`;
      recipe.ingredients.forEach(ing => {
        response += `- ${ing}\n`;
      });
      response += `\n**Instructions:**\n`;
      recipe.instructions.forEach((step, j) => {
        response += `${j + 1}. ${step}\n`;
      });
      response += '\n---\n\n';
    });

    response += `💡 *Tip: Add your GitHub token in Settings to get personalized AI-powered suggestions, substitutions, and cooking tips!*`;

    return response;
  }

  // ==================== UI RENDERING ====================

  addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.innerHTML = `
      <div class="message-content">
        <div class="message-bubble">
          <p>${this.escapeHtml(text)}</p>
        </div>
        <div class="message-avatar user-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
      </div>`;
    this.chatMessages.appendChild(msgDiv);
    this.scrollToBottom();
  }

  addBotMessage(text, retrieved = []) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';

    // Convert markdown-like text to HTML
    const htmlContent = this.renderMarkdown(text);

    let recipeCards = '';
    if (retrieved.length > 0 && this.apiToken) {
      recipeCards = `<div class="recipe-cards">${retrieved.slice(0, 3).map(({ recipe }) => `
        <div class="recipe-card" onclick="app.showRecipeDetail('${recipe.id}')">
          <div class="recipe-card-emoji">${recipe.emoji}</div>
          <div class="recipe-card-info">
            <div class="recipe-card-name">${recipe.name}</div>
            <div class="recipe-card-meta">${recipe.cuisine} • ${recipe.difficulty}</div>
          </div>
        </div>`).join('')}
      </div>`;
    }

    msgDiv.innerHTML = `
      <div class="message-content">
        <div class="message-avatar bot-avatar">
          <span>👨‍🍳</span>
        </div>
        <div class="message-bubble">
          <div class="markdown-content">${htmlContent}</div>
          ${recipeCards}
        </div>
      </div>`;
    this.chatMessages.appendChild(msgDiv);
    this.scrollToBottom();
  }

  showRecipeDetail(recipeId) {
    const recipe = RECIPE_DATABASE.find(r => r.id === recipeId);
    if (!recipe) return;

    const query = `Tell me more about the ${recipe.name} recipe. Give me detailed tips and possible variations.`;
    this.userInput.value = query;
    this.handleSend();
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message typing-indicator-msg';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
      <div class="message-content">
        <div class="message-avatar bot-avatar">
          <span>👨‍🍳</span>
        </div>
        <div class="message-bubble">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>`;
    this.chatMessages.appendChild(indicator);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  hideSuggestions() {
    const suggestions = document.getElementById('suggestions');
    if (suggestions) {
      suggestions.style.opacity = '0';
      setTimeout(() => suggestions.style.display = 'none', 300);
    }
  }

  clearChat() {
    this.conversationHistory = [];
    this.chatMessages.innerHTML = '';
    this.addBotMessage("Chat cleared! Fresh start. What ingredients do you have today? 🧑‍🍳");
    const suggestions = document.getElementById('suggestions');
    if (suggestions) {
      suggestions.style.display = 'flex';
      suggestions.style.opacity = '1';
    }
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    });
  }

  autoResize() {
    this.userInput.style.height = 'auto';
    this.userInput.style.height = Math.min(this.userInput.scrollHeight, 120) + 'px';
  }

  // ==================== UTILS ====================

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  renderMarkdown(text) {
    return text
      // Code blocks
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Headers
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr>')
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Wrap consecutive li elements
      .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (match) => {
        return `<ul>${match}</ul>`;
      })
      // Paragraphs (lines not already wrapped in tags)
      .replace(/^(?!<[huplo]|<li|<hr|<pre)(.+)$/gm, '<p>$1</p>')
      // Line breaks
      .replace(/\n\n/g, '')
      .replace(/\n/g, '');
  }
}

// Initialize the app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new MealPlannerApp();
});
