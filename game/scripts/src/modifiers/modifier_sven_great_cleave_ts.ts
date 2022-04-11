import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_sven_great_cleave_ts extends BaseModifier {
    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.ON_ATTACK_LANDED]
    }
    OnAttackLanded(event: ModifierAttackEvent): void {
        if (event.attacker === this.GetParent() && !this.GetParent().IsIllusion()) {
            if (this.GetParent().PassivesDisabled()) {
                return
            }
        }
        let target = event.target
        if (target != null && target.GetTeamNumber() != this.GetParent().GetTeamNumber()) {
            let cleaveDamage = 1000
            DoCleaveAttack(this.GetParent(), target, this.GetAbility(), cleaveDamage, -100, 100, 100, "particles/units/heroes/hero_sven/sven_spell_great_cleave.vpcf")
        }
    }
}