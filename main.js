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
}
