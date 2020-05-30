import { createSelector } from 'reselect';
import getGame from './game';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn, getGame],
    (turn, game) => {
        if (!game || !game.turns) {
            return '';
        }
        return game.turns[turn];
    }    
);
