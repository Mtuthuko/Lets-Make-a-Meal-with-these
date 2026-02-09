/**
 * RAG (Retrieval-Augmented Generation) Pipeline
 * Handles recipe retrieval, ranking, and context building for the LLM.
 */

class RAGPipeline {
  constructor(recipes) {
    this.recipes = recipes;
    this.idf = {};
    this.buildIndex();
  }

  // ==================== INDEXING ====================

  /**
   * Build inverted index and IDF scores for BM25 retrieval.
   */
  buildIndex() {
    this.invertedIndex = {};
    const docCount = this.recipes.length;
    const docFreq = {};

    this.recipes.forEach((recipe, idx) => {
      const tokens = this.tokenize(this.getRecipeText(recipe));
      const uniqueTokens = new Set(tokens);

      uniqueTokens.forEach(token => {
        docFreq[token] = (docFreq[token] || 0) + 1;
        if (!this.invertedIndex[token]) this.invertedIndex[token] = [];
        this.invertedIndex[token].push(idx);
      });

      // Store token frequencies per document for BM25
      recipe._tokenFreq = {};
      recipe._docLen = tokens.length;
      tokens.forEach(t => {
        recipe._tokenFreq[t] = (recipe._tokenFreq[t] || 0) + 1;
      });
    });

    // Calculate average document length
    this.avgDocLen = this.recipes.reduce((sum, r) => sum + r._docLen, 0) / docCount;

    // Calculate IDF scores
    Object.keys(docFreq).forEach(token => {
      this.idf[token] = Math.log((docCount - docFreq[token] + 0.5) / (docFreq[token] + 0.5) + 1);
    });
  }

  /**
   * Combine all searchable text from a recipe into one string.
   */
  getRecipeText(recipe) {
    return [
      recipe.name,
      recipe.category,
      recipe.cuisine,
      recipe.description,
      ...recipe.keyIngredients,
      ...recipe.ingredients,
      ...recipe.tags
    ].join(' ');
  }

