'use strict';

var battles = require('../data/battles.json');
var rules = {
    "afrika": require('../data/afrika.json'),
    "ardennes": require('../data/ardennes.json'),
    "bastogne": require('../data/bastogne.json'),
    "crusader": require('../data/crusader.json'),
    "driveonparis": require('../data/driveonparis.json'),
    "fallschirmjaeger": require('../data/fallschirmjaeger.json'),
    "gazala": require('../data/gazala.json'),
    "guadalajara": require('../data/guadalajara.json'),
    "heightsofcourage": require('../data/heightsofcourage.json'),
    "stalingradpocket": require('../data/stalingradpocket.json'),
    "themightyendeavor": require('../data/themightyendeavor.json'),
    "yomkippur": require('../data/yomkippur.json')
};

module.exports = {
    battles: battles,
    get(id) {
        let battle = battles.find((b) => b.id == id) || {};        
        if (battle && battle.image && rules[battle.image]) {
            let r = rules[battle.image];
            r.battle = battle.id;
            r.name = battle.name;
            r.desc = battle.desc;
            r.image = battle.image;
            return r;
        }
        return {};
    }
};
