// Variables globales
let allWorks = [];



// Appel API pour récupérer les travaux de l'architecte
export async function getWorks() {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    allWorks = await worksResponse.json();
    return allWorks;
}

// Fonction de lecture des travaux
export function getAllWorks() {
    return allWorks;
}