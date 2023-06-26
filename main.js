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