export function hasTalent(unit: CDOTA_BaseNPC, talentName: string): boolean {
    if (unit.HasAbility(talentName)) {
        if (unit.FindAbilityByName(talentName).GetLevel() > 1) {
            return true
        }
    }
    return false
}
export function FindTalentValue(unit: CDOTA_BaseNPC, talentName: string, key: string = "value") {
    if (hasTalent(unit, talentName)) {
        return unit.FindAbilityByName(talentName).GetSpecialValueFor(key)
    }
    return 0
}