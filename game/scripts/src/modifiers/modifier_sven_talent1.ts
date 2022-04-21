import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";
import { FindTalentValue, hasTalent } from "../lib/talent";

@registerModifier()
export class modifier_sven_talent1 extends BaseModifier {
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.OVERRIDE_ABILITY_SPECIAL_VALUE, ModifierFunction.OVERRIDE_ABILITY_SPECIAL, ModifierFunction.HEALTH_REGEN_CONSTANT]
    }
    GetModifierOverrideAbilitySpecialValue(event: ModifierOverrideAbilitySpecialEvent): number {
        let ability = event.ability
        let ability_name = ability.GetName()
        const mod_ability_name = this.GetAbility().GetName()
        if (ability_name != mod_ability_name) {
            return 0
        }
        let special_value = event.ability_special_value
        let bonus_value = 50
        if (special_value == "duration") {
            let special_level = event.ability_special_level
            let base_value = event.ability.GetLevelSpecialValueNoOverride(special_value, special_level)
            return base_value + bonus_value
        }
        SendToConsole(ability_name)
        SendToConsole("testcheck")
        return 0
    }
    GetModifierOverrideAbilitySpecial(event: ModifierOverrideAbilitySpecialEvent): 0 | 1 {
        let caster = this.GetCaster()
        if (!hasTalent(caster, "sven_talent1")) {
            return 0
        }
        const ability_name = this.GetAbility().GetName()
        if (ability_name != event.ability.GetName()) {
            return 0
        }
        return 1
    }
}