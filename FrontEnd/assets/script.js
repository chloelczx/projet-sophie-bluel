// Variables globales
const token = localStorage.getItem("token");
const gallery = document.querySelector(".gallery");
let allWorks = [];



// Fonction d'affichage des projets dans la gallerie
function displayWorks(works) {
    // Suppression contenu HTML des projets
    gallery.innerHTML = "";

    works.forEach(work => {
        const workContent = document.createElement("figure");
        const workImg = document.createElement("img");
        const workCaption = document.createElement("figcaption");

        workImg.src = work.imageUrl;
        workImg.alt = work.title;
        workCaption.textContent = work.title;

        workContent.appendChild(workImg);
        workContent.appendChild(workCaption);
        gallery.appendChild(workContent);
    });
}

// Appel API pour récupérer les projets de l'architecte
async function getWorks() {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    allWorks = await worksResponse.json();

    displayWorks(allWorks);
}

getWorks();



// Appel API pour récupérer les catégories de projets
async function getCategories() {
    const categoriesResponse = await fetch("http://localhost:5678/api/categories");
    const categories = await categoriesResponse.json();

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

getCategories();



// Fonction de gestion des filtres au clic
function clicFilter () {
    const filtersBtn = document.querySelectorAll(".filter");

    filtersBtn.forEach (button => {
        button.addEventListener("click", () => {
            
            // Changement du bouton actif
            filtersBtn.forEach (btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filtrage des travaux : comparaison catégories travaux / filtres
            const category = button.dataset.workCategory;
            if (category === "all") {
             displayWorks(allWorks);
            } else {
                const filteredWorks = allWorks.filter(work => work.categoryId === Number(category));
                displayWorks(filteredWorks);
            }
        });
    });
}



// Appel fonction d'affichage page d'accueil lors d'une connexion
if (token) {
    loggedInHomepage();
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
    banner.classList.add("edit-banner");

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
    const loginLink = document.querySelector(".login-link");

    if (loginLink) {
        loginLink.textContent = "logout";

        loginLink.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.reload();
        });
    }
}

// Fonction bouton d'édition
function editModeBtn() {
    const portfolioTitle = document.querySelector("#portfolio h2");

    const portfolioTitleWrapper = document.createElement("div");
    portfolioTitleWrapper.classList.add("title-wrapper");
    portfolioTitle.replaceWith(portfolioTitleWrapper);
    portfolioTitleWrapper.appendChild(portfolioTitle);

    const editBtnContainer = document.createElement("div");
    editBtnContainer.classList.add("edit-btn");

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
