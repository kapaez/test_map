import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_vengeance_aura_effect_ts extends BaseModifier {
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.BASEDAMAGEOUTGOING_PERCENTAGE]
    }
    GetModifierBaseDamageOutgoing_Percentage(event: ModifierAttackEvent): number {
        return this.GetAbility().GetSpecialValueFor("damage_bonus")
    }
}