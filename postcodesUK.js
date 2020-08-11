/* -----------------------------------------------------------------------

Write a library that supports validating and formatting post codes for UK:
2, 3 or 4-character outward code, single space and 3-character inward code

AA9A 9AA
AA99 9AA
AA9 9AA
A9A 9AA
A99 9AA
A9 9AA

Special cases are included in the regular expression

------------------------------------------------------------------------ */ 
const fetch = require("node-fetch");
const postcodeRegEx = new RegExp("^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA)\\s[0-9][A-Z]{2}|BFPO\\s[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[-][0-9]{4}|[A-Z]{2}\\s[0-9]{2}|GE\\sCX|GIR ?0A{2}|SAN\\sTA1)$");

const INVALID_POSTCODE = -1;

async function getPostcodeData(postcode, optionalParam = 0){
    if(isPostcodeValid(postcode)){
        let response;
        try{
            if(!optionalParam){
                response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
            }
            else{
                response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/${optionalParam}`);
            }
            let dataJSON = await response.json();
            return dataJSON;
        }
        catch(err){
            console.error("Fetch failed");
            return response.status;
        }
    }
    else{
        return INVALID_POSTCODE;
    }
}

function isPostcodeValid(inputPostcode) {
    if (postcodeRegEx.test(inputPostcode)) {
        console.log("Valid postcode");
        return true;
    }
    else{
        console.error("Invalid format for postcode");
        return false;
    }
}

async function retrievedData(postcode) {
    if(!isPostcodeValid(postcode)) {
        return INVALID_POSTCODE;
    }
    else{
        const retrievedData = await getPostcodeData(postcode);
        const postcodeObject = {
            postcode: retrievedData.result.postcode,
            outward: retrievedData.result.outcode,
            inward: retrievedData.result.incode,
            country: retrievedData.result.country,
            region: retrievedData.result.region,
            coordinates: [retrievedData.result.longitude, retrievedData.result.latitude]
        }
        return postcodeObject;
    }
}

module.exports = { 
    isPostcodeValid, 
    getPostcodeData, 
    retrievedData
};