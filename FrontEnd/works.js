// Récupération des projets depuis le ficher JSON//
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

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


displayWorks(".gallery")
