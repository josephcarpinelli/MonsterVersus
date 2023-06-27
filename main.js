// =========================== Imports ===================================== //
import * as screens from "./modules/screens.js";



// ============================= Main ====================================== //
const main = function()
{
    console.log("main()");
    // Title Screen.
    screens.showTitleScreen();
    // Give Player a Selection between (currently 2) monster types.
    // After the player chooses, randomly select the enemy and create it.
    screens.showSelectionScreen();
    // Stats review page.
    screens.showStatsReviewScreen();
    // Start Battle Loop.
    screens.showBattleScreen();
    // Win.
    screens.showCompletionScreen();
    // At Game Over and Complete Scene, give the player an option to start over.
    screens.showGameOverScreen();
    
    return undefined;
}

main();
