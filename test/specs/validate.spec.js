const { assertValidSellersJSON, validateSellersJSON } = require("../../source/validate.js");

const SELLERS_JSON_INVALID = require("../resources/sellers.invalid.json");
const SELLERS_JSON_VALID = require("../resources/sellers.valid.json");

describe("validate", function() {
    describe("validateSellersJSON", function() {
        it("validates with no errors for correct files", function() {
            const errors = validateSellersJSON(SELLERS_JSON_VALID);
            expect(errors).to.have.lengthOf(0);
        });

        it("validates with errors for incorrect files", function() {
            const errors = validateSellersJSON(SELLERS_JSON_INVALID);
            expect(errors).to.have.lengthOf(1);
            expect(errors[0]).to.have.property("path", "sellers.5.name");
        });
    });
});
