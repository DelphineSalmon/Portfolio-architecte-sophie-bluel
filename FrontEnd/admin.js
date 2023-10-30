import { deleteWork } from "./delete.js";
import { displayWorks, displayWorksModale } from "./works.js";
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
    //ouverture modale, faire modale en JS
   
    modifElement.addEventListener("click", () => {
        const dialog = modaleGaleriePhoto(token);
        dialog.showModal();

    });

    
   
}
//création modale
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

    const suppElement = document.createElement("p");
    suppElement.classList.add("supp-gallery");
    const linkSuppElement = document.createElement("a");
    linkSuppElement.innerText = "supprimer la gallerie";

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

    // fermeture modale avec croix et ext modale
    closeElement.addEventListener("click", () => {
        dialogElement.close();
        modaleElement.innerHTML =""
    });
    dialogElement.addEventListener("click", (event) => {
        if (event.target.id === "add-remove") {
            dialogElement.close();
            modaleElement.innerHTML =""
        }
    });
//creation gallery dans modale
    displayWorksModale(token);

    return dialogElement;
}
