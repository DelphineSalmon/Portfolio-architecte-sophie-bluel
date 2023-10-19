// Récupération des projets depuis le ficher JSON//
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();

// Création des balises
const sectionPotfolio = document.querySelector(".gallery")
for (const article of projets){
    const figureElement = document.createElement("figure")
    const imageElement = document.createElement("img")
    imageElement.src = article.imageUrl
    const titleElement = document.createElement("figcaption")
    titleElement.innerText = article.title
    
    //Rattachement de nos balises au DOM  
    figureElement.appendChild(imageElement)
    figureElement.appendChild(titleElement)
    sectionPotfolio.appendChild(figureElement)
}

