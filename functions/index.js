const functions = require('firebase-functions');
const admin = require('firebase-admin');
const js2xmlparser = require("js2xmlparser");
const axios = require("axios");
const xml2js = require('xml2js');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.submitFormData = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const formData = JSON.parse(request.body);

            if (request.method !== 'POST') {
                return response.status(405).send('Method Not Allowed');
            }

            // Step 2: Map the form data to XML format
            const xmlDataObject = mapFormDataToXML(formData);

            // Step 3: Convert the object to XML
            const xmlData = js2xmlparser.parse("applicationXML", xmlDataObject);

            console.info('xmlData', remove_linebreaks_ss(xmlData));

            // Step 4: Send XML data to the endpoint
            const specFiResponse = await axios.post('https://www.specialfinancingco.com/partner/ProcessApplicationXMLv2.asp', xmlData, {
                headers: { 'Content-Type': 'text/xml' }
            });

            const parser = new xml2js.Parser();
            parser.parseString(specFiResponse.data, (err, result) => {
                if (err) {
                    throw err;
                }

                // Extract the ReturnResponse value
                const returnResponse = result.applicationXMLresponse.reply[0].ReturnResponse[0];

                // Extract the ApplicationNum value
                const sfcAppNumber = result.applicationXMLresponse.reply[0].SFCAppNumber[0];

                // Step 6: Return the extracted value as JSON
                response.json({ applicationStatus: returnResponse, applicationNumber: sfcAppNumber });
            });
        } catch (error) {
            // console.error('Error submitting form data:', error);
            throw error;

        }
    })

});


function mapFormDataToXML(formData) {
    return {
        // applicationXML: {
        authentication: {
            username: 'SBUSER',
            password: 'SBPWD'
        },
        application: {
            applicationNum: generateApplicationNumber(15), // Randomly generated alphanumeric string
            firstName: formData.firstName,
            midName: formData.middleName,
            lastName: formData.lastName,
            ssn: formData.ssn.replace(/-/g, ''),
            dob: formatDate(formData.dob),
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zipCode,
            taaYears: extractYears(formData.timeAtAddress),
            taaMonths: extractMonths(formData.timeAtAddress),
            ownrent: formData.ownOrRent.toUpperCase(),
            housingPayment: formData.housingPayment,
            email: formData.email,
            homPhone: formData.phoneNumber.replace(/-/g, ''),
            busPhone: '',
            celPhone: '',
            employer: formData.employerName,
            occupation: formData.occupation,
            empAddress: formData.employerAddress,
            empCity: formData.employerCity,
            empState: formData.employerState,
            empZip: formData.employerZipCode,
            loeYears: extractYears(formData.employmentLength),
            loeMonths: extractMonths(formData.employmentLength),
            income: formData.averageIncome,
            incomePeriod: formData.incomePeriod.toUpperCase(),
            otherIncome: '', // Add if available
            otherIncomePeriod: '', // Add if available
            otherIncomeSource: '', // Add if available
            prevAddress: '',
            prevCity: '',
            prevState: '',
            prevZip: '',
            prevtaaYears: '',
            prevtaaMonths: '',
            prevEmployer: '',
            prevOccupation: '',
            prevempAddress: '',
            prevempCity: '',
            prevempState: '',
            prevempZip: '',
            prevloeYears: '',
            prevloeMonths: '',
            coFirstName: '',
            coMiddleName: '',
            coLastName: '',
            coSSN: '',
            coDOB: '',
            coAddress: '',
            coCity: '',
            coState: '',
            coZip: '',
            cotaaYears: '',
            cotaaMonths: '',
            coOwnRent: '',
            coHousingPayment: '',
            coEmail: '',
            coHomPhone: '',
            coBusPhone: '',
            coCelPhone: '',
            coEmployer: '',
            coOccupation: '',
            coempAddress: '',
            coempCity: '',
            coempState: '',
            coempZip: '',
            coloeYears: '',
            coloeMonths: '',
            coIncome: '',
            coIncomePeriod: '',
            coOtherIncome: '',
            coOtherIncomePeriod: '',
            coOtherIncomeSource: '',
            coprevAddress: '',
            coprevCity: '',
            coprevState: '',
            coprevZip: '',
            coprevtaaYears: '',
            coprevtaaMonths: '',
            coprevEmployer: '',
            coprevOccupation: '',
            coprevempAddress: '',
            coprevempCity: '',
            coprevempState: '',
            coprevempZip: '',
            coprevloeYears: '',
            coprevloeMonths: '',
            // ... Continue mapping other fields as per your XML structure
            BankName: formData.bankName,
            BankAcctNo: formData.accountNumber,
            BankRoutingNo: formData.routingNumber,
            BankAcctType: formData.accountType.toUpperCase(),
            CCAcctNo: formData.cardNumber,
            CCExpMonth: formData.cardExpMonth,
            CCExpYear: formData.cardExpYear,
            CCCardType: formData.cardBrand.toUpperCase(),
            CCZip5: '',
            CCAddress: '',
            CCIssuerName: '',
            CCCardHolderName: '',
            CCCVV: formData.cardCVV,
            ref1FirstName: formData.reference1FirstName,
            ref1LastName: formData.reference1LastName,
            ref1Phone: formData.reference1Phone,
            ref1Relationship: formData.reference1Relationship,
            ref1Addr1: '',
            ref1Addr2: '',
            ref1City: '',
            ref1State: '',
            ref1Zip5: '',
            ref2FirstName: formData.reference2FirstName,
            ref2LastName: formData.reference2LastName,
            ref2Phone: formData.reference2Phone,
            ref2Relationship: formData.reference2Relationship,
            ref2Addr1: '',
            ref2Addr2: '',
            ref2City: '',
            ref2State: '',
            ref2Zip5: '',
            ref3FirstName: '',
            ref3LastName: '',
            ref3Phone: '',
            ref3Relationship: '',
            ref3Addr1: '',
            ref3Addr2: '',
            ref3City: '',
            ref3State: '',
            ref3Zip5: '',
            ref4FirstName: '',
            ref4LastName: '',
            ref4Phone: '',
            ref4Relationship: '',
            ref4Addr1: '',
            ref4Addr2: '',
            ref4City: '',
            ref4State: '',
            ref4Zip5: '',
            ref5FirstName: '',
            ref5LastName: '',
            ref5Phone: '',
            ref5Relationship: '',
            ref5Addr1: '',
            ref5Addr2: '',
            ref5City: '',
            ref5State: '',
            ref5Zip5: '',
            sfcCompanyCode: 'SB1234'
        }
        // }
    };
}


function formatDate(dob) {
    const date = new Date(dob);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
}

function extractYears(timeString) {
    // Extract years from a string like '3 years 5 months'
    return timeString.split(' ')[0];
}

function extractMonths(timeString) {
    // Extract months from a string like '3 years 5 months'
    return timeString.split(' ')[2];
}

function generateApplicationNumber(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


function remove_linebreaks_ss(str) {
    let newstr = "";

    // Looop and traverse string
    for (let i = 0; i < str.length; i++)
        if (!(str[i] == "\n" || str[i] == "\r"))
            newstr += str[i];


    return newstr;
}
