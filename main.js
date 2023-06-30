// =========================== Imports ===================================== //
import * as Monsters from "./modules/Monsters.js";
import * as shapes from "./modules/shapes.js";


const showBattleScreen = function(player, opponent)
{
    // Get DOM elements.
    const opponentCanvas = document.getElementById("opponent-sprite");
    const playerCanvas = document.getElementById("player-sprite");
    const opponentContext = opponentCanvas.getContext("2d");
    const playerContext = playerCanvas.getContext("2d");
    console.log("showBattleScreen()");
    // Hard-coded constants.
    const shapeRadius = 50;
    // Draw monsters.
    shapes.draw(player.getColor(),
                player.getShape(),
                shapeRadius,
                playerContext);
    shapes.draw(opponent.getColor(),
                opponent.getShape(),
                shapeRadius,
                opponentContext);
    return null;
}

const updateHud = function(player, opponent)
{
    console.log("showBattleScreen()");

    // Update HUD values.
    document.getElementById("opponent-name").textContent = opponent.name;
    document.getElementById("opponent-hp").textContent = `${opponent.hp} / ${opponent.MAX_HP}`;
    document.getElementById("opponent-power").textContent = opponent.power;

    document.getElementById("player-name").textContent = player.name;
    document.getElementById("player-hp").textContent = `${player.hp} / ${player.MAX_HP}`;
    document.getElementById("player-power").textContent = player.power;

    return null;
}


// ============================= Main ====================================== //
// const main = function()
// {
console.log("main()");
const monsterGenerator = new Monsters.MonsterGenerator();
const dialog = document.getElementById("info");
let player = monsterGenerator.createRandomMonster("Player");
let opponent = monsterGenerator.createRandomMonster("Opponent");

showBattleScreen(player, opponent);
updateHud(player, opponent);
// Title Screen.
dialog.textContent = "Starting Game...";
// Give Player a Selection between (currently 2) monster types.
// After the player chooses, randomly select the enemy and create it.

// Stats review page.
// showStatsReviewScreen(player, opponent);

// Start Battle Loop.
// Returns boolean value based on whether the player wins.
dialog.textContent = "What do you want to do?";
// DOM Setup.
const attackButton = document.getElementById("menu-attack");
attackButton.addEventListener("click", function(event)
{
    console.log(`playerAttack(): ${event}.`);
    // Player always goes first
    // (because player initiates battle, also, maybe give enemy + 2 hp).
    // (think about implementing a couple of battles, maybe with healing between).
    // else opponent attacks.
    player.attack(opponent)
    updateHud(player, opponent);
    opponent.attack(player)
    updateHud(player, opponent);
    // Win.
    if (opponent.KO)
    {
        dialog.textContent = "Game Won! Press 'Reset' to play again!";
        console.log("showCompletionScreen();");
    }
    // Loss.
    if (player.KO)
    {
        console.log("showGameOverScreen();");
        dialog.textContent = "Game Over! Press 'Restart' to play again!";
        // At Game Over and Complete Scene,
        // give the player an option to start over.
    }
    return null;
});

const restartButton = document.getElementById("menu-restart");
restartButton.addEventListener("click", function(event)
{
    let player = monsterGenerator.createRandomMonster("Player");
    let opponent = monsterGenerator.createRandomMonster("Opponent");
    showBattleScreen(player, opponent);
    updateHud(player, opponent);
    // Title Screen.
    dialog.textContent = "Starting Game...";
    // Give Player a Selection between (currently 2) monster types.
    // After the player chooses, randomly select the enemy and create it.

    // Stats review page.
    // showStatsReviewScreen(player, opponent);

    // Start Battle Loop.
    // Returns boolean value based on whether the player wins.
    dialog.textContent = "What do you want to do?";
})

// battle(player, opponent);
    
// return 0;
// }


// Always keep game running.
// while (true)
// {
// main();
// }
