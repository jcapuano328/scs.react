import types from '../constants/actionTypes';
import {toast} from './toast';
import getGame from '../selectors/game';
import getPlayer from '../selectors/player';

const _prevTurn = (t) => {    
    if (--t < 0) { t = 0; }
    return t;    
}
const _nextTurn = (t,m) => {    
    if (++t >= m) { t = m; }
    return t;    
}

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();    
    e = e || {battle: current.battle};
    let data = {
        battle: e.battle,
        turn: 0,
        player: 0,
        phase: 0,                
        initiative: 0,
        victory: {
            player1: 0,
            player2: 0
        }
    };
    
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch,getState) => {    
    const state = getState();
    dispatch({type: types.SET_TURN, value: _prevTurn(state.current.turn)});
}
export const nextTurn = () => (dispatch,getState) => {    
    const state = getState();
    const game = getGame(state);
    dispatch({type: types.SET_TURN, value: _nextTurn(state.current.turn, game.turns.length)});
}

export const prevPhase = () => (dispatch,getState) => {        
    const state = getState();
    const game = getGame(state);    
    let phase = state.current.phase;
    let player = state.current.player;
    let turn = state.current.turn;
    let initiative = state.current.initiative;
    let plyr = game.players[player];
    let  phases = (game.phases[plyr]||game.phases);
    //console.log('prevPhase', 'turn', turn, 'player', player, 'phase', phase, 'initiative', initiative, 'phases', phases.length);
    // find previous phase
    while (--phase > -1 && player != initiative) {
        if (!phases[phase].name || phases[phase].flag > 0) break;
    }

    if (phase < 0) {
        if (player == initiative) {
            turn = _prevTurn(turn);
            player = initiative == 1 ? 0 : 1;            
        } else {
            player = player == 0 ? 1 : 0;
        }        
        let plyr = game.players[player];
        phase = (game.phases[plyr]||game.phases).length - 1;
    }
    dispatch({type: types.SET_PHASE, value: {turn: turn, player: player, phase: phase}});
}
export const nextPhase = () => (dispatch,getState) => {    
    const state = getState();
    const game = getGame(state);
    const phases = game.phases[player] || game.phases;
    let turn = state.current.turn;
    let player = state.current.player;    
    let phase = state.current.phase + 1;
    let initiative = state.current.initiative;
    //console.log('nextPhase', 'turn', turn, 'player', player, 'phase', phase, 'initiative', initiative, 'phases', phases.length);
    if (phase >= phases.length) {        
        if (player != initiative) {
            turn = _nextTurn(turn,game.turns.length);
            player = player == 1 ? 0 : 1;
            phase =  0;
        } else {
            player = initiative == 0 ? 1 : 0;            
            phase = phases.findIndex((e) => !e.name || e.flag > 0);
        }
    }

    dispatch({type: types.SET_PHASE, value: {turn: turn, player: player, phase: phase}});
}

export const nextPlayer = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const player = getPlayer(getState());
    let p = game.players.indexOf(player);
    if (++p >= game.players.length) {
        p = 0;
    }    
    dispatch({type: types.SET_PLAYER, value: p});
}

export const setPlayer = (player) => (dispatch,getState) => {    
    const game = getGame(getState());    
    dispatch({type: types.SET_PLAYER, value: game.players.indexOf(player)});
}

export const setInitiative = (player) => (dispatch,getState) => {    
    const game = getGame(getState());    
    dispatch({type: types.SET_INITIATIVE, value: game.players.indexOf(player)});
}

export const setVictory = (side, vp) => (dispatch) => {        
    dispatch({type: types.SET_VICTORY, value: {side: (side == 0 ? 'player1' : 'player2'), value: vp}});
}
