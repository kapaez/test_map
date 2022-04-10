import { BaseAbility, registerAbility, registerModifier } from "../lib/dota_ts_adapter";
import { modifier_sven_sheld_ts } from "../modifiers/modifier_sven_sheld_ts";

@registerAbility()
export class sven_sheld_ts extends BaseAbility {
    OnSpellStart(): void {
        const aoe = 300
        const duration = this.GetSpecialValueFor("duration")
        const location = this.GetCaster().GetAbsOrigin()
        const friends = FindUnitsInRadius(this.GetCaster().GetTeam(), location,
            undefined,
            aoe,
            UnitTargetTeam.FRIENDLY,
            UnitTargetType.HERO,
            UnitTargetFlags.NONE,
            FindOrder.ANY,
            false)
        for (const hero of friends) {
            hero.AddNewModifier(this.GetCaster(), this, modifier_sven_sheld_ts.name, { duration: duration })
        }
    }
}
