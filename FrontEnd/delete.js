/**
 * Appel delete depuis le ficher JSON
 * @param {*} id identifiant du projet a supprimer
 * @param {*} token token d'authentification
 * @returns true ou false en fonction de resultat de l'API
 */

export async function deleteWork (id, token){
    const options = {
        method: "DELETE",
        headers: {
            Authorization:"Bearer " + token
        }
    };
    const url = "http://localhost:5678/api/works/"+id;
    const supp = await fetch( url, options );
    return supp.ok

}

