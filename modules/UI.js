import * as shapes from "./shapes.js";


class UI
{
    constructor(game)
    {
        this.game = game;
        // Get DOM elements.
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
        // Menu
        this.dialog = document.getElementById("info");
        this.attackButton = document.getElementById("menu-attack");
        this.restartButton = document.getElementById("menu-restart");

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
        this.attackButton.addEventListener("click", (event) => 
        {
            console.log(`playerAttack(): ${event}.`);
            this.game.attackButtonClicked();
            return null;
        });

        this.restartButton.addEventListener("click", (event) =>
        {
            console.log(`playerAttack(): ${event}.`);
            this.game.restartButtonClicked();
            return null;
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

    showBattleScreen(player, opponent)
    {
        console.log("showBattleScreen()");
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
        return null;
    }

    showGameOverScreen()
    {
        console.log("this.gameOverScreen.style.display = \"block\";");
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
