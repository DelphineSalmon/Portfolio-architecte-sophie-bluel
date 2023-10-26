import { displayWorks } from "./works.js";
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

    //Fermeture, et ouverture modale, faire modale en JS
    const dialog = document.querySelector("dialog");
    modifElement.addEventListener("click", () => {
        dialog.showModal();
       //displayWorks(".gallery-modale");
    });
    const closeButton = document.querySelector("dialog button");
    // Le bouton "Fermer" et click a l'exterieur de la modale ferme le dialogue
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
    dialog.addEventListener("click",(event) =>{
        if( event.target.id === "add-remove"){
            dialog.close()
            
        }
    })
}
