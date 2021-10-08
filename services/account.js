const models = require('../models');

const { Account } = models;

const WRITE_TO_POSTGRES = true;

const AccountService = {
    async createAccount(accountId) {
        return ([
            ...(WRITE_TO_POSTGRES ? this.createAccount_sequelize(accountId) : []),
        ]);
    },

    async createAccount_sequelize(accountId) {
        return Account.create({ accountId });
    },

    async getAccount(accountId) {
        return this.getAccount_sequelize(accountId);
    },

    async getAccount_sequelize(accountId) {
        const [account] = await Account.findOne({ where: { accountId } });
        return account.toJSON();
    },
};

module.exports = AccountService;
