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

exports.sendLetterNotification = functions.firestore.document("letter/{letterId}").onCreate(async (snap, context) => {
    const letter = snap.data();

    if (letter) {
        const toUserId: string = letter.to.id;
        const fromName: string = letter.from.nickname;
        const userDocument = admin.firestore().collection("user").doc(toUserId);

        await userDocument.get().then(async doc => {
            const data = doc.data()
            if (data) {
                const fcmToken = data.fcmToken;
                if (fcmToken) { // FCM토큰이 존재할 경우에만 푸시 발송
                    const payload = {
                        notification: {
                          title: `"${fromName}"님으로부터 편지가 도착했습니다.`,
                          body: `수신함을 확인해주세요.`
                        }
                    };
                    console.log("Fcm token: ",fcmToken);

                    const response = await admin.messaging().sendToDevice(fcmToken, payload);
                    response.results.forEach((result, index) => {
                        const error = result.error;
                        if (error) {
                          console.error('Failure sending notification to', error);
                        }
                      });
                }
            }
            console.log("To user id: ",toUserId);
            console.log("From name: ", fromName);
        });
    }
});