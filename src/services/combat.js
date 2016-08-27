'use strict';
var Current = require('./current');
var Table = require('./table');
var Modifier = require('./modifier');

let modifiers = (mods,attack) => {
    return mods.filter((mod) => (attack && mod.attcount) || (!attack && mod.defcount)).map((mod) => {
        let m = battle.combatTable.modifiers.find((cm) => cm.name == mod.name) || {};
        return Modifier.modifier(m,attack?mod.attcount:mod.defcount);
    });
}

module.exports = {
    calculate(att,def,mods,terrain,between) {
        let battle = Current.battle();
        let table = Table(battle.combatTable);
        let attmods = modifiers(mods, true);
        let defmods = modifiers(mods, false);

        terrain = battle.terrains.find((t) => t.name == terrain) || {combat: {}};
        between = battle.terrains.find((t) => t.name == between) || {combat: {}};

        att *= Modifier.modifyMULT(attmods) *
            Modifier.modifyMULT([Modifier.modifier(terrain.combat.attackmod,1)]) *
            Modifier.modifyMULT([Modifier.modifier(between.combat.attackmod,1)]);

        def *= Modifier.modifyMULT(defmods) *
            Modifier.modifyMULT([Modifier.modifier(terrain.combat.defendmod,1)]) *
            Modifier.modifyMULT([Modifier.modifier(between.combat.defendmod,1)]);

        let odds = 1;
        if (att > 0 && def > 0) {
            odds = Math.round((att > def) ? att/def : def/att) * ((att<def) ? -1 : 1);
        }
        return odds;
    },
    resolve(odds,mods,die1,die2) {
        let battle = Current.battle();
        let table = Table(battle.combatTable);
        let attmods = modifiers(mods, true);
        let defmods = modifiers(mods, false);

        let drm = Modifier.modifyDRM(attmods) - Modifier.modifyDRM(defmods);
        let dice = table.diceValue(die1, die2, drm);
        let shift = Modifier.modifySHIFT(attmods) - Modifier.modifySHIFT(defmods);

        return table.result(odds, shift, dice);
    }
};
