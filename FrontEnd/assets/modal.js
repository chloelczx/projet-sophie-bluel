// Variables globales
const modal = document.getElementById("modal");



// Fonction d'affichage des travaux dans la galerie de la modale
function displayWorksInModal (allWorks) {
    allWorks.forEach(work => {
        const modalWorksContainer = document.querySelector(".modal-works");
        
        const modalWorkContent = document.createElement("figure");
        const modalWorkImg = document.createElement("img");
        modalWorkImg.src = work.imageUrl;
        modalWorkImg.alt = work.title;

        const deleteWorkBtn = document.createElement("button");
        deleteWorkBtn.classList.add("delete-work-btn");
        deleteWorkBtn.setAttribute("aria-label", "Supprimer la photo");
        const deleteWorkIcon = document.createElement("i");
        deleteWorkIcon.classList.add("fa-solid", "fa-trash-can");

        deleteWorkBtn.appendChild(deleteWorkIcon);
        modalWorkContent.appendChild(modalWorkImg);
        modalWorkContent.appendChild(deleteWorkBtn);
        modalWorksContainer.append(modalWorkContent);
    });
}



// Fonction d'affichage modale
export function openModal (allWorks) {
    modal.classList.add("active");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");

    // Appel fonction d'affichage des travaux
    displayWorksInModal(allWorks);
}