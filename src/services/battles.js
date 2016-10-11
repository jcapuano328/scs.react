'use strict';

var battles = require('../stores/battles.json');
var rules = {
    "afrika": require('../stores/afrika.json'),
    "ardennes": require('../stores/ardennes.json'),
    "bastogne": require('../stores/bastogne.json'),
    "crusader": require('../stores/crusader.json'),
    "driveonparis": require('../stores/driveonparis.json'),
    "fallschirmjaeger": require('../stores/fallschirmjaeger.json'),
    "gazala": require('../stores/gazala.json'),
    "guadalajara": require('../stores/guadalajara.json'),
    "heightsofcourage": require('../stores/heightsofcourage.json'),
    "stalingradpocket": require('../stores/stalingradpocket.json'),
    "themightyendeavor": require('../stores/themightyendeavor.json'),
    "yomkippur": require('../stores/yomkippur.json')
};

module.exports = {
    battles: battles,
    get(id) {
        let battle = battles.find((b) => b.id == id) || {};
        if (battle && battle.image && rules[battle.image]) {
            let r = rules[battle.image];
            r.name = battle.name;
            r.desc = battle.desc;
            r.image = battle.image;
            return r;
        }
        return {};
    }
};
