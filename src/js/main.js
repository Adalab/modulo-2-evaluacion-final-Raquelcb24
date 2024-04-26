'use strict';

const drinksList = document.querySelector('.js_list');//mi ul
const inputSearch = document.querySelector('.js_input');//input para buscar
const btnSearch = document.querySelector('.js_btnSearch');// boton buscar


let cocktailsData = []; //aquí voy a guardar todos mis cocktails

/* const renderOneDrink = (eachDrink) =>{
   
}; */


const renderAllDrinks = (arr) =>{ //estructura de mis bebidas
    drinksList.innerHTML= "";
    for (const drink of arr) {
        drinksList.innerHTML += `<li>
        <h3>${drink.strDrink}</h3>
        <img class="img" src="${drink.strDrinkThumb}" alt="cocktails">
    </li>`
    };
  
};

const getDataMargarita = ()=> {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then ((response) => response.json())
    .then ((data)=>{
        console.log(data);
        margarita = data.drinks;
        console.log(margarita);
         renderAllDrinks(margarita); //funcion render tiene sentido ejecutarla aqui cuando quiero que aparerzca cuando inicio la pagina(margaritas)
   
    });

};

const getDataApi = ()=> {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
    .then ((response) => response.json())
    .then ((data)=>{
        console.log(data);
        cocktailsData = data.drinks;
        console.log(cocktailsData);
         renderAllDrinks(cocktailsData); //funcion render tiene sentido ejecutarla aqui cuando quiero que aparerzca cuando inicio la pagina(margaritas)
   
    });

};

const handleInput =()=>{
    const valueInput = inputSearch.value.toLowerCase(); //valor de mi input
    const filteredDrinks = cocktailsData.filter((item) => item.strDrink.toLowerCase().includes(valueInput)
);
    renderAllDrinks(filteredDrinks);
};



const handleClick = (event) =>{
    event.preventDefault();
    handleInput();
   
};


btnSearch.addEventListener('click', handleClick);

getDataApi();

//ver como modificar la url para que nos aparezcan bebidas diferentes en funcion de lo que se busca. 