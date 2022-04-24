import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_fiery_soul_ts } from "../modifiers/modifier_fiery_soul_ts";

@registerAbility()
export class fiery_soul_ts extends BaseAbility {
    GetIntrinsicModifierName(): string {
        return modifier_fiery_soul_ts.name
    }
}