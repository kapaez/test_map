import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_laguna_blade_ts extends BaseModifier {
    type?: DamageTypes
    IsHidden(): boolean {
        return true
    }
    OnDestroy(): void {
        if (this.GetCaster().HasScepter()) {
            this.type = DamageTypes.PURE
        } else {
            this.type = DamageTypes.MAGICAL
        }
        if (this.GetParent().IsInvulnerable()) return
        if (this.GetParent().IsMagicImmune() && !this.GetCaster().HasScepter()) return
        SendToConsole("inDestroy")
        SendToConsole(this.GetAbility().GetSpecialValueFor("damage").toString())
        ApplyDamage({
            attacker: this.GetCaster(),
            victim: this.GetParent(),
            damage: this.GetAbility().GetSpecialValueFor("damage"),
            damage_type: this.type,
            ability: this.GetAbility()
        })
    }
}