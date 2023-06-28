// ========================================================================= //
// =========================== Monsters ==================================== //
// ========================================================================= //
class Monster
{
    constructor(hp, power)
    {
        this.MAX_HP = hp;
        this.MAX_ATTACK = power;

        this.hp = this.MAX_HP;
        this.power = this.MAX_ATTACK;
        this.KO = false;
    }
    // Should be the only place to set {this.KO} to true.
    takeDamage(hpAmount)
    {
        this.hp -= hpAmount;
        if (this.hp <= 0) { this.KO = true; }
        return this.KO
    }
    attack(opposingMonster)
    {
        if (!opposingMonster.KO) { opposingMonster.takeDamage(this.power); }
        return opposingMonster.KO;
    }
    // Returns winning monster.
    battle(opposingMonster)
    {
        // Start Battle Loop.
        while (!this.KO && !opposingMonster.KO)
        {
            // Player always goes first
            // (because player initiates battle, also, maybe give enemy + 2 hp).
            // (think about implementing a couple of battles, maybe with healing between).
            // else opposingMonster attacks.
            if (this.attack(opposingMonster) || opposingMonster.attack(this))
            {
                return opposingMonster.KO;
            }
        }
        return undefined;
    }
}

class HpMonster extends Monster
{
    constructor(hp, power)
    {
        this.HP_BOOST = 1.15;
        super(hp * this.HP_BOOST, power);
    }
}

class AttackMonster extends Monster
{
    constructor(hp, power)
    {
        this.ATTACK_BOOST = 1.15;
        super(hp, power * this.ATTACK_BOOST);
    }
}

class FireMonster extends Monster
{
    constructor(hp, power)
    {
        super(hp, power);
        this.strongTo = "Grass";
        this.weakTo = "Water";
    }
}

class WaterMonster extends Monster
{
    constructor(hp, power)
    {
        super(hp, power);
        this.strongTo = "Fire";
        this.weakTo = "Grass";
    }
}

class GrassMonster extends Monster
{
    constructor(hp, power)
    {
        super(hp, power);
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
