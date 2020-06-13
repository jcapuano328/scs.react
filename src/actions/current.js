import types from '../constants/actionTypes';
import {toast} from './toast';
import getGame from '../selectors/game';
import getPlayer from '../selectors/player';

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();    
    e = e || {battle: current.battle};
    let data = {
        battle: e.battle,
        turn: 0,
        player: 0,
        phase: 0,                
        victory: {
            player1: 0,
            player2: 0
        }
    };
    
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.NEXT_TURN, value: game.turns.length});
}

export const prevPhase = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.PREV_PHASE, value: {phases: game.phases, players: game.players}});
}
export const nextPhase = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const player = getPlayer(getState());
    const phases = game.phases[player] || game.phases;
    dispatch({type: types.NEXT_PHASE, value: {maxphases: phases.length, maxturns: game.turns.length}});
}

export const setVictory = (side, vp) => (dispatch) => {    
    dispatch({type: types.SET_VICTORY, value: {side: side, value: vp}});
}
