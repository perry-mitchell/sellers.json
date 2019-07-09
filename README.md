# Sellers.json
> Sellers.JSON generator, parser and validator

[![npm version](https://badge.fury.io/js/sellers.json.svg)](https://www.npmjs.com/package/sellers.json) [![Build Status](https://travis-ci.org/perry-mitchell/sellers.json.svg?branch=master)](https://travis-ci.org/perry-mitchell/sellers.json)

## About

[Sellers.json](https://iabtechlab.com/sellers-json/) is an online advertising specification for sharing supply-side information regarding who is selling a piece of inventory. The [specification](https://iabtechlab.com/wp-content/uploads/2019/04/Sellers.json-Public-Comment-April-11-2019.pdf) details a JSON file formatted in a strict manner that lists properties that may assist demand-side systems in validating inventory. The file lists an array of _sellers_, as well as _identifiers_, contact information and other miscellaneous properties.

This library provides a toolkit for working with sellers.json data, and it can:

 * Generate new `sellers.json` files
 * Read and modify extisting files
 * Validate `sellers.json` data

The library is a lightweight **NodeJS** project designed to work on NodeJS version 8 and newer.

### Installation

Install by running `npm install sellers.json --save`.

## Usage

For validation, the `assertValidSellersJSON` and `validateSellersJSON` methods are provided to assert validity (and throw an error if invalid) and validate sellers.json data respectively:

```javascript
const fs = require("fs");
const { assertValidSellersJSON, validateSellersJSON } = require("sellers.json");

// Get sellers.json data somehow
const sellersJSONData = JSON.parse(fs.readFileSync("./sellers.json", "utf8"));

// Throw an error if the data is invalid
assertValidSellersJSON(sellersJSONData);

// Check for validity issues:
const errors = validateSellersJSON(sellersJSONData);
// Each error will resemble:
// {
//     path: "some.deep.property",
//     message: "Property was invalid"
// }
```

The `SellersFixture` is a class designed to assist with constructing valid sellers.json data. You can create a new instance or load it from existing data:

```javascript
const fs = require("fs");
const { SellersFixture } = require("sellers.json");

const sellersJSON = fs.readFileSync("./sellers.json", "utf8");

// Existing payload
const fixtureExisting = SellersFixture.fromString(sellersJSON); // Or: `SellersFixture.fromJSON(JSON.parse(sellersJSON)`

// New instance
const fixtureNew = new SellersFixture();
```

You can then use the fixture's helper methods to configure the file:

```javascript
fixture.contactAddress = "123 Test Lane";
fixture.contactEmail = "user@example.com";
fixture.setIdentifier("TAG-ID ", "5678");
fixture.setIdentifier("DUNS", "1234");

const seller = fixture.configureSeller("seller-id-1234");
seller.directness = "BOTH";
seller.name = "Test Seller";
seller.isConfidential = false;
// Seller changes in `Seller` instance are applied automatically
```

## See Also

 * [Ads.txt](https://github.com/perry-mitchell/ads.txt): `ads.txt` parser, generator and validator
