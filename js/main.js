
"use strict"

//Hämtar element
let newtodobuttonEl = document.getElementById("newtodobutton");
let todolistEl = document.getElementById("todolist");
let errorEl = document.getElementById("message");
let newtodoEl = document.getElementById("newtodo");
let clearbuttonEl = document.getElementById("clearbutton");
let i;

//Event listeners
newtodobuttonEl.addEventListener("click", function(){

    addItem(newtodoEl.value);//kallar funktion med "newtodo"s värde
});
newtodoEl.addEventListener("keyup", checkInput, false); //Kallar på checkInput när man skriver i newtodo
clearbuttonEl.addEventListener("click", function(){

    clearAllElements();
})

window.onload = init; // Kör init vid laddning

function init(){

    newtodobuttonEl.disabled = true; //Inaktiverar newtodobutton


    loadData();//Laddar storage
}

//Lägg till i listan
function addItem(item){
        let newEl = document.createElement("li"); //Skapar nytt element
        let newElName = document.createTextNode(item); //PH innehåll
        
        newEl.appendChild(newElName); //Slå ihop
        newEl.className = "todolistElements"; //Lägger till elementet i en klass
        todolistEl.appendChild(newEl); //Lägger till i DOM
        newtodoEl.value = ""; // Tömmer skrivfältet
        newtodobuttonEl.disabled = true;
        //Ger våra element en eventlister som raderar element vi klickar på
    newEl.addEventListener("click", function(e){
        e.target.remove();//Raderar elementet

        saveData(); //Sparar ändringar
    })

    
    saveData(); //lagrar element
}

//Slår av och på newtodobutton samt skickar felmeddelande beroende på inputtens längd
function checkInput(){
    var input = newtodoEl.value;
    if (input.length > 4) {
        errorEl.innerHTML = ""; //Tar bort felmeddelandet
        newtodobuttonEl.disabled = false; 
    }
    else{
        errorEl.innerHTML = "Måste innehålla minst fem tecken!"//Lägger till felmeddelandet
        newtodobuttonEl.disabled = true;
    }

}

//Ladda från webstorage
function loadData(){
    let allElements = JSON.parse(localStorage.getItem("storedTodolist")); //Hämtar sparade element och konverterar tillbaka från JSON
    console.log(allElements);
    for (i = 0; i < allElements.length; i++){
     let newEl = document.createElement("li"); //Skapar nytt element
     let newElName = document.createTextNode(allElements[i]); //PH innehåll
        
     newEl.appendChild(newElName); //Slå ihop
     newEl.className = "todolistElements"; //Lägger till elementet i en klass
     todolistEl.appendChild(newEl); //Lägger till i DOM

     //Ger våra element en eventlister som raderar element vi klickar på
    newEl.addEventListener("click", function(e){
        e.target.remove();//Raderar elementet

        saveData(); //Sparar ändringar
    })
}
    }

    

//Sparar till webstorage
function saveData(){
    let allElements = document.getElementsByClassName("todolistElements"); //Hämtar element
    let arr = []; //PH för element

    //Fyller array med todolists element
    for (i = 0; i<allElements.length;i++){
        arr.push(allElements[i].innerHTML);
    }

    let jsonString = JSON.stringify(arr); //converterar till JSON-sträng

    localStorage.setItem("storedTodolist",jsonString); //sparar till local storage
    console.log(arr);
}

//Raderar alla element i todolist
function clearAllElements(){
    let allElements = document.getElementsByClassName("todolistElements");//Hämtar våra element

    //Lopar igenom alla element och raderar dem
    for(i = (allElements.length - 1);i > -1;i--){
        allElements[i].remove();
    }
    saveData();//sparar ändringar
}