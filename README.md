# Chef Buddy — Make a Meal with What You Have

A **Conversational RAG (Retrieval-Augmented Generation) pipeline** that helps you cook delicious meals with whatever ingredients you already have in your kitchen.

**Live Demo:** [https://mtuthuko.github.io/Lets-Make-a-Meal-with-these/](https://mtuthuko.github.io/Lets-Make-a-Meal-with-these/)

---

## How It Works

Chef Buddy uses a **RAG architecture** — combining intelligent recipe retrieval with AI-powered generation to give you personalized cooking suggestions.

```
User Input: "I have chicken, rice, and garlic"
        │
        ▼
┌─────────────────────┐
│  Ingredient Parsing  │  Extract ingredients from natural language
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   BM25 Retrieval    │  Search recipe knowledge base using
│   + Ingredient      │  BM25 scoring + ingredient matching
│     Matching        │  + context boosting
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Context Building   │  Build augmented prompt with top
│                     │  retrieved recipes
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  LLM Generation     │  GitHub Models API generates
│  (GitHub Models)    │  personalized response with
│                     │  tips & substitutions
└─────────────────────┘
```

### The RAG Pipeline

1. **Retrieval** — When you type your ingredients, the system:
   - Parses and extracts ingredient names (handling synonyms like "chicken" matching "poultry")
   - Runs a **BM25 text search** across the recipe knowledge base
   - Applies **direct ingredient matching** with heavy weighting
   - Boosts results based on **context signals** (cuisine, meal type, dietary preferences)
   - Returns the top-K most relevant recipes

2. **Augmentation** — Retrieved recipes are formatted into structured context and injected into the LLM prompt alongside conversation history

3. **Generation** — The AI model (via GitHub Models) generates a natural, conversational response with:
   - Tailored recipe recommendations
   - Creative substitution suggestions
   - Cooking tips and variations
   - Follow-up questions to refine suggestions

## Features

- **Smart Ingredient Matching** — Type any combination of ingredients and get relevant recipes
- **Conversational Memory** — Multi-turn conversations that remember context
- **40+ Recipes** — Spanning 10+ cuisines (Italian, Mexican, Indian, Thai, Japanese, Korean, and more)
- **Works Without AI** — Falls back to direct retrieval when no API key is configured
- **Multiple AI Models** — Choose from GPT-4o, Llama, DeepSeek, Mistral, Phi-4, and more via GitHub Models
- **Dark/Light Theme** — Toggle between themes
- **Fully Client-Side** — No backend required, runs entirely in the browser
- **Mobile Responsive** — Works on any device

## Getting Started

### Option 1: Use the Live Demo
Visit the [GitHub Pages deployment](https://mtuthuko.github.io/Lets-Make-a-Meal-with-these/) and start chatting!

### Option 2: Run Locally
```bash
git clone https://github.com/Mtuthuko/Lets-Make-a-Meal-with-these.git
cd Lets-Make-a-Meal-with-these

# Serve with any static file server:
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in your browser.

### Connecting an AI Model (Optional)

For the full AI-powered experience:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create a **Personal Access Token** with the `models:read` scope
3. Click the **gear icon** in Chef Buddy and paste your token
4. Choose a model from the [GitHub Marketplace](https://github.com/marketplace/models)
5. Start chatting!

> Your token is stored in `localStorage` and only sent to the GitHub Models API. It never touches any other server.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla HTML, CSS, JavaScript (zero dependencies) |
| **RAG Retrieval** | Custom BM25 implementation with ingredient-aware scoring |
| **AI Generation** | GitHub Models API (`models.github.ai/inference`) |
| **Knowledge Base** | 40+ curated recipes in structured JSON |
| **Hosting** | GitHub Pages (static) |
| **Theming** | CSS custom properties with dark/light modes |

## Project Structure

```
Lets-Make-a-Meal-with-these/
├── index.html          # Main app page
├── css/
│   └── styles.css      # Full styling with theme system
├── js/
│   ├── recipes.js      # Recipe knowledge base (40+ recipes)
│   ├── rag.js          # RAG pipeline (BM25, retrieval, context building)
│   └── app.js          # Main app logic, UI, API integration
├── .gitignore
└── README.md
```

## Available Models (GitHub Marketplace)

| Model | Best For |
|-------|---------|
| `openai/gpt-4o-mini` | Fast responses, free tier friendly |
| `openai/gpt-4o` | Most capable, detailed responses |
| `openai/gpt-4.1` | Latest OpenAI model |
| `meta-llama/Llama-4-Scout-17B` | Open source, fast |
| `deepseek/DeepSeek-R1` | Strong reasoning |
| `microsoft/Phi-4` | Efficient, compact |
| `mistral-ai/Mistral-Small-24B` | Balanced performance |

## How the RAG Scoring Works

Each recipe receives a composite score:

```
Final Score = (Ingredient Match × 10) + BM25 Score + (Context Boost × 3)
```

- **Ingredient Match (0-1):** Ratio of user ingredients found in recipe
- **BM25 Score:** Term frequency-inverse document frequency based text relevance
- **Context Boost:** Bonus for matching meal type, cuisine, dietary preferences

## License

MIT License - feel free to use, modify, and share.
