import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_nether_swap_ts } from "../modifiers/modifier_nether_swap_ts";

@registerAbility()
export class nether_swap_ts extends BaseAbility {
    OnSpellStart(): void {
        let target = this.GetCursorTarget()
        let targetLoc = this.GetCursorPosition()
        let casterLoc = this.GetCaster().GetOrigin()
        target.SetOrigin(casterLoc)
        this.GetCaster().SetOrigin(targetLoc)
        GridNav.DestroyTreesAroundPoint(targetLoc, 300, false)
        GridNav.DestroyTreesAroundPoint(casterLoc, 300, false)
        SendToConsole(target.GetTeamNumber().toString())
        SendToConsole(this.GetCaster().GetTeamNumber().toString())
        if (target.GetTeamNumber() != this.GetCaster().GetTeamNumber()) {
            let damage = this.GetSpecialValueFor("damage")
            ApplyDamage({
                damage: damage,
                damage_type: DamageTypes.MAGICAL,
                ability: this,
                victim: target,
                attacker: this.GetCaster()
            })
        } else {
            target.AddNewModifier(this.GetCaster(), this, modifier_nether_swap_ts.name, { duration: this.GetSpecialValueFor("damage_reduce_duration") })
        }
        let nCasterFX = ParticleManager.CreateParticle("particles/units/heroes/hero_vengeful/vengeful_nether_swap.vpcf", ParticleAttachment.ABSORIGIN_FOLLOW, this.GetCaster())
        ParticleManager.SetParticleControlEnt(nCasterFX, 1, this.GetCaster(), ParticleAttachment.ABSORIGIN_FOLLOW, null, targetLoc, false)
        ParticleManager.ReleaseParticleIndex(nCasterFX)

        let nTargetFX = ParticleManager.CreateParticle("particles/units/heroes/hero_vengeful/vengeful_nether_swap_target.vpcf", ParticleAttachment.ABSORIGIN_FOLLOW, target)
        ParticleManager.SetParticleControlEnt(nTargetFX, 1, this.GetCaster(), ParticleAttachment.ABSORIGIN_FOLLOW, null, casterLoc, false)
        ParticleManager.ReleaseParticleIndex(nTargetFX)
        EmitSoundOn("Hero_VengefulSpirit.NetherSwap", target)
        EmitSoundOn("Hero_VengefulSpirit.NetherSwap", this.GetCaster())
    }
    GetCooldown(level: number): number {
        return this.GetLevelSpecialValueFor("cool_down", level)
    }
}