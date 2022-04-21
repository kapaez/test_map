import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_sven_god_strength_ts extends BaseModifier {
    damege_per?: number
    IsHidden(): boolean {
        return false
    }
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.DAMAGEOUTGOING_PERCENTAGE]
    }
    OnCreated(params: object): void {
        const ability = this.GetAbility()
        this.damege_per = this.GetAbility().GetSpecialValueFor("damage_percent")
        let nFXIndex = ParticleManager.CreateParticle("particles/units/heroes/hero_sven/sven_spell_gods_strength_ambient.vpcf", ParticleAttachment.POINT_FOLLOW, this.GetParent())
        ParticleManager.SetParticleControlEnt(nFXIndex, 0, this.GetParent(), ParticleAttachment.POINT_FOLLOW, "attach_weapon", this.GetParent().GetOrigin(), true)
        ParticleManager.SetParticleControlEnt(nFXIndex, 2, this.GetParent(), ParticleAttachment.POINT_FOLLOW, "attach_head", this.GetParent().GetOrigin(), true)
        this.AddParticle(nFXIndex, false, false, -1, false, true)
    }
    GetModifierDamageOutgoing_Percentage(event: ModifierAttackEvent): number {
        return this.damege_per
    }
    GetStatusEffectName(): string {
        return "particles/status_fx/status_effect_gods_strength.vpcf"
    }
    GetHeroEffectName(): string {
        return "particles/units/heroes/hero_sven/sven_gods_strength_hero_effect.vpcf"
    }
}