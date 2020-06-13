let defaultInfo = {
    version: '2.0.1',
    releasedate: new Date(2020,5,8,16,35,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
