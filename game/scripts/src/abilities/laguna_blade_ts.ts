import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_laguna_blade_ts } from "../modifiers/modifier_laguna_blade_ts";

@registerAbility()
export class laguna_blade_ts extends BaseAbility {
    GetBehavior(): AbilityBehavior | Uint64 {
        return AbilityBehavior.UNIT_TARGET
    }
    CastFilterResultTarget(target: CDOTA_BaseNPC): UnitFilterResult {
        if (this.GetCaster().HasScepter()) {
            let check = UnitFilter(
                target,
                UnitTargetTeam.ENEMY,
                UnitTargetType.HERO + UnitTargetType.BASIC,
                UnitTargetFlags.MAGIC_IMMUNE_ENEMIES + UnitTargetFlags.INVULNERABLE,
                this.GetCaster().GetTeamNumber())
            return check
        } else {
            let check = UnitFilter(
                target,
                UnitTargetTeam.ENEMY,
                UnitTargetType.HERO + UnitTargetType.BASIC,
                UnitTargetFlags.NONE,
                this.GetCaster().GetTeamNumber())
            return check
        }
    }
    OnSpellStart(): void {
        let target = this.GetCursorTarget()
        let particle_cast = "particles/units/heroes/hero_lina/lina_spell_laguna_blade.vpcf"
        let sound_cast = "Ability.LagunaBladeImpact"

        let effect_cast = ParticleManager.CreateParticle(particle_cast, ParticleAttachment.CUSTOMORIGIN, null)
        ParticleManager.SetParticleControlEnt(
            effect_cast,
            0,
            this.GetCaster(),
            ParticleAttachment.POINT_FOLLOW,
            "attach_attack1",
            Vector(0, 0, 0),
            true
        )
        ParticleManager.SetParticleControlEnt(
            effect_cast,
            1,
            target,
            ParticleAttachment.POINT_FOLLOW,
            "attach_hitloc",
            Vector(0, 0, 0),
            true
        )
        ParticleManager.ReleaseParticleIndex(effect_cast)
        EmitSoundOn(sound_cast, this.GetCaster())
        let delay = this.GetSpecialValueFor("damage_delay")
        target.AddNewModifier(this.GetCaster(), this, modifier_laguna_blade_ts.name, { duration: delay })
    }
    GetCooldown(level: number): number {
        return this.GetLevelSpecialValueFor("cool_down", level)
    }
}