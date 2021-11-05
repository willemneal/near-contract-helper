const dynamo = require('dynamodb');
const Joi = require('joi');

const { buildTableName } = require('../utils');

const RecoveryMethod = dynamo.define('RecoveryMethod', {
    hashKey: 'uniqueIdentityKey',
    schema: {
        accountId: Joi.string().required(),
        detail: Joi.string(),
        kind: Joi.string(),
        publicKey: Joi.string(),
        requestId: Joi.number().integer(),
        securityCode: Joi.string(),
    },
    tableName: buildTableName('recovery_methods'),
    timestamps: true,
});

module.exports = RecoveryMethod;
