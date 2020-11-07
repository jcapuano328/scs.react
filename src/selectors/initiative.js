import { createSelector } from 'reselect';
import getGame from './game';

const getInitiative = (state) => state.current.initiative;

export default createSelector(
    [getInitiative, getGame],
    (initiative, game) => {        
        if (!game.players) {
            return '';
        }
        return game.players[initiative];
    }    
);
