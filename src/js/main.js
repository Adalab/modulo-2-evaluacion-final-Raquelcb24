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
        
    }else{ //sino añadelo 
        favoriteCocktails.splice(favoritesClickedIndex, 1);
    }
        console.log(favoriteCocktails);
        renderAllDrinks(cocktailsData);
       

    };
  

const renderAllDrinks = (arr) =>{ //estructura de todas mis bebidas
    drinksList.innerHTML= "";
   
    for (const drink of arr) {
        drinksList.innerHTML += renderDrink(drink);
    }

    const liDrink = document.querySelectorAll('.drinks');
   
    for (const drink of liDrink) {
        drink.addEventListener('click', handleFavorite); //me da el id de la bebida en la que hago click
}

}; 




const initialDataApi = ()=> {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then ((response) => response.json())
    .then ((data)=>{
        console.log(data);
        cocktailsData = data.drinks;
        console.log(cocktailsData);
        renderAllDrinks(cocktailsData); //funcion render tiene sentido ejecutarla aqui cuando quiero que aparerzca cuando inicio la pagina(margaritas)
   
    });

};

const handleInput =()=>{
    const valueInput = inputSearch.value.toLowerCase(); //valor de mi input y lo convierto a minusculas
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`; //creo una constante con una url que voy a utilizar segun el valor del input de busqueda
    
    fetch(url)
    .then((response) => response.json())
    .then((cocktailsData) => {
        console.log(cocktailsData);

        if (cocktailsData.drinks) { //si los datos recogidos de la API.drinks son !==null, es decir, existen, ejecuta la funcion renderAll
            renderAllDrinks(cocktailsData.drinks);
        } else {//sino, dime que no hay resultados
            console.log("No se encontraron resultados");
            drinksList.innerHTML = "<li>No se encontraron resultados</li>";
        };



    });
   

};



const handleClick = (event) =>{
    event.preventDefault();
    handleInput();
   
};


btnSearch.addEventListener('click', handleClick);

initialDataApi();


//CREAR UNA LISTA EN EL HTML DONDE SE AGREGUEN LAS SELECCIONADA Y AÑADIR LA CLASE QUE LAS SELECCIONE. 