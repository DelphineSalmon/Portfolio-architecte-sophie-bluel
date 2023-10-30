// Appel delete depuis le ficher JSON//

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

