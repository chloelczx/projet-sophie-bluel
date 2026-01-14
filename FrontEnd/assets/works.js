// Variables globales
let allWorks = [];
const token = localStorage.getItem("token");



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



// Fonction de suppression des travaux
export async function deleteWork(id) {
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