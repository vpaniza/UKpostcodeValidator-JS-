const postcodesUK = require("../postcodesUK.js");
const  assert    = require("chai").assert;

describe("Postcode validation testing from postcodeUK library: ", function() {
    it("Check if inserted valid postcodes are valid: ", function() {
        outputCodeOne = postcodesUK.isPostcodeValid("WA7 5QS");
        outputCodeTwo = postcodesUK.isPostcodeValid("MK18 7AP");
        outputCodeThree = postcodesUK.isPostcodeValid("N1 8AL");
        outputCodeFour = postcodesUK.isPostcodeValid("PR8 6SQ");
        outputCodeFive = postcodesUK.isPostcodeValid("SW1P 9TF");
        outputCodeSix = postcodesUK.isPostcodeValid("SN11 8QQ");

        assert.equal(outputCodeOne, true);
        assert.equal(outputCodeTwo, true);
        assert.equal(outputCodeThree, true);
        assert.equal(outputCodeFour, true);
        assert.equal(outputCodeFive, true);
        assert.equal(outputCodeSix, true);
    })
    it("Check if inserted invalid postcodes are invalid: ", function() {
        outputCodeOne = postcodesUK.isPostcodeValid("N29 422SJ");
        outputCodeTwo = postcodesUK.isPostcodeValid("CFDS 1UQ");
        outputCodeThree = postcodesUK.isPostcodeValid("CR2 20D");
        outputCodeFour = postcodesUK.isPostcodeValid("123 FA");
        outputCodeFive = postcodesUK.isPostcodeValid("ASHG 123");
        outputCodeSix = postcodesUK.isPostcodeValid("EH1 78J");

        assert.equal(outputCodeOne, false);
        assert.equal(outputCodeTwo, false);
        assert.equal(outputCodeThree, false);
        assert.equal(outputCodeFour, false);
        assert.equal(outputCodeFive, false);
        assert.equal(outputCodeSix, false);
    })
})

describe("Postcode data GET testing from postcodeUK library: ", function() {
    it("Check if GET is working: ", async function() {
        let outputCodeValid = await postcodesUK.getPostcodeData("NR9 4QJ");
        assert.equal(outputCodeValid.status, 200);

        outputCodeInvalid = await postcodesUK.getPostcodeData("ASHG 123");
        assert.equal(outputCodeInvalid, -1);
    })
    it("Check if by inserting a wrong URL we get error: ", async function() {
        response = await postcodesUK.getPostcodeData("NR9 4QJ", "nearby");
        assert.equal(response.status, 404);
    })
})

describe("Check data object created with getPostCodeData: ", function () {
    it("Check created object: ", async function() {
        retrievedData = await postcodesUK.retrievedData("SW1P 9TF");
        assert.typeOf(retrievedData.postcode, "string");
        assert.typeOf(retrievedData.outward, "string");
        assert.typeOf(retrievedData.inward, "string");
        assert.typeOf(retrievedData.country, "string");
        assert.typeOf(retrievedData.region, "string");
        assert.typeOf(retrievedData.coordinates, "array");

        assert.equal(retrievedData.postcode, "SW1P 9TF");
    })
})