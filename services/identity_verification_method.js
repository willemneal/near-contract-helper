const models = require('../models');

const { IdentityVerificationMethod } = models;

const WRITE_TO_POSTGRES = true;

const IdentityVerificationMethodService = {
    getIdentityVerificationMethod({ identityKey, kind }) {
        return this.getIdentityVerificationMethod_sequelize({ identityKey, kind });
    },

    async getIdentityVerificationMethod_sequelize({ identityKey, kind }) {
        const [verificationMethod] = await IdentityVerificationMethod.findOne({
            where: {
                identityKey,
                kind,
            },
        });

        return verificationMethod;
    },

    getOrCreateIdentityVerificationMethod({ identityKey, kind, securityCode, uniqueIdentityKey }) {
        return this.getOrCreateIdentityVerificationMethod_sequelize({ identityKey, kind, securityCode, uniqueIdentityKey });
    },

    async getOrCreateIdentityVerificationMethod_sequelize({ identityKey, kind, securityCode, uniqueIdentityKey }) {
        const [verificationMethod, verificationMethodCreated] = await IdentityVerificationMethod.findOrCreate({
            where: {
                identityKey,
                kind,
                claimed: false,
            },
            defaults: {
                securityCode,
                uniqueIdentityKey,
            }
        });

        if (!verificationMethodCreated) {
            await verificationMethod.update({ securityCode });
        }

        return verificationMethod;
    },

    async setSecurityCode({ identityKey, kind, securityCode, uniqueIdentityKey }) {
        return Promise.all([
            ...(WRITE_TO_POSTGRES ? [this.setSecurityCode_sequelize({ identityKey, kind, securityCode, uniqueIdentityKey })] : []),
        ]);
    },

    async setSecurityCode_sequelize({ identityKey, kind, securityCode, uniqueIdentityKey }) {
        const [verificationMethod, verificationMethodCreated] = await IdentityVerificationMethod.findOrCreate({
            where: {
                identityKey,
                kind,
                claimed: false,
            },
            defaults: {
                securityCode,
                uniqueIdentityKey,
            }
        });

        if (!verificationMethodCreated) {
            await verificationMethod.update({ securityCode });
        }

        return verificationMethod;
    },
};

module.exports = IdentityVerificationMethodService;
