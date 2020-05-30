import { createSelector } from 'reselect';
import getGame from './game';

const getPlayer = (state) => state.current.player;

export default createSelector(
    [getPlayer, getGame],
    (player, game) => {        
        if (!game.players) {
            return '';
        }
        return game.players[player];
    }    
);
