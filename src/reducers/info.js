let defaultInfo = {
    version: '2.0.0',
    releasedate: new Date(2020,4,9,9,26,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
