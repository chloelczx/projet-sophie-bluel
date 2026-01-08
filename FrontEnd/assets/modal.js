// Variables globales
const modal = document.getElementById("modal");



// Fonction d'affichage des travaux dans la galerie de la modale
function displayWorksInModal (allWorks) {
    const modalWorksContainer = document.querySelector(".modal-works");
    modalWorksContainer.innerHTML = "";
    
    allWorks.forEach(work => {
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



// Fonction d'affichage de la modale
export function openModal (allWorks) {
    modal.classList.add("active");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");

    // Appel fonction d'affichage des travaux
    displayWorksInModal(allWorks);
}



// Fonction de fermeture de la modale
function closeModal () {
    modal.classList.remove("active");
    modal.removeAttribute("role", "dialog");
    modal.removeAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
}

// Appel fonction de fermeture de la modale au clic sur la croix
const closeModalBtn = document.querySelector(".close-modal");
closeModalBtn.addEventListener("click", closeModal);

// Appel fonction de fermeture au clic en dehors de la modale
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});