import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
@registerAbility()
export class sven_storm_bolt_ts extends BaseAbility {
    OnSpellStart(): void {
        ProjectileManager.CreateTrackingProjectile({
            Ability: this,
            Source: this.GetCaster(),
            EffectName: "particles/units/heroes/hero_sven/sven_spell_storm_bolt.vpcf",
            iMoveSpeed: 300,
            bProvidesVision: true,
        })
        EmitSoundOn("Hero_Sven.StormBolt", this.GetCaster())
    }
    OnProjectileHit(target: CDOTA_BaseNPC, location: Vector): boolean | void {
        const aoe = 300
        const duration = 1.5
        const enemies = FindUnitsInRadius(this.GetCaster().GetTeam(), location,
            undefined,
            aoe,
            UnitTargetTeam.ENEMY,
            UnitTargetType.HERO,
            UnitTargetFlags.NONE,
            FindOrder.ANY,
            false)
        for (const enemy of enemies) {
            enemy.AddNewModifier(this.GetCaster(), this, "modifier_stunned", { duration: 3 })
        }

    }
}