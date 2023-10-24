//recuperation token dans localstorage

const token = window.localStorage.getItem("token")
const logoutElement = document.querySelector(".log")
const modifElement = document.querySelector(".modif")


if(token){
    logoutElement.innerHTML = '<a herf="#">Logout</a>'
    modifElement.innerHTML = '<a href="#"><i class="fa-regular fa-pen-to-square"></i>modifier</a>'
    logoutElement.addEventListener("click",()=>{
         window.localStorage.removeItem("token")
         window.location.reload()
    })
}