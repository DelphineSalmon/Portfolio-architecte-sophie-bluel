import { deleteWork } from "./delete.js";
import { displayWorks, displayWorksModale, works } from "./works.js";
import { categories } from "./categories.js";
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
    
    
    
}
const fileHandler = (file, name, type) => {
    const errorImageELement = document.querySelector(".error-image");
    errorImageELement.innerText = "";
    if (type.split("/")[0] !== "image") {
        //Error type fichier
        errorImageELement.innerText = "Veuillez télécharger un ficher image";
    } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            //affichage image lors d'un ajout de projet
            let img = document.createElement("img");
            img.classList.add("photo");
            img.src = reader.result;
            let imageDisplay = document.querySelector(".add-photo");
            imageDisplay.innerHTML = "";
            imageDisplay.appendChild(img);
        };
    }
};

//Ouverture et fermeture Modale ajout photo
function modaleAddPhoto(token) {
    //Creation balise seconde modale
    const secondDialogElement = document.getElementById("dialog-box");

    const divInvisibleElement = document.createElement("div");

    const dialogAddElement = document.createElement("dialog");
    dialogAddElement.id = "dialog-box-add";

    const redirectionElement = document.createElement("div");
    redirectionElement.classList.add("redirection");

    const titleElement = document.createElement("h2");
    titleElement.innerText = "Ajout Photo";

    const lienCloseElement = document.createElement("a");
    lienCloseElement.classList.add("icone-close");
    const iconeCloseElement = document.createElement("i");
    iconeCloseElement.classList.add("fa-solid", "fa-xmark", "fa-xl");

    const lienPrecedantElement = document.createElement("a");
    lienPrecedantElement.classList.add("icone-precedant");
    const iconePrecedantElement = document.createElement("i");
    iconePrecedantElement.classList.add("fa-solid", "fa-arrow-left", "fa-xl");

    const formElement = document.createElement("form");
    formElement.classList.add("form");
    formElement.id = "formAdd";
    formElement.enctype = "multipart/form-data";
    
    const errorImageElement = document.createElement("div");
    errorImageElement.classList.add("error-image");
    
     // j empêche le comportement par défaut de la 2eme modale
     formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const body = new FormData(formElement);
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
    const boutonAjoutPhotoElement = document.createElement("input");
    boutonAjoutPhotoElement.classList.add("btn-add-photo");
    boutonAjoutPhotoElement.id = "image";
    boutonAjoutPhotoElement.accept = "image/*";
    boutonAjoutPhotoElement.type = "file";
    boutonAjoutPhotoElement.name = "image";

    const visuelBoutonAddImageElement = document.createElement("label");
    visuelBoutonAddImageElement.classList.add("btn-add-photo");
    visuelBoutonAddImageElement.htmlFor = "image";
    visuelBoutonAddImageElement.innerText = "+ Ajouter photo";

     //Upload Button
     boutonAjoutPhotoElement.addEventListener("change", () => {
        Array.from(boutonAjoutPhotoElement.files).forEach((file) => {
            fileHandler(file, file.name, file.type);
        });
    });

    const addPhotoElement = document.createElement("div");
    addPhotoElement.classList.add("add-photo");

    const iconeElement = document.createElement("p");
    iconeElement.classList.add("icone");
    const iconePhotoElement = document.createElement("i");
    iconePhotoElement.classList.add("fa-regular", "fa-image");

    const pElement = document.createElement("p");
    pElement.innerText = "jpg, png: 4mo max";

    const labelTitleElement = document.createElement("label");
    labelTitleElement.htmlFor= "title";
    labelTitleElement.innerText = "Titre";

    const saisieTextElement = document.createElement("input");
    saisieTextElement.type = "text";
    saisieTextElement.id = "title";
    saisieTextElement.name = "title";

    const labelCategorieElement = document.createElement("label");
    labelCategorieElement.htmlFor= "categories-select";
    labelCategorieElement.innerText = "Catégorie";

    const selectCategorieElement = document.createElement("select");
    selectCategorieElement.name = "category";
    selectCategorieElement.id = "choix-categorie";
    //option//
    const firstOptionElement = new Option("", "", true);
    const optionElement = categories.map(
        (categorie) => new Option(categorie.name, categorie.id)
    );
    optionElement.unshift(firstOptionElement);

    const decoLineElement = document.createElement("div");
    decoLineElement.classList.add("line-decor");

    const errorMessageElement = document.createElement("div");
    errorMessageElement.classList.add("error-message");

    const btnValiderElement = document.createElement("input");
    btnValiderElement.classList.add("btn-valid");
    btnValiderElement.type = "submit";
    btnValiderElement.innerText = "Valider";

    //Rattachement au DOM
    secondDialogElement.appendChild(dialogAddElement);
    dialogAddElement.appendChild(divInvisibleElement);
    divInvisibleElement.appendChild(redirectionElement);
    redirectionElement.append(lienPrecedantElement, lienCloseElement);
    lienPrecedantElement.appendChild(iconePrecedantElement);
    lienCloseElement.appendChild(iconeCloseElement);

    divInvisibleElement.appendChild(titleElement);

    divInvisibleElement.appendChild(formElement);
    formElement.appendChild(errorImageElement);
    formElement.appendChild(boutonAjoutPhotoElement);
    formElement.appendChild(addPhotoElement);
    addPhotoElement.appendChild(iconeElement);
    iconeElement.appendChild(iconePhotoElement);
    addPhotoElement.appendChild(visuelBoutonAddImageElement);
    addPhotoElement.appendChild(pElement);

    formElement.appendChild(labelTitleElement);
    formElement.appendChild(saisieTextElement);

    formElement.appendChild(labelCategorieElement);
    formElement.appendChild(selectCategorieElement);

    selectCategorieElement.append(...optionElement);

    formElement.appendChild(decoLineElement);
    formElement.appendChild(errorMessageElement);
    formElement.appendChild(btnValiderElement);

    iconeCloseElement.addEventListener("click", () => {
        dialogAddElement.remove();
    });
    dialogAddElement.addEventListener("click", (event) => {
        if (event.target.id === "dialog-box-add") {
            dialogAddElement.remove();
        }
    });

    iconePrecedantElement.addEventListener("click", () => {
        const dialog = modaleGaleriePhoto(token);
        dialog.showModal();
        dialogAddElement.remove();
    });

    return dialogAddElement;
}

