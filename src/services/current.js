'use strict'

var Store = require('../stores/current');
var Battles = require('./battles');
var log = require('./log');

var _current = {};

module.exports = {
	load() {
		return Store.load()
		.then((current) => {
        	_current = current;
            return _current;
		});
	},
	save() {
		return Store.save(_current);
	},
	remove() {
		return Store.remove()
		.then(() => {
			_current = null;
		});
	},
	reset(data) {
		return Store.reset(data)
		.then((current) => {
			_current = current;
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
	}
};
