// ========================= States/Screens ================================ //
import * as Monsters from "./Monsters.js";
import * as shapes from "./shapes.js";

/*
// If enemy is KO'd, show game complete screen
// If player is still alive, show game over screen.
*/


const showTitleScreen = function()
{
    console.log("showTitleScreen()");
}

const showSelectionScreen = function()
{
    console.log("showTitleScreen()");
    return Monsters.MonsterGenerator.createRandomMonster();
}

const showStatsReviewScreen = function()
{
    console.log("showTitleScreen()");
}


const showBattleScreen = function()
{
    console.log("showBattleScreen()");
    const playerContext = document.getElementById("player-sprite").getContext("2d");
    const opponentContext = document.getElementById("opponent-sprite").getContext("2d");
    shapes.draw("red", "triangle", 50, opponentContext);
    shapes.draw("blue", "hexagon", 50, playerContext);
    const playerMonster = showSelectionScreen();
    const opposingMonster = Monsters.MonsterGenerator.createRandomMonster();
    if (playerMonster.battle(opposingMonster))
    {
        showCompletionScreen();
    }
    else
    {
        showGameOverScreen();
    }
}

const showCompletionScreen = function(winningMonster)
{
    console.log("showCompletionScreen()");
    console.log(winningMonster);
}

const showGameOverScreen = function()
{
    console.log("showGameOverScreen(winningMonster)");
}


export
{
    showTitleScreen,
    showSelectionScreen,
    showStatsReviewScreen,
    showBattleScreen,
    showCompletionScreen,
    showGameOverScreen,
};
