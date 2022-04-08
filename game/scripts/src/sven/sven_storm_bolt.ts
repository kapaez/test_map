import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
@registerAbility()
export class sven_storm_bolt extends BaseAbility {
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
        const enemies = FindUnitsInRadius(this.Getcaster().GetTeam(), location,
            undefined,
            aoe,
            UnitTargetTeam(0),

    }

}