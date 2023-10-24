import { displayWorks } from "./works.js";

// Récupération des projets depuis le ficher JSON//
const reponse = await fetch('http://localhost:5678/api/categories');
const categories = await reponse.json();

//Affichage des filtres//
const sectionFiltres = document.querySelector(".filters")

displayFilter({name:"Tous"})

for (const category of categories){
    displayFilter(category)
}

function displayFilter(category){
    const token = window.localStorage.getItem("token")
    if(!token){
        const categoryElement = document.createElement("button")
        categoryElement.innerText = category.name
        // TODO Rajout class pour css 
        categoryElement.classList.add('button-filters')
        sectionFiltres.appendChild(categoryElement)
        categoryElement.addEventListener("click", function(event){
            displayWorks(category.id)
    
    
        })
    }
    
}





