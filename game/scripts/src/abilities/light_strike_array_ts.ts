import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_think_light_strike_array_ts } from "../modifiers/modifier_think_light_strike_array_ts";

@registerAbility()
export class light_strike_array_ts extends BaseAbility {
    OnSpellStart(): void {
        let delay = this.GetSpecialValueFor("delay")
        let point = this.GetCursorPosition()
        CreateModifierThinker(this.GetCaster(), this, modifier_think_light_strike_array_ts.name, { duration: delay }, point, this.GetCaster().GetTeamNumber(), false)
    }
}