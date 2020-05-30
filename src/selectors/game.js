import { createSelector } from 'reselect';
import Battles from '../services/battles';

const getBattle = (state) => state.current.battle;

export default createSelector(
    [getBattle],
    (battleid) => {                
        let battle = Battles.get(battleid) || {};
        return {
            title: battle.name,
            desc: battle.desc,
            image: battle.image,            
            players: battle.players,
            turns: battle.turns,            
            phases: battle.phases,                        
            terrains: battle.terrains,
            combatTable: battle.combatTable,
            barrageTable: battle.barrageTable,
            custom: battle.custom
        };
    }    
);