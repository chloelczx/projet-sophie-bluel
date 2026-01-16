// Création du message d'erreur
const errorMessage = document.createElement("p");
errorMessage.classList.add("login-error");
errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";

// Ecoute de l'événement : envoi du formulaire
const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (event) => {
    // Bloque le rechargement de la page par défaut de l'input type submit
    event.preventDefault();

    // Requête POST à l'API : envoi des valeurs du formulaire
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
    const loginData = await loginResponse.json();

    // Gestion de la réponse de l'API
    if (loginResponse.ok) {
        localStorage.setItem("token", loginData.token);
        window.location.href = "index.html";
    } else {
        if (!loginForm.contains(errorMessage)) {
            loginForm.appendChild(errorMessage);
        }
    }
});