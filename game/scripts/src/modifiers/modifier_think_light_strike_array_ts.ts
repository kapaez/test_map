import { BaseModifier, registerModifier } from "../lib/dota_ts_adapter";

@registerModifier()
export class modifier_think_light_strike_array_ts extends BaseModifier {
    OnCreated(params: object): void {
        let particle_cast = "particles/units/heroes/hero_lina/lina_spell_light_strike_array_ray_team.vpcf"
        let sound_cast = "Ability.PreLightStrikeArray"

        let aoe = this.GetAbility().GetSpecialValueFor("radius")
        let effect_cast = ParticleManager.CreateParticleForTeam(particle_cast, ParticleAttachment.WORLDORIGIN, this.GetCaster(), this.GetCaster().GetTeamNumber())
        ParticleManager.SetParticleControl(effect_cast, 0, this.GetParent().GetOrigin())
        ParticleManager.SetParticleControl(effect_cast, 1, Vector(aoe, 1, 1))
        ParticleManager.ReleaseParticleIndex(effect_cast)
        EmitSoundOnLocationForAllies(this.GetParent().GetOrigin(), sound_cast, this.GetCaster())
    }
    OnDestroy(): void {
        let point = this.GetParent().GetOrigin()
        let aoe = this.GetAbility().GetSpecialValueFor("radius")
        let damage = this.GetAbility().GetSpecialValueFor("damage")
        let duration = this.GetAbility().GetSpecialValueFor("duration")
        GridNav.DestroyTreesAroundPoint(point, aoe, false)
        let effect_id = ParticleManager.CreateParticle("particles/units/heroes/hero_lina/lina_spell_light_strike_array.vpcf", ParticleAttachment.WORLDORIGIN, null)
        ParticleManager.SetParticleControl(effect_id, 0, this.GetParent().GetOrigin())
        ParticleManager.SetParticleControl(effect_id, 1, Vector(aoe, 1, 0))
        ParticleManager.ReleaseParticleIndex(effect_id)
        let enemys = FindUnitsInRadius(
            this.GetParent().GetTeamNumber(),
            point,
            this.GetParent(),
            aoe, UnitTargetTeam.ENEMY,
            UnitTargetType.HERO + UnitTargetType.BASIC,
            UnitTargetFlags.MAGIC_IMMUNE_ENEMIES + UnitTargetFlags.INVULNERABLE,
            FindOrder.ANY,
            false)
        for (let enemy of enemys) {
            ApplyDamage({
                attacker: this.GetCaster(),
                victim: enemy,
                damage,
                damage_type: DamageTypes.MAGICAL,
                ability: this.GetAbility()
            })
            enemy.AddNewModifier(this.GetCaster(), this.GetAbility(), "modifier_stunned", { duration })
        }
        UTIL_Remove(this.GetParent())
    }
}