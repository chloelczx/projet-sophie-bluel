// Variables globales
const modal = document.getElementById("modal");



// Fonction d'affichage modale
export function openModal () {
    modal.classList.add("active");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");
}