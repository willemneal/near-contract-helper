const dynamo = require('dynamodb');
const Joi = require('joi');

const { buildTableName } = require('../utils');

const EmailDomainBlacklist = dynamo.define('EmailDomainBlacklist', {
    hashKey: 'domainName',
    schema: {
        domainName: Joi.string().required(),
        error: Joi.string(),
        hasValidDNSMXRecord: Joi.boolean(),
        isTemporaryEmailService: Joi.boolean(),
        staleAt: Joi.dateTime().required(),
    },
    tableName: buildTableName('email_domain_blacklist'),
    timestamps: true,
});

module.exports = EmailDomainBlacklist;
