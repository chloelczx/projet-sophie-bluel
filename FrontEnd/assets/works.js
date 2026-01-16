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



// Appel API pour récupérer les catégories de travaux
export async function getCategories() {
    const categoriesResponse = await fetch("http://localhost:5678/api/categories");
    return await categoriesResponse.json();
}



// Fonction de suppression des travaux
export async function deleteWork(id) {
    const token = localStorage.getItem("token");

    const deleteWorkResponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (deleteWorkResponse.ok) {
        allWorks = allWorks.filter(work => work.id !== id);
    } else {
        throw new Error("Erreur lors de la suppression");
    }
}