# Chef Buddy — Conversational RAG Meal Planner

A **Conversational RAG (Retrieval-Augmented Generation)** app that helps you cook delicious meals with whatever ingredients you already have. Powered by **LangChain**, **DuckDuckGo search**, and **GitHub Models**.

---

## Architecture

```
User: "I have chicken, rice, and garlic"
        │
        ▼
┌───────────────────────────┐
│   1. BM25 Retriever       │  Searches 40+ local recipes
│   (LangChain + rank-bm25) │  using keyword matching
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│   2. DuckDuckGo Search     │  Searches the live web for
│   (langchain-community)    │  additional recipe ideas
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│   3. Context Augmentation  │  Combines retrieved recipes
│                            │  + web results into prompt
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│   4. LLM Generation        │  GitHub Models API generates
│   (GPT-4o / Llama / etc.)  │  personalized response with
│                            │  tips & substitutions
└───────────────────────────┘
```

### The RAG Pipeline

1. **Retrieval** — BM25 keyword search over 40+ curated recipes stored as LangChain `Document` objects
2. **Web Search** — DuckDuckGo live search via `langchain-community` for trending recipes, techniques, and ingredients not in the local database
3. **Augmentation** — Retrieved recipes + web results are injected into the LLM system prompt alongside conversation history
4. **Generation** — GitHub Models API (OpenAI-compatible) generates a conversational response with recipe recommendations, substitutions, and tips

## Features

- **Real LLM integration** via GitHub Models Marketplace (GPT-4o, Llama, DeepSeek, Mistral, Phi-4, and more)
- **Live web search** using LangChain + DuckDuckGo — finds recipes from across the internet
- **BM25 recipe retrieval** over a curated local knowledge base of 40+ recipes
- **Conversational memory** — multi-turn chat that remembers context
- **12 AI models** to choose from via the GitHub Marketplace
- **Beautiful dark UI** with custom Streamlit styling
- **Suggestion chips** for quick-start queries
- **Recipe chips** showing matched recipes from the knowledge base

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Mtuthuko/Lets-Make-a-Meal-with-these.git
cd Lets-Make-a-Meal-with-these

pip install -r requirements.txt
```

### 2. Get a GitHub Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Check the **`models:read`** scope
4. Copy the token

### 3. Run

```bash
streamlit run app.py
```

Open `http://localhost:8501` in your browser. Paste your GitHub token in the sidebar and start chatting!

## Project Structure

```
Lets-Make-a-Meal-with-these/
├── app.py                 # Streamlit UI (chat interface, sidebar, custom CSS)
├── rag_pipeline.py        # LangChain RAG pipeline (BM25 + DuckDuckGo + LLM)
├── recipes_data.py        # Recipe knowledge base (40+ recipes as structured data)
├── requirements.txt       # Python dependencies
├── .streamlit/
│   └── config.toml        # Streamlit theme (dark mode, brand colors)
├── .gitignore
└── README.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI** | Streamlit with custom CSS theming |
| **RAG Retrieval** | LangChain `BM25Retriever` + `rank-bm25` |
| **Web Search** | LangChain `DuckDuckGoSearchResults` |
| **LLM** | GitHub Models API via `langchain-openai` (OpenAI-compatible) |
| **Knowledge Base** | 40+ recipes as LangChain `Document` objects |
| **Conversation** | LangChain `ChatPromptTemplate` with `MessagesPlaceholder` |

## Available Models (GitHub Marketplace)

| Model | Provider | Best For |
|-------|----------|---------|
| `openai/gpt-4o-mini` | OpenAI | Fast responses, free tier friendly |
| `openai/gpt-4o` | OpenAI | Most capable, detailed responses |
| `openai/gpt-4.1` | OpenAI | Latest OpenAI model |
| `meta-llama/Llama-4-Scout-17B` | Meta | Open source, fast |
| `deepseek/DeepSeek-R1` | DeepSeek | Strong reasoning |
| `microsoft/Phi-4` | Microsoft | Efficient, compact |
| `mistral-ai/Mistral-Small-24B` | Mistral | Balanced performance |
| `cohere/cohere-command-a` | Cohere | Good for structured output |

All models are accessed through the [GitHub Marketplace](https://github.com/marketplace/models) with a free tier.

## How It Works Under the Hood

```python
# 1. User types: "I have chicken, rice, and garlic"

# 2. BM25 retrieves top 5 matching recipes from local DB
retrieved_docs = retriever.invoke("I have chicken, rice, and garlic")

# 3. DuckDuckGo searches the web
web_results = DuckDuckGoSearchResults().invoke("recipe chicken rice garlic")

# 4. Context is built and sent to the LLM
prompt = f"""
RETRIEVED RECIPES: {retrieved_docs}
WEB SEARCH RESULTS: {web_results}
User: I have chicken, rice, and garlic
"""

# 5. LLM generates a conversational response
response = ChatOpenAI(base_url="https://models.github.ai/inference").invoke(prompt)
```

## Deployment

### Streamlit Community Cloud (Free)

1. Push your code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub repo
4. Set `app.py` as the main file
5. Deploy — you'll get a public URL

### Local

```bash
streamlit run app.py
```

## License

MIT License — feel free to use, modify, and share.
