import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState = {
    battle: -1,
    turn: 0,
    phase: 0,
    player: 0,
    initiative: 0,
    victory: {
        "player1": 0,
        "player2": 0
    }
};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.current) {
            let s = {
                ...state,
                ...action.payload.current
            };        	
            s.player = s.player || 0;
            s.initiative = s.initiative || 0;
			s.victory = s.victory || {"player1": 0, "player2": 0};			
                        
            return s;
        }
        return state;

    case types.SET_CURRENT:        
        return {
            ...action.value
        };

    case types.SET_TURN:        
        return {
            ...state,
            turn: action.value
        };
        
    case types.SET_PHASE:
        return {
            ...state,
            turn: action.value.turn,
            player: action.value.player,
            phase: action.value.phase
        };
                
    case types.SET_PLAYER:
        return {
            ...state,
            player: action.value
        };

    case types.SET_INITIATIVE:
        return {
            ...state,
            initiative: action.value
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
