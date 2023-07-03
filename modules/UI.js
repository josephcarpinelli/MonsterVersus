import * as shapes from "./shapes.js";
import * as Sound from "./Sound.js";


class UI
{
    constructor(game)
    {
        this.game = game;
        this.sound = new Sound.Sound();
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
        // Menus
        this.battleMenu = document.getElementById("battle-menu");
        this.moveMenu = document.getElementById("move-menu");
        this.confirmMenu = document.getElementById("confirm-menu");
        this.menus = [this.battleMenu,
                      this.moveMenu,
                      this.confirmMenu,];
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
        this.confirmButton = document.getElementById("confirm-button");
        this.restartButtons = document.getElementsByClassName("restart-button");
        this.quitButton = document.getElementById("menu-quit");
        // Dialogs/info
        this.battleInfo = document.getElementById("battle-info");

        // Hard-coded constants.
        this.shapeRadius = 50;

        this.spaceKey = 32;  // Keycode for the space key.
        this.isSpaceKeyPressed = false;

        this.setup();
    }
    
    setup()
    {
        // Listen for HTML button clicks.
        this.startButton.addEventListener("click", (event) =>
        {
            // console.log(`${event}.`);
            this.game.startButtonClicked();
            return null;
        });

        this.attackButton.addEventListener("click", (event) => 
        {
            // console.log(`${event}.`);
            this.game.attackButtonClicked();
            return null;
        });

        this.confirmButton.addEventListener("click", (event) =>
        {
            // console.log(`${event}.`);
            this.game.confirmButtonClicked();
            return null;
        });

        Array.from(this.restartButtons).forEach((restartButton) =>
        {
            restartButton.addEventListener("click", (event) =>
            {
                // console.log(`${event}.`);
                this.game.restartButtonClicked();
                return null;
            });
        });

        this.quitButton.addEventListener("click", (event) =>
        {
            // console.log(`${event}.`);
            this.game.quitButtonClicked();
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

    hide(element)
    {
        if (!element.classList.contains("hide"))
        {
            element.classList.add("hide");
        }
        return null;
    }

    show(element)
    {
        while (element.classList.contains("hide"))
        {
            element.classList.remove("hide");
        }
        return null;
    }

    showScreen(screen)
    {
        this.hideAllScreens();
        this.show(screen);
        return null;
    }

    showMenu(menu)
    {
        this.hideAllMenus();
        this.show(menu);
        return null;
    }

    hideAllScreens()
    {
        for (let screen of this.screens)
        {
            this.hide(screen);
        }
        return null;
    }

    hideAllMenus()
    {
        for (let menu of this.menus)
        {
            this.hide(menu);
        }
        return null;
    }

    hideAll()
    {
        this.hideAllScreens();
        this.hideAllMenus();
        return null;
    }

    showTitleScreen()
    {
        this.showScreen(this.titleScreen);
        this.sound.titleScreen.play();
        return null;
    }

    showBattleScreen(player, opponent)
    {
        this.showScreen(this.battleScreen);
        // Draw monsters.
        shapes.draw(player.getColor(),
                    player.getShape(),
                    this.shapeRadius,
                    this.playerContext);
        shapes.draw(opponent.getColor(),
                    opponent.getShape(),
                    this.shapeRadius,
                    this.opponentContext);
        this.setBattleInfo("What do you want to do?");
        this.showMenu(this.battleMenu);

        return null;
    }

    showCompletionScreen(player)
    {
        this.showScreen(this.completionScreen);
        document.body.style.background = player.getColor();
        return null;
    }

    showGameOverScreen(opponent)
    {
        this.showScreen(this.gameOverScreen);
        document.body.style.background = opponent.getColor();
        return null;
    }

    setBattleInfo(text)
    {
        this.battleInfo.innerHTML = text;
        return null;
    }

    updateHud(player, opponent)
    {
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
