// Fonction d'affichage des travaux dans la galerie
export function displayWorks(works) {
    const gallery = document.querySelector(".gallery");

    // Suppression contenu HTML des travaux
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