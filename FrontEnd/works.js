import { deleteWork } from "./delete.js";

// Récupération des projets depuis le ficher JSON//
const reponse = await fetch("http://localhost:5678/api/works");
export const works = await reponse.json();

// Affichage portfolio
displayWorks(".gallery");

/**
 * Création des projets page d'accueil
 * @param {*} sellector l'élément sélectionné 
 * @param {*} categoryId filtrage des catégories
 */
export function displayWorks(sellector, categoryId) {
    const sectionPotfolio = document.querySelector(sellector);
    sectionPotfolio.innerHTML = "";
    for (const work of works) {
        if (work.categoryId === categoryId || categoryId === undefined) {
            const figureElement = document.createElement("figure");
            figureElement.id = "figure_" + work.id;
            const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;
            const titleElement = document.createElement("figcaption");
            titleElement.innerText = work.title;

            //Rattachement de nos balises au DOM
            figureElement.appendChild(imageElement);
            figureElement.appendChild(titleElement);
            sectionPotfolio.appendChild(figureElement);
        }
    }
}
/**
 * Création grille des projets dans la 1er modale
 * @param {*} token authentification 
 */
export function displayWorksModale(token) {
    const sectionPortfolio = document.querySelector(".gallery-modale");
    sectionPortfolio.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const work = works[i];
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = "éditer";
        const lienElement = document.createElement("a");
        const iconeElement = document.createElement("i");

        iconeElement.classList.add("fa-solid", "fa-trash-can");

        //Rattachement de nos balises au DOM
        figureElement.appendChild(lienElement);
        lienElement.appendChild(iconeElement);
        figureElement.appendChild(imageElement);
        sectionPortfolio.appendChild(figureElement);
        figureElement.appendChild(titleElement);

        //suppresion au click icone poubelle
        iconeElement.addEventListener("click", () => {
            const resultDelete = deleteWork(work.id, token);
            if (resultDelete) {
                figureElement.remove();
                const deleteFigure = document.getElementById(
                    "figure_" + work.id
                );
                deleteFigure.remove();
                works.splice(i, 1);
            }
        });
    }
}
