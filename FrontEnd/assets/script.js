// Imports
import { displayWorks } from "./gallery.js";
import { getWorks, getAllWorks, getCategories } from "./works.js";
import { openModal } from "./modal.js";

// Variables globales
const loginLink = document.querySelector(".login-link");
const token = localStorage.getItem("token");



// Fonction d'initialisation des travaux
async function initWorks() {
    const works = await getWorks();
    displayWorks(works);
}

initWorks();



// Fonction d'affichage des filtres de la galerie
async function displayFilters() {
    const categories = await getCategories();

    const gallery = document.querySelector(".gallery");

    // Affichage des filtres
    const portfolio = document.getElementById("portfolio");
    const filters = document.createElement("div");
    filters.classList.add("filters");

    // Intégration des boutons
    const btnAll = document.createElement("button");
    btnAll.classList.add("filter", "active");
    btnAll.textContent = "Tous";
    // Bouton "Tous" lié à toutes les catégories de travaux
    btnAll.dataset.workCategory = "all";

    filters.appendChild(btnAll);

    categories.forEach(category => {
        const btnFilter = document.createElement("button");
        btnFilter.classList.add("filter");
        btnFilter.textContent = category.name;
        // Chaque bouton lié à une catégorie de travaux
        btnFilter.dataset.workCategory = category.id;

        filters.appendChild(btnFilter);
    });

    portfolio.insertBefore(filters, gallery);

    // Appel fonction de gestion des filtres au clic
    clicFilter();

    // Appel fonction filtres masqués du mode édition lors d'une connexion
    if (token) {
        hideFilters();
    }
}

displayFilters();



// Fonction de gestion des filtres au clic
function clicFilter() {
    const filtersBtn = document.querySelectorAll(".filter");

    filtersBtn.forEach (button => {
        button.addEventListener("click", () => {
            
            // Changement du bouton actif
            filtersBtn.forEach (btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filtrage des travaux : comparaison catégories travaux / filtres
            const category = button.dataset.workCategory;
            if (category === "all") {
             displayWorks(getAllWorks());
            } else {
                const filteredWorks = getAllWorks().filter(work => work.categoryId === Number(category));
                displayWorks(filteredWorks);
            }
        });
    });
}



// Lien page de connexion au menu "login" de la page d'accueil
loginLink.addEventListener("click", () => {
    window.location.href = "admin.html";
});

// Appel fonction d'affichage page d'accueil lors d'une connexion
if (token) {
    loggedInHomepage();

    // Appel fonction d'affichage modale
    const openModalBtn = document.querySelector(".edit-mode-btn");
    if (openModalBtn) {
        openModalBtn.addEventListener("click", openModal);
    }
}

// Fonction d'affichage page d'accueil lors d'une connexion
function loggedInHomepage() {
    editModeBanner();
    logout();
    editModeBtn();
}

// Fonction d'affichage de la bannière "Mode édition"
function editModeBanner() {
    const banner = document.createElement("div");
    banner.classList.add("edit-mode-banner");

    const bannerIcon = document.createElement("i");
    bannerIcon.classList.add("fa-regular", "fa-pen-to-square");

    const bannerTxt = document.createElement("span");
    bannerTxt.textContent = "Mode édition";

    banner.appendChild(bannerIcon);
    banner.appendChild(bannerTxt);
    document.body.prepend(banner);
}

// Fonction de déconnexion du mode édition
function logout() {
    if (loginLink) {
        loginLink.textContent = "logout";

        loginLink.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.reload();
        });
    }
}

// Fonction d'affichage du bouton d'édition
function editModeBtn() {
    const portfolioTitle = document.querySelector("#portfolio h2");

    const portfolioTitleWrapper = document.createElement("div");
    portfolioTitleWrapper.classList.add("title-wrapper");
    portfolioTitle.replaceWith(portfolioTitleWrapper);
    portfolioTitleWrapper.appendChild(portfolioTitle);

    const editBtnContainer = document.createElement("div");
    editBtnContainer.classList.add("edit-mode-btn");

    const editBtnIcon = document.createElement("i");
    editBtnIcon.classList.add("fa-regular", "fa-pen-to-square");

    const editBtnTxt = document.createElement("span");
    editBtnTxt.textContent = "modifier";

    editBtnContainer.appendChild(editBtnIcon);
    editBtnContainer.appendChild(editBtnTxt);
    portfolioTitleWrapper.appendChild(editBtnContainer);
}

// Fonction filtres masqués du mode édition
function hideFilters() {
    const filtersContainer = document.querySelector(".filters");
    if (filtersContainer) {
        filtersContainer.style.display = "none";
    }
}