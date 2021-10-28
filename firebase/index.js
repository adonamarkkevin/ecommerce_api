let admin = require("firebase-admin");

let serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
