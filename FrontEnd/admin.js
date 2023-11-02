import { deleteWork } from "./delete.js";
import { displayWorks, displayWorksModale, works } from "./works.js";
//recuperation token dans localstorage

const token = window.localStorage.getItem("token");
const logoutElement = document.querySelector(".log");
const modifElement = document.querySelector(".modif");
const modifProfilElement = document.querySelector(".modif-p");
const barreEditElement = document.getElementById("barre-edit");

if (token) {
    logoutElement.innerHTML = '<a href="#">Logout</a>';
    modifElement.innerHTML =
        '<a href="#"><i class="fa-regular fa-pen-to-square"></i> modifier</a>';
    modifProfilElement.innerHTML =
        '<a href="#"><i class="fa-regular fa-pen-to-square"></i> modifier</a>';
    barreEditElement.innerHTML =
        '<p class="mode-edition"><a href="#"><i class="fa-regular fa-pen-to-square"></i> mode édition</a></p><button>publier les changements</button>';
    barreEditElement.classList.add("barre-edit");
    logoutElement.addEventListener("click", () => {
        window.localStorage.removeItem("token");
        window.location.reload();
    });
    //Ouverture modale

    modifElement.addEventListener("click", () => {
        const dialog = modaleGaleriePhoto(token);
        dialog.showModal();
    });
    // j empêche le comportement par défaut de la 2eme modale
    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const body = new FormData(form);
        body.get("title");
        const addTilte = body.get("title");
        const selectCategorie = body.get("category");
        const selectImage = body.get("image");

        //affichage message erreur
        if (
            addTilte === "" ||
            selectCategorie === "" ||
            selectImage.size === 0
        ) {
            let messageError = "Saisie incorrecte";
            let messageErrorElement = document.querySelector(".error-message");
            messageErrorElement.innerText = messageError;
        } else {
            // Reponse API

            const newWork = postProjet(body, token);
            newWork.then((result) => {
                if (result) {
                    works.push(result);
                    console.log(result);
                    displayWorks(".gallery");
                }
            });
        }
    });
    const uploadButton = document.querySelector(".btn-add-photo");

    //Upload Button
    uploadButton.addEventListener("change", () => {
        Array.from(uploadButton.files).forEach((file) => {
            fileHandler(file, file.name, file.type);
        });
    });
}
const fileHandler = (file, name, type) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        //image and file name
        let img = document.createElement("img");
        img.classList.add("photo");
        img.src = reader.result;
        let imageDisplay = document.querySelector(".add-photo");
        imageDisplay.innerHTML = "";
        imageDisplay.appendChild(img);
    };
};

//Ouverture et fermeture Modale ajout photo
function modaleAddPhoto(token) {
    const dialogAddElement = document.getElementById("dialog-box-add");
    const iconeCloseElement = document.querySelector(".icone-close");
    const iconePrecedantElement = document.querySelector(".icone-precedant");

    iconeCloseElement.addEventListener("click", () => {
        dialogAddElement.close();
    });
    dialogAddElement.addEventListener("click", (event) => {
        if (event.target.id === "dialog-box-add") {
            dialogAddElement.close();
        }
    });

    iconePrecedantElement.addEventListener("click", () => {
        const dialog = modaleGaleriePhoto(token);
        dialog.showModal();
        //TODO :clean div dialog (retire modale dans html)
        dialogAddElement.close();
    });
    return dialogAddElement;
}

//création premiere modale
function modaleGaleriePhoto(token) {
    const modaleElement = document.getElementById("dialog-box");
    const dialogElement = document.createElement("dialog");
    dialogElement.id = "add-remove";

    const dialogContentElement = document.createElement("div");
    const closeElement = document.createElement("button");
    closeElement.classList.add("close");

    const iconeCloseElement = document.createElement("i");
    iconeCloseElement.classList.add("fa-solid", "fa-xmark", "fa-xl");

    const titleElement = document.createElement("h2");
    titleElement.innerText = "Galerie Photo";

    const galleryElement = document.createElement("div");
    galleryElement.classList.add("gallery-modale");

    const decoElement = document.createElement("div");
    decoElement.classList.add("decor");

    const addPhotoElement = document.createElement("button");
    addPhotoElement.innerText = "Ajouter une photo";
    addPhotoElement.classList.add("btn-add");
    addPhotoElement.addEventListener("click", () => {
        const dialogAddElement = modaleAddPhoto(token);
        dialogElement.close();
        modaleElement.innerHTML = "";
        dialogAddElement.showModal();
    });

    const suppElement = document.createElement("p");
    suppElement.classList.add("supp-gallery");
    const linkSuppElement = document.createElement("a");
    linkSuppElement.innerText = "supprimer la gallerie";

    //Rattachement de nos balises au DOM
    modaleElement.appendChild(dialogElement);
    dialogElement.appendChild(dialogContentElement);
    dialogContentElement.appendChild(closeElement);
    closeElement.appendChild(iconeCloseElement);
    dialogContentElement.appendChild(titleElement);
    dialogContentElement.appendChild(galleryElement);
    dialogContentElement.appendChild(decoElement);
    dialogContentElement.appendChild(addPhotoElement);
    dialogContentElement.appendChild(suppElement);
    suppElement.appendChild(linkSuppElement);

    // fermeture modale accueil avec croix et ext modale
    closeElement.addEventListener("click", () => {
        dialogElement.close();
        modaleElement.innerHTML = "";
    });
    dialogElement.addEventListener("click", (event) => {
        if (event.target.id === "add-remove") {
            dialogElement.close();
            modaleElement.innerHTML = "";
        }
    });
    //creation gallery dans modale
    displayWorksModale(token);

    return dialogElement;
}

// Reponse API
const postProjet = async (body, token) => {
    const option = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
        body: body,
    };
    const response = await fetch("http://localhost:5678/api/works", option);
    return await response.json();
};
