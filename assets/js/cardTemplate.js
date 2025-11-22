/**
 * TEMPLATE DES CARTES DE RECETTES
 * Gère la création et l'affichage des cartes de recettes
 */

import { sanitizeHTML } from "./utils.js";

/**
 * Crée le HTML d'une carte de recette
 * @param {Object} recipe - Objet recette
 * @returns {string} HTML de la carte
 */
export function createRecipeCard(recipe) {
    const imagePath = `assets/images/${sanitizeHTML(recipe.image)}`;
    const recipeName = sanitizeHTML(recipe.name);
    const recipeDescription = sanitizeHTML(recipe.description);

    // Générer la liste des ingrédients
    const ingredientsHTML = recipe.ingredients
        .map((ing) => {
            const name = sanitizeHTML(ing.ingredient);
            let quantity = "";

            if (ing.quantity) {
                quantity = ing.quantity;
                if (ing.unit) {
                    quantity += ` ${sanitizeHTML(ing.unit)}`;
                }
            } else if (ing.unit) {
                quantity = sanitizeHTML(ing.unit);
            }

            return `
                <div class="ingredient-item">
                    <span class="ingredient-name">${name}</span>
                    ${
                        quantity
                            ? `<span class="ingredient-quantity">${quantity}</span>`
                            : ""
                    }
                </div>
            `;
        })
        .join("");

    return `
        <div class="col-12 col-md-6 col-lg-4">
            <article class="recipe-card">
                <div class="recipe-image-container">
                    <img src="${imagePath}" alt="${recipeName}" class="recipe-image">
                    <span class="recipe-time">${recipe.time}min</span>
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipeName}</h3>
                    <div>
                        <h4 class="recipe-label">Recette</h4>
                        <p class="recipe-description">${recipeDescription}</p>
                    </div>
                    <div class="recipe-ingredients">
                        <h4 class="recipe-label">Ingrédients</h4>
                        <div class="ingredients-grid">
                            ${ingredientsHTML}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `;
}

/**
 * Affiche les recettes dans la grille
 * @param {Array} recipesToDisplay - Tableau de recettes à afficher
 */
export function displayRecipes(recipesToDisplay) {
    const recipesGrid = document.getElementById("recipesGrid");
    const noResults = document.getElementById("noResults");
    const recipesCount = document.getElementById("recipesCount");

    if (recipesToDisplay.length === 0) {
        recipesGrid.innerHTML = "";
        noResults.style.display = "block";
        recipesCount.textContent = "0 recette";
    } else {
        const recipesHTML = recipesToDisplay
            .map((recipe) => createRecipeCard(recipe))
            .join("");
        recipesGrid.innerHTML = recipesHTML;
        noResults.style.display = "none";

        // Mise à jour du compteur
        const count = recipesToDisplay.length;
        recipesCount.textContent =
            count > 1 ? `${count} recettes` : `${count} recette`;
    }
}
