
let baliseEMail = document.getElementById("email")
let balisePassword = document.getElementById("password")
let form = document.querySelector(".form-connexion")

//Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
function verifierEmail(balise){
    let emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+")
    if (!emailRegExp.test(balise.value)) {
        throw new Error("L'email n'est pas valide.")
    }
        
}
// j empêche le comportement par défaut
form.addEventListener("submit",(event)=>{
    event.preventDefault()
     // Je récupère l EMail et affiche leur valeur
     const email = document.getElementById("email").value 
     const password = document.getElementById("password").value
     
      // Récupération des identifiants depuis le ficher JSON//
    fetch('http://localhost:5678/api/users/login',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:`{"email": "${email}","password": "${password}"}`
    })
    .then(reponse=>  reponse.json())
    .then(data =>{
        if(data.token){
            window.localStorage.setItem("token", data.token)
            window.location.href ='/index.html'
        }else{
            let messageError = "Erreur de connection"
            if(data.message === "user not found"){
                messageError = "Erreur E-mail"
            }
            let errorMessageElement = document.querySelector(".error-message")
            console.log(data)
            errorMessageElement.innerHTML = messageError
                
        }
            
    })
    
})

baliseEMail.addEventListener("change",()=>{
    verifierEmail(baliseEMail)
})


