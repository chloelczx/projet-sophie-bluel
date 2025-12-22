const loginForm = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", async (event) => {
    // Bloque rechargement de la page par défaut de l'input type submit
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            Headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

    const loginData = await loginResponse.json();
});