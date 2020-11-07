import Table from './table';
import Modifier from './modifier';

const modifiers = (combatTable,mods,attack) => {
    return mods.filter((mod) => (attack && mod.attcount) || (!attack && mod.defcount)).map((mod) => {
        let m = combatTable.modifiers.find((cm) => cm.name == mod.name) || {};
        return Modifier.modifier(m,attack?mod.attcount:mod.defcount);
    });
}

const findOdds = (odds, table) => {	    
	for (var i=table.length-1; i>=0; i--) {
		let v = table[i].odds;
		if (v <= odds || odds > v) {
			return v;
		}
	}
	return table[0].odds;
}


module.exports = {
    calculate(att,def,mods,terrain,between,rules) {        
        let attmods = modifiers(rules.combatTable, mods, true);
        let defmods = modifiers(rules.combatTable, mods, false);

        terrain = rules.terrains.find((t) => t.name == terrain) || {combat: {}};
        between = rules.terrains.find((t) => t.name == between) || {combat: {}};

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
        odds = findOdds(odds, rules.combatTable.table);

        return odds == -1 ? 1 : odds;
    },
    resolve(odds,mods,terrain,between,die1,die2,rules) {        
        let table = Table(rules.combatTable);
        let attmods = modifiers(rules.combatTable, mods, true);
        let defmods = modifiers(rules.combatTable, mods, false);        

        terrain = rules.terrains.find((t) => t.name == terrain) || {combat: {}};
        between = rules.terrains.find((t) => t.name == between) || {combat: {}};

        let drm = (Modifier.modifyDRM(attmods) - Modifier.modifyDRM(defmods)) + (
            Modifier.modifyDRM([Modifier.modifier(terrain.combat.attackmod,1)]) -             
            Modifier.modifyDRM([Modifier.modifier(terrain.combat.defendmod,1)])

        );
        let dice = table.diceValue(die1, die2, drm);
        let shift = (Modifier.modifySHIFT(attmods) - Modifier.modifySHIFT(defmods)) + (
            Modifier.modifySHIFT([Modifier.modifier(terrain.combat.attackmod,1)]) - 
            Modifier.modifySHIFT([Modifier.modifier(terrain.combat.defendmod,1)])
        );

        return table.result(odds, shift, dice);
    }
};
