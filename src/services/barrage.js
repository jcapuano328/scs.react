import Table from './table';
import Modifier from './modifier';

module.exports = {
    resolve(str, terrain, mods, die1, die2, rules) {        
        let table = Table(rules.barrageTable);
        let dice = table.diceValue(die1, die2, 0);
        let shift = 0;
        terrain = rules.terrains.find((t) => t.name == terrain);
        mods = mods.map((mod) => {
            let m = rules.barrageTable.modifiers.find((tm) => tm.name == mod) || {};
            return Modifier.modifier(m,1);
        });
		if (terrain) {
			shift = Modifier.modifySHIFT([Modifier.modifier(terrain.barrage.attackmod,1)]) +
                    Modifier.modifySHIFT([Modifier.modifier(terrain.barrage.defendmod,1)]);

			dice += Modifier.modifyDRM([Modifier.modifier(terrain.barrage.attackmod,1)]) +
                    Modifier.modifyDRM([Modifier.modifier(terrain.barrage.defendmod,1)]);
		}

        shift += Modifier.modifySHIFT(mods);
        dice += Modifier.modifyDRM(mods);
        return table.result(str, shift, dice);
    }
};
