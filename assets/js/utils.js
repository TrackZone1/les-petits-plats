/**
 * FONCTIONS UTILITAIRES
 * Contient les fonctions helpers pour la manipulation de chaînes et la sécurité
 */

/**
 * Protection contre les injections XSS
 * Échappe les caractères HTML dangereux
 * @param {string} text - Texte à sécuriser
 * @returns {string} Texte sécurisé
 */
export function sanitizeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Normalise une chaîne pour la recherche (minuscules, sans accents)
 * @param {string} str - Chaîne à normaliser
 * @returns {string} Chaîne normalisée
 */
export function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - Chaîne à capitaliser
 * @returns {string} Chaîne capitalisée
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
