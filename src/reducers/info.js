let defaultInfo = {
    version: '1.2.1',
    releasedate: new Date(2020,10,2,12,12,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
