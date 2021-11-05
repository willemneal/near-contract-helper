module.exports = {
    buildTableName(baseName) {
        return `${process.env.ENVIRONMENT}_${baseName}`;
    },
};
