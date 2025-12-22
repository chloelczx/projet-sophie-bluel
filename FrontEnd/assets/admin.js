const loginForm = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
});