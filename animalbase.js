"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

const settings ={
filter: "all",
sortBy: "name",
sortDir: "asc"
 }

function start( ) {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons

    loadJSON();
}


function registerButtons(){
    document.querySelectorAll("[data-action='filter']")
    .forEach(button => button.addEventListener("click", selectFilter));
    
    document.querySelectorAll("[data-action='sort']")
    .forEach(button => button.addEventListener("click", selectSort));

}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    registerButtons();

    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( prepareObject );

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function prepareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function selectFilter(event){
    const filter = event.target.dataset.filter;
/*     filterList(filter);
 */setFilter(filter)  
 }

    function setFilter(filter){
        settings.filterBy = filter;
        buildList()
    }
    
    function filterList(filteredList){
/*     let filteredList = allAnimals;
 */    if(settings.filterBy==="cat"){
        filteredList = allAnimals.filter(isCat);
    }
    else if(settings.filterBy==="dog"){
        filteredList = allAnimals.filter(isDog);
    } 
else {
    filteredList = allAnimals;
}

/* return filteredList; 
    
   */  
return filteredList; 
    }
    
    function isCat(animal){
        return animal.type === "cat";
    }
    
    function isDog(animal){
        return animal.type === "dog";
    }


    function sortByName(animalA, animalB){
        if(animalA.name < animalB.name){
            return -1;
        } else{
            return 1;
        }
    }

    function sortByType(animalA, animalB){
        if(animalA.type < animalB.type){
            return -1;
        } else{
            return 1;
        }
    }
    function sortList(sortBy){
        let sortedList = allAnimals;
    
        if(sortBy ==="name"){
            sortedList = sortedList.sort(sortByName);
        }
        else if(sortBy === "type"){
            sortedList = sortedList.sort(sortByType);
        }
        displayList(sortedList);
    }

     function selectSort(event){
        const sortBy = event.target.dataset.sort;
        const sortDir = event.target.dataset.sortDirection;

        const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
        oldElement.classList.remove("sortby");
//indicate active sort
event.target.classList.add("sortby");

        //toggle the direction
        if(sortDir==="asc"){
            event.target.dataset.sortDirection = "desc";
        }else{
            event.target.dataset.sortDirection = "asc";
        }
        setSort(sortBy, sortDir);
        }

        function setSort(sortBy, sortDir){
settings.sortBy = sortBy;
settings.sortDir = sortDir;
buildList();
        }
        
    
        function sortList(sortedList){
/*             let sortedList = allAnimals;
 */    let direction = 1;
    if(settings.sortDir==="desc"){
        direction = -1;
    } else{
        settings.direction = 1;
    }

        sortedList = sortedList.sort(sortByProperty);
    
    function sortByProperty(animalA, animalB){
        if(animalA[settings.sortBy] < animalB[settings.sortBy]){
            return -1 * direction;
        } else{
            return 1 * direction;
        }
    }

    return sortedList;
        }

        function buildList(){
            const currentList = filterList(allAnimals);
            const sortedList = sortList(currentList);
            displayList(sortedList);
        }

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


