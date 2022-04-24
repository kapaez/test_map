import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_vengeance_aura_ts } from "../modifiers/modifier_vengeance_aura_ts";

@registerAbility()
export class vengeance_aura_ts extends BaseAbility {
    GetIntrinsicModifierName(): string {
        return modifier_vengeance_aura_ts.name
    }
}