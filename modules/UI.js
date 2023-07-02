import * as shapes from "./shapes.js";


class UI
{
    constructor(game)
    {
        this.game = game;
        // Get DOM elements.
        // Screens
        this.titleScreen = document.getElementById("title-screen");
        this.characterSelectionScreen = document.getElementById("character-selection-screen");
        this.characterReviewScreen = document.getElementById("character-review-screen");
        this.battleScreen = document.getElementById("battle-screen");
        this.completionScreen = document.getElementById("completion-screen");
        this.gameOverScreen = document.getElementById("game-over-screen");
        this.screens = [this.titleScreen,
                        this.characterSelectionScreen,
                        this.characterReviewScreen,
                        this.battleScreen,
                        this.completionScreen,
                        this.gameOverScreen,];
        // HUD
        this.opponentName = document.getElementById("opponent-name");
        this.opponentHp = document.getElementById("opponent-hp");
        this.opponentPower = document.getElementById("opponent-power");
        this.playerName = document.getElementById("player-name");
        this.playerHp = document.getElementById("player-hp");
        this.playerPower = document.getElementById("player-power");
        // Sprites
        this.opponentCanvas = document.getElementById("opponent-sprite");
        this.playerCanvas = document.getElementById("player-sprite");
        this.opponentContext = this.opponentCanvas.getContext("2d");
        this.playerContext = this.playerCanvas.getContext("2d");
        // Interaction
        this.startButton = document.getElementById("start-button");
        this.attackButton = document.getElementById("menu-attack");
        this.restartButtons = document.getElementsByClassName("restart-button");
        this.dialog = document.getElementById("info");

        // Hard-coded constants.
        this.shapeRadius = 50;

        this.spaceKey = 32;  // Keycode for the space key.
        this.isSpaceKeyPressed = false;

        this.setup();
    }
    
    setup()
    {
        console.log("setup()");
        // Listen for HTML button clicks.
        this.startButton.addEventListener("click", (event) =>
        {
            console.log(`playerAttack(): ${event}.`);
            this.hideTitleScreen();
            this.game.start();
            return null;
        });

        this.attackButton.addEventListener("click", (event) => 
        {
            console.log(`playerAttack(): ${event}.`);
            this.game.attackButtonClicked();
            return null;
        });

        Array.from(this.restartButtons).forEach((restartButton) =>
        {

            restartButton.addEventListener("click", (event) =>
            {
                console.log(`playerAttack(): ${event}.`);
                this.game.restartButtonClicked();
                return null;
            });
        });

        // Listen for keyboard events
        document.addEventListener('keydown', (event) =>
        {
            if (event.keyCode === this.spaceKey)
            {
                this.isSpaceKeyPressed = true;
            }
        });

        document.addEventListener('keyup', (event) =>
        {
            if (event.keyCode === this.spaceKey)
            {
                this.isSpaceKeyPressed = false;
            }
        });
    }

    hideAllScreens()
    {
        for (let screen of this.screens)
        {
            screen.style.display = "none";
        }
        return null;
    }

    showTitleScreen()
    {
        this.hideAllScreens();
        this.titleScreen.style.display = "flex";
        return null;
    }

    hideTitleScreen()
    {
        this.titleScreen.style.display = "none";
        return null;
    }

    showCharacterSelectionScreen()
    {
        this.hideAllScreens();
        this.characterSelectionScreen.style.display = "flex";
        return null;
    }

    hideCharacterSelectionScreen()
    {
        this.characterSelectionScreen.style.display = "none";
        return null;
    }
    
    showCharacterReviewScreen()
    {
        this.hideAllScreens();
        this.characterReviewScreen.style.display = "flex";
        return null;
    }

    hideCharacterReviewScreen()
    {
        this.characterReviewScreen.style.display = "none";
        return null;
    }

    showBattleScreen(player, opponent)
    {
        console.log("showBattleScreen()");
        this.hideAllScreens();
        document.body.style.background = "white";
        // Draw monsters.
        shapes.draw(player.getColor(),
                    player.getShape(),
                    this.shapeRadius,
                    this.playerContext);
        shapes.draw(opponent.getColor(),
                    opponent.getShape(),
                    this.shapeRadius,
                    this.opponentContext);
        this.dialog.textContent = "What do you want to do?";
        this.battleScreen.style.display = "block";

        return null;
    }

    hideBattleScreen()
    {
        this.battleScreen.style.display = "none";
        return null;
    }
    
    showCompletionScreen(player)
    {
        this.hideAllScreens();
        document.body.style.background = player.getColor();
        this.completionScreen.style.display = "flex";
        return null;
    }

    hideCompletionScreen()
    {
        this.completionScreen.style.display = "none";
        return null;
    }

    showGameOverScreen(opponent)
    {
        this.hideAllScreens();
        document.body.style.background = opponent.getColor();
        this.gameOverScreen.style.display = "flex";
        return null;
    }

    hideGameOverScreen()
    {
        this.gameOverScreen.style.display = "none";
        return null;
    }

    updateHud(player, opponent)
    {
        console.log("updateHud()");
        // Update opponent HUD values.
        this.opponentName.textContent = opponent.name;
        this.opponentHp.textContent = `${opponent.hp} / ${opponent.MAX_HP}`;
        this.opponentPower.textContent = opponent.power;
        // Update player HUD values.
        this.playerName.textContent = player.name;
        this.playerHp.textContent = `${player.hp} / ${player.MAX_HP}`;
        this.playerPower.textContent = player.power;

        // this.updateScore(this.player.score);
        // this.updateHealth(this.player.health);
        
        return null;
    }

    
    isSpaceKeyHeld()
    {
        return this.isSpaceKeyPressed;
    }
}


export
{
    UI,
};
