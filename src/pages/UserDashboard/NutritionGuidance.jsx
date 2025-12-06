import { Clock, Users, ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../../component/ImageWithFallback.jsx";

export default function NutritionGuidance() {
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const recipes = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      description:
        "Fresh mixed greens with grilled chicken breast, cherry tomatoes, and balsamic vinaigrette",
      image:
        "https://images.unsplash.com/photo-1685079230208-dcced9f55eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZ3JpbGxlZCUyMGNoaWNrZW4lMjBzYWxhZHxlbnwxfHx8fDE3NjQ5MDgwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "20 min",
      servings: 2,
      calories: 320,
      protein: 38,
      carbs: 12,
      fats: 14,
      sugar: 6,
      category: "Lunch",
      ingredients: [
        "2 chicken breasts (6 oz each)",
        "4 cups mixed greens",
        "1 cup cherry tomatoes",
        "1/4 red onion, sliced",
        "2 tbsp balsamic vinaigrette",
        "Salt and pepper to taste",
      ],
      instructions: [
        "Season chicken breasts with salt and pepper",
        "Grill chicken for 6-7 minutes per side until cooked through",
        "Let chicken rest for 5 minutes, then slice",
        "Toss mixed greens with cherry tomatoes and onion",
        "Top with sliced chicken and drizzle with vinaigrette",
      ],
    },
    {
      id: 2,
      name: "Quinoa Power Bowl",
      description:
        "Nutrient-packed quinoa with roasted vegetables, chickpeas, and tahini dressing",
      image:
        "https://images.unsplash.com/photo-1719677775416-1dd6a93f1a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBib3dsJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjQ4NTkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "35 min",
      servings: 2,
      calories: 420,
      protein: 16,
      carbs: 58,
      fats: 15,
      sugar: 8,
      category: "Lunch",
      ingredients: [
        "1 cup quinoa",
        "1 can chickpeas, drained",
        "1 sweet potato, cubed",
        "1 zucchini, sliced",
        "2 tbsp tahini",
        "1 tbsp lemon juice",
        "Olive oil, salt, pepper",
      ],
      instructions: [
        "Cook quinoa according to package directions",
        "Toss sweet potato and zucchini with olive oil, salt, and pepper",
        "Roast vegetables at 400°F for 25 minutes",
        "Roast chickpeas for last 15 minutes until crispy",
        "Mix tahini with lemon juice and water to make dressing",
        "Combine quinoa, vegetables, and chickpeas. Drizzle with tahini dressing",
      ],
    },
    {
      id: 3,
      name: "Baked Salmon with Avocado",
      description:
        "Omega-3 rich salmon fillet with creamy avocado and steamed broccoli",
      image:
        "https://images.unsplash.com/photo-1761315411919-c3bcc6da8224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBhdm9jYWRvJTIwbWVhbHxlbnwxfHx8fDE3NjQ4MzQ5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "25 min",
      servings: 2,
      calories: 450,
      protein: 42,
      carbs: 18,
      fats: 26,
      sugar: 4,
      category: "Dinner",
      ingredients: [
        "2 salmon fillets (6 oz each)",
        "1 avocado, sliced",
        "2 cups broccoli florets",
        "2 tbsp olive oil",
        "1 lemon",
        "Garlic powder, salt, pepper",
      ],
      instructions: [
        "Preheat oven to 375°F",
        "Season salmon with garlic powder, salt, and pepper",
        "Drizzle with olive oil and lemon juice",
        "Bake salmon for 15-18 minutes",
        "Steam broccoli for 5-7 minutes",
        "Serve salmon with avocado slices and steamed broccoli",
      ],
    },
    {
      id: 4,
      name: "Berry Protein Smoothie Bowl",
      description:
        "Thick smoothie bowl topped with fresh berries, granola, and chia seeds",
      image:
        "https://images.unsplash.com/photo-1622484212022-983850e48832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwc21vb3RoaWUlMjBib3dsfGVufDF8fHx8MTc2NDg1NjY2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "10 min",
      servings: 1,
      calories: 340,
      protein: 28,
      carbs: 42,
      fats: 8,
      sugar: 22,
      category: "Breakfast",
      ingredients: [
        "1 scoop vanilla protein powder",
        "1 frozen banana",
        "1/2 cup frozen mixed berries",
        "1/2 cup almond milk",
        "2 tbsp granola",
        "1 tbsp chia seeds",
        "Fresh berries for topping",
      ],
      instructions: [
        "Blend protein powder, banana, frozen berries, and almond milk until thick",
        "Pour into a bowl",
        "Top with granola, chia seeds, and fresh berries",
        "Enjoy immediately",
      ],
    },
    {
      id: 5,
      name: "Greek Yogurt Parfait",
      description:
        "Layers of protein-rich Greek yogurt, fresh berries, and crunchy granola",
      image:
        "https://images.unsplash.com/photo-1618798513386-fedeb5c30d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHlvZ3VydCUyMGJlcnJpZXN8ZW58MXx8fHwxNzY0ODQ1Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "5 min",
      servings: 1,
      calories: 280,
      protein: 20,
      carbs: 38,
      fats: 6,
      sugar: 18,
      category: "Breakfast",
      ingredients: [
        "1 cup Greek yogurt",
        "1/2 cup mixed berries",
        "1/4 cup granola",
        "1 tbsp honey",
        "1 tsp chia seeds",
      ],
      instructions: [
        "Layer half of the Greek yogurt in a glass or bowl",
        "Add half of the berries and granola",
        "Repeat layers with remaining ingredients",
        "Drizzle with honey and sprinkle chia seeds on top",
      ],
    },
    {
      id: 6,
      name: "Protein Oatmeal Bowl",
      description:
        "Hearty oatmeal with protein powder, banana, and almond butter",
      image:
        "https://images.unsplash.com/photo-1665394055917-de22650a17b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwb2F0bWVhbCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NjQ5MDgwNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      prepTime: "15 min",
      servings: 1,
      calories: 380,
      protein: 24,
      carbs: 52,
      fats: 10,
      sugar: 14,
      category: "Breakfast",
      ingredients: [
        "1/2 cup rolled oats",
        "1 scoop vanilla protein powder",
        "1 cup almond milk",
        "1 banana, sliced",
        "1 tbsp almond butter",
        "1 tsp cinnamon",
        "Pinch of salt",
      ],
      instructions: [
        "Cook oats with almond milk and salt for 5 minutes",
        "Stir in protein powder until well mixed",
        "Top with sliced banana and almond butter",
        "Sprinkle with cinnamon and serve warm",
      ],
    },
  ];

  const categories = ["All", "Breakfast", "Lunch", "Dinner"];

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  const toggleRecipe = (id) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  const expandedRecipeData = recipes.find((r) => r.id === expandedRecipe);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl" style={{ color: "#ffffff" }}>Healthy Recipes</h2>
        <p className="text-sm sm:text-base" style={{ color: "#9CA3AF" }}>
          Nutritious meals with complete calorie and macro breakdown
        </p>
      </div>

      {expandedRecipe && expandedRecipeData ? (
        <div>
          <button
            onClick={() => setExpandedRecipe(null)}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#252525", color: "#ffffff" }}
          >
            <ArrowLeft size={20} />
            <span>Back to Recipes</span>
          </button>

          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: "#252525" }}
          >
            <ImageWithFallback
              src={expandedRecipeData.image}
              alt={expandedRecipeData.name}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl mb-3" style={{ color: "#ffffff" }}>
                  {expandedRecipeData.name}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg" style={{ color: "#9CA3AF" }}>
                  {expandedRecipeData.description}
                </p>
              </div>

              <div
                className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6"
                style={{ color: "#9CA3AF" }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{expandedRecipeData.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>
                    {expandedRecipeData.servings} serving
                    {expandedRecipeData.servings > 1 ? "s" : ""}
                  </span>
                </div>
                <div
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm"
                  style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
                >
                  {expandedRecipeData.category}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
                <div
                  className="p-4 sm:p-6 rounded-lg text-center"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <p
                    className="mb-2 text-lg sm:text-xl lg:text-2xl"
                    style={{ color: "#ff1f1f" }}
                  >
                    {expandedRecipeData.calories}
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#9CA3AF" }}>Calories</p>
                </div>
                <div
                  className="p-4 sm:p-6 rounded-lg text-center"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <p
                    className="mb-2 text-lg sm:text-xl lg:text-2xl"
                    style={{ color: "#ffffff" }}
                  >
                    {expandedRecipeData.protein}g
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#9CA3AF" }}>Protein</p>
                </div>
                <div
                  className="p-4 sm:p-6 rounded-lg text-center"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <p
                    className="mb-2 text-lg sm:text-xl lg:text-2xl"
                    style={{ color: "#ffffff" }}
                  >
                    {expandedRecipeData.carbs}g
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#9CA3AF" }}>Carbs</p>
                </div>
                <div
                  className="p-4 sm:p-6 rounded-lg text-center"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <p
                    className="mb-2 text-lg sm:text-xl lg:text-2xl"
                    style={{ color: "#ffffff" }}
                  >
                    {expandedRecipeData.fats}g
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#9CA3AF" }}>Fats</p>
                </div>
                <div
                  className="p-4 sm:p-6 rounded-lg text-center"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <p
                    className="mb-2 text-lg sm:text-xl lg:text-2xl"
                    style={{ color: "#ffffff" }}
                  >
                    {expandedRecipeData.sugar}g
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#9CA3AF" }}>Sugar</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div
                  className="p-4 sm:p-6 rounded-lg"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <h3 className="mb-4 text-lg sm:text-xl" style={{ color: "#ffffff" }}>
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {expandedRecipeData.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm sm:text-base"
                        style={{ color: "#9CA3AF" }}
                      >
                        <span style={{ color: "#ff1f1f" }}>•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="p-4 sm:p-6 rounded-lg"
                  style={{ backgroundColor: "#1a1a1a" }}
                >
                  <h3 className="mb-4 text-lg sm:text-xl" style={{ color: "#ffffff" }}>
                    Instructions
                  </h3>
                  <ol className="space-y-3">
                    {expandedRecipeData.instructions.map(
                      (instruction, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm sm:text-base"
                          style={{ color: "#9CA3AF" }}
                        >
                          <span
                            className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm"
                            style={{
                              backgroundColor: "#ff1f1f",
                              color: "#ffffff",
                            }}
                          >
                            {index + 1}
                          </span>
                          <span className="pt-1">{instruction}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                style={{
                  backgroundColor:
                    selectedCategory === category ? "#ff1f1f" : "#252525",
                  color: "#ffffff",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: "#252525" }}
              >
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />

                <div className="p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg sm:text-xl" style={{ color: "#ffffff" }}>
                        {recipe.name}
                      </h3>
                      <p className="mb-3 text-sm sm:text-base" style={{ color: "#9CA3AF" }}>
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-4 mb-4"
                    style={{ color: "#9CA3AF" }}
                  >
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>
                        {recipe.servings} serving
                        {recipe.servings > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <p className="mb-1 text-sm sm:text-base" style={{ color: "#ff1f1f" }}>
                        {recipe.calories}
                      </p>
                      <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                        Calories
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <p className="mb-1 text-sm sm:text-base" style={{ color: "#ffffff" }}>
                        {recipe.protein}g
                      </p>
                      <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                        Protein
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <p className="mb-1 text-sm sm:text-base" style={{ color: "#ffffff" }}>
                        {recipe.carbs}g
                      </p>
                      <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                        Carbs
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <p className="mb-1 text-sm sm:text-base" style={{ color: "#ffffff" }}>
                        {recipe.fats}g
                      </p>
                      <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                        Fats
                      </p>
                    </div>
                    <div
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: "#1a1a1a" }}
                    >
                      <p className="mb-1 text-sm sm:text-base" style={{ color: "#ffffff" }}>
                        {recipe.sugar}g
                      </p>
                      <p style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
                        Sugar
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRecipe(recipe.id)}
                    className="w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-opacity hover:opacity-90 text-sm sm:text-base"
                    style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
                  >
                    <span>View Recipe</span>
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}