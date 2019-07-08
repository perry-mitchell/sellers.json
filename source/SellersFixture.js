const { assertValidSellersJSON, validateSellersJSON } = require("./validate.js");
const Seller = require("./Seller.js");

class SellersFixture {
    constructor() {
        this._sellersJSON = {
            version: 1.0,
            sellers: []
        };
    }

    get contactAddress() {
        return this._sellersJSON.contact_address || null;
    }

    get contactEmail() {
        return this._sellersJSON.contact_email || null;
    }

    get identifiers() {
        return this._sellersJSON.identifiers
            ? [...this._sellersJSON.identifiers]
            : [];
    }

    get version() {
        return this._sellersJSON.version;
    }

    set contactAddress(addr) {
        if (!addr) {
            delete this._sellersJSON.contact_address;
        }
        this._sellersJSON.contact_address = addr;
    }

    set contactEmail(email) {
        if (!addr) {
            delete this._sellersJSON.contact_email;
        }
        this._sellersJSON.contact_email = email;
    }

    configureSeller(sellerID) {
        if (typeof sellerID !== "string" || sellerID.length <= 0) {
            throw new Error(`Invalid seller ID: ${sellerID}`);
        }
        const existing = this._sellersJSON.sellers.find(obj => obj.seller_id === sellerID);
        if (existing) {
            return new Seller(existing);
        }
        const newSeller = {
            seller_id: sellerID,
            directness: "DIRECT",
            is_confidential: 1
        };
        this._sellersJSON.sellers.push(newSeller);
        return new Seller(newSeller);
    }

    isValid() {
        return validateSellersJSON(this.toJSON()).length === 0;
    }

    removeAllIdentifiers() {
        delete this._sellersJSON.identifiers;
    }

    removeAllSellers() {
        this._sellersJSON.sellers = [];
    }

    removeIdentifier(name) {
        if (!Array.isArray(this._sellersJSON.identifiers)) {
            return false;
        }
        const idIndex = this._sellersJSON.identifiers.findIndex(id => id.name === name);
        if (idIndex >= 0) {
            this._sellersJSON.identifiers.splice(idIndex, 1);
            if (this._sellersJSON.identifiers.length <= 0) {
                delete this._sellersJSON.identifiers;
            }
            return true;
        }
        return false;
    }

    removeSeller(sellerID) {
        const sellerIndex = this._sellersJSON.sellers.findIndex(seller => seller.seller_id === sellerID);
        if (sellerIndex >= 0) {
            this._sellersJSON.sellers.splice(sellerIndex, 1);
            return true;
        }
        return false;
    }

    setIdentifier(name, value) {
        const idIndex = this._sellersJSON.identifiers.findIndex(id => id.name === name);
        if (idIndex >= 0) {
            this._sellersJSON.identifiers[idIndex].value = value;
        } else {
            this._sellersJSON.identifiers = this._sellersJSON.identifiers || [];
            this._sellersJSON.identifiers.push({
                name,
                value
            });
        }
    }

    toJSON() {
        return JSON.parse(this.toString());
    }

    toString(pretty = false) {
        return pretty
            ? JSON.stringify(this._sellersJSON, undefined, 2)
            : JSON.stringify(this._sellersJSON);
    }

    validate() {
        assertValidSellersJSON(this.toJSON());
    }
}

module.exports = SellersFixture;
