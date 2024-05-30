'use strict';

const drinksList = document.querySelector('.js_list');//mi ul
const inputSearch = document.querySelector('.js_input');//input para buscar
const btnSearch = document.querySelector('.js_btnSearch');// boton buscar
const favoritesList = document.querySelector('.js_favorite'); //ul donde voy a meter los favoritos
const btnReset = document.querySelector('.js_btnReset'); //boton de reset
const btnLog = document.querySelector('.js_btnLog');


let cocktailsData = []; //aquí voy a guardar todos mis cocktails
let favoriteCocktails = []; //array para la lista de favoritos




/* const renderDrink = (drink) => { //estructura de una bebida en el html
    return `
        <li class="drinks" id=${drink.idDrink}>
            <h3 class="drinkName">${drink.strDrink}</h3>
            <div>
                <img class="img" src="${drink.strDrinkThumb}" alt="cocktails">
            </div>
        </li>`;
    
}; */

const handleFavorite = (event) =>{//esta funcion me va a agregar la bebida a favoritos si no esta ya, si esta no la añade
 
    const selectedDrinkId = event.currentTarget.id; //dame el id de donde estoy pulsando
    console.log(selectedDrinkId);
    
    const clickedData = cocktailsData.find((item)=> item.idDrink ===selectedDrinkId); //de mi listado completo de cocteles encuentra el que tiene el id igual que el id del clicado
    console.log(clickedData);

    const favoritesClickedIndex = favoriteCocktails.findIndex((item) => item.idDrink === selectedDrinkId); //en cuenta la posicion para hacer el condicional, si es -1 es que aun no esta en la lista, añadelo

    if (favoritesClickedIndex === -1){ //si no existe en mi lista de elementos favoritos, añadelo
        favoriteCocktails.push(clickedData);
        
    }else{ //sino quitalo
        favoriteCocktails.splice(favoritesClickedIndex, 1); 
       
    }

    event.currentTarget.classList.toggle('selected'); //añado o quito la misma clase en cuando hago click

       console.log(favoriteCocktails);
        renderFavoriteList(); //pinto mi lista de cocteles fav
       localStorage.setItem('favoriteDrinks', JSON.stringify (favoriteCocktails)); //guardo en localStorage la lista de los que he pulsado como favoritos
    };
  

const renderAllDrinks = (arr) =>{ //estructura de todas mis bebidas
    drinksList.innerHTML= "";
   
    for (const drink of arr) {
        const isFav = favoriteCocktails.some((item)=>item.idDrink ===drink.idDrink); //recorre el array y si encuentras alguna bebida donde el id del item sea igual al id de mi array, es favorito

        let selectedClass = isFav ? 'selected' : ''; //si es favorito deja la clase selected sino quitala

        let img= ""; //si alguna de las bebidas del array tiene la imagen vacia, pinta esta img estandar
        if (drink.strDrinkThumb) {
            img = drink.strDrinkThumb;
        } else {
            img = 'https://via.placeholder.com/50x50/ffffff/666666/?text=TV';
        }

        drinksList.innerHTML +=`
        <li class="drinks ${selectedClass}" id="${drink.idDrink}">
            <h3 class="drinkName">${drink.strDrink}</h3>
            <img class="img" src="${img}" alt="cocktails">
        </li>`;
    }

    const liDrink = document.querySelectorAll('.drinks'); //todas mis li
   
    for (const item of liDrink) {
        item.addEventListener('click', handleFavorite); // click en cada uno de los elementos del array para añadirlo o no
}

}; 
const handleResetX = (event)=>{
   
    const drinkId = event.currentTarget.id; //identifico cual estoy pulsando por su id
    console.log(drinkId)
    const item = document.getElementById(drinkId); //me traigo los elementos por su id porque los estoy identificando por id

    const index = favoriteCocktails.findIndex((drink)=>drink.idDrink === drinkId); //encuentra su posicion

    if(index !==-1){  //si el elemento existe
    favoriteCocktails.splice(index, 1);
    item.classList.remove('selected'); //a ese elemento que se corresponde con el que marque para guardar como fav, le quito la clase de css
    event.currentTarget.remove();//se quita el elemento de la lista de fav
    localStorage.setItem('favoriteDrinks', JSON.stringify (favoriteCocktails)); //guardo mi lista de fav
    }
 
};


const renderFavoriteList = ()=>{

    favoritesList.innerHTML = "";

    for (const drink of favoriteCocktails) { //creo mi li para meter los fav y añado debajo un boton reset
        
        favoritesList.innerHTML += `
        <li class="js_drinks" id="${drink.idDrink}">
            <button  class="btnX js_reset">X</button>
            <h3 class="drinkName">${drink.strDrink}</h3>   
            <img class="img" src="${drink.strDrinkThumb}" alt="cocktails">
        </li>`; 
    }

    const li = document.querySelectorAll('.js_drinks'); //llamo a mis li para que lo elimine todo completo
    
    for (const button of li) {
        button.addEventListener('click',handleResetX) //boton de X para cada uno de los elementos
    }
};

const init = ()=>{ 
    const favDrinksLocal = localStorage.getItem('favoriteDrinks');
    if(favDrinksLocal !==null){
        favoriteCocktails = JSON.parse(favDrinksLocal);
        renderFavoriteList();
        //busco en local si tengo datos guardados como fav, si encuentro los pinto con la funcion renderFavorite
    }
    
};


const initialDataApi = ()=> { //funcion de inicio que siempre me va a buscar margaritas
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then (response => response.json())
    .then ((dataMargarita)=>{
        console.log(dataMargarita);
        cocktailsData = dataMargarita.drinks;
        console.log(dataMargarita);
        renderAllDrinks(cocktailsData); //funcion render la ejecuto aqui para que me coja los valores de margarita
     
    });

   
};

const handleInput =()=>{ //buscar por el nombre que se pone en el input
    const valueInput = inputSearch.value.toLowerCase(); //valor de mi input y lo convierto a minusculas
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`; //creo una constante con una url que voy a utilizar segun el valor del input de busqueda
    
    fetch(url)
    .then(response => response.json())
    .then((totalData) => {
        
    console.log(totalData); //cuando le doy a buscar me aparece en la consola los cocktails de la búsqueda

        if (totalData.drinks) { //si los datos recogidos de la API.drinks son !==null, es decir, existen, se guardara su valor en el array cocktailsData y se ejecuta la funcion renderAll
            cocktailsData = totalData.drinks;
            renderAllDrinks(cocktailsData);
        } else {//sino, dime que no hay resultados
            console.log("No se encontraron resultados");
            drinksList.innerHTML = "<li>No se encontraron resultados</li>";
        };
    });
};



const handleClick = (event) =>{
    event.preventDefault();
    handleInput();
   //cuando le de al boton de buscar solo quiero que me salgan los que tengan el valor del imput
};

btnSearch.addEventListener('click', handleClick);



//busca en el localStorage si tengo datos guardados como fav, si tengo los pinta
init();
//me pinta el listado de margaritas cuando abro la pagina
initialDataApi();

//al pulsar en el boton de reset me devuelve el valor del input a cero y me devuelve el listado de margaritas
const handleReset = (event) => {
    event.preventDefault();
    inputSearch.value = "";
    initialDataApi();
    
};
btnReset.addEventListener('click', handleReset);
    
