/**
 * Recipe Knowledge Base
 * A comprehensive collection of recipes organized for RAG retrieval.
 * Each recipe includes ingredients, instructions, metadata, and tags for matching.
 */

const RECIPE_DATABASE = [
  // ==================== BREAKFAST ====================
  {
    id: "classic-pancakes",
    name: "Classic Fluffy Pancakes",
    category: "Breakfast",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "1.5 cups all-purpose flour",
      "3.5 tsp baking powder",
      "1 tbsp sugar",
      "1/4 tsp salt",
      "1.25 cups milk",
      "1 egg",
      "3 tbsp melted butter"
    ],
    keyIngredients: ["flour", "milk", "egg", "butter", "baking powder", "sugar"],
    instructions: [
      "In a large bowl, sift together flour, baking powder, sugar, and salt.",
      "Make a well in the center and pour in milk, egg, and melted butter. Mix until smooth.",
      "Heat a lightly oiled griddle or pan over medium-high heat.",
      "Pour batter onto the griddle, using approximately 1/4 cup for each pancake.",
      "Cook until bubbles form on surface, then flip and cook until browned on the other side."
    ],
    tags: ["quick", "easy", "kids-friendly", "vegetarian", "classic"],
    emoji: "🥞",
    description: "Light, fluffy, and golden pancakes perfect for a weekend breakfast."
  },
  {
    id: "scrambled-eggs",
    name: "Perfect Scrambled Eggs",
    category: "Breakfast",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "2 min",
    cookTime: "5 min",
    servings: 2,
    ingredients: [
      "4 large eggs",
      "2 tbsp butter",
      "2 tbsp milk or cream",
      "Salt and pepper to taste"
    ],
    keyIngredients: ["eggs", "butter", "milk"],
    instructions: [
      "Crack eggs into a bowl. Add milk, salt, and pepper. Whisk until well combined.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in egg mixture. Let it sit for 20 seconds without stirring.",
      "Using a spatula, gently push eggs from edges to center, forming soft curds.",
      "Remove from heat while still slightly wet — they'll continue cooking from residual heat."
    ],
    tags: ["quick", "easy", "5-minute", "vegetarian", "protein", "keto"],
    emoji: "🍳",
    description: "Creamy, soft scrambled eggs that melt in your mouth."
  },
  {
    id: "french-toast",
    name: "French Toast",
    category: "Breakfast",
    cuisine: "French",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 4,
    ingredients: [
      "4 slices thick bread",
      "2 eggs",
      "1/2 cup milk",
      "1 tsp vanilla extract",
      "1 tsp cinnamon",
      "2 tbsp butter",
      "Maple syrup for serving"
    ],
    keyIngredients: ["bread", "eggs", "milk", "cinnamon", "vanilla", "butter"],
    instructions: [
      "Whisk together eggs, milk, vanilla, and cinnamon in a shallow dish.",
      "Heat butter in a skillet over medium heat.",
      "Dip each bread slice into the egg mixture, coating both sides.",
      "Cook for 2-3 minutes per side until golden brown.",
      "Serve with maple syrup, fresh berries, or powdered sugar."
    ],
    tags: ["quick", "easy", "kids-friendly", "vegetarian", "sweet"],
    emoji: "🍞",
    description: "Golden, custard-soaked bread slices with warm cinnamon flavor."
  },
  {
    id: "avocado-toast",
    name: "Loaded Avocado Toast",
    category: "Breakfast",
    cuisine: "Modern",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "3 min",
    servings: 2,
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1 tbsp lemon juice",
      "Red pepper flakes",
      "Salt and pepper",
      "2 eggs (optional, for topping)",
      "Cherry tomatoes (optional)"
    ],
    keyIngredients: ["avocado", "bread", "lemon", "eggs"],
    instructions: [
      "Toast bread until golden and crispy.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread avocado mixture generously on toast.",
      "Top with a fried or poached egg if desired.",
      "Sprinkle with red pepper flakes and any additional toppings."
    ],
    tags: ["quick", "healthy", "trendy", "vegetarian", "vegan-option"],
    emoji: "🥑",
    description: "Creamy avocado on crunchy toast — simple, healthy, and satisfying."
  },
  {
    id: "omelette",
    name: "Veggie Omelette",
    category: "Breakfast",
    cuisine: "French",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "8 min",
    servings: 1,
    ingredients: [
      "3 eggs",
      "2 tbsp milk",
      "1/4 cup diced bell pepper",
      "1/4 cup diced onion",
      "1/4 cup shredded cheese",
      "Handful of spinach",
      "1 tbsp butter",
      "Salt and pepper"
    ],
    keyIngredients: ["eggs", "bell pepper", "onion", "cheese", "spinach", "butter"],
    instructions: [
      "Whisk eggs with milk, salt, and pepper.",
      "Melt butter in a non-stick pan over medium heat.",
      "Sauté bell pepper and onion for 2 minutes.",
      "Pour in egg mixture, tilting pan to spread evenly.",
      "When edges set, add spinach and cheese to one half.",
      "Fold omelette in half and cook 1 more minute. Serve immediately."
    ],
    tags: ["quick", "protein", "vegetarian", "low-carb", "keto"],
    emoji: "🍳",
    description: "A fluffy omelette packed with fresh vegetables and melted cheese."
  },

  // ==================== LUNCH ====================
  {
    id: "chicken-caesar-salad",
    name: "Chicken Caesar Salad",
    category: "Lunch",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    ingredients: [
      "2 chicken breasts",
      "1 large head romaine lettuce",
      "1/2 cup Caesar dressing",
      "1/2 cup croutons",
      "1/4 cup grated Parmesan cheese",
      "1 lemon",
      "2 tbsp olive oil",
      "Salt and pepper"
    ],
    keyIngredients: ["chicken", "lettuce", "parmesan", "croutons", "lemon", "olive oil"],
    instructions: [
      "Season chicken with salt, pepper, and olive oil. Grill or pan-sear for 6-7 minutes per side.",
      "Let chicken rest 5 minutes, then slice into strips.",
      "Chop romaine lettuce and place in a large bowl.",
      "Toss lettuce with Caesar dressing.",
      "Top with sliced chicken, croutons, Parmesan, and a squeeze of lemon."
    ],
    tags: ["salad", "protein", "healthy", "classic", "meal-prep"],
    emoji: "🥗",
    description: "Crisp romaine, tender chicken, and creamy Caesar dressing — a timeless combination."
  },
  {
    id: "grilled-cheese",
    name: "Ultimate Grilled Cheese Sandwich",
    category: "Lunch",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "3 min",
    cookTime: "8 min",
    servings: 1,
    ingredients: [
      "2 slices sourdough bread",
      "2 slices cheddar cheese",
      "1 slice Swiss cheese",
      "2 tbsp butter",
      "1 tsp Dijon mustard (optional)"
    ],
    keyIngredients: ["bread", "cheddar cheese", "swiss cheese", "butter"],
    instructions: [
      "Butter one side of each bread slice generously.",
      "Place one slice butter-side down in a skillet over medium-low heat.",
      "Layer cheeses on top. Spread mustard on the other slice if using.",
      "Place second slice on top, butter-side up.",
      "Cook 3-4 minutes per side until golden and cheese is melted."
    ],
    tags: ["quick", "easy", "comfort-food", "kids-friendly", "vegetarian"],
    emoji: "🧀",
    description: "Crispy, buttery bread with gooey melted cheese — comfort food at its finest."
  },
  {
    id: "fried-rice",
    name: "Quick Fried Rice",
    category: "Lunch",
    cuisine: "Chinese",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "10 min",
    servings: 4,
    ingredients: [
      "3 cups cooked rice (day-old preferred)",
      "2 eggs",
      "1 cup mixed vegetables (peas, carrots, corn)",
      "3 green onions, sliced",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced"
    ],
    keyIngredients: ["rice", "eggs", "vegetables", "soy sauce", "garlic", "green onions", "sesame oil"],
    instructions: [
      "Heat vegetable oil in a wok or large skillet over high heat.",
      "Scramble eggs, break into pieces, and set aside.",
      "Stir-fry garlic and vegetables for 2 minutes.",
      "Add rice, breaking up any clumps. Stir-fry for 3-4 minutes.",
      "Add soy sauce and sesame oil. Toss to combine.",
      "Return eggs to the wok. Garnish with green onions."
    ],
    tags: ["quick", "easy", "leftover-friendly", "meal-prep", "asian"],
    emoji: "🍚",
    description: "The perfect way to transform leftover rice into a satisfying meal."
  },
  {
    id: "blt-sandwich",
    name: "Classic BLT Sandwich",
    category: "Lunch",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    ingredients: [
      "6 slices bacon",
      "4 slices bread, toasted",
      "2 leaves lettuce",
      "4 slices tomato",
      "2 tbsp mayonnaise",
      "Salt and pepper"
    ],
    keyIngredients: ["bacon", "bread", "lettuce", "tomato", "mayonnaise"],
    instructions: [
      "Cook bacon in a skillet over medium heat until crispy. Drain on paper towels.",
      "Toast bread slices until golden.",
      "Spread mayonnaise on each slice of toast.",
      "Layer lettuce, tomato, and bacon on one slice.",
      "Season with salt and pepper, top with second slice, and cut diagonally."
    ],
    tags: ["classic", "quick", "sandwich", "comfort-food"],
    emoji: "🥪",
    description: "The classic combination of crispy bacon, fresh lettuce, and ripe tomato."
  },
  {
    id: "quesadilla",
    name: "Chicken Quesadilla",
    category: "Lunch",
    cuisine: "Mexican",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    ingredients: [
      "2 large flour tortillas",
      "1 cup shredded cooked chicken",
      "1 cup shredded Mexican cheese blend",
      "1/4 cup diced bell pepper",
      "1/4 cup diced onion",
      "2 tbsp salsa",
      "1 tbsp butter or oil",
      "Sour cream for serving"
    ],
    keyIngredients: ["tortillas", "chicken", "cheese", "bell pepper", "onion", "salsa"],
    instructions: [
      "Place a tortilla in a dry skillet over medium heat.",
      "Sprinkle cheese over the entire tortilla.",
      "Add chicken, bell pepper, onion, and salsa to one half.",
      "Fold tortilla in half and press down gently.",
      "Cook 2-3 minutes per side until golden and cheese is melted.",
      "Cut into wedges and serve with sour cream."
    ],
    tags: ["quick", "easy", "kids-friendly", "mexican", "leftover-friendly"],
    emoji: "🌮",
    description: "Crispy tortilla filled with melted cheese and seasoned chicken."
  },

  // ==================== DINNER ====================
  {
    id: "spaghetti-bolognese",
    name: "Spaghetti Bolognese",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: "10 min",
    cookTime: "30 min",
    servings: 4,
    ingredients: [
      "400g spaghetti",
      "500g ground beef",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 can (400g) crushed tomatoes",
      "2 tbsp tomato paste",
      "1 tsp dried oregano",
      "1 tsp dried basil",
      "1/2 cup red wine (optional)",
      "2 tbsp olive oil",
      "Salt and pepper",
      "Parmesan cheese for serving"
    ],
    keyIngredients: ["spaghetti", "pasta", "ground beef", "tomatoes", "onion", "garlic", "tomato paste"],
    instructions: [
      "Cook spaghetti according to package directions. Drain and set aside.",
      "Heat olive oil in a large pan. Brown ground beef, breaking it into crumbles.",
      "Add onion and garlic. Cook until onion is soft, about 5 minutes.",
      "Stir in crushed tomatoes, tomato paste, oregano, basil, and wine if using.",
      "Simmer for 20 minutes, stirring occasionally. Season with salt and pepper.",
      "Serve sauce over spaghetti, topped with freshly grated Parmesan."
    ],
    tags: ["classic", "comfort-food", "family", "italian", "hearty"],
    emoji: "🍝",
    description: "A rich, meaty tomato sauce over perfectly cooked pasta — Italian comfort food."
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir-Fry",
    category: "Dinner",
    cuisine: "Asian",
    difficulty: "Easy",
    prepTime: "15 min",
    cookTime: "10 min",
    servings: 4,
    ingredients: [
      "2 chicken breasts, sliced thin",
      "2 cups broccoli florets",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "3 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tbsp cornstarch",
      "2 cloves garlic, minced",
      "1 tbsp fresh ginger, minced",
      "2 tbsp vegetable oil",
      "Cooked rice for serving"
    ],
    keyIngredients: ["chicken", "broccoli", "bell pepper", "carrot", "soy sauce", "garlic", "ginger", "rice"],
    instructions: [
      "Mix soy sauce, oyster sauce, and cornstarch in a small bowl.",
      "Heat oil in a wok over high heat. Stir-fry chicken until golden, 4-5 minutes. Remove.",
      "Add more oil. Stir-fry garlic and ginger for 30 seconds.",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "Return chicken to wok. Pour sauce over and toss until thickened.",
      "Serve hot over steamed rice."
    ],
    tags: ["healthy", "quick", "protein", "asian", "meal-prep"],
    emoji: "🥘",
    description: "Tender chicken and crisp vegetables in a savory sauce."
  },
  {
    id: "beef-tacos",
    name: "Beef Tacos",
    category: "Dinner",
    cuisine: "Mexican",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "500g ground beef",
      "8 taco shells or tortillas",
      "1 packet taco seasoning (or 2 tsp chili powder, 1 tsp cumin, 1/2 tsp garlic powder)",
      "1 cup shredded lettuce",
      "1 cup diced tomatoes",
      "1 cup shredded cheese",
      "1/2 cup sour cream",
      "1/2 cup salsa",
      "1 onion, diced"
    ],
    keyIngredients: ["ground beef", "taco shells", "tortillas", "lettuce", "tomatoes", "cheese", "onion"],
    instructions: [
      "Brown ground beef with diced onion in a skillet over medium-high heat.",
      "Drain excess fat. Add taco seasoning and 1/4 cup water.",
      "Simmer for 5 minutes until sauce thickens.",
      "Warm taco shells according to package directions.",
      "Fill shells with seasoned beef.",
      "Top with lettuce, tomatoes, cheese, sour cream, and salsa."
    ],
    tags: ["quick", "easy", "kids-friendly", "mexican", "family", "fun"],
    emoji: "🌮",
    description: "Seasoned beef in crispy shells with all the classic toppings."
  },
  {
    id: "garlic-butter-salmon",
    name: "Garlic Butter Salmon",
    category: "Dinner",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "15 min",
    servings: 2,
    ingredients: [
      "2 salmon fillets",
      "3 tbsp butter",
      "4 cloves garlic, minced",
      "2 tbsp lemon juice",
      "1 tbsp fresh parsley, chopped",
      "Salt and pepper",
      "Lemon wedges for serving"
    ],
    keyIngredients: ["salmon", "butter", "garlic", "lemon", "parsley"],
    instructions: [
      "Season salmon with salt and pepper.",
      "Melt butter in an oven-safe skillet over medium-high heat.",
      "Sear salmon skin-side up for 3 minutes until golden.",
      "Flip salmon. Add garlic and cook for 1 minute.",
      "Pour lemon juice over fish. Transfer to oven at 400°F for 8 minutes.",
      "Garnish with parsley and serve with lemon wedges."
    ],
    tags: ["healthy", "protein", "omega-3", "elegant", "date-night", "keto"],
    emoji: "🐟",
    description: "Perfectly seared salmon in a rich garlic butter sauce."
  },
  {
    id: "margherita-pizza",
    name: "Homemade Margherita Pizza",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: "20 min",
    cookTime: "12 min",
    servings: 4,
    ingredients: [
      "2.5 cups all-purpose flour",
      "1 tsp instant yeast",
      "1 tsp sugar",
      "1 tsp salt",
      "1 cup warm water",
      "2 tbsp olive oil",
      "1/2 cup pizza sauce or crushed tomatoes",
      "2 cups fresh mozzarella, sliced",
      "Fresh basil leaves",
      "Extra virgin olive oil for drizzling"
    ],
    keyIngredients: ["flour", "yeast", "mozzarella", "tomatoes", "basil", "olive oil"],
    instructions: [
      "Mix flour, yeast, sugar, and salt. Add water and olive oil. Knead 8 minutes until smooth.",
      "Let dough rest 30 minutes (or up to 24 hours in the fridge for better flavor).",
      "Preheat oven to 500°F (260°C) with a baking sheet or pizza stone inside.",
      "Stretch dough into a 12-inch circle on parchment paper.",
      "Spread sauce, leaving a 1-inch border. Add mozzarella slices.",
      "Bake 10-12 minutes until crust is golden and cheese is bubbly.",
      "Top with fresh basil and a drizzle of olive oil."
    ],
    tags: ["italian", "classic", "family", "fun", "vegetarian", "weekend"],
    emoji: "🍕",
    description: "Authentic Italian pizza with fresh mozzarella and basil on a crispy crust."
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken (Murgh Makhani)",
    category: "Dinner",
    cuisine: "Indian",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 4,
    ingredients: [
      "500g chicken thighs, cubed",
      "1 cup plain yogurt",
      "2 tbsp lemon juice",
      "2 tsp garam masala",
      "1 tsp turmeric",
      "1 tsp chili powder",
      "3 tbsp butter",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 can (400g) crushed tomatoes",
      "1 cup heavy cream",
      "1 tsp sugar",
      "Fresh cilantro",
      "Naan or rice for serving"
    ],
    keyIngredients: ["chicken", "yogurt", "tomatoes", "cream", "butter", "garlic", "ginger", "garam masala", "onion"],
    instructions: [
      "Marinate chicken in yogurt, lemon juice, turmeric, chili powder, and half the garam masala for 30 minutes.",
      "Melt butter in a large pan. Cook chicken until browned. Remove and set aside.",
      "In the same pan, sauté onion, garlic, and ginger until fragrant.",
      "Add crushed tomatoes, remaining garam masala, and sugar. Simmer 15 minutes.",
      "Stir in cream and return chicken to the pan. Simmer 10 minutes.",
      "Garnish with cilantro. Serve with warm naan or basmati rice."
    ],
    tags: ["indian", "curry", "comfort-food", "restaurant-quality", "date-night"],
    emoji: "🍛",
    description: "Tender chicken in a rich, creamy tomato sauce — the crown jewel of Indian cuisine."
  },
  {
    id: "pasta-carbonara",
    name: "Spaghetti Carbonara",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "400g spaghetti",
      "200g pancetta or bacon, diced",
      "4 egg yolks",
      "1 cup grated Pecorino Romano or Parmesan",
      "Freshly cracked black pepper",
      "2 cloves garlic, whole",
      "1 tbsp olive oil"
    ],
    keyIngredients: ["spaghetti", "pasta", "bacon", "pancetta", "eggs", "parmesan", "pecorino", "garlic"],
    instructions: [
      "Cook spaghetti in salted water until al dente. Reserve 1 cup pasta water.",
      "While pasta cooks, whisk egg yolks with grated cheese and plenty of black pepper.",
      "Cook pancetta with olive oil and garlic until crispy. Discard garlic.",
      "Add hot drained pasta to the pancetta pan. Remove from heat.",
      "Quickly pour egg mixture over pasta, tossing vigorously. Add pasta water as needed.",
      "The residual heat creates a silky sauce. Serve immediately with extra cheese and pepper."
    ],
    tags: ["italian", "classic", "elegant", "quick", "restaurant-quality"],
    emoji: "🍝",
    description: "The authentic Roman pasta with a silky egg and cheese sauce."
  },
  {
    id: "thai-green-curry",
    name: "Thai Green Curry",
    category: "Dinner",
    cuisine: "Thai",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
    ingredients: [
      "2 chicken breasts, sliced",
      "1 can (400ml) coconut milk",
      "3 tbsp green curry paste",
      "1 cup bamboo shoots",
      "1 bell pepper, sliced",
      "1 cup green beans, trimmed",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "Fresh Thai basil leaves",
      "Jasmine rice for serving"
    ],
    keyIngredients: ["chicken", "coconut milk", "green curry paste", "bell pepper", "green beans", "fish sauce", "basil", "rice"],
    instructions: [
      "Scoop thick cream from top of coconut milk into a hot pan. Cook 2 minutes until oil separates.",
      "Add curry paste and fry for 1 minute until fragrant.",
      "Add chicken and cook 5 minutes until no longer pink.",
      "Pour in remaining coconut milk. Add vegetables, fish sauce, and sugar.",
      "Simmer 10 minutes until vegetables are tender.",
      "Stir in Thai basil. Serve over jasmine rice."
    ],
    tags: ["thai", "curry", "spicy", "coconut", "asian", "gluten-free"],
    emoji: "🍛",
    description: "A fragrant, creamy curry with tender chicken and crisp vegetables."
  },

  // ==================== SIDES & SNACKS ====================
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    category: "Side",
    cuisine: "Italian",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 4,
    ingredients: [
      "1 French baguette",
      "4 tbsp butter, softened",
      "3 cloves garlic, minced",
      "2 tbsp fresh parsley, chopped",
      "1/4 cup grated Parmesan (optional)"
    ],
    keyIngredients: ["bread", "baguette", "butter", "garlic", "parsley"],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Mix softened butter with garlic, parsley, and Parmesan if using.",
      "Slice baguette in half lengthwise.",
      "Spread garlic butter generously on cut sides.",
      "Bake for 10-12 minutes until golden and crispy."
    ],
    tags: ["quick", "easy", "side-dish", "italian", "kids-friendly"],
    emoji: "🧄",
    description: "Warm, crispy bread with fragrant garlic butter."
  },
  {
    id: "guacamole",
    name: "Fresh Guacamole",
    category: "Snack",
    cuisine: "Mexican",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 4,
    ingredients: [
      "3 ripe avocados",
      "1 lime, juiced",
      "1/4 cup diced onion",
      "2 tbsp fresh cilantro, chopped",
      "1 jalapeño, seeded and minced",
      "1 tomato, diced",
      "Salt and pepper",
      "Tortilla chips for serving"
    ],
    keyIngredients: ["avocado", "lime", "onion", "cilantro", "jalapeño", "tomato"],
    instructions: [
      "Halve avocados, remove pits, and scoop into a bowl.",
      "Mash with a fork to desired consistency (chunky or smooth).",
      "Stir in lime juice, onion, cilantro, jalapeño, and tomato.",
      "Season with salt and pepper to taste.",
      "Serve immediately with tortilla chips."
    ],
    tags: ["no-cook", "quick", "healthy", "vegan", "gluten-free", "party"],
    emoji: "🥑",
    description: "Fresh, zesty, and perfectly creamy — the ultimate dip."
  },
  {
    id: "mashed-potatoes",
    name: "Creamy Mashed Potatoes",
    category: "Side",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 6,
    ingredients: [
      "2 lbs potatoes, peeled and quartered",
      "4 tbsp butter",
      "1/2 cup warm milk or cream",
      "2 cloves garlic (optional)",
      "Salt and pepper",
      "Chives for garnish"
    ],
    keyIngredients: ["potatoes", "butter", "milk", "cream", "garlic"],
    instructions: [
      "Boil potatoes (and garlic if using) in salted water until fork-tender, about 15-20 minutes.",
      "Drain well and return to pot.",
      "Add butter and mash until smooth.",
      "Gradually add warm milk, mashing until desired consistency.",
      "Season with salt and pepper. Garnish with chives."
    ],
    tags: ["side-dish", "comfort-food", "classic", "vegetarian", "thanksgiving"],
    emoji: "🥔",
    description: "Ultra-smooth, buttery mashed potatoes — the perfect comfort side dish."
  },
  {
    id: "hummus",
    name: "Classic Hummus",
    category: "Snack",
    cuisine: "Middle Eastern",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 6,
    ingredients: [
      "1 can (15oz) chickpeas, drained and rinsed",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "2 cloves garlic",
      "2 tbsp olive oil",
      "1/2 tsp cumin",
      "Salt to taste",
      "Water as needed",
      "Paprika and olive oil for garnish"
    ],
    keyIngredients: ["chickpeas", "tahini", "lemon", "garlic", "olive oil", "cumin"],
    instructions: [
      "Combine chickpeas, tahini, lemon juice, garlic, olive oil, cumin, and salt in a food processor.",
      "Blend until smooth, adding water a tablespoon at a time until desired consistency.",
      "Taste and adjust seasoning.",
      "Transfer to a bowl, drizzle with olive oil, and sprinkle with paprika.",
      "Serve with pita bread, vegetables, or crackers."
    ],
    tags: ["no-cook", "healthy", "vegan", "gluten-free", "snack", "protein"],
    emoji: "🫘",
    description: "Silky smooth hummus with the perfect balance of tahini and lemon."
  },

  // ==================== SOUPS ====================
  {
    id: "tomato-soup",
    name: "Creamy Tomato Soup",
    category: "Soup",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    ingredients: [
      "2 cans (800g) crushed tomatoes",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp butter",
      "1/2 cup heavy cream",
      "1 tsp dried basil",
      "1 tsp sugar",
      "2 cups vegetable broth",
      "Salt and pepper",
      "Fresh basil for garnish"
    ],
    keyIngredients: ["tomatoes", "onion", "garlic", "cream", "butter", "basil", "broth"],
    instructions: [
      "Melt butter in a large pot. Sauté onion and garlic until soft.",
      "Add crushed tomatoes, broth, dried basil, and sugar.",
      "Bring to a boil, then reduce heat and simmer 20 minutes.",
      "Use an immersion blender to puree until smooth (or transfer to a blender).",
      "Stir in cream. Season with salt and pepper.",
      "Serve hot, garnished with fresh basil. Pair with grilled cheese!"
    ],
    tags: ["comfort-food", "vegetarian", "soup", "winter", "easy"],
    emoji: "🍅",
    description: "Velvety smooth tomato soup that pairs perfectly with a grilled cheese sandwich."
  },
  {
    id: "chicken-noodle-soup",
    name: "Classic Chicken Noodle Soup",
    category: "Soup",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "15 min",
    cookTime: "30 min",
    servings: 6,
    ingredients: [
      "2 chicken breasts",
      "8 cups chicken broth",
      "2 carrots, sliced",
      "2 stalks celery, sliced",
      "1 onion, diced",
      "2 cups egg noodles",
      "2 cloves garlic, minced",
      "1 tbsp olive oil",
      "1 tsp dried thyme",
      "1 bay leaf",
      "Salt and pepper",
      "Fresh parsley"
    ],
    keyIngredients: ["chicken", "broth", "noodles", "carrots", "celery", "onion", "garlic"],
    instructions: [
      "Heat olive oil in a large pot. Sauté onion, carrots, and celery for 5 minutes.",
      "Add garlic and cook 1 minute more.",
      "Pour in chicken broth. Add chicken breasts, thyme, and bay leaf.",
      "Bring to a boil, then simmer 15 minutes until chicken is cooked through.",
      "Remove chicken, shred with forks, and return to pot.",
      "Add noodles and cook 8 minutes until tender. Season with salt and pepper.",
      "Garnish with fresh parsley."
    ],
    tags: ["comfort-food", "classic", "soup", "healing", "winter", "family"],
    emoji: "🍲",
    description: "The ultimate comfort soup — warm, nourishing, and soul-soothing."
  },

  // ==================== DESSERTS ====================
  {
    id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    category: "Dessert",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "15 min",
    cookTime: "12 min",
    servings: 24,
    ingredients: [
      "2.25 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup sugar",
      "3/4 cup brown sugar",
      "2 eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    keyIngredients: ["flour", "butter", "sugar", "brown sugar", "eggs", "chocolate chips", "vanilla"],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Whisk flour, baking soda, and salt together.",
      "Cream butter with both sugars until fluffy. Beat in eggs and vanilla.",
      "Gradually mix in flour mixture. Fold in chocolate chips.",
      "Drop rounded tablespoons onto ungreased baking sheets.",
      "Bake 9-12 minutes until golden brown. Cool on baking sheet 2 minutes before transferring."
    ],
    tags: ["dessert", "baking", "kids-friendly", "classic", "cookie"],
    emoji: "🍪",
    description: "Crispy edges, chewy centers, and loaded with chocolate chips."
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    category: "Dessert",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "60 min",
    servings: 8,
    ingredients: [
      "3 ripe bananas, mashed",
      "1/3 cup melted butter",
      "3/4 cup sugar",
      "1 egg",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "Pinch of salt",
      "1.5 cups all-purpose flour",
      "1/2 cup walnuts, chopped (optional)"
    ],
    keyIngredients: ["bananas", "flour", "butter", "sugar", "egg", "vanilla"],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease a 9x5 loaf pan.",
      "Mash bananas in a mixing bowl. Stir in melted butter.",
      "Mix in sugar, egg, and vanilla.",
      "Sprinkle in baking soda and salt. Mix well.",
      "Gently fold in flour. Add walnuts if using.",
      "Pour into prepared pan. Bake 55-65 minutes until a toothpick comes out clean.",
      "Cool in pan for 10 minutes before removing."
    ],
    tags: ["baking", "easy", "leftover-friendly", "kids-friendly", "snack"],
    emoji: "🍌",
    description: "Moist, sweet, and the best way to use overripe bananas."
  },
  {
    id: "mug-cake",
    name: "5-Minute Chocolate Mug Cake",
    category: "Dessert",
    cuisine: "Modern",
    difficulty: "Easy",
    prepTime: "3 min",
    cookTime: "2 min",
    servings: 1,
    ingredients: [
      "4 tbsp all-purpose flour",
      "4 tbsp sugar",
      "2 tbsp cocoa powder",
      "1 egg",
      "3 tbsp milk",
      "3 tbsp vegetable oil",
      "1/4 tsp vanilla extract",
      "Pinch of salt"
    ],
    keyIngredients: ["flour", "sugar", "cocoa powder", "egg", "milk", "oil"],
    instructions: [
      "In a large microwave-safe mug, whisk flour, sugar, cocoa powder, and salt.",
      "Add egg, milk, oil, and vanilla. Mix until smooth.",
      "Microwave on high for 90 seconds to 2 minutes.",
      "Let cool for 1 minute (the mug will be hot!).",
      "Top with whipped cream, ice cream, or powdered sugar."
    ],
    tags: ["quick", "easy", "single-serving", "dessert", "microwave", "5-minute"],
    emoji: "🍫",
    description: "A warm, fudgy chocolate cake ready in just 5 minutes."
  },

  // ==================== VEGETARIAN / VEGAN ====================
  {
    id: "vegetable-curry",
    name: "Chickpea & Vegetable Curry",
    category: "Dinner",
    cuisine: "Indian",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    ingredients: [
      "1 can (15oz) chickpeas, drained",
      "1 can (400ml) coconut milk",
      "1 can (400g) diced tomatoes",
      "2 cups spinach",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp curry powder",
      "1 tsp turmeric",
      "1 tsp cumin",
      "1 tbsp olive oil",
      "Salt and pepper",
      "Rice or naan for serving"
    ],
    keyIngredients: ["chickpeas", "coconut milk", "tomatoes", "spinach", "onion", "garlic", "curry powder"],
    instructions: [
      "Heat olive oil in a large pot. Sauté onion until translucent.",
      "Add garlic, curry powder, turmeric, and cumin. Cook 1 minute until fragrant.",
      "Add diced tomatoes and coconut milk. Stir well.",
      "Add chickpeas. Simmer for 20 minutes until sauce thickens.",
      "Stir in spinach until wilted. Season with salt and pepper.",
      "Serve over rice or with warm naan bread."
    ],
    tags: ["vegan", "vegetarian", "healthy", "curry", "indian", "gluten-free", "protein"],
    emoji: "🍛",
    description: "A hearty, fragrant curry packed with protein and vegetables."
  },
  {
    id: "caprese-salad",
    name: "Caprese Salad",
    category: "Side",
    cuisine: "Italian",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 4,
    ingredients: [
      "3 large ripe tomatoes, sliced",
      "8 oz fresh mozzarella, sliced",
      "Fresh basil leaves",
      "3 tbsp extra virgin olive oil",
      "1 tbsp balsamic vinegar",
      "Salt and pepper"
    ],
    keyIngredients: ["tomatoes", "mozzarella", "basil", "olive oil", "balsamic vinegar"],
    instructions: [
      "Alternate slices of tomato and mozzarella on a platter.",
      "Tuck fresh basil leaves between slices.",
      "Drizzle with olive oil and balsamic vinegar.",
      "Season with salt and freshly cracked pepper.",
      "Serve immediately at room temperature."
    ],
    tags: ["no-cook", "quick", "italian", "vegetarian", "elegant", "summer"],
    emoji: "🍅",
    description: "A beautiful Italian salad celebrating fresh tomatoes, mozzarella, and basil."
  },
  {
    id: "veggie-pasta",
    name: "Roasted Vegetable Pasta",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Easy",
    prepTime: "15 min",
    cookTime: "25 min",
    servings: 4,
    ingredients: [
      "400g penne or fusilli pasta",
      "1 zucchini, diced",
      "1 bell pepper, diced",
      "1 cup cherry tomatoes",
      "1 red onion, sliced",
      "3 cloves garlic, minced",
      "3 tbsp olive oil",
      "1/2 cup grated Parmesan",
      "Fresh basil",
      "Salt and pepper",
      "Red pepper flakes (optional)"
    ],
    keyIngredients: ["pasta", "zucchini", "bell pepper", "tomatoes", "onion", "garlic", "parmesan", "olive oil"],
    instructions: [
      "Preheat oven to 425°F. Toss vegetables with olive oil, salt, and pepper on a baking sheet.",
      "Roast for 20-25 minutes until caramelized.",
      "Meanwhile, cook pasta according to package directions. Reserve 1/2 cup pasta water.",
      "Toss hot pasta with roasted vegetables, Parmesan, and pasta water as needed.",
      "Top with fresh basil and red pepper flakes."
    ],
    tags: ["vegetarian", "easy", "healthy", "italian", "meal-prep"],
    emoji: "🍝",
    description: "Sweet roasted vegetables tossed with pasta and Parmesan."
  },

  // ==================== INTERNATIONAL ====================
  {
    id: "pad-thai",
    name: "Pad Thai",
    category: "Dinner",
    cuisine: "Thai",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "250g rice noodles",
      "200g shrimp or chicken (or tofu)",
      "2 eggs",
      "1 cup bean sprouts",
      "3 green onions, sliced",
      "1/4 cup crushed peanuts",
      "2 tbsp fish sauce",
      "2 tbsp tamarind paste",
      "1 tbsp sugar",
      "1 tbsp lime juice",
      "2 cloves garlic, minced",
      "2 tbsp vegetable oil",
      "Lime wedges and cilantro for serving"
    ],
    keyIngredients: ["rice noodles", "shrimp", "chicken", "tofu", "eggs", "bean sprouts", "peanuts", "fish sauce", "tamarind"],
    instructions: [
      "Soak rice noodles in warm water for 20 minutes. Drain.",
      "Mix fish sauce, tamarind paste, sugar, and lime juice for the sauce.",
      "Heat oil in a wok. Cook protein until done. Set aside.",
      "Scramble eggs in the wok. Add garlic and noodles.",
      "Pour sauce over noodles and toss. Cook 2-3 minutes.",
      "Return protein, add bean sprouts and green onions. Toss.",
      "Serve with crushed peanuts, lime wedges, and cilantro."
    ],
    tags: ["thai", "noodles", "asian", "restaurant-quality", "classic"],
    emoji: "🍜",
    description: "Sweet, sour, and savory Thai noodles with the perfect balance of flavors."
  },
  {
    id: "bibimbap",
    name: "Korean Bibimbap",
    category: "Dinner",
    cuisine: "Korean",
    difficulty: "Medium",
    prepTime: "20 min",
    cookTime: "20 min",
    servings: 4,
    ingredients: [
      "4 cups cooked short-grain rice",
      "200g ground beef or sliced beef",
      "2 cups spinach",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "1 cup bean sprouts",
      "4 eggs",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 tbsp gochujang (Korean chili paste)",
      "2 cloves garlic, minced",
      "Sesame seeds"
    ],
    keyIngredients: ["rice", "beef", "spinach", "carrot", "zucchini", "eggs", "soy sauce", "sesame oil", "gochujang"],
    instructions: [
      "Marinate beef in 1 tbsp soy sauce, sesame oil, and garlic. Cook in a hot pan. Set aside.",
      "Sauté each vegetable separately with a bit of oil, seasoning lightly with salt and sesame oil.",
      "Blanch spinach and bean sprouts briefly. Season with soy sauce and sesame oil.",
      "Fry eggs sunny-side up.",
      "Arrange rice in bowls. Top with vegetables, beef, and a fried egg.",
      "Serve with gochujang on the side. Mix everything together before eating!"
    ],
    tags: ["korean", "rice-bowl", "colorful", "healthy", "asian"],
    emoji: "🍚",
    description: "A vibrant Korean rice bowl with vegetables, meat, and a spicy chili sauce."
  },
  {
    id: "falafel",
    name: "Homemade Falafel",
    category: "Dinner",
    cuisine: "Middle Eastern",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "2 cans (30oz) chickpeas, drained",
      "1 onion, roughly chopped",
      "4 cloves garlic",
      "1 cup fresh parsley",
      "1 cup fresh cilantro",
      "1 tsp cumin",
      "1 tsp coriander",
      "1/4 tsp cayenne pepper",
      "2 tbsp flour",
      "Oil for frying",
      "Pita bread and tahini sauce for serving"
    ],
    keyIngredients: ["chickpeas", "onion", "garlic", "parsley", "cilantro", "cumin"],
    instructions: [
      "Pulse chickpeas, onion, garlic, parsley, and cilantro in a food processor until coarse (not smooth).",
      "Mix in cumin, coriander, cayenne, flour, salt, and pepper.",
      "Refrigerate mixture for 30 minutes for easier handling.",
      "Form into small patties or balls.",
      "Pan-fry in 1/2 inch of oil for 3-4 minutes per side until golden brown.",
      "Serve in pita bread with tahini sauce, tomatoes, and pickled onions."
    ],
    tags: ["middle-eastern", "vegan", "protein", "street-food", "meal-prep"],
    emoji: "🧆",
    description: "Crispy on the outside, herb-packed on the inside — classic Middle Eastern street food."
  },
  {
    id: "shakshuka",
    name: "Shakshuka",
    category: "Breakfast",
    cuisine: "Middle Eastern",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "20 min",
    servings: 4,
    ingredients: [
      "6 eggs",
      "1 can (400g) crushed tomatoes",
      "1 onion, diced",
      "1 bell pepper, diced",
      "3 cloves garlic, minced",
      "1 tsp cumin",
      "1 tsp paprika",
      "1/2 tsp chili flakes",
      "2 tbsp olive oil",
      "Fresh cilantro",
      "Crusty bread for serving",
      "Feta cheese (optional)"
    ],
    keyIngredients: ["eggs", "tomatoes", "onion", "bell pepper", "garlic", "cumin", "paprika"],
    instructions: [
      "Heat olive oil in a large skillet. Sauté onion and bell pepper until soft.",
      "Add garlic, cumin, paprika, and chili flakes. Cook 1 minute.",
      "Pour in crushed tomatoes. Simmer 10 minutes until sauce thickens.",
      "Make 6 wells in the sauce. Crack an egg into each well.",
      "Cover and cook 5-8 minutes until egg whites are set but yolks are still runny.",
      "Crumble feta over top if using. Garnish with cilantro. Serve with crusty bread."
    ],
    tags: ["middle-eastern", "breakfast", "brunch", "one-pan", "vegetarian", "healthy"],
    emoji: "🍳",
    description: "Eggs poached in a spiced tomato sauce — a Middle Eastern breakfast staple."
  },

  // ==================== MORE RECIPES ====================
  {
    id: "fish-and-chips",
    name: "Fish and Chips",
    category: "Dinner",
    cuisine: "British",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 4,
    ingredients: [
      "4 white fish fillets (cod or haddock)",
      "1 cup all-purpose flour",
      "1 cup cold sparkling water or beer",
      "1 tsp baking powder",
      "4 large potatoes, cut into chips",
      "Oil for deep frying",
      "Salt and pepper",
      "Malt vinegar and lemon wedges for serving"
    ],
    keyIngredients: ["fish", "cod", "flour", "potatoes", "oil", "beer"],
    instructions: [
      "Cut potatoes into thick chips. Soak in cold water 30 minutes, then pat dry.",
      "Deep fry chips at 325°F for 5 minutes to par-cook. Drain and set aside.",
      "Mix flour, baking powder, salt, and sparkling water/beer to make batter.",
      "Dip fish in a light dusting of flour, then into the batter.",
      "Deep fry fish at 375°F for 5-7 minutes until golden and crispy.",
      "Fry chips again at 375°F for 3-4 minutes until golden and crispy.",
      "Season with salt. Serve with malt vinegar and lemon wedges."
    ],
    tags: ["british", "classic", "fried", "comfort-food", "pub-food"],
    emoji: "🐟",
    description: "Crispy battered fish with golden, fluffy chips — a British classic."
  },
  {
    id: "mushroom-risotto",
    name: "Mushroom Risotto",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: "10 min",
    cookTime: "30 min",
    servings: 4,
    ingredients: [
      "1.5 cups arborio rice",
      "8 oz mushrooms, sliced",
      "4 cups warm chicken or vegetable broth",
      "1/2 cup dry white wine",
      "1 onion, finely diced",
      "3 cloves garlic, minced",
      "3 tbsp butter",
      "1/2 cup grated Parmesan",
      "2 tbsp olive oil",
      "Fresh thyme",
      "Salt and pepper"
    ],
    keyIngredients: ["arborio rice", "rice", "mushrooms", "broth", "wine", "onion", "garlic", "parmesan", "butter"],
    instructions: [
      "Heat olive oil and 1 tbsp butter. Sauté mushrooms until golden. Set aside.",
      "In the same pot, sauté onion until translucent. Add garlic and cook 1 minute.",
      "Add rice and toast for 2 minutes, stirring constantly.",
      "Pour in wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring frequently. Wait until each addition is absorbed.",
      "After about 18-20 minutes, rice should be creamy and al dente.",
      "Stir in mushrooms, remaining butter, and Parmesan. Season and serve."
    ],
    tags: ["italian", "elegant", "comfort-food", "date-night", "vegetarian-option"],
    emoji: "🍄",
    description: "Creamy, luxurious risotto with earthy mushrooms and Parmesan."
  },
  {
    id: "bruschetta",
    name: "Classic Bruschetta",
    category: "Snack",
    cuisine: "Italian",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "5 min",
    servings: 4,
    ingredients: [
      "1 baguette, sliced",
      "4 ripe tomatoes, diced",
      "2 cloves garlic (1 whole, 1 minced)",
      "Fresh basil, chopped",
      "2 tbsp extra virgin olive oil",
      "1 tbsp balsamic vinegar",
      "Salt and pepper"
    ],
    keyIngredients: ["bread", "baguette", "tomatoes", "garlic", "basil", "olive oil", "balsamic vinegar"],
    instructions: [
      "Mix diced tomatoes, minced garlic, basil, olive oil, and balsamic vinegar. Season with salt and pepper.",
      "Let the topping sit for 15 minutes for flavors to meld.",
      "Toast baguette slices under a broiler until golden.",
      "Rub each toast with the cut side of a garlic clove.",
      "Spoon tomato mixture onto each toast. Serve immediately."
    ],
    tags: ["italian", "appetizer", "quick", "vegetarian", "party", "summer"],
    emoji: "🍅",
    description: "Toasted bread topped with fresh tomatoes, garlic, and basil."
  },
  {
    id: "ramen",
    name: "Quick Homestyle Ramen",
    category: "Dinner",
    cuisine: "Japanese",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    ingredients: [
      "2 packs ramen noodles (discard flavor packets)",
      "4 cups chicken broth",
      "2 tbsp soy sauce",
      "1 tbsp miso paste (optional)",
      "1 tsp sesame oil",
      "2 soft-boiled eggs",
      "1 cup spinach or bok choy",
      "2 green onions, sliced",
      "1 clove garlic, minced",
      "1 tsp ginger, grated",
      "Nori sheets and sesame seeds for garnish"
    ],
    keyIngredients: ["ramen noodles", "noodles", "broth", "soy sauce", "miso", "eggs", "spinach", "garlic", "ginger"],
    instructions: [
      "Bring broth to a boil. Add soy sauce, miso paste, garlic, ginger, and sesame oil.",
      "Simmer 5 minutes to develop flavor.",
      "Cook ramen noodles according to package directions. Drain.",
      "Soft-boil eggs: boil 6.5 minutes, then ice bath. Peel and halve.",
      "Divide noodles into bowls. Ladle hot broth over noodles.",
      "Top with eggs, greens, green onions, nori, and sesame seeds."
    ],
    tags: ["japanese", "noodles", "soup", "comfort-food", "asian", "quick"],
    emoji: "🍜",
    description: "A warm, soul-satisfying bowl of homemade ramen."
  },
  {
    id: "chili-con-carne",
    name: "Hearty Chili Con Carne",
    category: "Dinner",
    cuisine: "Tex-Mex",
    difficulty: "Easy",
    prepTime: "15 min",
    cookTime: "45 min",
    servings: 6,
    ingredients: [
      "1 lb ground beef",
      "1 can (15oz) kidney beans, drained",
      "1 can (15oz) black beans, drained",
      "1 can (28oz) crushed tomatoes",
      "1 onion, diced",
      "1 bell pepper, diced",
      "3 cloves garlic, minced",
      "2 tbsp chili powder",
      "1 tsp cumin",
      "1 tsp paprika",
      "1/2 tsp cayenne",
      "Salt and pepper",
      "Sour cream, cheese, and green onions for topping"
    ],
    keyIngredients: ["ground beef", "kidney beans", "black beans", "tomatoes", "onion", "bell pepper", "garlic", "chili powder"],
    instructions: [
      "Brown ground beef in a large pot. Drain excess fat.",
      "Add onion, bell pepper, and garlic. Cook 5 minutes.",
      "Stir in all spices and cook 1 minute until fragrant.",
      "Add crushed tomatoes, kidney beans, and black beans.",
      "Bring to a boil, then reduce heat and simmer 30-45 minutes.",
      "Season with salt and pepper. The longer it simmers, the better it gets!",
      "Serve with sour cream, shredded cheese, and green onions."
    ],
    tags: ["tex-mex", "comfort-food", "hearty", "one-pot", "game-day", "meal-prep"],
    emoji: "🌶️",
    description: "A thick, spicy chili loaded with beef, beans, and bold flavors."
  },
  {
    id: "greek-salad",
    name: "Greek Salad",
    category: "Side",
    cuisine: "Greek",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 4,
    ingredients: [
      "3 large tomatoes, chopped",
      "1 cucumber, sliced",
      "1 red onion, thinly sliced",
      "1 cup Kalamata olives",
      "200g feta cheese, cubed",
      "1 green bell pepper, sliced",
      "3 tbsp extra virgin olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper"
    ],
    keyIngredients: ["tomatoes", "cucumber", "onion", "olives", "feta cheese", "olive oil"],
    instructions: [
      "Combine tomatoes, cucumber, onion, bell pepper, and olives in a large bowl.",
      "Add cubed feta cheese on top.",
      "Whisk together olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Drizzle dressing over salad.",
      "Serve immediately — do not toss, as is traditional."
    ],
    tags: ["no-cook", "healthy", "mediterranean", "vegetarian", "summer", "quick"],
    emoji: "🥗",
    description: "Fresh, vibrant, and full of Mediterranean flavors."
  },
  {
    id: "mac-and-cheese",
    name: "Creamy Mac and Cheese",
    category: "Dinner",
    cuisine: "American",
    difficulty: "Easy",
    prepTime: "5 min",
    cookTime: "20 min",
    servings: 6,
    ingredients: [
      "400g elbow macaroni",
      "3 tbsp butter",
      "3 tbsp all-purpose flour",
      "2.5 cups milk",
      "2 cups shredded sharp cheddar cheese",
      "1 cup shredded Gruyère or mozzarella",
      "1 tsp mustard powder",
      "1/2 tsp paprika",
      "Salt and pepper"
    ],
    keyIngredients: ["macaroni", "pasta", "cheddar cheese", "cheese", "butter", "milk", "flour"],
    instructions: [
      "Cook macaroni according to package directions. Drain.",
      "In the same pot, melt butter over medium heat. Whisk in flour and cook 1 minute.",
      "Gradually whisk in milk. Cook until thickened, about 5 minutes.",
      "Remove from heat. Stir in cheeses, mustard, paprika, salt, and pepper until smooth.",
      "Add cooked macaroni and stir to coat.",
      "Optional: Transfer to a baking dish, top with breadcrumbs, and broil until golden."
    ],
    tags: ["comfort-food", "kids-friendly", "classic", "vegetarian", "cheese"],
    emoji: "🧀",
    description: "Ultra creamy, cheesy pasta that kids and adults alike can't resist."
  },
  {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    category: "Dinner",
    cuisine: "Italian-American",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "10 min",
    servings: 4,
    ingredients: [
      "1 lb large shrimp, peeled and deveined",
      "300g linguine or spaghetti",
      "4 tbsp butter",
      "3 tbsp olive oil",
      "6 cloves garlic, minced",
      "1/2 cup dry white wine",
      "Juice of 1 lemon",
      "1/4 tsp red pepper flakes",
      "Fresh parsley, chopped",
      "Salt and pepper"
    ],
    keyIngredients: ["shrimp", "pasta", "linguine", "butter", "garlic", "wine", "lemon"],
    instructions: [
      "Cook pasta according to package directions. Reserve 1/2 cup pasta water.",
      "Heat olive oil and 2 tbsp butter in a large skillet. Sauté shrimp 2 minutes per side. Remove.",
      "Add garlic and red pepper flakes. Cook 30 seconds.",
      "Pour in wine and lemon juice. Simmer 2 minutes.",
      "Add remaining butter and pasta water. Stir until sauce comes together.",
      "Toss in pasta and shrimp. Garnish with parsley."
    ],
    tags: ["italian", "seafood", "elegant", "quick", "date-night"],
    emoji: "🦐",
    description: "Succulent shrimp in a garlicky white wine butter sauce over pasta."
  },
  {
    id: "smoothie-bowl",
    name: "Tropical Smoothie Bowl",
    category: "Breakfast",
    cuisine: "Modern",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 2,
    ingredients: [
      "2 frozen bananas",
      "1 cup frozen mango chunks",
      "1/2 cup frozen berries",
      "1/2 cup yogurt or milk",
      "Toppings: granola, sliced banana, coconut flakes, chia seeds, honey"
    ],
    keyIngredients: ["bananas", "mango", "berries", "yogurt", "milk", "granola"],
    instructions: [
      "Blend frozen bananas, mango, berries, and yogurt until thick and smooth.",
      "The mixture should be thicker than a regular smoothie.",
      "Pour into bowls.",
      "Arrange toppings in rows: granola, sliced banana, coconut flakes, chia seeds.",
      "Drizzle with honey and serve immediately."
    ],
    tags: ["no-cook", "healthy", "vegan-option", "tropical", "breakfast", "colorful"],
    emoji: "🥣",
    description: "A thick, fruity smoothie bowl loaded with colorful toppings."
  },
  {
    id: "stuffed-peppers",
    name: "Stuffed Bell Peppers",
    category: "Dinner",
    cuisine: "American",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "35 min",
    servings: 4,
    ingredients: [
      "4 bell peppers, tops removed and seeded",
      "1 lb ground beef or turkey",
      "1 cup cooked rice",
      "1 can (15oz) diced tomatoes",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 cup shredded cheese",
      "1 tsp Italian seasoning",
      "Salt and pepper"
    ],
    keyIngredients: ["bell peppers", "ground beef", "ground turkey", "rice", "tomatoes", "onion", "cheese"],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Brown meat with onion and garlic. Drain excess fat.",
      "Mix in rice, half the tomatoes, Italian seasoning, and half the cheese.",
      "Stuff peppers with the mixture and place in a baking dish.",
      "Pour remaining tomatoes around peppers.",
      "Cover with foil and bake 25 minutes. Remove foil, top with remaining cheese.",
      "Bake 10 more minutes until cheese is bubbly and peppers are tender."
    ],
    tags: ["family", "meal-prep", "balanced", "colorful", "one-dish"],
    emoji: "🫑",
    description: "Colorful peppers stuffed with a savory meat and rice filling."
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RECIPE_DATABASE;
}
