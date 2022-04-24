import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";
import { modifier_vengeance_aura_effect_ts } from "./modifier_vengeance_aura_effect_ts";

@registerModifier()
export class modifier_vengeance_aura_ts extends BaseModifier {
    IsAura(): boolean {
        return true
    }
    GetAuraRadius(): number {
        return this.GetAbility().GetSpecialValueFor("aura_radius")
    }
    IsHidden(): boolean {
        return true
    }
    GetModifierAura(): string {
        return modifier_vengeance_aura_effect_ts.name
    }
    GetAuraSearchType(): UnitTargetType {
        return UnitTargetType.HERO
    }
    GetAuraSearchTeam(): UnitTargetTeam {
        return UnitTargetTeam.FRIENDLY
    }
}