let baliseEMail = document.getElementById("email");
let balisePassword = document.getElementById("password");
let form = document.querySelector(".form-connexion");

//Cette fonction prend un email en paramètre et valide qu'il est au bon format.
function verifierEmail(balise) {
    let emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+");
    if (!emailRegExp.test(balise.value)) {
        throw new Error("L'email n'est pas valide.");
    }
}
// j empêche le comportement par défaut
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Je récupère l EMail et affiche leur valeur
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

const connect = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
// Récupération des identifiants depuis le ficher JSON//
    const response = await fetch(
        "http://localhost:5678/api/users/login",
        options
    );
    const data = await response.json();

    if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.location.href = "/index.html";
    } else {
        let messageError = "Erreur de connection";
        let errorMessageElement = document.querySelector(".error-message");
        console.log(data);
        errorMessageElement.innerText = messageError;
    }
};
