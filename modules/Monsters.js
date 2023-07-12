// ========================================================================= //
// =========================== Monsters ==================================== //
// ========================================================================= //

class Monster
{
    constructor(name, hp, power)
    {
        this.name = name;
        this.MAX_HP = hp;
        this.MAX_ATTACK = power;
        this.type = "Normal";

        this.hp = this.MAX_HP;
        this.power = this.MAX_ATTACK;
        this.accuracy = 0.80;
        this.criticalHitChance = 0.10;
        this.KO = false;
    }

    // Should be the only place to set {this.KO} to true.
    takeDamage(hpAmount)
    {
        const damage = Math.floor(hpAmount);  // Ensure integer value.
        this.hp -= damage;
        if (this.hp <= 0)
        {
            this.KO = true;
            this.hp = 0;
        }
        return this.KO
    }

    // Returns damage dealt, 0 if no hit.
    attack(opponent, hpAmount)
    {
        if (!this.KO && !opponent.KO
            && Math.random() <= this.accuracy)
        {
            if (Math.random() <= this.criticalHitChance)
            { hpAmount *= 2; }
            // Throwing this.KO out for now.
            opponent.takeDamage(hpAmount, opponent.type);
            return hpAmount;
        }
        return 0;
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
        this.weakTo = this.getWeakTo();
        this.resistantTo = this.getResistantTo();
        // this.strongAgainst = this.getStrongAgainst();
    }

    getWeakTo()
    {
        switch (this.type)
        {
            case ElementalMonster.FIRE: return [ElementalMonster.WATER];
            case ElementalMonster.WATER: return [ElementalMonster.GRASS];
            case ElementalMonster.GRASS: return [ElementalMonster.FIRE];
            default:
                console.log(`Error! ${this.type} is not a valid type.`);
                return null;
        }
    }

    getResistantTo()
    {
        return [this.type];
    }

    // // getStrongAgainst()
    // // {
    // //     switch (this.type)
    // //     {
    // //         case ElementalMonster.FIRE: return [ElementalMonster.GRASS];
    // //         case ElementalMonster.WATER: return [ElementalMonster.FIRE];
    // //         case ElementalMonster.GRASS: return [ElementalMonster.WATER];
    // //         default:
    // //             console.log(`Error! ${this.type} is not a valid type.`);
    // //             return null;
    // //     }
    // }

    isWeakTo(opponent)
    {
        if (this.weakTo.includes(opponent.type)) { return true; }
        return false;
    }

    isResistantTo(opponent)
    {
        if (this.resistantTo.includes(opponent.type)) { return true; }
        return false;
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

    getTypeMultiplier(opponent)
    {
        // If weak to type, take 150% damage.
        if (opponent.isWeakTo(this)) { return 1.5; }
        // Else if the damageType and self type are the same, damage is 50%.
        else if (opponent.isResistantTo(this)) { return 0.5; }
        // All other cases deal unmodified damage at 100%.
        else { return 1.0; }
    }

    getFinalDamageOn(opponent)
    {
        return this.power * this.getTypeMultiplier(opponent);
    }

    getSuccessfulHitText(opponent)
    {
        const damage = this.getFinalDamageOn(opponent);
        const damageMultiplier = this.getTypeMultiplier(opponent);
        const successfulHitText = `${opponent.name}, `
                                  + `a ${opponent.type} type, `
                                  + `took ${damage} ${this.type} damage, `
                                  + `due to a damage multiplier of ${damageMultiplier}.`;
        return successfulHitText;
    }

    attack(opponent)
    {
        return super.attack(opponent, this.getFinalDamageOn(opponent));
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
