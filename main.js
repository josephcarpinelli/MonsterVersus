// ========================================================================= //
// ============================ Classes ==================================== //
// ========================================================================= //
class Monster
{
    constructor(hp, attack_power)
    {
        this.KO = false;
        this.MAX_HP = hp;
        this.MAX_ATTACK = attack_power;
        this.hp = this.MAX_HP;
        this.attack_power = this.MAX_ATTACK;
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
        showBattleScreen();
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
    constructor(hp, attack_power)
    {
        this.HP_BOOST = 1.15;
        super(hp * this.HP_BOOST, attack_power);
    }
}

class AttackMonster extends Monster
{
    constructor(hp, attack_power)
    {
        this.ATTACK_BOOST = 1.15;
        super(hp, attack_power * this.ATTACK_BOOST);
    }
}

class FireMonster extends Monster
{
    constructor(hp, attack_power)
    {
        super(hp, attack_power);
        this.strongTo = "Grass";
        this.weakTo = "Water";
    }
}

class WaterMonster extends Monster
{
    constructor(hp, attack_power)
    {
        super(hp, attack_power);
        this.strongTo = "Fire";
        this.weakTo = "Grass";
    }
}

class GrassMonster extends Monster
{
    constructor(hp, attack_power)
    {
        super(hp, attack_power);
        this.strongTo = "Water";
        this.weakTo = "Fire";
    }
}

class MonsterGenerator
{
    static get TOTAL_OPTIONS() {return 3;}
    static get DEFAULT_HP() {return 10;}
    static get DEFAULT_ATTACK() {return 2;}
    static createRandomMonster()
    {
        const option = Math.floor(Math.random() + MonsterGenerator.TOTAL_OPTIONS);
        switch (option)
        {
            case 1:
                return new FireMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break;  // Necessary?
            case 2:
                return new WaterMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break;  // Necessary?
            case 3:
                return new GrassMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break;  // Necessary?
            default:
                console.log(`Error, ${option} is not a valid range...`);
                break;
        }
    }
    static createEasyMonster(playerMonster)
    {
        const playerType = typeof playerMonster;
        switch (playerType)
        {
            // Grass is weak to fire, so it should be easier.
            case "FireMonster":
                return new GrassMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            // Fire is weak to water, so it should be easier.
            case "WaterMonster":
                return new FireMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            // Water is weak to grass, so it should be easier.
            case "GrassMonster":
                return new WaterMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            default:
                console.log(`Unexpected player type: ${playerType}.`);
                break;
        }
    }
    static createHardMonster(playerMonster)
    {
        const playerType = typeof playerMonster;
        switch (playerType)
        {
            // Fire is weak to water, so it should be more difficult.
            case "FireMonster":
                return new WaterMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            // Water is weak to grass, so it should be more difficult.
            case "WaterMonster":
                return new GrassMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            // Grass is weak to fire, so it should be more difficult.
            case "GrassMonster":
                return new FireMonster(MonsterGenerator.DEFAULT_HP, MonsterGenerator.DEFAULT_ATTACK);
                break; // Necessary?
            default:
                console.log(`Unexpected player type: ${playerType}.`);
                break;
        }
    }
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
const drawShape = function(xCoordinate, yCoordinate, radius, sides, context)
{
    // move the canvas to the center position
    context.translate(xCoordinate, yCoordinate);
    for (let sideIndex = 0; sideIndex < sides; sideIndex++)
    {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sides) * sideIndex;
        // for the first point move to
        if (sideIndex === 0)
        {
            context.moveTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
        else
        {
            // for the rest dradiusaw a line
            context.lineTo(radius * Math.cos(rotation),
                       radius * Math.sin(rotation));
        }
    }
    // close path and stroke it
    context.closePath();
    context.stroke();
    // reset the translate position
    context.resetTransform();
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
    return MonsterGenerator.createRandomMonster();
}

const showStatsReviewScreen = function()
{
    console.log("showTitleScreen()");
}

const showBattleScreen = function()
{
    console.log("showBattleScreen()");
    const canvas = document.getElementById("player-sprite");
    canvas.width = 320;  // ~20rem.
    canvas.width = 320;  // ~20rem.
    const context = canvas.getContext("2d");
    const centerX = 160;
    const centerY = 160;
    drawShape(centerX, centerY, 50, 4, context);
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
    const opposingMonster = MonsterGenerator.createRandomMonster();
    // Stats review page.
    showStatsReviewScreen();
    // Start Battle Loop.
    if (playerMonster.battle(opposingMonster))
    {
        showCompletionScreen();
    }
    // At Game Over and Complete Scene, give the player an option to start over.
    else
    {
        showGameOverScreen();
    }
    return undefined;
}

main();
