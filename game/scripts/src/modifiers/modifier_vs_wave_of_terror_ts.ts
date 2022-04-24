import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_vs_wave_of_terror_ts extends BaseModifier {
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.PHYSICAL_ARMOR_BONUS]
    }
    GetModifierPhysicalArmorBonus(event: ModifierAttackEvent): number {
        let value = this.GetAbility().GetSpecialValueFor("armor_reduce")
        return - value
    }
    GetEffectName(): string {
        return "particles/units/heroes/hero_vengeful/vengeful_wave_of_terror_recipient.vpcf"
    }
    GetEffectAttachType(): ParticleAttachment {
        return ParticleAttachment.ABSORIGIN_FOLLOW
    }
}