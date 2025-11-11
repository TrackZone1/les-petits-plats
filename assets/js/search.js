/**
 * GESTION DE LA RECHERCHE
 * Gère la recherche principale et le filtrage par tags
 */

import { normalizeString } from "./utils.js";
import { activeTags } from "./tags.js";

/**
 * Recherche dans les recettes (fonction de base)
 * @param {Array} recipesArray - Tableau de recettes
 * @param {string} searchTerm - Terme de recherche
 * @returns {Array} Recettes correspondantes
 */
export function searchRecipes(recipesArray, searchTerm) {
    const normalizedSearch = normalizeString(searchTerm);

    return recipesArray.filter((recipe) => {
        // Recherche dans le nom
        if (normalizeString(recipe.name).includes(normalizedSearch)) {
            return true;
        }

        // Recherche dans la description
        if (normalizeString(recipe.description).includes(normalizedSearch)) {
            return true;
        }

        // Recherche dans les ingrédients
        const hasIngredient = recipe.ingredients.some((ing) =>
            normalizeString(ing.ingredient).includes(normalizedSearch)
        );

        return hasIngredient;
    });
}

/**
 * Filtre les recettes par tags actifs
 * @param {Array} recipesArray - Tableau de recettes
 * @returns {Array} Recettes correspondantes
 */
export function filterByTags(recipesArray) {
    return recipesArray.filter((recipe) => {
        // Vérifier les ingrédients
        const hasAllIngredients = activeTags.ingredients.every((tag) =>
            recipe.ingredients.some(
                (ing) =>
                    normalizeString(ing.ingredient) === normalizeString(tag)
            )
        );

        // Vérifier les appareils
        const hasAppliance =
            activeTags.appliances.length === 0 ||
            activeTags.appliances.some(
                (tag) =>
                    normalizeString(recipe.appliance) === normalizeString(tag)
            );

        // Vérifier les ustensiles
        const hasAllUstensils = activeTags.ustensils.every((tag) =>
            recipe.ustensils.some(
                (ustensil) => normalizeString(ustensil) === normalizeString(tag)
            )
        );

        return hasAllIngredients && hasAppliance && hasAllUstensils;
    });
}

/**
 * Applique tous les filtres (recherche + tags)
 * @param {Array} allRecipes - Toutes les recettes
 * @returns {Array} Recettes filtrées
 */
export function applyFilters(allRecipes) {
    const searchValue = document.getElementById("mainSearch").value;

    // Commencer avec toutes les recettes
    let results = [...allRecipes];

    // Appliquer la recherche principale si au moins 3 caractères
    if (searchValue.length >= 3) {
        results = searchRecipes(results, searchValue);
    }

    // Appliquer les filtres de tags
    results = filterByTags(results);

    return results;
}
