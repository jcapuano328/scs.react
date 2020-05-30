'use strict'
var inRange = require('./inrange');

module.exports = (table) => {
    return {
        diceValue(die1, die2, drm) {
            die1 = die1 || 0;
            die2 = die2 || 0;
            let dice = 0;
    	    if (table.dice.base == 'd') {
    	        let max = table.dice.number > 1 ? 14 : 8;
    	        dice = die1 + (table.dice.number > 1 ? die2 : 0) + drm;
    			if (dice < 0) {dice = 0;}
    	        if (dice > max) {dice = max;}
    	    }
    	    else if (table.dice.base == 'b') {
    	        dice = die1*10 + die2 + drm;
    	        if (dice < 11) {dice = 11;}
    			else if (dice > 66) {dice = 66;}
    	    }
            else {
                dice = die1 + die2 + drm;
            }
    	    return dice;
        },
        result(str, shift, dice) {
            let idx = table.table.findIndex((t) => {
                return t.strength == str;
            });
            idx = idx < 0 ? table.table.length - 1 : idx;
            idx += shift;
            if (idx < 0) {idx = 0;}
            else if (idx >= table.table.length) {idx = table.table.length-1;}
            let result = table.table[idx].results.find((r) => {
        		return inRange(dice, r.lo, r.hi);
        	}) || {result: ''};
            return result.result;
        }
    };
}
