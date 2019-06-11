const Schema = require("validate");

const BOOL_BIN = val => val === 0 || val === 1;
const FLOAT = val => Number(val) === val && val % 1 !== 0;

let __schema;

function getSchema() {
    if (!__schema) {
        __schema = new Schema({
            contact_email: {
                type: String,
                required: false
            },
            contact_address: {
                type: String,
                required: false
            },
            version: {
                type: Number,
                required: true,
                use: { FLOAT }
            },
            identifiers: [{
                name: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    required: true
                }
            }],
            sellers: [{
                seller_id: {
                    type: String,
                    required: true
                },
                is_confidential: {
                    type: Number,
                    required: false,
                    use: { BOOL_BIN }
                },
                directness: {
                    type: String,
                    required: true,
                    match: /^(DIRECT|RESELLER|BOTH)$/i
                },
                name: {
                    type: String,
                    required: false
                },
                domain: {
                    type: String,
                    required: false
                },
                comment: {
                    type: String,
                    required: false
                }
            }]
        });
        __schema.message({
            BOOL_BIN: path => `${path} must be either 0 or 1`,
            FLOAT: path => `${path} must be a float`
        });
    }
    return __schema;
}

function assertValidSellersJSON(jsonPayload) {
    const errors = validateSellersJSON(jsonPayload);
    if (errors.length > 0) {
        throw new Error(`Assertion error: ${errors[0].message}`);
    }
}

function validateSellersJSON(jsonPayload) {
    const errors = getSchema().validate(jsonPayload);
    if (jsonPayload.sellers) {
        jsonPayload.sellers.forEach((seller, index) => {
            if (seller.is_confidential !== 1 && !seller.name) {
                errors.push({
                    path: `sellers.${index}.name`,
                    message: `sellers.${index}.name cannot be empty when is_confidential is not set to 1`
                });
            }
        });
    } else {
        errors.push({
            path: "sellers",
            message: "sellers is required"
        });
    }
    return errors;
}

module.exports = {
    assertValidSellersJSON,
    validateSellersJSON
};
