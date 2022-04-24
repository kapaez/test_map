import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";

@registerAbility()
export class dragon_slave_ts extends BaseAbility {
    OnSpellStart(): void {
        let caster = this.GetCaster()
        let point = this.GetCursorPosition()
        let direction = point.__sub(caster.GetOrigin()).Normalized()
        let speed = this.GetSpecialValueFor("speed")
        let fStartRadius = this.GetSpecialValueFor("start_radius")
        let fEndRadius = this.GetSpecialValueFor("end_radius")
        let fDistance = this.GetSpecialValueFor('distance')
        ProjectileManager.CreateLinearProjectile({
            EffectName: "particles/units/heroes/hero_lina/lina_spell_dragon_slave.vpcf",
            vSpawnOrigin: caster.GetOrigin(),
            Ability: this,
            vVelocity: direction.__mul(speed),
            Source: caster,
            iUnitTargetTeam: UnitTargetTeam.ENEMY,
            iUnitTargetType: UnitTargetType.BASIC + UnitTargetType.HERO,
            iUnitTargetFlags: UnitTargetFlags.NONE,
            fStartRadius,
            fEndRadius,
            fDistance,
        })
        let sound_cast = "Hero_Lina.DragonSlave.Cast"
        let sound_projectile = "Hero_Lina.DragonSlave"
        EmitSoundOn(sound_cast, this.GetCaster())
        EmitSoundOn(sound_projectile, this.GetCaster())
    }
    OnProjectileHitHandle(target: CDOTA_BaseNPC, location: Vector, projectileHandle: ProjectileID): boolean | void {
        if (!target) return
        let direction = ProjectileManager.GetLinearProjectileVelocity(projectileHandle).Normalized()
        let damage = this.GetSpecialValueFor("damage")
        ApplyDamage({
            attacker: this.GetCaster(),
            victim: target,
            ability: this,
            damage,
            damage_type: DamageTypes.MAGICAL,
        })
        let effect = ParticleManager.CreateParticle("particles/units/heroes/hero_lina/lina_spell_dragon_slave_impact.vpcf", ParticleAttachment.ABSORIGIN_FOLLOW, target)
        ParticleManager.SetParticleControlForward(effect, 1, direction)
        ParticleManager.ReleaseParticleIndex(effect)
    }
    GetCooldown(level: number): number {
        return this.GetLevelSpecialValueFor("cool_down", level)
    }
}