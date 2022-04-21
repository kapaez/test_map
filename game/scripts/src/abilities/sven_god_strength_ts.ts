import { BaseAbility, registerAbility } from "../lib/dota_ts_adapter";
import { modifier_sven_god_strength_ts } from "../modifiers/modifier_sven_god_strength_ts";
import { modifier_sven_talent1 } from "../modifiers/modifier_sven_talent1";

@registerAbility()
export class sven_god_strength_ts extends BaseAbility {
    OnSpellStart(): void {
        let duration = this.GetSpecialValueFor("duration")
        let nFXIndex = ParticleManager.CreateParticle("particles/units/heroes/hero_sven/sven_spell_gods_strength.vpcf", ParticleAttachment.ABSORIGIN_FOLLOW, this.GetCaster())
        ParticleManager.SetParticleControlEnt(nFXIndex, 1, this.GetCaster(), ParticleAttachment.ABSORIGIN_FOLLOW, null, this.GetCaster().GetOrigin(), true)
        ParticleManager.ReleaseParticleIndex(nFXIndex)

        EmitSoundOn("Hero_Sven.GodsStrength", this.GetCaster())
        this.GetCaster().StartGesture(GameActivity.DOTA_OVERRIDE_ABILITY_4)
        this.GetCaster().AddNewModifier(this.GetCaster(), this, modifier_sven_god_strength_ts.name, { duration: duration })
    }
    GetCooldown(level: number): number {
        let value = this.GetLevelSpecialValueFor("cool_down", level)
        return value
    }
}