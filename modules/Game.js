import * as Monsters from "./Monsters.js";
import * as Sound from "./Sound.js";
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
        this.sound = new Sound.Sound();
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
        
        return null;
    }

    setup()
    {
        // For each screen, set to hide.
        this.ui.hideAllScreens();
        document.body.style.background = "white";
        // Draw Character Selection Screen, get input for it
        // Give Player a Selection between (currently 3) monster types.
        // After the player chooses, randomly select the enemy and create it.
        this.player = this.monsterGenerator.createRandomMonster("Player");
        // Stats review page.
        // showStatsReviewScreen(player, opponent);

        // Clear previous opponents.
        this.opponents = [];
        this.spawnOpponents(1);
    }

    start()
    {
        this.setup()
        this.ui.showTitleScreen();

        return null;
    }

    gameLoop()
    {
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
        // Player always goes first
        // (because player initiates battle, also, maybe give enemy + 2 hp).
        // (think about implementing a couple of battles, maybe with healing between).
        // else opponent attacks.
        this.player.attack(this.opponents[this.currentOpponent])
        this.sound.hit.play();
        this.updateUI();
        this.opponents[this.currentOpponent].attack(this.player);
        this.sound.hit.play();
        this.updateUI();
        // Win.
        if (this.opponents[this.currentOpponent].KO)
        {
            this.ui.hideAllScreens();
            this.ui.showCompletionScreen(this.player);
        }
        // Loss.
        if (this.player.KO)
        {
            this.ui.hideAllScreens();
            this.ui.showGameOverScreen(this.opponents[this.currentOpponent]);
        }

        return null;
    }

    restartButtonClicked()
    {
        // Start new game.
        this.setup();
        this.gameLoop();
        
        return null;
    }

    quitButtonClicked()
    {
        this.ui.showTitleScreen();

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