/*<dialog id="dialog-box-add">
					<div>
						<div class="redirection">
							<a href="#" class="icone-precedant"><i class="fa-solid fa-arrow-left fa-xl"></i></a>
							<a href="#" class="icone-close"><i class="fa-solid fa-xmark fa-xl"></i></a>
						</div>
						<h2>Ajout photo</h2>
						
						<form enctype="multipart/form-data" action="#" method="post" class="form" id="formAdd">
							<div class="error-image"></div>
							<input type="file" name="image" accept="image/*" class="btn-add-photo" id="image"/>
							<div class="add-photo">
								<p class="icone"><i class="fa-regular fa-image"></i></p>
								<label class="btn-add-photo" for="image">+ Ajouter photo</label>
								<p>jpg, png: 4mo max</p>
							</div>
							<label for="title">Titre</label>
							<input type="text" id="title" name="title" required >
							<label for="categories-select">Catégorie</label>
							<select name="category" id="choix-categorie">
								<option value =""></option>
								<option value="1">Objets</option>
								<option value="2">Appartements</option>
								<option value="3">Hotels & Restaurants</option>
							</select>
							<div class="line-decor"></div>
							<div class="error-message"></div>
							<input type="submit" class="btn-valid" value="Valider"/>	
						</form>
						
					</div>
				</dialog>-->*/

//création premiere modale
function modaleGaleriePhoto(token) {
    //création des balises
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
        dialogElement.remove();
        dialogAddElement.showModal();
    });

    const suppElement = document.createElement("p");
    suppElement.classList.add("supp-gallery");
    const linkSuppElement = document.createElement("a");
    linkSuppElement.innerText = "supprimer la gallerie";

    //Rattachement de nos balises au DOM
    modaleElement.appendChild(dialogElement);
    dialogElement.appendChild(dialogContentElement);
    dialogContentElement.append(
        closeElement,
        titleElement,
        galleryElement,
        decoElement,
        addPhotoElement,
        suppElement
    );
    closeElement.appendChild(iconeCloseElement);
    suppElement.appendChild(linkSuppElement);

    // fermeture modale accueil avec croix et ext modale
    closeElement.addEventListener("click", () => {
        dialogElement.close();
        dialogElement.remove();
    });
    dialogElement.addEventListener("click", (event) => {
        if (event.target.id === "add-remove") {
            dialogElement.close();
            dialogElement.remove();
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
