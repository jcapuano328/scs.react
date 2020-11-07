import { createSelector } from 'reselect';
import getGame from '../selectors/game';
import getPlayer from '../selectors/player';

const getPhase = (state) => state.current.phase;

export default createSelector(
    [getGame,getPlayer,getPhase],
    (game,player,phase) => {                
        if (game.phases[player]) {
            return game.phases[player][phase];
        }      
        return game.phases[phase].name||game.phases[phase];
    }    
);