  /**
   * Tokenize and normalize text.
   */
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1)
      .filter(t => !STOP_WORDS.has(t));
  }

  // ==================== RETRIEVAL ====================

  /**
   * Main retrieval function. Uses a combination of:
   * 1. Direct ingredient matching (highest weight)
   * 2. BM25 text search
   * 3. Category/tag boosting
   */
  retrieve(query, topK = 5) {
    const ingredients = this.extractIngredients(query);
    const queryTokens = this.tokenize(query);

    const scores = this.recipes.map((recipe, idx) => {
      let score = 0;

      // 1. Direct ingredient match score (weighted heavily)
      const ingredientScore = this.scoreIngredientMatch(ingredients, recipe);
      score += ingredientScore * 10;

      // 2. BM25 score
      const bm25Score = this.scoreBM25(queryTokens, recipe);
      score += bm25Score;

      // 3. Category/context boosting
      const contextScore = this.scoreContext(queryTokens, recipe);
      score += contextScore * 3;

      return { recipe, score, ingredientMatch: ingredientScore, idx };
    });

    // Sort by score descending and return top K
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(s => s.score > 0);
  }

  /**
   * Extract likely ingredient words from a user query.
   */
  extractIngredients(query) {
    const words = query.toLowerCase().replace(/[^a-z0-9\s,]/g, ' ').split(/[\s,]+/).filter(Boolean);
    const ingredients = [];

    // Common ingredient synonyms and groups
    const synonyms = {
      'chicken': ['chicken', 'poultry'],
      'beef': ['beef', 'ground beef', 'steak'],
      'pork': ['pork', 'bacon', 'pancetta', 'ham'],
      'fish': ['fish', 'cod', 'salmon', 'haddock', 'tuna'],
      'shrimp': ['shrimp', 'prawn', 'prawns'],
      'pasta': ['pasta', 'spaghetti', 'penne', 'linguine', 'macaroni', 'noodles', 'fusilli'],
      'rice': ['rice', 'arborio rice'],
      'cheese': ['cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta', 'swiss cheese', 'pecorino', 'gruyère'],
      'tomato': ['tomato', 'tomatoes', 'cherry tomatoes'],
      'potato': ['potato', 'potatoes'],
      'egg': ['egg', 'eggs'],
      'bread': ['bread', 'baguette', 'sourdough', 'toast'],
      'noodle': ['noodle', 'noodles', 'ramen noodles', 'rice noodles'],
    };

    // Build a flat lookup of synonyms
    const synonymLookup = {};
    Object.entries(synonyms).forEach(([key, values]) => {
      values.forEach(v => { synonymLookup[v] = key; });
    });

    words.forEach(word => {
      // Check if the word is a known ingredient or synonym
      const allIngredients = new Set();
      this.recipes.forEach(r => {
        r.keyIngredients.forEach(ki => allIngredients.add(ki.toLowerCase()));
      });

      if (allIngredients.has(word) || synonymLookup[word]) {
        ingredients.push(synonymLookup[word] || word);
      }
    });

    // Also check multi-word ingredients
    const queryLower = query.toLowerCase();
    const multiWordIngredients = [
      'ground beef', 'ground turkey', 'bell pepper', 'bell peppers', 'olive oil',
      'soy sauce', 'coconut milk', 'green onions', 'green beans', 'baking powder',
      'chocolate chips', 'brown sugar', 'sesame oil', 'fish sauce', 'curry powder',
      'cocoa powder', 'cream cheese', 'rice noodles', 'ramen noodles', 'bean sprouts',
      'chili powder', 'garam masala', 'tomato paste', 'balsamic vinegar',
      'arborio rice', 'taco shells'
    ];

    multiWordIngredients.forEach(ing => {
      if (queryLower.includes(ing)) {
        ingredients.push(ing);
      }
    });

    return [...new Set(ingredients)];
  }

  /**
   * Score how well a recipe matches the given ingredients.
   */
  scoreIngredientMatch(queryIngredients, recipe) {
    if (queryIngredients.length === 0) return 0;

    const recipeIngredients = recipe.keyIngredients.map(i => i.toLowerCase());
    const recipeIngredientsText = recipe.ingredients.join(' ').toLowerCase();

    let matchCount = 0;
    queryIngredients.forEach(qi => {
      const matched = recipeIngredients.some(ri =>
        ri.includes(qi) || qi.includes(ri)
      ) || recipeIngredientsText.includes(qi);

      if (matched) matchCount++;
    });

    // Return ratio of matched ingredients
    return matchCount / queryIngredients.length;
  }

  /**
   * BM25 scoring for text relevance.
   */
  scoreBM25(queryTokens, recipe) {
    const k1 = 1.5;
    const b = 0.75;
    let score = 0;

    queryTokens.forEach(token => {
      const tf = recipe._tokenFreq[token] || 0;
      const idf = this.idf[token] || 0;
      const docLen = recipe._docLen;

      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (docLen / this.avgDocLen));

      score += idf * (numerator / denominator);
    });

    return score;
  }

  /**
   * Context-aware scoring: boost based on meal type, dietary preferences, etc.
   */
  scoreContext(queryTokens, recipe) {
    let boost = 0;

    // Category matching
    const categoryKeywords = {
      'breakfast': 'Breakfast',
      'brunch': 'Breakfast',
      'lunch': 'Lunch',
      'dinner': 'Dinner',
      'dessert': 'Dessert',
      'snack': 'Snack',
      'side': 'Side',
      'soup': 'Soup'
    };

    queryTokens.forEach(token => {
      if (categoryKeywords[token] && recipe.category === categoryKeywords[token]) {
        boost += 2;
      }
    });

    // Dietary preference matching
    const dietaryKeywords = ['vegan', 'vegetarian', 'keto', 'healthy', 'gluten-free', 'low-carb'];
    queryTokens.forEach(token => {
      if (dietaryKeywords.includes(token) && recipe.tags.includes(token)) {
        boost += 2;
      }
    });

    // Cuisine matching
    const cuisineKeywords = ['italian', 'mexican', 'indian', 'thai', 'chinese', 'japanese', 'korean', 'greek', 'british', 'french', 'american'];
    queryTokens.forEach(token => {
      if (cuisineKeywords.includes(token) && recipe.cuisine.toLowerCase().includes(token)) {
        boost += 2;
      }
    });

    // Quick/easy preference
    if (queryTokens.some(t => ['quick', 'fast', 'easy', 'simple'].includes(t))) {
      if (recipe.tags.includes('quick') || recipe.tags.includes('easy') || recipe.difficulty === 'Easy') {
        boost += 1;
      }
    }

    return boost;
  }

  // ==================== CONTEXT BUILDING ====================

  /**
   * Build a context string from retrieved recipes for the LLM.
   */
  buildContext(retrievedRecipes) {
    if (retrievedRecipes.length === 0) {
      return "No matching recipes were found in the knowledge base.";
    }

    return retrievedRecipes.map(({ recipe, ingredientMatch }, i) => {
      const matchPercent = Math.round(ingredientMatch * 100);
      return `--- Recipe ${i + 1}: ${recipe.emoji} ${recipe.name} ---
Category: ${recipe.category} | Cuisine: ${recipe.cuisine} | Difficulty: ${recipe.difficulty}
Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime} | Servings: ${recipe.servings}
${matchPercent > 0 ? `Ingredient Match: ${matchPercent}%` : ''}
Description: ${recipe.description}

Ingredients:
${recipe.ingredients.map(ing => `  • ${ing}`).join('\n')}

Instructions:
${recipe.instructions.map((step, j) => `  ${j + 1}. ${step}`).join('\n')}

Tags: ${recipe.tags.join(', ')}`;
    }).join('\n\n');
  }

  /**
   * Build the full prompt for the LLM with retrieved context.
   */
  buildPrompt(userMessage, conversationHistory = []) {
    const retrieved = this.retrieve(userMessage);
    const context = this.buildContext(retrieved);
    const ingredients = this.extractIngredients(userMessage);

    const systemPrompt = `You are a friendly, enthusiastic chef assistant called "Chef Buddy" who helps people make delicious meals with whatever ingredients they have on hand.

Your personality:
- Warm, encouraging, and passionate about food
- You use cooking metaphors and the occasional food emoji
- You give practical, actionable advice
- You're understanding when people have limited ingredients

Your job:
- Help users find recipes that match their available ingredients
- Suggest creative substitutions when they're missing ingredients
- Provide clear cooking tips and explanations
- Recommend meal combinations and variations

IMPORTANT RULES:
- Base your recipe suggestions on the RETRIEVED RECIPES below
- If the retrieved recipes don't match well, you can suggest general cooking ideas but mention it's from your general knowledge
- Always format recipes clearly with ingredients and numbered steps
- If users are missing a few ingredients from a recipe, suggest practical substitutions
- Be concise but thorough

RETRIEVED RECIPES FROM KNOWLEDGE BASE:
${context}

${ingredients.length > 0 ? `\nDetected ingredients from user: ${ingredients.join(', ')}` : ''}`;

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history (last 10 messages for context window management)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach(msg => {
      messages.push({ role: msg.role, content: msg.content });
    });

    // Add current user message
    messages.push({ role: "user", content: userMessage });

    return { messages, retrieved };
  }
}

// Stop words to filter out during tokenization
const STOP_WORDS = new Set([
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'is', 'am', 'are', 'was', 'were', 'be', 'been',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
  'what', 'which', 'who', 'when', 'where', 'how', 'not', 'no', 'so',
  'if', 'then', 'than', 'too', 'very', 'just', 'about', 'up', 'out',
  'some', 'any', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'into', 'through', 'during', 'before', 'after', 'above',
  'make', 'made', 'want', 'need', 'like', 'got', 'get', 'let', 'use',
  'also', 'here', 'there', 'from', 'only', 'own', 'same', 'such'
]);
