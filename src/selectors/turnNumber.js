import { createSelector } from 'reselect';

const getTurn = (state) => state.current.turn;

export default createSelector(
    [getTurn],
    (turn) => turn
);
