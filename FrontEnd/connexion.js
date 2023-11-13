const baliseEMail = document.getElementById("email");
const balisePassword = document.getElementById("password");
const form = document.querySelector(".form-connexion");

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format.
 * @param {*} balise est le mail a vérifier
 */
function verifierEmail(balise) {
    const emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");
    if (!emailRegExp.test(balise.value)) {
        throw new Error("L'email n'est pas valide.");
    }
}
// j empêche le comportement par défaut
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Je récupère l EMail et password envoie API
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        email,
        password,
    };
    connect(user);
    
});

baliseEMail.addEventListener("change", () => {
    verifierEmail(baliseEMail);
});
//Envoie une requete POST sur API
const connect = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
// Récupération du TOKEN//
    const response = await fetch(
        "http://localhost:5678/api/users/login",
        options
    );
    const data = await response.json();
//Si Token valide connexion ok, sinon message d'erreur
    if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.location.href = "/index.html";
    } else {
        const messageError = "Erreur de connexion";
        const errorMessageElement = document.querySelector(".error-message");
        errorMessageElement.innerText = messageError;
    }
};
