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
    // grab the element with the id games-container
    const gamesContainer = document.getElementById("games-container");

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        let div = document.createElement("div");
        div.classList.add("game-card");

        // create an img element for the game's image
        let img = document.createElement("img");
        img.src = games[i].img; // Set the src attribute to the game's image URL

        // set the inner HTML using a template literal to display some info about each game
        div.innerHTML = `
            <div class="game-img">
                <img src="${games[i].img}" alt="${games[i].name} Image">
            </div>
            <div class="game-info">
                <h2>${games[i].name}</h2>
                <p>${games[i].description}</p>
                <p>Goal: $${games[i].goal}</p>
                <p>Pledged: $${games[i].pledged}</p>
            </div>
        `;

        // append the game card to the games-container
        gamesContainer.appendChild(div);
    }
}

// Call the function with the games data
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalCont = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <h3>Total Contributions</h3>
    <p>${totalCont.toLocaleString()}</p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
    <h3>Total Amount Raised</h3>
    <p>$${totalRaised.toLocaleString()}</p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `
    <h3>Total Number of Games</h3>
    <p>${GAMES_JSON.length}</p>
`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnmetGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });

    // use the function we previously created to add the unfunded games to the DOM
    
    addGamesToPage(listOfUnmetGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfMetGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfMetGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = numUnfundedGames === 0 ? "All games are fully funded!" :
                            numUnfundedGames === 1 ? "1 game is still unfunded." :
                            `${numUnfundedGames} games are still unfunded.`;


// create a new DOM element containing the template string and append it to the description container
const unfundedEle = document.createElement("p");
unfundedEle.innerHTML = unfundedGamesString;
descriptionContainer.appendChild(unfundedEle);


descriptionContainer.appendChild(companyInfoElement);
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
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameNameElement = document.createElement("p");
firstGameNameElement.textContent = `Top Pledged Game: ${firstGame.name}`;

const secondGameNameElement = document.createElement("p");
secondGameNameElement.textContent = `Runner Up: ${secondGame.name}`;

firstGameContainer.appendChild(firstGameNameElement);
secondGameContainer.appendChild(secondGameNameElement);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
