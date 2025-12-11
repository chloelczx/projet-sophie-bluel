// Appel API pour récupérer les projets de l'architecte
async function getWorks() {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    const works = await worksResponse.json();
}

getWorks();