const functions = require('firebase-functions');
const admin = require('firebase-admin');
const js2xmlparser = require("js2xmlparser");
const axios = require("axios");
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
    
            // Step 4: Send XML data to the endpoint
            const response = await axios.post('https://www.specialfinancingco.com/partner/ProcessApplicationXMLv2.asp', xmlData, {
                headers: {'Content-Type': 'text/xml'}
            });
    
            // Step 5 and 6: Process and return the response            
            return response.data;
        } catch (error) {
            console.error('Error submitting form data:', error);
            throw error;
        }
    })

});



function mapFormDataToXML(formData) {
    return {
        applicationXML: {
            authentication: {
                username: 'SBUSER',
                password: 'SBPWD'
            },
            application: {
                applicationNum: '123456789', // This should be dynamically generated or fetched
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
                busPhone: '', // Add if available
                celPhone: '', // Add if available
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
                // ... Continue mapping other fields as per your XML structure
            }
        }
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


