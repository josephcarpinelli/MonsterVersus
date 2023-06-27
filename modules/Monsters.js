// ========================================================================= //
// =========================== Monsters ==================================== //
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
            opposingMonster.hp -= this.attack_power;
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

export
{
    Monster,
    FireMonster,
    WaterMonster,
    GrassMonster,
    HpMonster,
    AttackMonster,
    MonsterGenerator,
};
