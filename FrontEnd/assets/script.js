// Appel API pour récupérer les projets de l'architecte
async function getWorks() {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    const works = await worksResponse.json();

    // Affichage des projets dans la gallerie
    const gallery = document.querySelector(".gallery");

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

getWorks();