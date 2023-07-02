class Sound
{
    constructor()
    {
        this.titleScreen = new Audio("sounds/power-on.wav");
        // this.characterSelectionBackground = new Audio("sounds/character-selection.mp3");
        // this.battleBackground = new Audio("sounds/battle.mp3");
        this.hit = new Audio("sounds/hit.mp3");
        // this.completionBackground = new Audio("sounds/completion-screen.mp3");
        // this.gameOver = new Audio("sounds/game-over.mp3");
    }
}


export
{
    Sound,
};
