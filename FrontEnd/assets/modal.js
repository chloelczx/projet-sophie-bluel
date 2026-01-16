// Imports
import { displayWorks } from "./gallery.js";
import { getAllWorks, getCategories, deleteWork } from "./works.js";

// Variables globales
const modal = document.getElementById("modal");
const modalGallery = document.querySelector(".modal-gallery");
const modalForm = document.querySelector(".modal-form");
const addWorkForm = document.querySelector(".add-work-form");
const uploadImgBtn = document.getElementById("upload-btn");
const selectCategory = document.getElementById("work-category");



// Fonction d'affichage des travaux dans la galerie de la modale
function displayWorksInModal() {
    const modalWorksContainer = document.querySelector(".modal-works");
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
const openFormBtn = document.querySelector(".open-modal-form");
openFormBtn.addEventListener("click", openModalForm);

// Création du message d'erreur
const errorMessage = document.createElement("p");
errorMessage.classList.add("upload-error");
errorMessage.textContent = "L'image doit être au format jpg, png : 4mo max";

// Ecoute de l'événement : preview sélection nouvelle image
uploadImgBtn.addEventListener("change", () => {
    const selectedFile = uploadImgBtn.files[0];
    const validFiles = ["image/jpeg", "image/png"];
    const maxSize = 4 * 1024 * 1024;

    if (!selectedFile) {
        return;
    }

    if (!validFiles.includes(selectedFile.type) || selectedFile.size > maxSize) {
        addWorkForm.appendChild(errorMessage);

        uploadImgBtn.value = "";
        return;
    } else {
        const uploadImgContainer = document.querySelector(".upload-image");
        uploadImgContainer.innerHTML = "";

        const imgPreview = document.createElement("img");
        imgPreview.classList.add("image-preview");
        imgPreview.src = URL.createObjectURL(selectedFile);
        imgPreview.alt = "Prévisualisation de l'image";

        uploadImgContainer.appendChild(imgPreview);
    }
});

// Ecoute de l'événement : suppression message d'erreur au clic
uploadImgBtn.addEventListener("click", () => {
    if (addWorkForm.contains(errorMessage)) {
        errorMessage.remove();
    }
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

// Fonction de vérification des champs du formulaire
function checkModalForm() {
    const formWorkTitle = document.getElementById("work-title");
    const formSubmitBtn = document.getElementById("upload-work");
    
    const workFileSelected = uploadImgBtn.files.length > 0;
    const workTitleFilled = formWorkTitle.value.trim() !== "";
    const workCategorySelected = selectCategory.value !== "";

    if (workFileSelected && workTitleFilled && workCategorySelected) {
        formSubmitBtn.disabled = false;
    } else {
        formSubmitBtn.disabled = true;
    }
}

// Appel fonction de vérification des champs
addWorkForm.addEventListener("change", checkModalForm);
addWorkForm.addEventListener("input", checkModalForm);

// Ecoute de l'événement : envoi du formulaire
addWorkForm.addEventListener("submit", (event) => {
    event.preventDefault();
});



// Fonction de retour à la galerie de la modale
function backModalGallery() {
    modalGallery.classList.remove("hidden");
    modalForm.classList.remove("visible");
}

// Appel fonction de retour à la galerie
const backGalleryBtn = document.querySelector(".back-modal-gallery");
backGalleryBtn.addEventListener("click", backModalGallery);



// Fonction de fermeture de la modale
function closeModal() {
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