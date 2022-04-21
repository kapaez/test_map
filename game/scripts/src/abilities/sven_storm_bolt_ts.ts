import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_sven_storm_bolt_activity_ts } from "../modifiers/modifier_sven_storm_bolt_activity_ts";
@registerAbility()
export class sven_storm_bolt_ts extends BaseAbility {
    target?: CDOTA_BaseNPC
    OnSpellStart(): void {
        const target = this.GetCursorTarget();
        ProjectileManager.CreateTrackingProjectile({
            Ability: this,
            Source: this.GetCaster(),
            EffectName: "particles/units/heroes/hero_sven/sven_spell_storm_bolt.vpcf",
            Target: target,
            iMoveSpeed: 300,
            bProvidesVision: true,
            ExtraData: {
                target: target.GetEntityIndex()
            }
        })
        EmitSoundOn("Hero_Sven.StormBolt", this.GetCaster())
        this.GetCaster().AddNewModifier(this.GetCaster(), this, modifier_sven_storm_bolt_activity_ts.name, { duration: 1000 })
    }
    OnProjectileHit_ExtraData(target: CDOTA_BaseNPC, location: Vector, extraData: object): boolean | void {
        if (!target) return true;
        this.target = target
        const aoe = 300
        const duration = 1.5
        const damage = this.GetSpecialValueFor("damage")
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
            ApplyDamage({
                attacker: this.GetCaster(),
                damage: damage,
                damage_type: DamageTypes.MAGICAL,
                victim: enemy,
                ability: this,
                damage_flags: DamageFlag.NONE
            })
        }
        this.GetCaster().RemoveModifierByName(modifier_sven_storm_bolt_activity_ts.name)
        FindClearSpaceForUnit(this.GetCaster(), location, true)
        return true
    }
    OnProjectileThink_ExtraData(location: Vector, extraData: object): void {
        let targetIndex = extraData['target']
        let target = EntIndexToHScript(targetIndex)
        let casterVec = this.GetCaster().GetOrigin()
        let targetVec = target.GetOrigin()
        let newVec = targetVec.__sub(casterVec)
        let handeOffset = location.__sub(this.GetCaster().GetAttachmentOrigin(1))
        let heroVec = this.GetCaster().GetOrigin().__add(handeOffset)
        this.GetCaster().SetForwardVector(newVec)
        this.GetCaster().SetOrigin(heroVec)
    }
}