import { BaseAbility, BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_nether_swap_ts extends BaseModifier {
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.INCOMING_DAMAGE_PERCENTAGE]
    }
    GetModifierIncomingDamage_Percentage(event: ModifierAttackEvent): number {
        return -this.GetAbility().GetSpecialValueFor("damage_reduce")
    }
}
