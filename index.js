/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
        for(let i=0; i<games.length;i++){
            const gamediv = document.createElement('div')
            gamediv.classList.add('game-card')
            gamediv.innerHTML = `
                <div class = 'game-card'>
                    <img src="${games[i].img}" alt="${games[i].name}" width='200' height='200'/>
                    <p>${games[i].name}</p>
                    <p>${games[i].description}</p>
                </div>
            `
            gamesContainer.append(gamediv)
        }


    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON)

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
 const total_contributions = GAMES_JSON.reduce((acc, game) =>
    acc+game.backers,0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const x = `${total_contributions.toLocaleString('en-US')}`
contributionsCard.innerHTML = x;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_amount= GAMES_JSON.reduce((acc, game) =>
    acc+game.pledged,0)
// set inner HTML using template literal
const y = `$${total_amount.toLocaleString('en-US')}`
raisedCard.innerHTML = y;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gamesTotal= GAMES_JSON.length
const gamesTotalFinal = gamesTotal.toLocaleString('en-US');
gamesCard.innerHTML = `${gamesTotalFinal}`
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded= GAMES_JSON.filter(game=>game.pledged<game.goal)
    addGamesToPage(unfunded)
    console.log(unfunded.length)
   
    
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}
document.getElementById('unfunded-btn').addEventListener('click',filterUnfundedOnly)
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = GAMES_JSON.filter(game=>game.pledged>=game.goal)
    addGamesToPage(funded)
    console.log(funded.length)
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}
document.getElementById('funded-btn').addEventListener('click',filterFundedOnly)
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    const all = GAMES_JSON
    addGamesToPage(all)
    console.log(all.length)
    // add all games from the JSON data to the DOM

}
document.getElementById('all-btn').addEventListener('click',showAllGames)

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const gamesUnfunded = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal})
const sumOfGamesUnfunded = gamesUnfunded.length


// create a string that explains the number of unfunded games using the ternary operator
const displayStr1 = `A total of ${y} has been raised for ${gamesTotalFinal} games. Currently, ${sumOfGamesUnfunded} games remains unfunded. We need your help to fund these amazing games!`
const displayStr2 = `A total of ${y} has been raised for ${gamesTotalFinal} games. Currently, ${sumOfGamesUnfunded} games remain unfunded. We need your help to fund these amazing games!`
const displayStr = (gamesTotalFinal == 1) ? displayStr1 : displayStr2
// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('div');
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [game1, game2, ...restOfGames] = sortedGames
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameName = document.createElement('div')
topGameName.innerHTML= game1.name
firstGameContainer.appendChild(topGameName)
// do the same for the runner up item
const SecondGameName = document.createElement('div')
SecondGameName.innerHTML=game2.name
secondGameContainer.appendChild(SecondGameName)

