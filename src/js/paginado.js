import { usuarios } from ".";

const tarjItems= document.querySelector("#tarj").children;
//console.log(tarjItems);

const prev= document.querySelector(".prev")
const next= document.querySelector(".next")
const maxItems= 10;
let index=1;


function showItem() {
    for (let i = 0; i < tarjItems.length; i++) {
        tarjItems.classList.contains('user');
       tarjItems[i].classList.add("hide")
        
        if(i>=(index*maxItems)-maxItems && i<index*maxItems){
            tarjItems[i].classList.remove("hide")
        }

    }
}
 
window.onload=showItem()