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
                this.seller.directness = "invalid";
            }).to.throw(/Invalid seller directness/i);
        });
    });

    describe("domain", function() {
        it("can be set to a string", function() {
            this.seller.domain = "test.com";
            expect(this.seller._seller).to.have.property("domain", "test.com");
        });

        it("can be removed", function() {
            this.seller.domain = null;
            expect(this.seller._seller).to.not.have.property("domain");
        });

        it("throws if set to an empty string", function() {
            expect(() => {
                this.seller.domain = "";
            }).to.throw(/Invalid value for seller domain/i);
        });
    });

    describe("isConfidential", function() {
        it("can be set to 0 if name specified", function() {
            this.seller.name = "Test name";
            this.seller.isConfidential = 0;
            expect(this.seller._seller).to.have.property("is_confidential", 0);
        });

        it("throws if set to 0 whilst 'name' is not specified", function() {
            expect(() => {
                this.seller.isConfidential = 0;
            }).to.throw(/Cannot set isConfidential to 0 when no name specified/i);
        });
    });

    describe("name", function() {
        it("can be set to a string", function() {
            this.seller.name = "test.com";
            expect(this.seller._seller).to.have.property("name", "test.com");
        });

        it("can be removed", function() {
            this.seller.name = null;
            expect(this.seller._seller).to.not.have.property("name");
        });

        it("throws if set to an empty string", function() {
            expect(() => {
                this.seller.name = "";
            }).to.throw(/Invalid value for seller name/i);
        });

        it("throws if removed while isConfidential = 0", function() {
            this.seller.name = "test";
            this.seller.isConfidential = 0;
            expect(() => {
                this.seller.name = null;
            }).to.throw(/Cannot remove seller name while isConfidential == 0/i);
        });
    });

    describe("removeExtension", function() {
        it("removes the extension object", function() {
            this.seller._seller.ext = {};
            this.seller.removeExtension();
            expect(this.seller._seller).to.not.have.property("ext");
        });
    });

    describe("setExtension", function() {
        it("sets the extension object", function() {
            this.seller.setExtension({});
            expect(this.seller._seller).to.have.property("ext").that.is.an("object");
        });
    });
});
