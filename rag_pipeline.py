"""
Conversational RAG Pipeline
Uses LangChain with:
  - BM25 retriever over a local recipe knowledge base
  - DuckDuckGo web search for live recipe discovery
  - GitHub Models (OpenAI-compatible) for LLM generation
"""

from langchain_openai import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_community.retrievers import BM25Retriever
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from recipes_data import RECIPES, recipe_to_text

# ────────────────────────────────────────────
# Constants
# ────────────────────────────────────────────
GITHUB_MODELS_BASE_URL = "https://models.github.ai/inference"

SYSTEM_PROMPT = """\
You are **Chef Buddy** — a warm, enthusiastic, and knowledgeable chef assistant.

Your job is to help people make delicious meals with whatever ingredients they have on hand.

PERSONALITY:
- Friendly, encouraging, and passionate about food
- Give practical, actionable cooking advice
- Suggest creative substitutions when someone is missing ingredients
- Keep responses focused and well-formatted

INSTRUCTIONS:
1. Use the **RETRIEVED RECIPES** below as your primary source.  Cite recipe names when recommending them.
2. Use the **WEB SEARCH RESULTS** (if provided) to supplement with additional ideas, trending recipes, or techniques not in the local database.
3. When a user lists ingredients, find the best matching recipes and explain what they can make.
4. If they are missing a few ingredients, suggest practical substitutions.
5. Format recipes clearly with ingredient lists and numbered steps.
6. If no good match is found, say so honestly and suggest what they could buy.

────────────────────────
RETRIEVED RECIPES:
{recipe_context}
────────────────────────
WEB SEARCH RESULTS:
{web_context}
────────────────────────
"""


# ────────────────────────────────────────────
# Build recipe retriever (BM25, no embeddings needed)
# ────────────────────────────────────────────
def build_recipe_retriever(k: int = 5) -> BM25Retriever:
    """Create a BM25 retriever from the local recipe database."""
    documents = []
    for recipe in RECIPES:
        text = recipe_to_text(recipe)
        doc = Document(
            page_content=text,
            metadata={
                "name": recipe["name"],
                "category": recipe["category"],
                "cuisine": recipe["cuisine"],
                "difficulty": recipe["difficulty"],
                "key_ingredients": recipe["key_ingredients"],
                "tags": recipe["tags"],
            },
        )
        documents.append(doc)

    retriever = BM25Retriever.from_documents(documents, k=k)
    return retriever


# ────────────────────────────────────────────
# Web search via DuckDuckGo
# ────────────────────────────────────────────
def web_search(query: str, max_results: int = 4) -> str:
    """Search the web using DuckDuckGo and return formatted results."""
    try:
        search = DuckDuckGoSearchResults(
            max_results=max_results,
            output_format="list",
        )
        raw_results = search.invoke(f"recipe {query}")

        if not raw_results:
            return "No web results found."

        # Format results
        lines = []
        for r in raw_results:
            if isinstance(r, dict):
                title = r.get("title", "Untitled")
                snippet = r.get("snippet", r.get("body", ""))
                link = r.get("link", r.get("href", ""))
                lines.append(f"• {title}\n  {snippet}\n  Source: {link}")
            else:
                lines.append(f"• {r}")

        return "\n\n".join(lines) if lines else "No web results found."

    except Exception as e:
        return f"Web search unavailable: {str(e)}"


# ────────────────────────────────────────────
# Main RAG class
# ────────────────────────────────────────────
class MealPlannerRAG:
    """Conversational RAG pipeline for meal planning."""

    def __init__(self, github_token: str, model_name: str = "openai/gpt-4o-mini"):
        self.llm = ChatOpenAI(
            base_url=GITHUB_MODELS_BASE_URL,
            api_key=github_token,
            model=model_name,
            temperature=0.7,
            max_tokens=1500,
        )
        self.retriever = build_recipe_retriever(k=5)
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", SYSTEM_PROMPT),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ])
        self.chain = self.prompt | self.llm | StrOutputParser()

    def query(self, user_input: str, chat_history: list[dict] | None = None) -> dict:
        """
        Run the full RAG pipeline:
          1. Retrieve matching recipes (BM25)
          2. Search the web (DuckDuckGo)
          3. Build augmented prompt
          4. Generate response via LLM

        Returns dict with keys: answer, retrieved_recipes, web_results
        """
        # 1. Retrieve recipes
        retrieved_docs = self.retriever.invoke(user_input)
        recipe_context = "\n\n---\n\n".join(
            doc.page_content for doc in retrieved_docs
        ) if retrieved_docs else "No matching recipes in the local database."

        retrieved_recipes = [doc.metadata for doc in retrieved_docs]

        # 2. Web search
        web_results = web_search(user_input)

        # 3. Build chat history as LangChain message objects
        lc_history = []
        if chat_history:
            for msg in chat_history:
                if msg["role"] == "user":
                    lc_history.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    lc_history.append(AIMessage(content=msg["content"]))

        # 4. Generate
        answer = self.chain.invoke({
            "input": user_input,
            "recipe_context": recipe_context,
            "web_context": web_results,
            "chat_history": lc_history,
        })

        return {
            "answer": answer,
            "retrieved_recipes": retrieved_recipes,
            "web_results": web_results,
        }
