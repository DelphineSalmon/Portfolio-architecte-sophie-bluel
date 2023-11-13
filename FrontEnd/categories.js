import { displayWorks } from "./works.js";

// Récupération des projets depuis le ficher JSON//
const reponse = await fetch("http://localhost:5678/api/categories");
export const categories = await reponse.json();

//Affichage des filtres//
const sectionFiltres = document.querySelector(".filters");
displayFilter({ name: "Tous" }, true);

for (const category of categories) {
    displayFilter(category);
}
/**
 * création des boutons filtres
 * @param {*} category objet categorie
 * @param {*} first condition si c'est le 1er élément 
 */
function displayFilter(category, first) {
    const token = window.localStorage.getItem("token");
    if (!token) {
        const categoryElement = document.createElement("button");
        categoryElement.innerText = category.name;
        categoryElement.classList.add("button-filters");
        sectionFiltres.appendChild(categoryElement);
        if(first) {
            categoryElement.classList.add("button-filters-click")
        }
//changement couleur au click
        categoryElement.addEventListener("click", function (event) {
            displayWorks(".gallery",category.id);
            const buttonsFiltersClick = document.querySelectorAll(".button-filters-click")
            for( const element of buttonsFiltersClick ){
                element.classList.remove("button-filters-click")
            }
           categoryElement.classList.add("button-filters-click")
        });
    }
}
