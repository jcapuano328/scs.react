'use strict';

var items = require('../stores/items.json');

module.exports = {
    items: items,
    get(id) {        
        return items.find((item,i) => {
            return item.id == id;
        }) || {};
    }
};
