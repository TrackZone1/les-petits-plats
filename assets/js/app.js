/**
 * Les Petits Plats - Main Application JavaScript
 * Fichier principal d'initialisation et de coordination
 */

import { displayRecipes } from "./cardTemplate.js";
import { updateFilterLists, searchInDropdown } from "./filters.js";
import { addActiveTag, removeActiveTag } from "./tags.js";
import { applyFilters } from "./search.js";

// ========================================
// VARIABLES GLOBALES
// ========================================

let allRecipes = recipes; // Toutes les recettes du fichier recipes.js
let filteredRecipes = [...allRecipes]; // Recettes filtrées (copie)

// ========================================
// FONCTION PRINCIPALE DE FILTRAGE
// ========================================

/**
 * Met à jour l'affichage des recettes et des filtres
 */
function updateDisplay() {
    filteredRecipes = applyFilters(allRecipes);
    displayRecipes(filteredRecipes);
    updateFilterLists(filteredRecipes);
}

// ========================================
// ÉVÉNEMENTS
// ========================================

/**
 * Initialise tous les événements
 */
function initEventListeners() {
    // Recherche principale
    const mainSearch = document.getElementById("mainSearch");
    mainSearch.addEventListener("input", function () {
        updateDisplay();
    });

    // Recherche dans les dropdowns
    const ingredientSearch = document.getElementById("ingredientSearch");
    const applianceSearch = document.getElementById("applianceSearch");
    const ustensilSearch = document.getElementById("ustensilSearch");

    ingredientSearch.addEventListener("input", function () {
        searchInDropdown(
            this.value,
            document.getElementById("ingredientsList")
        );
    });

    applianceSearch.addEventListener("input", function () {
        searchInDropdown(this.value, document.getElementById("appliancesList"));
    });

    ustensilSearch.addEventListener("input", function () {
        searchInDropdown(this.value, document.getElementById("ustensilsList"));
    });

    // Clic sur les éléments des listes de filtres (délégation d'événements)
    document
        .getElementById("ingredientsList")
        .addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                addActiveTag(
                    e.target.dataset.value,
                    e.target.dataset.type,
                    updateDisplay
                );
            }
        });

    document
        .getElementById("appliancesList")
        .addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                addActiveTag(
                    e.target.dataset.value,
                    e.target.dataset.type,
                    updateDisplay
                );
            }
        });

    document
        .getElementById("ustensilsList")
        .addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                addActiveTag(
                    e.target.dataset.value,
                    e.target.dataset.type,
                    updateDisplay
                );
            }
        });

    // Suppression des tags (délégation d'événements)
    document
        .getElementById("activeTags")
        .addEventListener("click", function (e) {
            const closeButton = e.target.closest(".tag-close");
            if (closeButton) {
                removeActiveTag(
                    closeButton.dataset.value,
                    closeButton.dataset.type,
                    updateDisplay
                );
            }
        });

    // Réinitialiser la recherche dans les dropdowns quand on les ouvre
    const dropdowns = document.querySelectorAll(".filter-dropdown");
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("shown.bs.dropdown", function () {
            const searchInput = this.querySelector(".dropdown-search-input");
            if (searchInput) {
                searchInput.value = "";
                const listElement = this.querySelector(".dropdown-list");
                const items = listElement.querySelectorAll("li");
                items.forEach((item) => (item.style.display = ""));
            }
        });
    });
}

// ========================================
// INITIALISATION
// ========================================

/**
 * Initialise l'application
 */
function init() {
    // Afficher toutes les recettes
    displayRecipes(filteredRecipes);

    // Initialiser les listes de filtres
    updateFilterLists(filteredRecipes);

    // Initialiser les événements
    initEventListeners();
}

// Lancer l'application quand le DOM est chargé
document.addEventListener("DOMContentLoaded", init);
