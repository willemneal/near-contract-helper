const bunyan = require('bunyan');
const SumoLogger = require('bunyan-sumologic');

function logIdentityRequest(ctx, next) {
    const {
        body: {
            kind,
            identityKey,
        },
        ip,
        method,
        path,
    } = ctx.request;

    const logger = bunyan.createLogger({
        name: 'near-contract-helper',
        streams: [{
            type: 'raw',
            stream: new SumoLogger({
                collector: process.env.SUMO_COLLECTOR_ID,
                endpoint: process.env.SUMO_ENDPOINT,
            }),
        }],
    });

    logger.info({
        identity: {
            kind,
            identityKey,
        },
        request : {
            ip,
            method,
            path,
        },
    });

    return next();
}

module.exports = {
    logIdentityRequest,
};
