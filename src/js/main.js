'use strict';

const drinksList = document.querySelector('.js_list');//mi ul
const inputSearch = document.querySelector('.js_input');//input para buscar
const btnSearch = document.querySelector('.js_btnSearch');// boton buscar
const favoritesList = document.querySelector('.js_favorite'); //ul donde voy a meter los favoritos

const resetContainer = document.querySelectorAll('.js_reset_container'); //div contenedor de bebida y X



let cocktailsData = []; //aquí voy a guardar todos mis cocktails
let favoriteCocktails = []; //array para la lista de favoritos




const renderDrink = (drink) => { //estructura de una bebida en el html
    return `
        <li class="drinks" id=${drink.idDrink}>
            <h3>${drink.strDrink}</h3>
            <div>
                <img class="img" src="${drink.strDrinkThumb}" alt="cocktails">
            </div>
        </li>`;
    
};

const handleFavorite = (event) =>{

    const selectedDrinkId = event.currentTarget.id;
    console.log(selectedDrinkId);
    
    const clickedData = cocktailsData.find((item)=> item.idDrink ===selectedDrinkId);
    console.log(clickedData);

    const favoritesClickedIndex = favoriteCocktails.findIndex((item) => item.idDrink === selectedDrinkId);

    if (favoritesClickedIndex === -1){ //si existe en mi lista de elementos clickados, añadelo
        favoriteCocktails.push(clickedData);
        
         
       
    }else{ //sino quitalo
        favoriteCocktails.splice(favoritesClickedIndex, 1); 
       
    }

    event.currentTarget.classList.toggle('selected'); //añado o quito la misma clase en cuando hago click

        console.log(favoriteCocktails);
        renderFavoriteList();
       localStorage.setItem('favoriteDrinks', JSON.stringify (favoriteCocktails)); //guardo en localStorage la lista de los que he pulsado como favoritos
    };
  

const renderAllDrinks = (arr) =>{ //estructura de todas mis bebidas
    drinksList.innerHTML= "";
   
    for (const drink of arr) {
        drinksList.innerHTML += renderDrink(drink);
    }

    const liDrink = document.querySelectorAll('.drinks'); //todads mis li
   
    for (const item of liDrink) {
        item.addEventListener('click', handleFavorite); //me da el id de la bebida en la que hago click
}

}; 
const handleResetX = (event)=>{
   
    const drinkId = event.currentTarget.id;
    
    console.log(drinkId)
    const index = favoriteCocktails.findIndex((drink)=>drink.idDrink === drinkId);

    if(index !==1){
    favoriteCocktails.splice(index, 1);
    event.currentTarget.remove();
    
    }
 
};


const renderFavoriteList = (drink)=>{

    favoritesList.innerHTML = "";

    for (const drink of favoriteCocktails) { //creo mi li para meter los fav y añado debajo un boton reset
        favoritesList.innerHTML += `
        <li class="drinks js_drinks" id=${drink.idDrink}>
            <h3>${drink.strDrink}</h3>   
            <img class="img" src="${drink.strDrinkThumb}" alt="cocktails">
            <button  class="js_reset">X</button>
        </li>`; 
    }

    const li = document.querySelectorAll('.js_drinks'); //llamo a mis li para que lo elimine todo completo
    
    for (const button of li) {
        button.addEventListener('click',handleResetX)
    }
};

const init = ()=>{
    const favDrinksLocal = localStorage.getItem('favoriteDrinks');
    if(favDrinksLocal !==null){
        favoriteCocktails = JSON.parse(favDrinksLocal);
        renderFavoriteList();
    }
    
};


const initialDataApi = ()=> {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then (response => response.json())
    .then ((dataMargarita)=>{
        console.log(dataMargarita);
        cocktailsData = dataMargarita.drinks;
        console.log(dataMargarita);
        renderAllDrinks(cocktailsData); //funcion render la ejecuto aqui para que me coja los valores de margarita
     
    });

   
};

const handleInput =()=>{
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
init();
initialDataApi();


    
