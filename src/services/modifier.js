'use strict'

module.exports = {
    modifier(m,c) {
        return {
            type: m.type,
            value: m.value,
            count: m.count || c || 0
        };
    },
    modifiers(m) {
        return m.map((mod) => {
            return modifier(mod);
        });
    },
    modifySHIFT(mods) {
        return mods.filter((m) => m.type=='shift' && m.count > 0).reduce((p,c,i,a) => {
            return p + (c.value * c.count);
        }, 0);
    },
    modifyDRM(mods) {
        return mods.filter((m) => m.type=='drm' && m.count > 0).reduce((p,c,i,a) => {
            return p + (c.value * c.count);
        }, 0);
    },
    modifyMULT(mods) {
        return mods.filter((m) => m.type=='mult' && m.count > 0).reduce((p,c,i,a) => {
            return p * (c.value / c.count);
        }, 1);
    }
};
