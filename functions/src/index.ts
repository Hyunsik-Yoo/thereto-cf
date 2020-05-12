import * as functions from 'firebase-functions';

import admin = require('firebase-admin');

import * as Modal from './modal';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    
    const snapshot = await admin.database().ref("/messages").push({original: original});

    res.redirect(303, snapshot.ref.toString());
});

exports.signUp = functions.https.onRequest(async (request, response) => {
    if (request.method === "POST") {
        let user = new Modal.User(request.body);
        console.log(user.toString())
        let userJson = JSON.parse(JSON.stringify(user));
        let document = admin.firestore().doc(`user/${user.id}`)
        let responseContainer = new Modal.ResponseContainer<Modal.User>(user, "");

        if ((await document.get()).exists) {
            // 동일한 아이디가 이미 존재하면 에러 반환
            responseContainer.error = "동일한 아이디가 존재합니다."
            response.status(200).json (JSON.parse(JSON.stringify(responseContainer)));
        } else { 
            // 동일한 아이디가 없으면 추가
            await document.set(userJson).then(result => {
                response.status(200).json(JSON.parse(JSON.stringify(responseContainer)));
            });
        }
    }
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onCreate((snapshot, context) => {
    const original = snapshot.val();

    console.log("Uppercasing", context.params.pushId, original);
    const uppercase = original.toUpperCase();

    return snapshot.ref.parent?.child('uppercase').set(uppercase);
});