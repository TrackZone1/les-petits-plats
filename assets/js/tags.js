/**
 * GESTION DES TAGS ACTIFS
 * Gère l'ajout, la suppression et l'affichage des tags de filtrage
 */

import { sanitizeHTML, capitalize } from "./utils.js";

/**
 * Objet contenant les tags actifs par type
 */
export const activeTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

/**
 * Ajoute un tag actif
 * @param {string} value - Valeur du tag
 * @param {string} type - Type de tag ('ingredients', 'appliances', 'ustensils')
 * @param {Function} callback - Fonction callback à appeler après l'ajout
 */
export function addActiveTag(value, type, callback) {
    if (!activeTags[type].includes(value)) {
        activeTags[type].push(value);
        displayActiveTags(callback);
        if (callback) callback();
    }
}

/**
 * Supprime un tag actif
 * @param {string} value - Valeur du tag
 * @param {string} type - Type de tag
 * @param {Function} callback - Fonction callback à appeler après la suppression
 */
export function removeActiveTag(value, type, callback) {
    const index = activeTags[type].indexOf(value);
    if (index > -1) {
        activeTags[type].splice(index, 1);
        displayActiveTags(callback);
        if (callback) callback();
    }
}

/**
 * Affiche les tags actifs
 * @param {Function} callback - Fonction callback pour gérer les clics sur les tags
 */
export function displayActiveTags(callback) {
    const activeTagsContainer = document.getElementById("activeTags");

    let tagsHTML = "";

    // Parcourir tous les types de tags
    Object.keys(activeTags).forEach((type) => {
        activeTags[type].forEach((value) => {
            const displayValue = capitalize(value);
            const sanitizedValue = sanitizeHTML(displayValue);
            tagsHTML += `
                <div class="tag">
                    <span>${sanitizedValue}</span>
                    <button 
                        class="tag-close" 
                        data-value="${sanitizeHTML(value)}" 
                        data-type="${type}"
                        aria-label="Supprimer le filtre ${sanitizedValue}"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
    });

    activeTagsContainer.innerHTML = tagsHTML;
}
