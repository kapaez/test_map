import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_fiery_soul_ts extends BaseModifier {
    max_stack?: number
    duration?: number
    as_bonus?: number
    ms_bonus?: number
    effect_id?: ParticleID
    IsHidden(): boolean {
        return this.GetStackCount() == 0
    }
    DestroyOnExpire(): boolean {
        return false
    }
    OnCreated(params: object): void {
        SendToConsole('createFiery')
        this.max_stack = this.GetAbility().GetSpecialValueFor("max_stack")
        this.duration = this.GetAbility().GetSpecialValueFor("duration")
        this.as_bonus = this.GetAbility().GetSpecialValueFor("attack_bonus")
        this.ms_bonus = this.GetAbility().GetSpecialValueFor("speed_bonus")
        this.effect_id = ParticleManager.CreateParticle("particles/units/heroes/hero_lina/lina_fiery_soul.vpcf", ParticleAttachment.ABSORIGIN, this.GetParent())
        ParticleManager.SetParticleControl(this.effect_id, 1, Vector(this.GetStackCount(), 0, 0))
    }
    OnIntervalThink(): void {
        SendToConsole("inThink")
        this.StartIntervalThink(-1)
        this.SetStackCount(0)
        ParticleManager.SetParticleControl(this.effect_id, 1, Vector(this.GetStackCount(), 0, 0))
    }
    // OnAbilityExecuted(event: ModifierAbilityEvent): void {
    //     if (event.target) {
    //         SendToConsole(event.target.GetName())
    //     } else {
    //         SendToConsole(event.ability.GetName())
    //     }
    //     this.add_state(1)
    // }
    OnTakeDamage(event: ModifierInstanceEvent): void {
        SendToConsole("onTakeDamage")
        let attacker = event.attacker
        let ability = event.inflictor
        if (attacker == this.GetCaster()) {
            SendToConsole("equalCaster")
            if (ability.GetOwner()) {
                SendToConsole("isAbility")
                this.add_state(1)
            }
        }
    }
    add_state(state_num: number) {
        if (state_num > this.max_stack || state_num + this.GetStackCount() > this.max_stack) {
            this.SetStackCount(this.max_stack)
            this.ForceRefresh()
        } else {
            this.SetStackCount(state_num + this.GetStackCount())
        }
        this.SetDuration(this.duration, true)
        this.StartIntervalThink(this.duration)
        ParticleManager.SetParticleControl(this.effect_id, 1, Vector(this.GetStackCount(), 0, 0))
        this.AddParticle(this.effect_id, false, false, -1, false, false)
    }
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.MOVESPEED_BONUS_PERCENTAGE, ModifierFunction.ATTACKSPEED_BONUS_CONSTANT, ModifierFunction.ON_ABILITY_EXECUTED, ModifierFunction.ON_TAKEDAMAGE]
    }
    GetModifierMoveSpeedBonus_Percentage(): number {
        return this.GetStackCount() * this.ms_bonus
    }
    GetModifierAttackSpeedBonus_Constant(): number {
        return this.GetStackCount() * this.as_bonus
    }
}