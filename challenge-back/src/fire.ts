import * as admin from 'firebase-admin';
// tslint:disable-next-line: no-var-requires
const serviceAccount = require('./serviceAccountKey.json');

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

export default app;
