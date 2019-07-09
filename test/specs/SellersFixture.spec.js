const SellersFixture = require("../../source/SellersFixture.js");
const Seller = require("../../source/Seller.js");

describe("SellersFixture", function() {
    describe("instance", function() {
        beforeEach(function() {
            this.fixture = new SellersFixture();
        });

        describe("property", function() {
            describe("contactAddress", function() {
                it("returns null if not set", function() {
                    expect(this.fixture.contactAddress).to.be.null;
                });

                it("can be set to a string", function() {
                    this.fixture.contactAddress = "123 Test Lane";
                    expect(this.fixture.contactAddress).to.equal("123 Test Lane");
                });

                it("can be removed", function() {
                    this.fixture.contactAddress = "123 Test Lane";
                    this.fixture.contactAddress = null;
                    expect(this.fixture.contactAddress).to.be.null;
                });

                it("throws if set to an invalid value", function() {
                    expect(() => {
                        this.fixture.contactAddress = {};
                    }).to.throw(/Invalid value for contactAddress/i);
                });
            });

            describe("contactEmail", function() {
                it("returns null if not set", function() {
                    expect(this.fixture.contactEmail).to.be.null;
                });

                it("can be set to a string", function() {
                    this.fixture.contactEmail = "user@email.com";
                    expect(this.fixture.contactEmail).to.equal("user@email.com");
                });

                it("can be removed", function() {
                    this.fixture.contactEmail = "user@email.com";
                    this.fixture.contactEmail = null;
                    expect(this.fixture.contactEmail).to.be.null;
                });

                it("throws if set to an invalid value", function() {
                    expect(() => {
                        this.fixture.contactEmail = {};
                    }).to.throw(/Invalid value for contactEmail/i);
                });
            });

            describe("identifiers", function() {
                it("returns an array", function() {
                    expect(this.fixture.identifiers).to.be.an("array");
                });

                it("returns identifiers", function() {
                    this.fixture._sellersJSON.identifiers = [{
                        name: "TEST",
                        value: "VALUE"
                    }];
                    expect(this.fixture.identifiers).to.deep.equal([{
                        name: "TEST",
                        value: "VALUE"
                    }]);
                });

                it("is read-only", function() {
                    this.fixture.identifiers = false;
                    expect(this.fixture.identifiers).to.be.an("array");
                });

                it("cannot be appended to", function() {
                    this.fixture.identifiers.push({});
                    expect(this.fixture.identifiers).to.have.lengthOf(0);
                });
            });

            describe("sellers", function() {
                it("returns an array", function() {
                    expect(this.fixture.sellers).to.be.an("array");
                });

                it("returns sellers", function() {
                    this.fixture._sellersJSON.sellers = [{
                        seller_id: "1",
                        is_confidential: 1
                    }];
                    expect(this.fixture.sellers).to.deep.equal([{
                        seller_id: "1",
                        is_confidential: 1
                    }]);
                });

                it("is read-only", function() {
                    this.fixture.sellers = false;
                    expect(this.fixture.sellers).to.be.an("array");
                });

                it("cannot be appended to", function() {
                    this.fixture.sellers.push({});
                    expect(this.fixture.sellers).to.have.lengthOf(0);
                });
            });

            describe("version", function() {
                it("returns the correct version", function() {
                    expect(this.fixture.version).to.equal(1.0);
                });

                it("is read-only", function() {
                    this.fixture.version = 2.0;
                    expect(this.fixture.version).to.equal(1.0);
                });
            });
        });

        describe("method", function() {
            describe("configureSeller", function() {
                it("returns a Seller instance", function() {
                    const seller = this.fixture.configureSeller("1234");
                    expect(seller).to.be.an.instanceOf(Seller);
                });

                it("throws if no seller ID specified", function() {
                    expect(() => {
                        this.fixture.configureSeller();
                    }).to.throw(/Invalid seller ID/i);
                });

                it("returns Seller wrapper for existing sellers", function() {
                    this.fixture._sellersJSON.sellers = [{
                        seller_id: "9999",
                        is_confidential: 0,
                        name: "test"
                    }];
                    const seller = this.fixture.configureSeller("9999");
                    expect(seller.name).to.equal("test");
                });
            });

            describe("isValid", function() {
                it("returns true for new instances", function() {
                    expect(this.fixture.isValid()).to.be.true;
                });
            });

            describe("removeAllIdentifiers", function() {
                it("deletes the identifiers array", function() {
                    this.fixture._sellersJSON.identifiers = [{ name: "TEST", value: "VALUE" }];
                    this.fixture.removeAllIdentifiers();
                    expect(this.fixture._sellersJSON).to.not.have.property("identifiers");
                });
            });

            describe("removeAllSellers", function() {
                it("deletes all sellers", function() {
                    this.fixture._sellersJSON.sellers = [{
                        seller_id: "9999",
                        is_confidential: 0,
                        name: "test"
                    }];
                    this.fixture.removeAllSellers();
                    expect(this.fixture.sellers).to.have.lengthOf(0);
                });
            });

            describe("removeExtension", function() {
                it("removes the extension object", function() {
                    this.fixture._sellersJSON.ext = {};
                    this.fixture.removeExtension();
                    expect(this.fixture._sellersJSON).to.not.have.property("ext");
                });
            });

            describe("removeIdentifier", function() {
                it("removes identifiers", function() {
                    this.fixture._sellersJSON.identifiers = [{ name: "TEST", value: "VALUE" }];
                    this.fixture.removeIdentifier("TEST");
                    expect(this.fixture.identifiers).to.have.lengthOf(0);
                });

                it("returns true if removed", function() {
                    this.fixture._sellersJSON.identifiers = [{ name: "TEST", value: "VALUE" }];
                    expect(this.fixture.removeIdentifier("TEST")).to.be.true;
                });

                it("returns false if nothing removed", function() {
                    expect(this.fixture.removeIdentifier("TEST")).to.be.false;
                });
            });

            describe("removeSeller", function() {
                it("removes sellers", function() {
                    this.fixture._sellersJSON.sellers = [{
                        seller_id: "9999",
                        is_confidential: 0,
                        name: "test"
                    }];
                    this.fixture.removeSeller("9999");
                    expect(this.fixture.sellers).to.have.lengthOf(0);
                });

                it("returns true if removed", function() {
                    this.fixture._sellersJSON.sellers = [{
                        seller_id: "9999",
                        is_confidential: 0,
                        name: "test"
                    }];
                    expect(this.fixture.removeSeller("9999")).to.be.true;
                });

                it("returns false if nothing removed", function() {
                    expect(this.fixture.removeSeller("9999")).to.be.false;
                });
            });

            describe("setExtension", function() {
                it("sets the extension object", function() {
                    this.fixture.setExtension({});
                    expect(this.fixture._sellersJSON).to.have.property("ext").that.is.an("object");
                });

                it("throws if an invalid argument is provided", function() {
                    expect(() => {
                        this.fixture.setExtension(true);
                    }).to.throw(/Invalid extension object provided/i);
                });
            });

            describe("setIdentifier", function() {
                it("creates an identifier", function() {
                    this.fixture.setIdentifier("TEST", "VALUE");
                    expect(this.fixture._sellersJSON.identifiers).to.deep.equal([{
                        name: "TEST", value: "VALUE"
                    }]);
                });

                it("overwrites identifiers", function() {
                    this.fixture.setIdentifier("TEST", "VALUE");
                    this.fixture.setIdentifier("TEST", "SECOND");
                    expect(this.fixture._sellersJSON.identifiers).to.deep.equal([{
                        name: "TEST", value: "SECOND"
                    }]);
                });

                it("throws if an invalid name is provided", function() {
                    expect(() => {
                        this.fixture.setIdentifier("", "test");
                    }).to.throw(/Invalid identifier name/i);
                });

                it("throws if an invalid value is provided", function() {
                    expect(() => {
                        this.fixture.setIdentifier("test", "");
                    }).to.throw(/Invalid identifier value/i);
                });
            });

            describe("toJSON", function() {
                it("outputs a JSON object", function() {
                    expect(this.fixture.toJSON()).to.be.an("object");
                });
            });

            describe("toString", function() {
                it("outputs a JSON string", function() {
                    const str = this.fixture.toString();
                    expect(str).to.be.a("string");
                    expect(JSON.parse(str)).to.be.an("object");
                });

                it("outputs a minified string by default", function() {
                    expect(this.fixture.toString().split("\n")).to.have.lengthOf(1);
                });

                it("can output a prettified string", function() {
                    expect(this.fixture.toString(true).split("\n")).to.have.length.above(1);
                });
            });

            describe("validate", function() {
                it("does not throw for initial build", function() {
                    expect(() => this.fixture.validate()).to.not.throw();
                });
            });
        });
    });

    describe("static", function() {

    });
});
