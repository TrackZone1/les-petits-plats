/**
 * GESTION DES FILTRES
 * Gère les listes de filtres (ingrédients, appareils, ustensiles)
 */

import { sanitizeHTML, capitalize, normalizeString } from "./utils.js";

/**
 * Extrait tous les ingrédients uniques des recettes
 * @param {Array} recipesArray - Tableau de recettes
 * @returns {Array} Tableau d'ingrédients uniques triés
 */
export function getUniqueIngredients(recipesArray) {
    const ingredientsSet = new Set();

    recipesArray.forEach((recipe) => {
        recipe.ingredients.forEach((ing) => {
            ingredientsSet.add(ing.ingredient.toLowerCase());
        });
    });

    return Array.from(ingredientsSet).sort();
}

/**
 * Extrait tous les appareils uniques des recettes
 * @param {Array} recipesArray - Tableau de recettes
 * @returns {Array} Tableau d'appareils uniques triés
 */
export function getUniqueAppliances(recipesArray) {
    const appliancesSet = new Set();

    recipesArray.forEach((recipe) => {
        appliancesSet.add(recipe.appliance.toLowerCase());
    });

    return Array.from(appliancesSet).sort();
}

/**
 * Extrait tous les ustensiles uniques des recettes
 * @param {Array} recipesArray - Tableau de recettes
 * @returns {Array} Tableau d'ustensiles uniques triés
 */
export function getUniqueUstensils(recipesArray) {
    const ustensilsSet = new Set();

    recipesArray.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            ustensilsSet.add(ustensil.toLowerCase());
        });
    });

    return Array.from(ustensilsSet).sort();
}

/**
 * Affiche les éléments dans une liste dropdown
 * @param {Array} items - Tableau d'éléments à afficher
 * @param {HTMLElement} listElement - Élément DOM de la liste
 * @param {string} type - Type de filtre ('ingredients', 'appliances', 'ustensils')
 */
export function displayFilterList(items, listElement, type) {
    listElement.innerHTML = items
        .map((item) => {
            const displayName = capitalize(item);
            const sanitizedName = sanitizeHTML(displayName);
            return `<li data-value="${sanitizeHTML(
                item
            )}" data-type="${type}">${sanitizedName}</li>`;
        })
        .join("");
}

/**
 * Met à jour toutes les listes de filtres basées sur les recettes filtrées
 * @param {Array} filteredRecipes - Recettes filtrées
 */
export function updateFilterLists(filteredRecipes) {
    const ingredients = getUniqueIngredients(filteredRecipes);
    const appliances = getUniqueAppliances(filteredRecipes);
    const ustensils = getUniqueUstensils(filteredRecipes);

    const ingredientsList = document.getElementById("ingredientsList");
    const appliancesList = document.getElementById("appliancesList");
    const ustensilsList = document.getElementById("ustensilsList");

    displayFilterList(ingredients, ingredientsList, "ingredients");
    displayFilterList(appliances, appliancesList, "appliances");
    displayFilterList(ustensils, ustensilsList, "ustensils");
}

/**
 * Recherche dans une liste dropdown
 * @param {string} searchValue - Valeur de recherche
 * @param {HTMLElement} listElement - Élément DOM de la liste
 */
export function searchInDropdown(searchValue, listElement) {
    const normalizedSearch = normalizeString(searchValue);
    const items = listElement.querySelectorAll("li");

    items.forEach((item) => {
        const itemText = normalizeString(item.textContent);
        if (itemText.includes(normalizedSearch)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}
