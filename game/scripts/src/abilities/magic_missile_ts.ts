import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";

@registerAbility()
export class magic_missile_ts extends BaseAbility {
    OnSpellStart(): void {
        let target = this.GetCursorTarget()
        ProjectileManager.CreateTrackingProjectile({
            EffectName: "particles/units/heroes/hero_vengeful/vengeful_magic_missle.vpcf",
            Source: this.GetCaster(),
            Ability: this,
            iMoveSpeed: this.GetSpecialValueFor("speed"),
            Target: target,
            iSourceAttachment: ProjectileAttachment.ATTACK_2
        })
        EmitSoundOn("Hero_VengefulSpirit.MagicMissile", this.GetCaster())
    }
    OnProjectileHit(target: CDOTA_BaseNPC, location: Vector): boolean | void {
        let duration = this.GetSpecialValueFor('duration')
        let damage = this.GetSpecialValueFor("damage")
        EmitSoundOn("Hero_VengefulSpirit.MagicMissleImpact", target)
        ApplyDamage({
            victim: target,
            attacker: this.GetCaster(),
            damage: damage,
            damage_type: DamageTypes.MAGICAL,
            ability: this,
        })
        target.AddNewModifier(this.GetCaster(), this, "modifier_stunned", { duration })
    }
    CastFilterResultTarget(target: CDOTA_BaseNPC): UnitFilterResult {
        if (target.GetTeamNumber() != this.GetCaster().GetTeamNumber()) {
            let hasTalent = this.GetCaster().HasAbility("special_bonus_unique_vs_7") && this.GetCaster().FindAbilityByName("special_bonus_unique_vs_7").GetLevel() > 0
            if (hasTalent) {
            } else {
                if (target.IsMagicImmune) {
                    return UnitFilterResult.FAIL_MAGIC_IMMUNE_ENEMY
                }
            }
        }
        let check = UnitFilter(target, UnitTargetTeam.ENEMY, UnitTargetType.HERO, UnitTargetFlags.NONE, this.GetCaster().GetTeamNumber())
        return check
    }
    GetCooldown(level: number): number {
        return this.GetLevelSpecialValueFor("cool_down", level)
    }
}