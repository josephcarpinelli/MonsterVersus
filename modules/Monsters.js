// ========================================================================= //
// =========================== Monsters ==================================== //
// ========================================================================= //

class Monster
{
    constructor(name, hp, power)
    {
        this.MAX_HP = hp;
        this.MAX_ATTACK = power;
        this.name = name;

        this.hp = this.MAX_HP;
        this.power = this.MAX_ATTACK;
        this.KO = false;
    }

    // Should be the only place to set {this.KO} to true.
    takeDamage(hpAmount)
    {
        console.log("takeDamage()");
        const damage = Math.floor(hpAmount);  // Ensure integer value.
        console.log(`${this.name} took ${damage} damage.`);
        this.hp -= damage;
        if (this.hp <= 0)
        {
            this.KO = true;
            this.hp = 0;
        }
        return this.KO
    }

    attack(opponent, damage=this.power)
    {
        console.log("attack()");
        if (!this.KO && !opponent.KO) { opponent.takeDamage(damage); }
        return opponent.KO;
    }
}

class ElementalMonster extends Monster
{
    static get FIRE() { return "Fire"; }
    static get WATER() { return "Water"; }
    static get GRASS() { return "Grass"; }

    constructor(name, hp, power, type)
    {
        super(name, hp, power);
        this.type = type;
        this.strongTo = this.isStrongTo();
        // this.weakTo = "None";
    }

    isStrongTo()
    {
        switch (this.type)
        {
            case ElementalMonster.FIRE: return ElementalMonster.GRASS;
            case ElementalMonster.WATER: return ElementalMonster.FIRE;
            case ElementalMonster.GRASS: return ElementalMonster.WATER;
            default:
                console.log(`Error! ${this.type} is not a valid type.`);
                break;
        }
    }
    
    getColor()
    {
        switch (this.type)
        {
            case ElementalMonster.FIRE: return "red";
            case ElementalMonster.WATER: return "blue";
            case ElementalMonster.GRASS: return "green";
            default:
                console.log(`Error! ${this.type} is not a valid type.`);
                return null;
        }
    }
    
    getShape()
    {
        switch (this.type)
        {
            case ElementalMonster.FIRE: return "triangle";
            case ElementalMonster.WATER: return "hexagon";
            case ElementalMonster.GRASS: return "square";
            default:
                console.log(`Error! ${this.type} is not a valid type.`);
                return null;
        }
    }

    getMultiplier(type)
    {
        if (type === this.strongTo) { return 1.5; }
        else if (type === this.type) { return 0.5; }
        else { return 1.0; }
    }

    attack(opponent)
    {
        console.log("attack()");
        const damage = (this.power
                        * this.getMultiplier(opponent.type));
        console.log(`Damage M: ${damage / this.power}.`);
        console.log(`${this.name}, a ${this.type} type did ${damage} damage.`);
        super.attack(opponent, damage);

        return opponent.KO;
    }
}

class Player extends ElementalMonster
{
    constructor(name, hp, power, type)
    {
        super(name, hp, power, type);
    }
}

class Opponent extends Player
{
    constructor(name, hp, power, type)
    {
        super(name, hp, power, type);
    }
}

class MonsterGenerator
{
    static get DEFAULT_NAME() { return "Player"; }
    static get DEFAULT_HP() { return 10; }
    static get DEFAULT_ATTACK() { return 2; }
    static get TOTAL_OPTIONS() { return 3; }

    createRandomMonster(name)
    {
        const option = Math.floor(Math.random() * MonsterGenerator.TOTAL_OPTIONS);
        switch (option)
        {
            case 0:
                return new ElementalMonster(name,
                                         MonsterGenerator.DEFAULT_HP,
                                         MonsterGenerator.DEFAULT_ATTACK,
                                         ElementalMonster.FIRE);
            case 1:
                return new ElementalMonster(name,
                                          MonsterGenerator.DEFAULT_HP,
                                          MonsterGenerator.DEFAULT_ATTACK,
                                          ElementalMonster.WATER);
            case 2:
                return new ElementalMonster(name,
                                          MonsterGenerator.DEFAULT_HP,
                                          MonsterGenerator.DEFAULT_ATTACK,
                                          ElementalMonster.GRASS);
            default:
                console.log(`Error, ${option} is not a valid range...`);
                return null;
        }
    }

    createEasyMonster(playerMonster)
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
    
    createHardMonster(playerMonster)
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
    ElementalMonster,
    Player,
    Opponent,
    MonsterGenerator,
};
