require("dotenv").config();
const { ConfidentialClientApplication } = require("@azure/msal-node");

const pca = new ConfidentialClientApplication({
    auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    }
});

async function getToken() {
    try {
        const authResult = await pca.acquireTokenByClientCredential({
            scopes: ["https://graph.microsoft.com/.default"]
        });
        return authResult.accessToken;
    } catch (error) {
        console.error("Access Token Error:", error.message);
        return null;
    }
}

module.exports = { pca, getToken };
