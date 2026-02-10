"""
Recipe Knowledge Base — Structured recipe data for RAG retrieval.
Each recipe is converted into a LangChain Document for the BM25 retriever.
"""

RECIPES = [
    # ──────────── BREAKFAST ────────────
    {
        "name": "Classic Fluffy Pancakes",
        "category": "Breakfast",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "15 min",
        "servings": 4,
        "ingredients": [
            "1.5 cups all-purpose flour", "3.5 tsp baking powder", "1 tbsp sugar",
            "1/4 tsp salt", "1.25 cups milk", "1 egg", "3 tbsp melted butter"
        ],
        "key_ingredients": ["flour", "milk", "egg", "butter", "baking powder", "sugar"],
        "instructions": [
            "Sift together flour, baking powder, sugar, and salt.",
            "Make a well in the center; pour in milk, egg, and melted butter. Mix until smooth.",
            "Heat a lightly oiled griddle over medium-high heat.",
            "Pour ~1/4 cup batter per pancake. Cook until bubbles form, flip, cook until browned."
        ],
        "tags": ["quick", "easy", "kids-friendly", "vegetarian"],
    },
    {
        "name": "Perfect Scrambled Eggs",
        "category": "Breakfast",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "2 min",
        "cook_time": "5 min",
        "servings": 2,
        "ingredients": [
            "4 large eggs", "2 tbsp butter", "2 tbsp milk or cream", "Salt and pepper"
        ],
        "key_ingredients": ["eggs", "butter", "milk"],
        "instructions": [
            "Whisk eggs with milk, salt, and pepper.",
            "Melt butter in a non-stick pan over medium-low heat.",
            "Pour in eggs. Let sit 20 seconds, then gently push from edges to center.",
            "Remove while still slightly wet — residual heat finishes the job."
        ],
        "tags": ["quick", "easy", "5-minute", "vegetarian", "protein", "keto"],
    },
    {
        "name": "French Toast",
        "category": "Breakfast",
        "cuisine": "French",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "10 min",
        "servings": 4,
        "ingredients": [
            "4 slices thick bread", "2 eggs", "1/2 cup milk", "1 tsp vanilla extract",
            "1 tsp cinnamon", "2 tbsp butter", "Maple syrup for serving"
        ],
        "key_ingredients": ["bread", "eggs", "milk", "cinnamon", "vanilla", "butter"],
        "instructions": [
            "Whisk eggs, milk, vanilla, and cinnamon in a shallow dish.",
            "Heat butter in a skillet over medium heat.",
            "Dip each bread slice into the egg mixture, coating both sides.",
            "Cook 2–3 min per side until golden. Serve with syrup."
        ],
        "tags": ["quick", "easy", "kids-friendly", "vegetarian", "sweet"],
    },
    {
        "name": "Loaded Avocado Toast",
        "category": "Breakfast",
        "cuisine": "Modern",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "3 min",
        "servings": 2,
        "ingredients": [
            "2 slices sourdough bread", "1 ripe avocado", "1 tbsp lemon juice",
            "Red pepper flakes", "Salt and pepper", "2 eggs (optional)", "Cherry tomatoes (optional)"
        ],
        "key_ingredients": ["avocado", "bread", "lemon", "eggs"],
        "instructions": [
            "Toast bread until golden and crispy.",
            "Mash avocado with lemon juice, salt, and pepper.",
            "Spread avocado on toast. Top with a fried egg if desired.",
            "Sprinkle with red pepper flakes."
        ],
        "tags": ["quick", "healthy", "vegetarian", "vegan-option"],
    },
    {
        "name": "Veggie Omelette",
        "category": "Breakfast",
        "cuisine": "French",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "8 min",
        "servings": 1,
        "ingredients": [
            "3 eggs", "2 tbsp milk", "1/4 cup diced bell pepper", "1/4 cup diced onion",
            "1/4 cup shredded cheese", "Handful of spinach", "1 tbsp butter", "Salt and pepper"
        ],
        "key_ingredients": ["eggs", "bell pepper", "onion", "cheese", "spinach", "butter"],
        "instructions": [
            "Whisk eggs with milk, salt, and pepper.",
            "Melt butter; sauté bell pepper and onion 2 min.",
            "Pour in eggs, tilt pan to spread evenly.",
            "Add spinach and cheese to one half; fold and cook 1 min more."
        ],
        "tags": ["quick", "protein", "vegetarian", "low-carb", "keto"],
    },
    {
        "name": "Shakshuka",
        "category": "Breakfast",
        "cuisine": "Middle Eastern",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "20 min",
        "servings": 4,
        "ingredients": [
            "6 eggs", "1 can crushed tomatoes", "1 onion, diced", "1 bell pepper, diced",
            "3 cloves garlic", "1 tsp cumin", "1 tsp paprika", "1/2 tsp chili flakes",
            "2 tbsp olive oil", "Fresh cilantro", "Crusty bread", "Feta cheese (optional)"
        ],
        "key_ingredients": ["eggs", "tomatoes", "onion", "bell pepper", "garlic", "cumin", "paprika"],
        "instructions": [
            "Sauté onion and bell pepper in olive oil until soft.",
            "Add garlic, cumin, paprika, chili flakes; cook 1 min.",
            "Pour in tomatoes; simmer 10 min until thick.",
            "Make wells, crack eggs in. Cover; cook 5–8 min until whites are set.",
            "Crumble feta on top; garnish with cilantro. Serve with bread."
        ],
        "tags": ["brunch", "one-pan", "vegetarian", "healthy"],
    },
    {
        "name": "Tropical Smoothie Bowl",
        "category": "Breakfast",
        "cuisine": "Modern",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "0 min",
        "servings": 2,
        "ingredients": [
            "2 frozen bananas", "1 cup frozen mango", "1/2 cup frozen berries",
            "1/2 cup yogurt or milk",
            "Toppings: granola, sliced banana, coconut flakes, chia seeds, honey"
        ],
        "key_ingredients": ["bananas", "mango", "berries", "yogurt", "milk", "granola"],
        "instructions": [
            "Blend frozen fruit and yogurt until thick and smooth.",
            "Pour into bowls.",
            "Arrange toppings in rows. Drizzle with honey."
        ],
        "tags": ["no-cook", "healthy", "vegan-option", "tropical"],
    },

    # ──────────── LUNCH ────────────
    {
        "name": "Chicken Caesar Salad",
        "category": "Lunch",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "15 min",
        "servings": 2,
        "ingredients": [
            "2 chicken breasts", "1 head romaine lettuce", "1/2 cup Caesar dressing",
            "1/2 cup croutons", "1/4 cup grated Parmesan", "1 lemon", "2 tbsp olive oil",
            "Salt and pepper"
        ],
        "key_ingredients": ["chicken", "lettuce", "parmesan", "croutons", "lemon", "olive oil"],
        "instructions": [
            "Season chicken; grill or pan-sear 6–7 min per side. Rest, then slice.",
            "Chop lettuce; toss with Caesar dressing.",
            "Top with chicken, croutons, Parmesan, and lemon squeeze."
        ],
        "tags": ["salad", "protein", "healthy", "classic", "meal-prep"],
    },
    {
        "name": "Ultimate Grilled Cheese",
        "category": "Lunch",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "3 min",
        "cook_time": "8 min",
        "servings": 1,
        "ingredients": [
            "2 slices sourdough bread", "2 slices cheddar cheese", "1 slice Swiss cheese",
            "2 tbsp butter", "1 tsp Dijon mustard (optional)"
        ],
        "key_ingredients": ["bread", "cheddar cheese", "swiss cheese", "butter"],
        "instructions": [
            "Butter one side of each slice. Place butter-side down in skillet.",
            "Layer cheeses. Top with second slice butter-side up.",
            "Cook 3–4 min per side over medium-low until golden and melted."
        ],
        "tags": ["quick", "easy", "comfort-food", "kids-friendly", "vegetarian"],
    },
    {
        "name": "Quick Fried Rice",
        "category": "Lunch",
        "cuisine": "Chinese",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "10 min",
        "servings": 4,
        "ingredients": [
            "3 cups cooked rice (day-old)", "2 eggs", "1 cup mixed vegetables",
            "3 green onions", "3 tbsp soy sauce", "1 tbsp sesame oil",
            "2 tbsp vegetable oil", "2 cloves garlic"
        ],
        "key_ingredients": ["rice", "eggs", "vegetables", "soy sauce", "garlic", "green onions", "sesame oil"],
        "instructions": [
            "Scramble eggs in hot oil; set aside.",
            "Stir-fry garlic and vegetables 2 min.",
            "Add rice; stir-fry 3–4 min. Add soy sauce and sesame oil.",
            "Return eggs; toss. Garnish with green onions."
        ],
        "tags": ["quick", "easy", "leftover-friendly", "asian"],
    },
    {
        "name": "Classic BLT Sandwich",
        "category": "Lunch",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "10 min",
        "servings": 2,
        "ingredients": [
            "6 slices bacon", "4 slices bread, toasted", "2 leaves lettuce",
            "4 slices tomato", "2 tbsp mayonnaise", "Salt and pepper"
        ],
        "key_ingredients": ["bacon", "bread", "lettuce", "tomato", "mayonnaise"],
        "instructions": [
            "Cook bacon until crispy; drain.",
            "Toast bread; spread mayo on each slice.",
            "Layer lettuce, tomato, bacon. Season; close and cut diagonally."
        ],
        "tags": ["classic", "quick", "sandwich", "comfort-food"],
    },
    {
        "name": "Chicken Quesadilla",
        "category": "Lunch",
        "cuisine": "Mexican",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "10 min",
        "servings": 2,
        "ingredients": [
            "2 flour tortillas", "1 cup shredded chicken", "1 cup shredded cheese",
            "1/4 cup diced bell pepper", "1/4 cup diced onion", "2 tbsp salsa",
            "1 tbsp butter", "Sour cream for serving"
        ],
        "key_ingredients": ["tortillas", "chicken", "cheese", "bell pepper", "onion", "salsa"],
        "instructions": [
            "Place tortilla in dry skillet; sprinkle cheese over it.",
            "Add chicken, pepper, onion, salsa to one half.",
            "Fold; cook 2–3 min per side until golden.",
            "Cut into wedges; serve with sour cream."
        ],
        "tags": ["quick", "easy", "kids-friendly", "mexican", "leftover-friendly"],
    },

    # ──────────── DINNER ────────────
    {
        "name": "Spaghetti Bolognese",
        "category": "Dinner",
        "cuisine": "Italian",
        "difficulty": "Medium",
        "prep_time": "10 min",
        "cook_time": "30 min",
        "servings": 4,
        "ingredients": [
            "400g spaghetti", "500g ground beef", "1 onion, diced", "3 cloves garlic",
            "1 can crushed tomatoes", "2 tbsp tomato paste", "1 tsp oregano", "1 tsp basil",
            "1/2 cup red wine (optional)", "2 tbsp olive oil", "Salt and pepper", "Parmesan"
        ],
        "key_ingredients": ["spaghetti", "pasta", "ground beef", "tomatoes", "onion", "garlic", "tomato paste"],
        "instructions": [
            "Cook spaghetti al dente; drain.",
            "Brown beef in olive oil; add onion and garlic until soft.",
            "Stir in tomatoes, paste, herbs, and wine. Simmer 20 min.",
            "Serve sauce over pasta with grated Parmesan."
        ],
        "tags": ["classic", "comfort-food", "family", "italian", "hearty"],
    },
    {
        "name": "Chicken Stir-Fry",
        "category": "Dinner",
        "cuisine": "Asian",
        "difficulty": "Easy",
        "prep_time": "15 min",
        "cook_time": "10 min",
        "servings": 4,
        "ingredients": [
            "2 chicken breasts, sliced", "2 cups broccoli", "1 bell pepper", "1 carrot",
            "3 tbsp soy sauce", "1 tbsp oyster sauce", "1 tbsp cornstarch",
            "2 cloves garlic", "1 tbsp ginger", "2 tbsp vegetable oil", "Rice for serving"
        ],
        "key_ingredients": ["chicken", "broccoli", "bell pepper", "carrot", "soy sauce", "garlic", "ginger", "rice"],
        "instructions": [
            "Mix soy sauce, oyster sauce, cornstarch.",
            "Stir-fry chicken in hot oil 4–5 min; remove.",
            "Stir-fry garlic, ginger, then veggies 3–4 min.",
            "Return chicken; pour sauce over. Toss until thickened. Serve over rice."
        ],
        "tags": ["healthy", "quick", "protein", "asian", "meal-prep"],
    },
    {
        "name": "Beef Tacos",
        "category": "Dinner",
        "cuisine": "Mexican",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "15 min",
        "servings": 4,
        "ingredients": [
            "500g ground beef", "8 taco shells", "2 tsp chili powder", "1 tsp cumin",
            "1 cup shredded lettuce", "1 cup diced tomatoes", "1 cup shredded cheese",
            "1/2 cup sour cream", "1/2 cup salsa", "1 onion, diced"
        ],
        "key_ingredients": ["ground beef", "taco shells", "tortillas", "lettuce", "tomatoes", "cheese", "onion"],
        "instructions": [
            "Brown beef with onion. Drain; add chili powder, cumin, and water. Simmer 5 min.",
            "Warm taco shells. Fill with beef.",
            "Top with lettuce, tomato, cheese, sour cream, and salsa."
        ],
        "tags": ["quick", "easy", "kids-friendly", "mexican", "family"],
    },
    {
        "name": "Garlic Butter Salmon",
        "category": "Dinner",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "15 min",
        "servings": 2,
        "ingredients": [
            "2 salmon fillets", "3 tbsp butter", "4 cloves garlic", "2 tbsp lemon juice",
            "1 tbsp parsley", "Salt and pepper"
        ],
        "key_ingredients": ["salmon", "butter", "garlic", "lemon", "parsley"],
        "instructions": [
            "Season salmon. Sear in butter skin-side up 3 min.",
            "Flip; add garlic, cook 1 min. Pour lemon juice over.",
            "Transfer to 400°F oven for 8 min. Garnish with parsley."
        ],
        "tags": ["healthy", "protein", "elegant", "date-night", "keto"],
    },
    {
        "name": "Butter Chicken (Murgh Makhani)",
        "category": "Dinner",
        "cuisine": "Indian",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "30 min",
        "servings": 4,
        "ingredients": [
            "500g chicken thighs", "1 cup yogurt", "2 tbsp lemon juice",
            "2 tsp garam masala", "1 tsp turmeric", "1 tsp chili powder",
            "3 tbsp butter", "1 onion", "3 cloves garlic", "1 tbsp ginger",
            "1 can crushed tomatoes", "1 cup heavy cream", "1 tsp sugar", "Cilantro", "Naan or rice"
        ],
        "key_ingredients": ["chicken", "yogurt", "tomatoes", "cream", "butter", "garlic", "ginger", "garam masala"],
        "instructions": [
            "Marinate chicken in yogurt, lemon, turmeric, chili, and half the garam masala 30 min.",
            "Brown chicken in butter; set aside.",
            "Sauté onion, garlic, ginger. Add tomatoes, garam masala, sugar. Simmer 15 min.",
            "Stir in cream and chicken. Simmer 10 min. Garnish with cilantro."
        ],
        "tags": ["indian", "curry", "comfort-food", "restaurant-quality"],
    },
    {
        "name": "Spaghetti Carbonara",
        "category": "Dinner",
        "cuisine": "Italian",
        "difficulty": "Medium",
        "prep_time": "10 min",
        "cook_time": "15 min",
        "servings": 4,
        "ingredients": [
            "400g spaghetti", "200g pancetta or bacon", "4 egg yolks",
            "1 cup grated Pecorino or Parmesan", "Black pepper", "2 cloves garlic", "1 tbsp olive oil"
        ],
        "key_ingredients": ["spaghetti", "pasta", "bacon", "pancetta", "eggs", "parmesan", "pecorino", "garlic"],
        "instructions": [
            "Cook spaghetti al dente. Reserve 1 cup pasta water.",
            "Whisk yolks with cheese and pepper.",
            "Crisp pancetta with garlic; discard garlic.",
            "Add drained pasta to pancetta. Remove from heat; pour in egg mixture, tossing vigorously.",
            "Add pasta water to reach silky consistency."
        ],
        "tags": ["italian", "classic", "elegant", "quick", "restaurant-quality"],
    },
    {
        "name": "Thai Green Curry",
        "category": "Dinner",
        "cuisine": "Thai",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "20 min",
        "servings": 4,
        "ingredients": [
            "2 chicken breasts", "1 can coconut milk", "3 tbsp green curry paste",
            "1 cup bamboo shoots", "1 bell pepper", "1 cup green beans",
            "2 tbsp fish sauce", "1 tbsp brown sugar", "Thai basil", "Jasmine rice"
        ],
        "key_ingredients": ["chicken", "coconut milk", "green curry paste", "bell pepper", "green beans", "fish sauce", "rice"],
        "instructions": [
            "Cook thick coconut cream 2 min; fry curry paste 1 min.",
            "Add chicken 5 min. Pour in remaining coconut milk, veggies, fish sauce, sugar.",
            "Simmer 10 min. Stir in basil. Serve over jasmine rice."
        ],
        "tags": ["thai", "curry", "spicy", "coconut", "asian", "gluten-free"],
    },
    {
        "name": "Pad Thai",
        "category": "Dinner",
        "cuisine": "Thai",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "15 min",
        "servings": 4,
        "ingredients": [
            "250g rice noodles", "200g shrimp or chicken or tofu", "2 eggs",
            "1 cup bean sprouts", "3 green onions", "1/4 cup peanuts",
            "2 tbsp fish sauce", "2 tbsp tamarind paste", "1 tbsp sugar",
            "1 tbsp lime juice", "2 cloves garlic", "2 tbsp oil", "Lime wedges and cilantro"
        ],
        "key_ingredients": ["rice noodles", "shrimp", "chicken", "tofu", "eggs", "peanuts", "fish sauce", "tamarind"],
        "instructions": [
            "Soak noodles 20 min. Mix fish sauce, tamarind, sugar, lime for sauce.",
            "Cook protein; set aside. Scramble eggs; add garlic and noodles.",
            "Pour sauce over noodles; toss 2–3 min.",
            "Add protein, bean sprouts, green onions. Serve with peanuts, lime, cilantro."
        ],
        "tags": ["thai", "noodles", "asian", "restaurant-quality"],
    },
    {
        "name": "Korean Bibimbap",
        "category": "Dinner",
        "cuisine": "Korean",
        "difficulty": "Medium",
        "prep_time": "20 min",
        "cook_time": "20 min",
        "servings": 4,
        "ingredients": [
            "4 cups short-grain rice", "200g beef", "2 cups spinach", "1 carrot",
            "1 zucchini", "1 cup bean sprouts", "4 eggs", "3 tbsp soy sauce",
            "1 tbsp sesame oil", "2 tbsp gochujang", "Sesame seeds"
        ],
        "key_ingredients": ["rice", "beef", "spinach", "carrot", "zucchini", "eggs", "soy sauce", "sesame oil", "gochujang"],
        "instructions": [
            "Marinate beef in soy sauce, sesame oil, garlic. Cook; set aside.",
            "Sauté each vegetable separately, season with salt and sesame oil.",
            "Fry eggs sunny-side up.",
            "Arrange rice in bowls; top with veggies, beef, egg. Serve with gochujang."
        ],
        "tags": ["korean", "rice-bowl", "colorful", "healthy", "asian"],
    },
    {
        "name": "Homemade Margherita Pizza",
        "category": "Dinner",
        "cuisine": "Italian",
        "difficulty": "Medium",
        "prep_time": "20 min",
        "cook_time": "12 min",
        "servings": 4,
        "ingredients": [
            "2.5 cups flour", "1 tsp yeast", "1 tsp sugar", "1 tsp salt",
            "1 cup warm water", "2 tbsp olive oil", "1/2 cup pizza sauce",
            "2 cups fresh mozzarella", "Fresh basil"
        ],
        "key_ingredients": ["flour", "yeast", "mozzarella", "tomatoes", "basil", "olive oil"],
        "instructions": [
            "Mix flour, yeast, sugar, salt. Add water and oil; knead 8 min.",
            "Rest 30 min. Preheat oven to 500°F.",
            "Stretch dough; spread sauce; add mozzarella.",
            "Bake 10–12 min. Top with basil and olive oil drizzle."
        ],
        "tags": ["italian", "classic", "family", "vegetarian", "weekend"],
    },
    {
        "name": "Chickpea & Vegetable Curry",
        "category": "Dinner",
        "cuisine": "Indian",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "25 min",
        "servings": 4,
        "ingredients": [
            "1 can chickpeas", "1 can coconut milk", "1 can diced tomatoes",
            "2 cups spinach", "1 onion", "3 cloves garlic", "1 tbsp curry powder",
            "1 tsp turmeric", "1 tsp cumin", "1 tbsp olive oil", "Salt and pepper", "Rice or naan"
        ],
        "key_ingredients": ["chickpeas", "coconut milk", "tomatoes", "spinach", "onion", "garlic", "curry powder"],
        "instructions": [
            "Sauté onion; add garlic, curry powder, turmeric, cumin 1 min.",
            "Add tomatoes and coconut milk. Add chickpeas; simmer 20 min.",
            "Stir in spinach. Season. Serve over rice or with naan."
        ],
        "tags": ["vegan", "vegetarian", "healthy", "indian", "gluten-free", "protein"],
    },
    {
        "name": "Mushroom Risotto",
        "category": "Dinner",
        "cuisine": "Italian",
        "difficulty": "Medium",
        "prep_time": "10 min",
        "cook_time": "30 min",
        "servings": 4,
        "ingredients": [
            "1.5 cups arborio rice", "8 oz mushrooms", "4 cups warm broth",
            "1/2 cup white wine", "1 onion", "3 cloves garlic", "3 tbsp butter",
            "1/2 cup Parmesan", "2 tbsp olive oil", "Fresh thyme"
        ],
        "key_ingredients": ["arborio rice", "rice", "mushrooms", "broth", "wine", "onion", "garlic", "parmesan", "butter"],
        "instructions": [
            "Sauté mushrooms until golden; set aside.",
            "Sauté onion and garlic. Add rice; toast 2 min.",
            "Add wine; stir until absorbed.",
            "Add broth one ladle at a time, stirring, for 18–20 min.",
            "Stir in mushrooms, butter, Parmesan."
        ],
        "tags": ["italian", "elegant", "comfort-food", "date-night", "vegetarian-option"],
    },
    {
        "name": "Quick Homestyle Ramen",
        "category": "Dinner",
        "cuisine": "Japanese",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "15 min",
        "servings": 2,
        "ingredients": [
            "2 packs ramen noodles", "4 cups chicken broth", "2 tbsp soy sauce",
            "1 tbsp miso paste", "1 tsp sesame oil", "2 soft-boiled eggs",
            "Spinach or bok choy", "Green onions", "Garlic", "Ginger", "Nori, sesame seeds"
        ],
        "key_ingredients": ["ramen noodles", "noodles", "broth", "soy sauce", "miso", "eggs", "garlic", "ginger"],
        "instructions": [
            "Boil broth with soy sauce, miso, garlic, ginger, sesame oil 5 min.",
            "Cook noodles separately; drain.",
            "Soft-boil eggs 6.5 min; ice bath; peel; halve.",
            "Place noodles in bowls; ladle broth. Top with eggs, greens, nori, sesame."
        ],
        "tags": ["japanese", "noodles", "soup", "comfort-food", "asian", "quick"],
    },
    {
        "name": "Hearty Chili Con Carne",
        "category": "Dinner",
        "cuisine": "Tex-Mex",
        "difficulty": "Easy",
        "prep_time": "15 min",
        "cook_time": "45 min",
        "servings": 6,
        "ingredients": [
            "1 lb ground beef", "1 can kidney beans", "1 can black beans",
            "1 can crushed tomatoes", "1 onion", "1 bell pepper", "3 cloves garlic",
            "2 tbsp chili powder", "1 tsp cumin", "1 tsp paprika", "Sour cream, cheese, green onions"
        ],
        "key_ingredients": ["ground beef", "kidney beans", "black beans", "tomatoes", "onion", "bell pepper", "garlic", "chili powder"],
        "instructions": [
            "Brown beef; drain. Add onion, pepper, garlic 5 min.",
            "Add spices 1 min. Add tomatoes and beans.",
            "Simmer 30–45 min. Season. Top with sour cream, cheese, green onions."
        ],
        "tags": ["tex-mex", "comfort-food", "hearty", "one-pot", "meal-prep"],
    },
    {
        "name": "Creamy Mac and Cheese",
        "category": "Dinner",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "20 min",
        "servings": 6,
        "ingredients": [
            "400g elbow macaroni", "3 tbsp butter", "3 tbsp flour", "2.5 cups milk",
            "2 cups sharp cheddar", "1 cup Gruyère or mozzarella",
            "1 tsp mustard powder", "1/2 tsp paprika"
        ],
        "key_ingredients": ["macaroni", "pasta", "cheddar cheese", "cheese", "butter", "milk", "flour"],
        "instructions": [
            "Cook macaroni; drain.",
            "Melt butter; whisk in flour 1 min. Gradually whisk in milk until thick.",
            "Remove from heat; stir in cheeses, mustard, paprika.",
            "Stir in macaroni. Optionally broil with breadcrumbs."
        ],
        "tags": ["comfort-food", "kids-friendly", "classic", "vegetarian"],
    },
    {
        "name": "Shrimp Scampi",
        "category": "Dinner",
        "cuisine": "Italian-American",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "10 min",
        "servings": 4,
        "ingredients": [
            "1 lb large shrimp", "300g linguine", "4 tbsp butter", "3 tbsp olive oil",
            "6 cloves garlic", "1/2 cup white wine", "Juice of 1 lemon",
            "Red pepper flakes", "Fresh parsley"
        ],
        "key_ingredients": ["shrimp", "pasta", "linguine", "butter", "garlic", "wine", "lemon"],
        "instructions": [
            "Cook pasta; reserve 1/2 cup water.",
            "Sauté shrimp in butter and oil 2 min/side; remove.",
            "Add garlic and pepper flakes 30 sec. Add wine and lemon; simmer 2 min.",
            "Add remaining butter and pasta water. Toss in pasta and shrimp."
        ],
        "tags": ["italian", "seafood", "elegant", "quick", "date-night"],
    },
    {
        "name": "Fish and Chips",
        "category": "Dinner",
        "cuisine": "British",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "20 min",
        "servings": 4,
        "ingredients": [
            "4 white fish fillets (cod)", "1 cup flour", "1 cup cold sparkling water or beer",
            "1 tsp baking powder", "4 potatoes", "Oil for frying", "Salt", "Malt vinegar, lemon"
        ],
        "key_ingredients": ["fish", "cod", "flour", "potatoes", "oil", "beer"],
        "instructions": [
            "Cut potatoes into chips; par-fry at 325°F 5 min.",
            "Mix flour, baking powder, salt, and sparkling water/beer for batter.",
            "Dip fish in flour then batter; deep fry at 375°F 5–7 min.",
            "Re-fry chips at 375°F until golden. Serve with vinegar and lemon."
        ],
        "tags": ["british", "classic", "fried", "comfort-food"],
    },
    {
        "name": "Stuffed Bell Peppers",
        "category": "Dinner",
        "cuisine": "American",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "35 min",
        "servings": 4,
        "ingredients": [
            "4 bell peppers", "1 lb ground beef or turkey", "1 cup cooked rice",
            "1 can diced tomatoes", "1 onion", "2 cloves garlic", "1 cup cheese", "Italian seasoning"
        ],
        "key_ingredients": ["bell peppers", "ground beef", "ground turkey", "rice", "tomatoes", "onion", "cheese"],
        "instructions": [
            "Brown meat with onion and garlic.",
            "Mix in rice, half the tomatoes, seasoning, half the cheese.",
            "Stuff peppers; place in baking dish with remaining tomatoes.",
            "Bake covered 25 min at 375°F. Top with cheese; bake 10 more min."
        ],
        "tags": ["family", "meal-prep", "balanced", "one-dish"],
    },

    # ──────────── SIDES & SNACKS ────────────
    {
        "name": "Garlic Bread",
        "category": "Side",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "prep_time": "5 min",
        "cook_time": "10 min",
        "servings": 4,
        "ingredients": [
            "1 baguette", "4 tbsp butter", "3 cloves garlic", "2 tbsp parsley", "Parmesan (optional)"
        ],
        "key_ingredients": ["bread", "baguette", "butter", "garlic", "parsley"],
        "instructions": [
            "Mix softened butter with garlic, parsley, Parmesan.",
            "Slice baguette in half; spread butter mixture.",
            "Bake at 375°F for 10–12 min until golden."
        ],
        "tags": ["quick", "easy", "side-dish", "italian", "kids-friendly"],
    },
    {
        "name": "Fresh Guacamole",
        "category": "Snack",
        "cuisine": "Mexican",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "0 min",
        "servings": 4,
        "ingredients": [
            "3 ripe avocados", "1 lime", "1/4 cup diced onion", "2 tbsp cilantro",
            "1 jalapeño", "1 tomato", "Salt and pepper", "Tortilla chips"
        ],
        "key_ingredients": ["avocado", "lime", "onion", "cilantro", "jalapeño", "tomato"],
        "instructions": [
            "Mash avocados with lime juice.",
            "Stir in onion, cilantro, jalapeño, tomato.",
            "Season. Serve with tortilla chips."
        ],
        "tags": ["no-cook", "quick", "healthy", "vegan", "gluten-free", "party"],
    },
    {
        "name": "Creamy Mashed Potatoes",
        "category": "Side",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "20 min",
        "servings": 6,
        "ingredients": [
            "2 lbs potatoes", "4 tbsp butter", "1/2 cup warm milk or cream",
            "2 cloves garlic (optional)", "Salt and pepper", "Chives"
        ],
        "key_ingredients": ["potatoes", "butter", "milk", "cream", "garlic"],
        "instructions": [
            "Boil potatoes until fork-tender, 15–20 min. Drain.",
            "Add butter; mash. Gradually add warm milk to desired consistency.",
            "Season. Garnish with chives."
        ],
        "tags": ["side-dish", "comfort-food", "classic", "vegetarian"],
    },
    {
        "name": "Classic Hummus",
        "category": "Snack",
        "cuisine": "Middle Eastern",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "0 min",
        "servings": 6,
        "ingredients": [
            "1 can chickpeas", "1/4 cup tahini", "2 tbsp lemon juice",
            "2 cloves garlic", "2 tbsp olive oil", "1/2 tsp cumin", "Salt", "Paprika for garnish"
        ],
        "key_ingredients": ["chickpeas", "tahini", "lemon", "garlic", "olive oil", "cumin"],
        "instructions": [
            "Blend chickpeas, tahini, lemon, garlic, olive oil, cumin until smooth.",
            "Add water for desired consistency.",
            "Drizzle olive oil; sprinkle paprika. Serve with pita or veggies."
        ],
        "tags": ["no-cook", "healthy", "vegan", "gluten-free", "protein"],
    },
    {
        "name": "Classic Bruschetta",
        "category": "Snack",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "5 min",
        "servings": 4,
        "ingredients": [
            "1 baguette", "4 ripe tomatoes", "2 cloves garlic",
            "Fresh basil", "2 tbsp olive oil", "1 tbsp balsamic vinegar", "Salt and pepper"
        ],
        "key_ingredients": ["bread", "baguette", "tomatoes", "garlic", "basil", "olive oil", "balsamic vinegar"],
        "instructions": [
            "Mix diced tomatoes, minced garlic, basil, olive oil, balsamic. Let sit 15 min.",
            "Toast baguette slices. Rub with garlic.",
            "Spoon tomato mixture onto each toast."
        ],
        "tags": ["italian", "appetizer", "quick", "vegetarian", "party"],
    },
    {
        "name": "Caprese Salad",
        "category": "Side",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "0 min",
        "servings": 4,
        "ingredients": [
            "3 tomatoes", "8 oz fresh mozzarella", "Fresh basil",
            "3 tbsp olive oil", "1 tbsp balsamic vinegar", "Salt and pepper"
        ],
        "key_ingredients": ["tomatoes", "mozzarella", "basil", "olive oil", "balsamic vinegar"],
        "instructions": [
            "Alternate slices of tomato and mozzarella.",
            "Tuck basil between slices.",
            "Drizzle olive oil and balsamic. Season."
        ],
        "tags": ["no-cook", "quick", "italian", "vegetarian", "elegant"],
    },
    {
        "name": "Greek Salad",
        "category": "Side",
        "cuisine": "Greek",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "0 min",
        "servings": 4,
        "ingredients": [
            "3 tomatoes", "1 cucumber", "1 red onion", "1 cup Kalamata olives",
            "200g feta cheese", "1 bell pepper", "3 tbsp olive oil",
            "1 tbsp red wine vinegar", "1 tsp oregano"
        ],
        "key_ingredients": ["tomatoes", "cucumber", "onion", "olives", "feta cheese", "olive oil"],
        "instructions": [
            "Combine tomatoes, cucumber, onion, pepper, olives.",
            "Top with feta. Whisk oil, vinegar, oregano.",
            "Drizzle dressing. Do not toss."
        ],
        "tags": ["no-cook", "healthy", "mediterranean", "vegetarian", "quick"],
    },
    {
        "name": "Roasted Vegetable Pasta",
        "category": "Dinner",
        "cuisine": "Italian",
        "difficulty": "Easy",
        "prep_time": "15 min",
        "cook_time": "25 min",
        "servings": 4,
        "ingredients": [
            "400g penne", "1 zucchini", "1 bell pepper", "1 cup cherry tomatoes",
            "1 red onion", "3 cloves garlic", "3 tbsp olive oil", "Parmesan", "Basil"
        ],
        "key_ingredients": ["pasta", "zucchini", "bell pepper", "tomatoes", "onion", "garlic", "parmesan", "olive oil"],
        "instructions": [
            "Roast veggies with olive oil at 425°F for 20–25 min.",
            "Cook pasta; reserve pasta water.",
            "Toss pasta with roasted veggies, Parmesan, pasta water. Top with basil."
        ],
        "tags": ["vegetarian", "easy", "healthy", "italian", "meal-prep"],
    },

    # ──────────── SOUPS ────────────
    {
        "name": "Creamy Tomato Soup",
        "category": "Soup",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "25 min",
        "servings": 4,
        "ingredients": [
            "2 cans crushed tomatoes", "1 onion", "3 cloves garlic", "2 tbsp butter",
            "1/2 cup heavy cream", "1 tsp basil", "1 tsp sugar", "2 cups veggie broth"
        ],
        "key_ingredients": ["tomatoes", "onion", "garlic", "cream", "butter", "basil", "broth"],
        "instructions": [
            "Sauté onion and garlic in butter.",
            "Add tomatoes, broth, basil, sugar. Simmer 20 min.",
            "Blend until smooth. Stir in cream. Season."
        ],
        "tags": ["comfort-food", "vegetarian", "soup", "winter", "easy"],
    },
    {
        "name": "Chicken Noodle Soup",
        "category": "Soup",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "15 min",
        "cook_time": "30 min",
        "servings": 6,
        "ingredients": [
            "2 chicken breasts", "8 cups chicken broth", "2 carrots", "2 celery stalks",
            "1 onion", "2 cups egg noodles", "2 cloves garlic", "1 tbsp olive oil",
            "1 tsp thyme", "Bay leaf", "Parsley"
        ],
        "key_ingredients": ["chicken", "broth", "noodles", "carrots", "celery", "onion", "garlic"],
        "instructions": [
            "Sauté onion, carrots, celery 5 min. Add garlic.",
            "Add broth, chicken, thyme, bay leaf. Simmer 15 min.",
            "Remove chicken; shred; return. Add noodles; cook 8 min."
        ],
        "tags": ["comfort-food", "classic", "soup", "healing", "winter", "family"],
    },
    {
        "name": "Homemade Falafel",
        "category": "Dinner",
        "cuisine": "Middle Eastern",
        "difficulty": "Medium",
        "prep_time": "15 min",
        "cook_time": "15 min",
        "servings": 4,
        "ingredients": [
            "2 cans chickpeas", "1 onion", "4 cloves garlic", "1 cup parsley",
            "1 cup cilantro", "1 tsp cumin", "1 tsp coriander", "2 tbsp flour",
            "Oil for frying", "Pita and tahini sauce"
        ],
        "key_ingredients": ["chickpeas", "onion", "garlic", "parsley", "cilantro", "cumin"],
        "instructions": [
            "Pulse chickpeas, onion, garlic, herbs in food processor (keep coarse).",
            "Mix in spices, flour. Refrigerate 30 min.",
            "Form patties; pan-fry 3–4 min per side until golden.",
            "Serve in pita with tahini, tomatoes, pickled onions."
        ],
        "tags": ["middle-eastern", "vegan", "protein", "street-food"],
    },

    # ──────────── DESSERTS ────────────
    {
        "name": "Chocolate Chip Cookies",
        "category": "Dessert",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "15 min",
        "cook_time": "12 min",
        "servings": 24,
        "ingredients": [
            "2.25 cups flour", "1 tsp baking soda", "1 tsp salt",
            "1 cup butter", "3/4 cup sugar", "3/4 cup brown sugar",
            "2 eggs", "2 tsp vanilla", "2 cups chocolate chips"
        ],
        "key_ingredients": ["flour", "butter", "sugar", "brown sugar", "eggs", "chocolate chips", "vanilla"],
        "instructions": [
            "Whisk flour, baking soda, salt.",
            "Cream butter with sugars. Beat in eggs and vanilla.",
            "Mix in flour. Fold in chocolate chips.",
            "Drop tablespoons onto baking sheets. Bake 9–12 min at 375°F."
        ],
        "tags": ["dessert", "baking", "kids-friendly", "classic"],
    },
    {
        "name": "Banana Bread",
        "category": "Dessert",
        "cuisine": "American",
        "difficulty": "Easy",
        "prep_time": "10 min",
        "cook_time": "60 min",
        "servings": 8,
        "ingredients": [
            "3 ripe bananas", "1/3 cup melted butter", "3/4 cup sugar",
            "1 egg", "1 tsp vanilla", "1 tsp baking soda", "Salt", "1.5 cups flour", "Walnuts (optional)"
        ],
        "key_ingredients": ["bananas", "flour", "butter", "sugar", "egg", "vanilla"],
        "instructions": [
            "Mash bananas; stir in melted butter.",
            "Mix in sugar, egg, vanilla. Add baking soda and salt.",
            "Fold in flour. Pour into greased loaf pan.",
            "Bake 55–65 min at 350°F."
        ],
        "tags": ["baking", "easy", "leftover-friendly", "kids-friendly"],
    },
    {
        "name": "5-Minute Chocolate Mug Cake",
        "category": "Dessert",
        "cuisine": "Modern",
        "difficulty": "Easy",
        "prep_time": "3 min",
        "cook_time": "2 min",
        "servings": 1,
        "ingredients": [
            "4 tbsp flour", "4 tbsp sugar", "2 tbsp cocoa powder",
            "1 egg", "3 tbsp milk", "3 tbsp oil", "1/4 tsp vanilla", "Pinch of salt"
        ],
        "key_ingredients": ["flour", "sugar", "cocoa powder", "egg", "milk", "oil"],
        "instructions": [
            "Whisk flour, sugar, cocoa, salt in a large mug.",
            "Add egg, milk, oil, vanilla. Mix until smooth.",
            "Microwave 90 sec–2 min. Cool 1 min. Top with whipped cream."
        ],
        "tags": ["quick", "easy", "single-serving", "dessert", "microwave", "5-minute"],
    },
]


def recipe_to_text(recipe: dict) -> str:
    """Convert a recipe dict to a searchable text document."""
    lines = [
        f"Recipe: {recipe['name']}",
        f"Category: {recipe['category']} | Cuisine: {recipe['cuisine']} | Difficulty: {recipe['difficulty']}",
        f"Prep Time: {recipe['prep_time']} | Cook Time: {recipe['cook_time']} | Servings: {recipe['servings']}",
        f"Key Ingredients: {', '.join(recipe['key_ingredients'])}",
        "",
        "All Ingredients:",
        *[f"  - {ing}" for ing in recipe['ingredients']],
        "",
        "Instructions:",
        *[f"  {i+1}. {step}" for i, step in enumerate(recipe['instructions'])],
        "",
        f"Tags: {', '.join(recipe['tags'])}",
    ]
    return "\n".join(lines)
