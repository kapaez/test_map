import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_vs_wave_of_terror_ts } from "../modifiers/modifier_vs_wave_of_terror_ts";

@registerAbility()
export class wave_of_terror_ts extends BaseAbility {
    damage?: number
    aoe?: number
    a_duration?: number
    a_speed?: number
    clip?: number
    timeStamp?: number
    pid?: ProjectileID
    OnSpellStart(): void {
        let vDriction: Vector = this.GetCursorPosition().__sub(this.GetCaster().GetOrigin())
        vDriction = vDriction.Normalized()
        SendToConsole(vDriction.x.toString())
        SendToConsole(vDriction.y.toString())
        SendToConsole(vDriction.z.toString())
        this.a_speed = this.GetSpecialValueFor("speed")
        this.aoe = this.GetSpecialValueFor("effect_radius")
        this.a_duration = this.GetSpecialValueFor("duration")
        this.damage = this.GetSpecialValueFor("damage")
        this.pid = ProjectileManager.CreateLinearProjectile({
            EffectName: "particles/units/heroes/hero_vengeful/vengeful_wave_of_terror.vpcf",
            Ability: this,
            vSpawnOrigin: this.GetCaster().GetAbsOrigin(),
            fDistance: 2000,
            fStartRadius: this.aoe,
            fEndRadius: this.aoe,
            vVelocity: vDriction.__mul(this.a_speed),
            Source: this.GetCaster(),
            iUnitTargetTeam: UnitTargetTeam.ENEMY,
            iUnitTargetType: UnitTargetType.HERO + UnitTargetType.CREEP,
            iUnitTargetFlags: UnitTargetFlags.MAGIC_IMMUNE_ENEMIES,
            bProvidesVision: true,
            iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
            iVisionRadius: this.aoe,
        })
        this.clip = this.aoe / this.a_speed
        this.timeStamp = GameRules.GetGameTime()

        EmitSoundOn("Hero_VengefulSpirit.WaveOfTerror", this.GetCaster())
    }
    OnProjectileThink(location: Vector): void {
        let clock = this.clip - (GameRules.GetGameTime() - this.timeStamp)
        if (clock < 0) {
            SendToConsole(this.GetCaster().GetTeamNumber().toString())
            let vVelocity = ProjectileManager.GetLinearProjectileVelocity(this.pid)
            AddFOWViewer(this.GetCaster().GetTeamNumber(), location, this.aoe, this.a_duration, false)
        }
    }
    OnProjectileHit(target: CDOTA_BaseNPC, location: Vector): boolean | void {
        if (target != null) {
            let damage: ApplyDamageOptions = {
                damage: this.damage,
                victim: target,
                attacker: this.GetCaster(),
                damage_type: DamageTypes.PURE,
                ability: this
            }
            ApplyDamage(damage)
            target.AddNewModifier(this.GetCaster(), this, modifier_vs_wave_of_terror_ts.name, { duration: this.a_duration })
        }
        return false
    }
    GetCastPoint(): number {
        return 0.3
    }
    GetBackswingTime(): number {
        return 0.5
    }
}