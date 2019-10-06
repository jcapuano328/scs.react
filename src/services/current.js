'use strict'
import {Store, Log} from 'react-native-app-nub';
var store = Store('scs.app.current');
var Battles = require('./battles');
var log = Log;

var _current = null;

module.exports = {
	load() {
		return store.load()
		.then((current) => {
			_current = current;
            return _current;
		});
	},
	save() {
		return store.save(_current);
	},
	remove() {
		return store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {		
		let blank = {
		    battle: (data || _current).battle,
		    turn: 1,
		    phase: 0,
		    victory: {
		        player1: 0,
		        player2: 0
		    }
		};
		return store.save(blank)
		.then((current) => {			
			_current = blank;			
			return _current;
		});
	},
	battle() {
		return Battles.get(_current.battle) || {};
	},
	turn() {
		let battle = this.battle();
		let turns = battle.turns || ['none'];
		return turns[(_current.turn || 1)];
	},
	prevTurn(dosave) {
		log.debug('prev turn: ' + _current.turn);
		if (--_current.turn < 1) {
			_current.turn = 1;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	nextTurn(dosave) {
		log.debug('next turn: ' + _current.turn);
		let battle = this.battle();
		let maxturns = battle.turns.length;
		log.debug('max turns: ' + maxturns);
		if (++_current.turn >= maxturns) {
			_current.turn = maxturns;
		}
        let turn = this.turn();
		if (dosave) {
        	return this.save()
            .then(() => {
            	return turn;
			});
		}
        return new Promise((resolve, reject) => {
        	resolve(turn);
        });
	},
	phase() {
		let battle = this.battle();
		let phase = battle.phases[_current.phase];
		log.debug('phase: ' + phase);
		return phase;
	},
	prevPhase() {
		if (--_current.phase < 0) {
			let battle = Battles.get(_current.battle);
			_current.phase = battle.phases.length - 1;
			this.prevTurn(false);
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	nextPhase() {
		let battle = this.battle();
		if (++_current.phase >= battle.phases.length) {
			_current.phase = 0;
			this.nextTurn(false);
		}
    	return this.save()
        .then(() => {
        	return this.phase();
		});
	},
	victory(v) {
		if (typeof v != 'undefined') {
			_current.victory.player1 = v.player1 || _current.victory.player1;
			_current.victory.player2 = v.player2 || _current.victory.player2;
		}
		return {
			player1: _current.victory.player1,
			player2: _current.victory.player2
		};
	},
};
