"""
Chef Buddy — Conversational RAG Meal Planner
Streamlit app with LangChain RAG, DuckDuckGo search, and GitHub Models LLM.
"""

import streamlit as st
from rag_pipeline import MealPlannerRAG

# ─── Page Config ───────────────────────────────────────────
st.set_page_config(
    page_title="Chef Buddy — Meal Planner",
    page_icon="🍳",
    layout="centered",
    initial_sidebar_state="expanded",
)

# ─── Custom CSS ────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

/* ── Global ── */
.stApp {
    font-family: 'Inter', sans-serif;
}

/* ── Header ── */
.chef-header {
    text-align: center;
    padding: 1.5rem 1rem 1rem 1rem;
}
.chef-header .logo {
    font-size: 3.5rem;
    line-height: 1;
    animation: float 3s ease-in-out infinite;
}
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
}
.chef-header h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ff6b35, #f7c948);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0.3rem 0 0.2rem 0;
}
.chef-header .subtitle {
    color: #888;
    font-size: 0.85rem;
}

/* ── Feature cards ── */
.feature-row {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin: 1.2rem auto;
    max-width: 520px;
    flex-wrap: wrap;
}
.feature-card {
    flex: 1;
    min-width: 130px;
    max-width: 170px;
    background: #1a1a2e;
    border: 1px solid #2a2a4a;
    border-radius: 14px;
    padding: 1rem 0.6rem;
    text-align: center;
    transition: all 0.2s;
}
.feature-card:hover {
    border-color: #ff6b35;
    transform: translateY(-2px);
    box-shadow: 0 0 18px rgba(255,107,53,0.12);
}
.feature-card .icon { font-size: 1.8rem; margin-bottom: 0.3rem; }
.feature-card .label { font-size: 0.72rem; color: #aaa; font-weight: 500; }

/* ── Recipe chips in results ── */
.recipe-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: #1a1a2e;
    border: 1px solid #2a2a4a;
    border-radius: 10px;
    padding: 0.45rem 0.85rem;
    margin: 0.2rem;
    font-size: 0.78rem;
    color: #ccc;
}
.recipe-chip .chip-cuisine {
    color: #ff6b35;
    font-weight: 600;
}

/* ── Sidebar styles ── */
section[data-testid="stSidebar"] {
    background: #0f0f1a;
}
section[data-testid="stSidebar"] .stMarkdown h1,
section[data-testid="stSidebar"] .stMarkdown h2,
section[data-testid="stSidebar"] .stMarkdown h3 {
    font-family: 'Space Grotesk', sans-serif;
}

/* ── Misc polish ── */
.stChatMessage {
    border-radius: 16px !important;
}

