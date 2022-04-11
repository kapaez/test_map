import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_sven_great_cleave_ts } from "../modifiers/modifier_sven_great_cleave_ts";

@registerAbility()
export class sven_great_cleave_ts extends BaseAbility {
    GetIntrinsicModifierName(): string {
        return modifier_sven_great_cleave_ts.name
    }
    GetBehavior(): AbilityBehavior | Uint64 {
        return AbilityBehavior.PASSIVE
    }
}