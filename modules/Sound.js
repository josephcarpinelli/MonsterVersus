class Sound
{
    constructor()
    {
        this.titleScreenBackground = new Audio("sounds/title-screen.mp3");
        this.characterSelectionBackground = new Audio("sounds/character-selection.mp3");
        this.battleBackground = new Audio("sounds/battle.mp3");
        this.completionBackground = new Audio("sounds/completion-screen.mp3");
        this.gameOver = new Audio("sounds/game-over.mp3");
    }
}


export
{
    Sound,
};
