import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_sven_storm_bolt_activity_ts extends BaseModifier {
    IsHidden(): boolean {
        return false
    }
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.OVERRIDE_ANIMATION]
    }
    GetOverrideAnimation(): GameActivity {
        return GameActivity.DOTA_OVERRIDE_ABILITY_1
    }
    CheckState(): Partial<Record<ModifierState, boolean>> {
        return {
            [ModifierState.STUNNED]: true
        }
    }
}