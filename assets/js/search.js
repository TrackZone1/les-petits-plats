/**
 * GESTION DE LA RECHERCHE
 * Gère la recherche principale et le filtrage par tags
 * IMPLÉMENTATION AVEC BOUCLES NATIVES (for, while)
 */

import { normalizeString } from "./utils.js";
import { activeTags } from "./tags.js";

/**
 * Recherche dans les recettes (implémentation avec boucles natives)
 * @param {Array} recipesArray - Tableau de recettes
 * @param {string} searchTerm - Terme de recherche
 * @returns {Array} Recettes correspondantes
 */
export function searchRecipes(recipesArray, searchTerm) {
    const normalizedSearch = normalizeString(searchTerm);
    const results = [];

    for (let i = 0; i < recipesArray.length; i++) {
        const recipe = recipesArray[i];
        let isMatch = false;

        // Recherche dans le nom
        if (normalizeString(recipe.name).includes(normalizedSearch)) {
            isMatch = true;
        }

        // Recherche dans la description
        if (
            !isMatch &&
            normalizeString(recipe.description).includes(normalizedSearch)
        ) {
            isMatch = true;
        }

        // Recherche dans les ingrédients
        if (!isMatch) {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (
                    normalizeString(recipe.ingredients[j].ingredient).includes(
                        normalizedSearch
                    )
                ) {
                    isMatch = true;
                    break;
                }
            }
        }

        if (isMatch) {
            results.push(recipe);
        }
    }

    return results;
}

/**
 * Filtre les recettes par tags actifs (implémentation avec boucles natives)
 * @param {Array} recipesArray - Tableau de recettes
 * @returns {Array} Recettes correspondantes
 */
export function filterByTags(recipesArray) {
    const results = [];

    for (let i = 0; i < recipesArray.length; i++) {
        const recipe = recipesArray[i];
        let matchesAllTags = true;

        // Vérifier les ingrédients
        for (let j = 0; j < activeTags.ingredients.length; j++) {
            const tag = activeTags.ingredients[j];
            let hasIngredient = false;

            for (let k = 0; k < recipe.ingredients.length; k++) {
                if (
                    normalizeString(recipe.ingredients[k].ingredient) ===
                    normalizeString(tag)
                ) {
                    hasIngredient = true;
                    break;
                }
            }

            if (!hasIngredient) {
                matchesAllTags = false;
                break;
            }
        }

        // Vérifier les appareils
        if (matchesAllTags && activeTags.appliances.length > 0) {
            let hasAppliance = false;

            for (let j = 0; j < activeTags.appliances.length; j++) {
                if (
                    normalizeString(recipe.appliance) ===
                    normalizeString(activeTags.appliances[j])
                ) {
                    hasAppliance = true;
                    break;
                }
            }

            if (!hasAppliance) {
                matchesAllTags = false;
            }
        }

        // Vérifier les ustensiles
        if (matchesAllTags) {
            for (let j = 0; j < activeTags.ustensils.length; j++) {
                const tag = activeTags.ustensils[j];
                let hasUstensil = false;

                for (let k = 0; k < recipe.ustensils.length; k++) {
                    if (
                        normalizeString(recipe.ustensils[k]) ===
                        normalizeString(tag)
                    ) {
                        hasUstensil = true;
                        break;
                    }
                }

                if (!hasUstensil) {
                    matchesAllTags = false;
                    break;
                }
            }
        }

        if (matchesAllTags) {
            results.push(recipe);
        }
    }

    return results;
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
