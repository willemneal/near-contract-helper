const dynamo = require('dynamodb');
const Joi = require('joi');

const { buildTableName } = require('../utils');

const Account = dynamo.define('Account', {
    hashKey: 'accountId',
    schema: {
        accountId: Joi.string().required(),
        fundedAccountNeedsDeposit: Joi.boolean().default(false),
    },
    tableName: buildTableName('account'),
    timestamps: true,
});

module.exports = Account;