div[data-testid="stChatMessageAvatarUser"] {
    background: linear-gradient(135deg, #ff6b35, #f7c948) !important;
}

.stSpinner > div > div {
    border-top-color: #ff6b35 !important;
}

/* ── Status badge ── */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 0.5rem;
}
.status-badge.connected {
    background: rgba(46,196,182,0.1);
    color: #2ec4b6;
    border: 1px solid #2ec4b6;
}
.status-badge.disconnected {
    background: rgba(255,107,53,0.08);
    color: #ff6b35;
    border: 1px solid #ff6b3555;
}
.status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    display: inline-block;
}
.status-dot.on  { background: #2ec4b6; box-shadow: 0 0 6px #2ec4b6; }
.status-dot.off { background: #ff6b35; }
</style>
""", unsafe_allow_html=True)


# ─── Session State Init ───────────────────────────────────
if "messages" not in st.session_state:
    st.session_state.messages = []
if "rag" not in st.session_state:
    st.session_state.rag = None


# ─── Sidebar: Settings ────────────────────────────────────
with st.sidebar:
    st.markdown("## Settings")

    github_token = st.text_input(
        "GitHub Personal Access Token",
        type="password",
        help="Create a token with `models:read` scope at github.com/settings/tokens",
        key="github_token",
    )

    model_options = {
        "GPT-4o Mini (Fast, Free tier)": "openai/gpt-4o-mini",
        "GPT-4o (Powerful)": "openai/gpt-4o",
        "GPT-4.1 (Latest)": "openai/gpt-4.1",
        "GPT-4.1 Mini": "openai/gpt-4.1-mini",
        "GPT-4.1 Nano (Fastest)": "openai/gpt-4.1-nano",
        "Llama 4 Scout 17B": "meta-llama/Llama-4-Scout-17B-16E-Instruct",
        "Llama 4 Maverick 17B": "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        "DeepSeek R1": "deepseek/DeepSeek-R1",
        "DeepSeek V3": "deepseek/DeepSeek-V3-0324",
        "Phi-4 (Microsoft)": "microsoft/Phi-4",
        "Mistral Small 24B": "mistral-ai/Mistral-Small-24B-Instruct-2501",
        "Cohere Command A": "cohere/cohere-command-a",
    }

    selected_label = st.selectbox(
        "AI Model (GitHub Marketplace)",
        options=list(model_options.keys()),
        index=0,
        help="Models from github.com/marketplace/models",
    )
    selected_model = model_options[selected_label]

    # Connection status
    if github_token:
        st.markdown(
            '<div class="status-badge connected">'
            '<span class="status-dot on"></span> Connected to GitHub Models'
            '</div>',
            unsafe_allow_html=True,
        )
        # Initialize or reinitialize RAG pipeline
        if (
            st.session_state.rag is None
            or st.session_state.get("_last_token") != github_token
            or st.session_state.get("_last_model") != selected_model
        ):
            st.session_state.rag = MealPlannerRAG(github_token, selected_model)
            st.session_state._last_token = github_token
            st.session_state._last_model = selected_model
    else:
        st.markdown(
            '<div class="status-badge disconnected">'
            '<span class="status-dot off"></span> No API Key — enter your GitHub PAT above'
            '</div>',
            unsafe_allow_html=True,
        )
        st.session_state.rag = None

    st.divider()

    if st.button("Clear Chat", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

    st.divider()

    st.markdown("### How it works")
    st.markdown(
        "1. **You type** your ingredients or a question\n"
        "2. **BM25 retriever** searches 40+ local recipes\n"
        "3. **DuckDuckGo** searches the web for more ideas\n"
        "4. **LLM** (via GitHub Models) generates a personalised answer"
    )

    st.divider()
    st.caption(
        "Powered by [LangChain](https://langchain.com) + "
        "[GitHub Models](https://github.com/marketplace/models)"
    )


# ─── Main Area: Header ────────────────────────────────────
if not st.session_state.messages:
    st.markdown(
        """
        <div class="chef-header">
            <div class="logo">👨‍🍳</div>
            <h1>What's in your kitchen?</h1>
            <p class="subtitle">
                Tell me your ingredients and I'll find the perfect recipe.
                <br>Powered by RAG retrieval, DuckDuckGo search, and AI generation.
            </p>
        </div>
        <div class="feature-row">
            <div class="feature-card">
                <div class="icon">🔍</div>
                <div class="label">BM25 Recipe Search</div>
            </div>
            <div class="feature-card">
                <div class="icon">🦆</div>
                <div class="label">DuckDuckGo Web</div>
            </div>
            <div class="feature-card">
                <div class="icon">🧠</div>
                <div class="label">LLM Generation</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

# ─── Suggestion chips (only when chat is empty) ───────────
if not st.session_state.messages:
    suggestions = [
        ("🍗", "I have chicken, rice, and garlic"),
        ("🧀", "I have eggs, bread, and cheese"),
        ("🍝", "I have pasta, tomatoes, and onion"),
        ("⚡", "What's a quick easy dinner?"),
        ("🥗", "I want something healthy and vegetarian"),
    ]

    cols = st.columns(len(suggestions))
    for col, (emoji, text) in zip(cols, suggestions):
        with col:
            if st.button(f"{emoji} {text.split(',')[0].replace('I have ', '')}", key=text, use_container_width=True):
                st.session_state.messages.append({"role": "user", "content": text})
                st.rerun()


# ─── Display chat history ─────────────────────────────────
for msg in st.session_state.messages:
    avatar = "👨‍🍳" if msg["role"] == "assistant" else None
    with st.chat_message(msg["role"], avatar=avatar):
        st.markdown(msg["content"])

        # Show recipe chips for assistant messages
        if msg["role"] == "assistant" and msg.get("recipes"):
            chips_html = "".join(
                f'<span class="recipe-chip">'
                f'{r.get("name", "Recipe")} '
                f'<span class="chip-cuisine">{r.get("cuisine", "")}</span>'
                f'</span>'
                for r in msg["recipes"][:5]
            )
            st.markdown(chips_html, unsafe_allow_html=True)


# ─── Chat input ───────────────────────────────────────────
if prompt := st.chat_input("Tell me your ingredients, e.g. 'I have chicken, garlic, and rice'"):
    # Add user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Generate response
    with st.chat_message("assistant", avatar="👨‍🍳"):
        if st.session_state.rag is None:
            response_text = (
                "I need a **GitHub Personal Access Token** to generate AI responses.\n\n"
                "**Setup (takes 30 seconds):**\n"
                "1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)\n"
                "2. Click **Generate new token (classic)**\n"
                "3. Check the **`models:read`** scope\n"
                "4. Copy the token and paste it in the sidebar\n\n"
                "I'll be ready to cook as soon as you connect! 🍳"
            )
            st.markdown(response_text)
            st.session_state.messages.append({
                "role": "assistant",
                "content": response_text,
            })
        else:
            with st.spinner("Searching recipes & the web..."):
                try:
                    result = st.session_state.rag.query(
                        prompt,
                        chat_history=st.session_state.messages[:-1],  # exclude current message
                    )
                    answer = result["answer"]
                    recipes = result.get("retrieved_recipes", [])

                    st.markdown(answer)

                    # Show recipe chips
                    if recipes:
                        chips_html = "".join(
                            f'<span class="recipe-chip">'
                            f'{r.get("name", "Recipe")} '
                            f'<span class="chip-cuisine">{r.get("cuisine", "")}</span>'
                            f'</span>'
                            for r in recipes[:5]
                        )
                        st.markdown(chips_html, unsafe_allow_html=True)

                    st.session_state.messages.append({
                        "role": "assistant",
                        "content": answer,
                        "recipes": recipes,
                    })

                except Exception as e:
                    error_str = str(e)
                    if "401" in error_str or "403" in error_str:
                        error_msg = (
                            "**Authentication error.** Your GitHub token may be invalid "
                            "or missing the `models:read` scope. "
                            "Please update it in the sidebar."
                        )
                    elif "429" in error_str:
                        error_msg = (
                            "**Rate limit reached.** GitHub's free tier has usage limits. "
                            "Please wait a moment and try again."
                        )
                    else:
                        error_msg = f"**Error:** {error_str}\n\nPlease check your settings and try again."

                    st.error(error_msg)
                    st.session_state.messages.append({
                        "role": "assistant",
                        "content": error_msg,
                    })
