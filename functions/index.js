const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.submitFormData = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        // console.info('request', request);

        // if (request.method !== 'POST') {
        //     return response.status(405).send('Method Not Allowed');
        // }

        // const formData = request.body;
        // console.info('formData', formData)
        // // Process formData here, e.g., save to Firestore or perform other operations

        // return response.status(200).send('Form data received');



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
            console.info(response.data);
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
                sfcCompanyCode: 'SB1234',
                firstName: formData.firstName,
                midName: formData.middleName,
                lastName: formData.lastName,
                ssn: formData.ssn.replace(/-/g, ''),
                dob: formData.dob,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zipCode,
                taaYears: formData.timeAtAddress.split(' ')[0],
                ownrent: formData.ownOrRent.toUpperCase(),
                housingPayment: formData.housingPayment,
                email: formData.email,
                homPhone: formData.phoneNumber.replace(/-/g, ''),
                employer: formData.employerName,
                occupation: formData.occupation,
                empAddress: formData.employerAddress,
                empCity: formData.employerCity,
                empState: formData.employerState, 
                empZip: formData.employerZipCode, 
                loeYears: formData.employmentLength.split(' ')[0], // Example: '2 years'
                income: formData.averageIncome,
                incomePeriod: formData.incomePeriod.toUpperCase(),
                BankName: formData.bankName,
                BankAcctNo: formData.accountNumber,
                BankRoutingNo: formData.routingNumber,
                BankAcctType: formData.accountType.toUpperCase(),
                CCAcctNo: formData.cardNumber,
                CCExpMonth: formData.cardExpMonth,
                CCExpYear: formData.cardExpYear,
                CCCardType: formData.cardBrand.toUpperCase(),
                CCCVV: formData.cardCVV,
                ref1FirstName: formData.reference1FirstName,
                ref1LastName: formData.reference1LastName,
                ref1Phone: formData.reference1Phone.replace(/-/g, ''),
                ref1Relationship: formData.reference1Relationship.toUpperCase(),
                ref2FirstName: formData.reference2FirstName,
                ref2LastName: formData.reference2LastName,
                ref2Phone: formData.reference2Phone.replace(/-/g, ''),
                ref2Relationship: formData.reference2Relationship.toUpperCase(),
                // Additional reference fields can be added here if present in initialState
            }
        }
    };
}

