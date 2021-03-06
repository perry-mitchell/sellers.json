const VALID_DIRECTNESS = /^(DIRECT|RESELLER|BOTH)$/i;

class Seller {
    constructor(objRef) {
        this._seller = objRef;
        if (this._seller.is_confidential !== 0 && this._seller.is_confidential !== 1) {
            this._seller.is_confidential = 1;
        }
        this._seller.directness = this._seller.directness || "DIRECT";
    }

    get comment() {
        return typeof this._seller.comment === "string" ? this._seller.comment : null;
    }

    get directness() {
        return this._seller.directness;
    }

    get domain() {
        return typeof this._seller.domain === "string" ? this._seller.domain : null;
    }

    get isConfidential() {
        return this._seller.is_confidential;
    }

    get id() {
        return this._seller.seller_id;
    }

    get name() {
        return typeof this._seller.name === "string" ? this._seller.name : null;
    }

    get sellerID() {
        return this.id;
    }

    set comment(comment) {
        if (comment === null) {
            delete this._seller.comment;
            return;
        }
        if (typeof comment !== "string") {
            throw new Error(`Invalid value for seller comment: ${comment}`);
        }
        this._seller.comment = comment;
    }

    set directness(directness) {
        if (VALID_DIRECTNESS.test(directness) !== true) {
            throw new Error(`Invalid seller directness: ${directness}`);
        }
        this._seller.directness = directness;
    }

    set domain(domain) {
        if (domain === null) {
            delete this._seller.domain;
            return;
        }
        if (typeof domain !== "string" || domain.length <= 0) {
            throw new Error(`Invalid value for seller domain: ${domain}`);
        }
        this._seller.domain = domain;
    }

    set isConfidential(isConf) {
        const newVal = (Boolean(isConf) === isConf) ? isConf ? 1 : 0 : isConf;
        if (newVal !== 0 && newVal !== 1) {
            throw new Error(`Invalid seller confidential value: ${newVal}`);
        }
        if (newVal === 0 && !this.name) {
            throw new Error("Cannot set isConfidential to 0 when no name specified");
        }
        this._seller.is_confidential = newVal;
    }

    set name(name) {
        if (name === null) {
            if (this.isConfidential === 0) {
                throw new Error("Cannot remove seller name while isConfidential == 0 - be sure to set isConfidential to 1 before removing it");
            }
            delete this._seller.name;
            return;
        }
        if (typeof name !== "string" || name.length <= 0) {
            throw new Error(`Invalid value for seller name: ${name}`);
        }
        this._seller.name = name;
    }

    removeExtension() {
        delete this._seller.ext;
    }

    setExtension(extObj) {
        if (!extObj || typeof extObj !== "object") {
            throw new Error("Invalid seller extension object provided");
        }
        this._seller.ext = JSON.parse(JSON.stringify(extObj));
    }
}

module.exports = Seller;
