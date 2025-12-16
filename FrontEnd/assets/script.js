const gallery = document.querySelector(".gallery");
let allWorks = [];

// Appel API pour récupérer les projets de l'architecte
async function getWorks() {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    allWorks = await worksResponse.json();

    // Affichage des projets dans la gallerie
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

    const btnAll = document.createElement("button");
    btnAll.classList.add("filter", "active");
    btnAll.textContent = "Tous";
    filters.appendChild(btnAll);

    categories.forEach(category => {
        const btnFilter = document.createElement("button");
        btnFilter.classList.add("filter");
        btnFilter.textContent = category.name;

        filters.appendChild(btnFilter);
    });

    portfolio.insertBefore(filters, gallery);
}

getCategories();