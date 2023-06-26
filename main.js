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
}
