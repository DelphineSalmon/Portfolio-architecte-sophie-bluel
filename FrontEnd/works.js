import{deleteWork } from "./delete.js";
// Récupération des projets depuis le ficher JSON//
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

// Affichage portfolio
displayWorks(".gallery")

// Création des projets
export function displayWorks(sellector, categoryId){
    const sectionPotfolio = document.querySelector(sellector)
    sectionPotfolio.innerHTML = ""
    for (const work of works){
        if (work.categoryId === categoryId || categoryId === undefined){
            const figureElement = document.createElement("figure")
            const imageElement = document.createElement("img")
            imageElement.src = work.imageUrl
            const titleElement = document.createElement("figcaption")
            titleElement.innerText = work.title
            
            //Rattachement de nos balises au DOM  
            figureElement.appendChild(imageElement)
            figureElement.appendChild(titleElement)
            sectionPotfolio.appendChild(figureElement)
        }
    }
}

export function displayWorksModale( token){
    const sectionPortfolio = document.querySelector(".gallery-modale")
    sectionPortfolio.innerHTML = ""
    for (const work of works){
            const figureElement = document.createElement("figure")
            const imageElement = document.createElement("img")
            imageElement.src = work.imageUrl
            const titleElement = document.createElement("figcaption")
            titleElement.innerText = "éditer"
            const lienElement = document.createElement("a")
            const iconeElement =document.createElement("i")

            iconeElement.classList.add("fa-solid","fa-trash-can")

            //Rattachement de nos balises au DOM 
            figureElement.appendChild(lienElement)
            lienElement.appendChild(iconeElement) 
            figureElement.appendChild(imageElement)
            sectionPortfolio.appendChild(figureElement)
            figureElement.appendChild(titleElement)

            //suppresion au click icone poubelle

            iconeElement.addEventListener("click",()=>
            {

                const resultDelete = deleteWork(work.id, token)
                if (resultDelete ){
                    figureElement.remove()
                }
            })

        }
    }




/*                  <figure>
						<div class="i-croix">
                            <i class="fa-solid fa-up-down-left-right" style="color: #ffffff;"></i>
                        </div>
						<a href="#">
                            <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
                        </a>
						<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
						<figcaption>
                            éditer
                        </figcaption>
					</figure>*/
