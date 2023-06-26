// ========================================================================= //
// ============================ Classes ==================================== //
// ========================================================================= //
class Monster
{
    constructor(hp, attack)
    {
        this.KO = false;
        this.MAX_HP = hp;
        this.MAX_ATTACK = attack;
        this.hp = this.MAX_HP;
        this.attack = attack;
    }
    attack(opposingMonster)
    {
        if (!opposingMonster.KO)
        {
            opposingMonster.hp -= this.attack;
            if (opposingMonster.hp <= 0)
            {
                opposingMonster.KO = true;
            }
        }
        return opposingMonster.KO;
    }
    // Returns winning monster.
    battle(opposingMonster)
    {
        // Start Battle Loop.
        while (!this.KO && !opposingMonster.KO)
        {
            // Player always goes first (because player initiates battle, also, maybe give enemy + 2 hp).
            // If enemy is KO'd, show game complete screen (think about implementing a couple of battles, maybe with healing between).
            if (this.attack(opposingMonster))
            {
                return this;
            }
            // else opposingMonster attacks.
            // If player is still alive, show game over screen.
            if (opposingMonster.attack(this))
            {
                return opposingMonster;
            }
        }
    }
}

class HpMonster extends Monster
{
    constructor(hp, attack)
    {
        this.HP_BOOST = 1.15;
        super(hp * this.HP_BOOST, attack);
    }
}

class AttackMonster extends Monster
{
    constructor(hp, attack)
    {
        this.ATTACK_BOOST = 1.15;
        super(hp, attack * this.ATTACK_BOOST);
    }
}

class FireMonster extends Monster
{
    constructor(hp, attack)
    {
        super(hp, attack);
        this.strongTo = "Grass";
        this.weakTo = "Water";
    }
}

class WaterMonster extends Monster
{
    constructor(hp, attack)
    {
        super(hp, attack);
        this.strongTo = "Fire";
        this.weakTo = "Grass";
    }
}

class GrassMonster extends Monster
{
    constructor(hp, attack)
    {
        super(hp, attack);
        this.strongTo = "Water";
        this.weakTo = "Fire";
    }
}


// ========================================================================= //
// =========================== Functions =================================== //
// ========================================================================= //
const showTitleScreen = function()
{
    console.log("showTitleScreen()");
}

const showSelectionScreen = function()
{
    console.log("showTitleScreen()");
}

const showStatsReviewScreen = function()
{
    console.log("showTitleScreen()");
}

const showCompletionScreen = function(winningMonster)
{
    console.log("showCompletionScreen()");
}

const showGameOverScreen = function()
{
    console.log("showGameOverScreen(winningMonster)");
}


// ========================================================================= //
// ======================= Helper Functions ================================ //
// ========================================================================= //
/*
 * ## [Summary](https://developer.mozilla.org/en-US/blog/javascript-shape-drawing-function/?utm_medium=email&utm_source=devnewsletter&utm_campaign=firefox-drumbeat&utm_content=mayhacksnewsletter-global#summary)

This was a little introduction to the `<canvas>` element for drawing on a web page and a few of the methods you can use to draw shapes. If you want to dive deeper into how all the pieces work, here's a recap of what we used:

- [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas), the element on which we can display graphics
- [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to draw 2D shapes to the canvas
- [`translate()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) to move the origin to a new position
- [`lineTo()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) to draw a line from one point to another
- [`closePath()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath) to join the first point to the last point
- [`stroke()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke) to stroke the path with a stroke style

To calculate the position of each point, we used a little bit of maths and trigonometry:

- [`Math.cos()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos) to calculate the x position of a point
- [`Math.sin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin) to calculate the y position of a point
- [`Math.PI`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) to calculate the angle of rotation in radians
*/
const drawShape = function(xCoordinate, yCoordinate, radius, sides, canvas)
{
    // move the canvas to the center position
    canvas.translate(xCoordinate, yCoordinate);
    for (let sideIndex = 0; sideIndex < sides; sideIndex++)
    {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sides) * sideIndex;
        // for the first point move to
        if (sideIndex === 0)
        {
            canvas.moveTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
        else
        {
            // for the rest dradiusaw a line
            canvas.lineTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
    }
    // close path and stroke it
    canvas.closePath();
    canvas.stroke();
    // reset the translate position
    canvas.resetTransform();
}


// ========================================================================= //
// ============================= Main ====================================== //
// ========================================================================= //
const main = function()
{
    console.log("main()");
    // Title Screen.
    showTitleScreen();
    // Give Player a Selection between (currently 2) monster types.
    // After the player chooses, randomly select the enemy and create it.
    const playerMonster = showSelectionScreen();
    // Stats review page.
    showReviewStatsScreen();
    // Start Battle Loop.

    // At Game Over and Complete Scene, give the player an option to start over.
    return undefined;
}

main();
