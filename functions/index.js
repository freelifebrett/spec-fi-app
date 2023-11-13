const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.submitFormData = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.info('request', request);

        if (request.method !== 'POST') {
            return response.status(405).send('Method Not Allowed');
        }

        const formData = request.body;
        console.info('formData', formData)
        // Process formData here, e.g., save to Firestore or perform other operations

        return response.status(200).send('Form data received');
    })

});
