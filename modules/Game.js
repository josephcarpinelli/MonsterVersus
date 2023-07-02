import * as Monsters from "./Monsters.js";
//import * as Sound from "./Sound.js";
import * as UI from "./UI.js";


class Game
{
    constructor()
    {
        this.monsterGenerator = new Monsters.MonsterGenerator();
        // this.player = new Monsters.Player();
        this.player = null;
        this.opponents = [];
        this.currentOpponent = 0;
        this.ui = new UI.UI(this);
        // this.sound = new Sound.Sound();
        this.isGameOver = false;
    }

    spawnOpponents(count)
    {
        // Spawn {count} opponent.
        for (let i = 0; i < count; i++)
        {
            // const opponent = new Monsters.Opponent();
            let opponent = this.monsterGenerator.createRandomMonster("Opponent");
            this.opponents.push(opponent);
        }
        return null;
    }

    updateUI()
    {
        // Code to update UI elements based on game state.
        this.ui.updateHud(this.player, this.opponents[this.currentOpponent]);
    }

    start()
    {
        console.log("start()");
        // Load level, spawn enemies, and set up UI
        // Draw Start Screen, get input
        // Title Screen.
        this.ui.dialog.textContent = "Starting Game...";

        // Draw Character Selection Screen, get input for it
        // Give Player a Selection between (currently 3) monster types.
        // After the player chooses, randomly select the enemy and create it.
        this.player = this.monsterGenerator.createRandomMonster("Player");
        // Stats review page.
        // showStatsReviewScreen(player, opponent);

        // Start Rounds

        // Start Battle Loop.
        // battle(player, opponent);
        // Start Battle
        // Draw Battle Screen, get battle input
        this.spawnOpponents(1);
        this.gameLoop();
        return null;
    }

    gameLoop()
    {
        console.log("gameLoop()");
        // Start game loop
        if (this.isGameOver)
        {
            this.endGame();
            return null;
        }

        // Game loop logic goes here
        // Update player, enemies, handle collisions, etc.

        this.ui.showBattleScreen(this.player, this.opponents[this.currentOpponent]);
        this.updateUI(); // Update UI elements
        // Draw Game over or Completion screen, get restart input

        // requestAnimationFrame(() => {
        //     this.gameLoop();
        // });
    }

    attackButtonClicked()
    {
        console.log("attackButtonClicked()");
        // Player always goes first
        // (because player initiates battle, also, maybe give enemy + 2 hp).
        // (think about implementing a couple of battles, maybe with healing between).
        // else opponent attacks.
        console.log(this.player);
        console.log(this.opponents[this.currentOpponent]);
        this.player.attack(this.opponents[this.currentOpponent])
        console.log(this.player);
        console.log(this.opponents[this.currentOpponent]);
        this.updateUI();
        console.log(this.player);
        console.log(this.opponents[this.currentOpponent]);
        this.opponents[this.currentOpponent].attack(this.player)
        console.log(this.player);
        console.log(this.opponents[this.currentOpponent]);
        this.updateUI();
        // Win.
        if (this.opponents[this.currentOpponent].KO)
        {
            this.ui.dialog.textContent = "Game Won! Press 'Restart' to play again!";
            // alert("Game Won! Press 'OK' then 'Restart' to play again!");
            console.log("showCompletionScreen();");
        }
        // Loss.
        if (this.player.KO)
        {
            console.log("showGameOverScreen();");
            this.ui.dialog.textContent = "Game Over! Press 'Restart' to play again!";
            // alert("Game Over! Press 'OK' then 'Restart' to play again!");
            // At Game Over and Complete Scene,
            // give the player an option to start over.
        }

        return null;
    }

    restartButtonClicked()
    {
        console.log("restartButtonClicked()");
        // Clear opponents.
        this.opponents = [];
        // Start new game.
        this.start();
        
        return null;
    }

    endGame()
    {
        // Code to handle game over scenario
        // For example:
        this.ui.showGameOverScreen();
        this.sound.gameOver.play();

        return null;
    }
}


export
{
    Game,
};
