// ========================= States/Screens ================================ //
import * as Monsters from "./Monsters.js";
import * as shapes from "./shapes.js";


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
    const canvas = document.getElementById("player-sprite");
    canvas.width = 320;  // ~20rem.
    canvas.width = 320;  // ~20rem.
    const context = canvas.getContext("2d");
    const centerX = 160;
    const centerY = 160;
    shapes.draw(centerX, centerY, 50, 4, "red", context);
    const playerMonster = showSelectionScreen();
    const opposingMonster = Monsters.MonsterGenerator.createRandomMonster();
    if (playerMonster.battle(opposingMonster))
    {}
    else
    {}
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
