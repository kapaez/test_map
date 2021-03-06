import { BaseAbility, BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_sven_sheld_ts extends BaseModifier {
    particle_seal = "particles/units/heroes/hero_sven/sven_warcry_armor_buff_model.vpcf"
    armor_bonus?: number
    speed_bonus?: number
    IsHidden(): boolean {
        return false
    }
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.PHYSICAL_ARMOR_BONUS, ModifierFunction.MOVESPEED_BONUS_PERCENTAGE, ModifierFunction.TRANSLATE_ACTIVITY_MODIFIERS]
    }
    GetModifierPhysicalArmorBonus(event: ModifierAttackEvent): number {
        return this.armor_bonus
    }
    GetModifierMoveSpeedBonus_Percentage(): number {
        return this.speed_bonus
    }
    GetActivityTranslationModifiers(): string {
        return "sven_warcry"
    }
    OnCreated(params: object): void {
        const abliity = this.GetAbility()
        if (abliity) {
            this.armor_bonus = abliity.GetSpecialValueFor("armor_bonus")
            this.speed_bonus = abliity.GetSpecialValueFor("speed_bonus")
        }
        const particle = ParticleManager.CreateParticle(this.particle_seal, ParticleAttachment.OVERHEAD_FOLLOW, this.GetParent())
        ParticleManager.SetParticleControlEnt(particle, 1, this.GetParent(), ParticleAttachment.OVERHEAD_FOLLOW, "hitloc", this.GetParent().GetAbsOrigin(), true)
        this.AddParticle(particle, false, false, -1, false, true)
    }
}