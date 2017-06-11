module.exports = {
    description() {
        return 'Generates a reducer/actions/constant Duck Module for redux';
    },
    fileMapTokens() {
        return {
            __duck__: () => 'redux/modules'
        };
    }
};
