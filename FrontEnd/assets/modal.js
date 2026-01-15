// Imports
import { displayWorks } from "./gallery.js";
import { getAllWorks, getCategories, deleteWork } from "./works.js";

// Variables globales
const modal = document.getElementById("modal");
const modalGallery = document.querySelector(".modal-gallery");
const modalWorksContainer = document.querySelector(".modal-works");
const modalForm = document.querySelector(".modal-form");
const openFormBtn = document.querySelector(".open-modal-form");
const closeModalBtn = document.querySelector(".close-modal");
const backGalleryBtn = document.querySelector(".back-modal-gallery");
const uploadImgContainer = document.querySelector(".upload-image");
const uploadImgBtn = document.getElementById("upload-btn");
const selectCategory = document.getElementById("work-category");



// Fonction d'affichage des travaux dans la galerie de la modale
function displayWorksInModal() {
    modalWorksContainer.innerHTML = "";
    const allWorks = getAllWorks();

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

        // Appel fonction de suppression des travaux
        deleteWorkBtn.addEventListener("click", async () => {
            try {
                await deleteWork(work.id);
                // Mise à jour du DOM : galerie page d'accueil
                displayWorks(getAllWorks());
                // Mise à jour du DOM : galerie modale
                displayWorksInModal();
            } catch (error) {
                alert(error.message);
            }
        });
    });
}

// Fonction d'affichage de la modale
export function openModal() {
    modal.classList.add("active");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");

    // Appel fonction d'affichage des travaux
    displayWorksInModal();
}



// Fonction d'ouverture du formulaire de la modale
function openModalForm() {
    modalGallery.classList.add("hidden");
    modalForm.classList.add("visible");

    // Appel fonction d'affichage des catégories
    loadFormCategories();
}

// Appel fonction d'ouverture du formulaire
openFormBtn.addEventListener("click", openModalForm);

// Ecoute de l'événement : preview sélection nouvelle image
uploadImgBtn.addEventListener("change", () => {
    const selectedFile = uploadImgBtn.files[0];
    
    uploadImgContainer.innerHTML = "";

    const imgPreview = document.createElement("img");
    imgPreview.classList.add("image-preview");
    imgPreview.src = URL.createObjectURL(selectedFile);
    imgPreview.alt = "Prévisualisation de l'image";

    uploadImgContainer.appendChild(imgPreview);
});

// Fonction d'affichage des catégories dans le formulaire
async function loadFormCategories() {
    const categories = await getCategories();
    
    selectCategory.innerHTML = "";

    categories.forEach(category => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.value = category.id;
        selectCategory.appendChild(option);
    });
}



// Fonction de retour à la galerie de la modale
function backModalGallery() {
    modalGallery.classList.remove("hidden");
    modalForm.classList.remove("visible");
}

// Appel fonction de retour à la galerie
backGalleryBtn.addEventListener("click", backModalGallery);



// Fonction de fermeture de la modale
function closeModal() {
    modal.classList.remove("active");
    modal.removeAttribute("role", "dialog");
    modal.removeAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
}

// Appel fonction de fermeture de la modale au clic sur la croix
closeModalBtn.addEventListener("click", closeModal);

// Appel fonction de fermeture au clic en dehors de la modale
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});