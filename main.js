// =========================== Imports ===================================== //
import * as Game from "./modules/Game.js";


// ============================= Main ====================================== //
const main = function()
{
    console.log("main()");
    const game = new Game.Game();
    game.start();

    return 0;
}


main();
