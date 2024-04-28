'use strict';

const drinksList = document.querySelector('.js_list');//mi ul
const inputSearch = document.querySelector('.js_input');//input para buscar
const btnSearch = document.querySelector('.js_btnSearch');// boton buscar
const favoritesList = document.querySelector('.js_favorite'); //ul donde voy a meter los favoritos



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
        event.currentTarget.classList.add('selected'); 
       
    }else{ //sino quitalo
        favoriteCocktails.splice(favoritesClickedIndex, 1);
        event.currentTarget.classList.remove('selected'); 
    }
       
    //cuando pulso en la bebida se pone y se quita la misma clase

        console.log(favoriteCocktails);
        renderFavoriteList();
       localStorage.setItem('favoriteDrinks', JSON.stringify (favoriteCocktails));
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
const renderFavoriteList = ()=>{
    favoritesList.innerHTML = "";
    for (const drink of favoriteCocktails) {
        favoritesList.innerHTML += renderDrink(drink);
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



