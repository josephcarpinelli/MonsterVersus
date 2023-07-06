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
        this.opponent = 0;
        this.currentOpponent = null;
        this.ui = new UI.UI(this);
        this.sound = new Sound.Sound();
        this.gameIsOver = false;
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
        this.ui.updateHud(this.player, this.currentOpponent);
        
        return null;
    }

    setup()
    {
        // Game is not over, if previously set.
        this.gameIsOver = false;
        // For each screen, set to hide.
        this.ui.hideAll();
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
        this.currentOpponent = this.opponents[this.opponent];

        return null;
    }

    start()
    {
        this.setup()
        this.ui.showTitleScreen();

        return null;
    }

    startBattle()
    {
        this.ui.showBattleScreen(this.player, this.currentOpponent);

        return null;
    }

    gameLoop()
    {
        // Start game loop
        if (this.gameIsOver)
        {
            this.endGame();
            // return null;
        }

        // Update player, enemies, handle collisions, etc.
        this.updateUI(); // Update UI elements

        requestAnimationFrame(() => {
            this.gameLoop();
        });
    }

    checkWinLossState()
    {
        const won = this.currentOpponent.KO;  // Win condition.
        const lost = this.player.KO;  // Loss condition.
        if (won || lost) this.gameIsOver = true;
    }


    hitAnimation()
    {
        this.sound.hit.play();
        this.updateUI();

        return null;
    }

    startButtonClicked()
    {
        this.startBattle();
        this.gameLoop();

        return null;
    }

    attackButtonClicked()
    {
        // Player always goes first
        // (because player initiates battle, also, maybe give enemy + 2 hp).
        // (think about implementing a couple of battles, maybe with healing between).
        // else opponent attacks.
        // If hit, play hit sound.
        let dialogInfo = null;
        if (this.player.attack(this.currentOpponent))
        {
            this.hitAnimation();
            dialogInfo = this.player.getSuccessfulHitText(this.currentOpponent);
        }
        // Miss.
        else { dialogInfo = `${this.player.name} missed!`; }
        this.checkWinLossState();
        this.ui.setBattleInfo(dialogInfo);
        this.ui.showDialog(this.ui.confirmDialog);

        return null;
    }
    
    confirmButtonClicked()
    {
        let dialogInfo = null;
        // If hit, play hit sound.
        if (this.currentOpponent.attack(this.player))
        {
            this.hitAnimation();
            dialogInfo = this.currentOpponent.getSuccessfulHitText(this.player);
        }
        else { dialogInfo = `${this.currentOpponent.name} missed!`; }
        this.checkWinLossState();
        this.ui.setBattleInfo(dialogInfo);
        this.ui.showDialog(this.ui.battleDialog);
    }

    restartButtonClicked()
    {
        // Start new game.
        this.setup();
        this.startButtonClicked();
        
        return null;
    }

    quitButtonClicked()
    {
        this.start();

        return null;
    }

    endGame()
    {
        this.ui.hideAll();
        // Win.
        if (this.currentOpponent.KO)
        {
            this.ui.showCompletionScreen(this.player);
        }
        // Loss.
        if (this.player.KO)
        {
            this.ui.showGameOverScreen(this.currentOpponent);
        }

        return null;
    }
}


export
{
    Game,
};
