import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    battle: -1,
    turn: 0,
    phase: 0,
    player: 0,
    victory: {
        "player1": 0,
        "player2": 0
    }
};

const prevTurn = (t) => {    
    if (--t < 0) { t = 0; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t >= m) { t = m; }
    return t;    
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.current) {
            let s = {
                ...state,
                ...action.payload.current
            };        	
			s.player = s.player || 0;
			s.victory = s.victory || {"player1": 0, "player2": 0};			
                        
            return s;
        }
        return state;

    case types.SET_CURRENT:        
        return {
            ...action.value
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    case types.PREV_PHASE:
        let phase = state.phase - 1;
        let player = state.player;
        let turn = state.turn;
		if (phase < 0) {
            if (player == 0) {
                turn = prevTurn(state.turn);
                player = 1;
            } else {
                player = 0;
            }
            let plyr = actions.value.players[player];
            phase = (action.value.phases[plyr]||action.value.phases).length - 1;
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };           

    case types.NEXT_PHASE:
        phase = state.phase + 1;
        player = state.player;
        turn = state.turn;
		if (phase >= action.value.maxphases) {
			phase =  0;
            if (player == 1) {
                turn = nextTurn(state.turn,action.value.maxturns);
                player = 0;
            } else {
                player = 1;
            }
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };

    case types.NEXT_PLAYER:
        return {
            ...state,
            player: state.player == 0 ? 1 : 0
        };
    
    case types.SET_VICTORY:    
        return {
            ...state,
            victory: {
                ...state.victory,
                [action.value.side]: action.value.value
            }
        };

    default:
        return state;
    }
}
