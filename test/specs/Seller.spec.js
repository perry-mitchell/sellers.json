const Seller = require("../../source/Seller.js");

describe("Seller", function() {
    beforeEach(function() {
        this.seller = new Seller({});
    });

    it("sets directness automatically", function() {
        expect(this.seller._seller).to.have.property("directness", "DIRECT");
    });

    it("sets is_confidential automatically", function() {
        expect(this.seller._seller).to.have.property("is_confidential", 1);
    });

    describe("comment", function() {
        it("can be set to a string", function() {
            this.seller.comment = "Test comment";
            expect(this.seller._seller).to.have.property("comment", "Test comment");
        });

        it("can be set to an empty string", function() {
            this.seller.comment = "";
            expect(this.seller._seller).to.have.property("comment", "");
        });

        it("can be removed", function() {
            this.seller.comment = null;
            expect(this.seller._seller).to.not.have.property("comment");
        });
    });

    describe("directness", function() {
        it("can be set to a string", function() {
            this.seller.directness = "RESELLER";
            expect(this.seller._seller).to.have.property("directness", "RESELLER");
        });

        it("can be set to a lowercase string", function() {
            this.seller.directness = "both";
            expect(this.seller._seller).to.have.property("directness", "both");
        });

        it("throws if set to an invalid value", function() {
            expect(() => {
                this.seller.directness = "invalid"
            }).to.throw(/Invalid seller directness/i);
        });
    });
});
