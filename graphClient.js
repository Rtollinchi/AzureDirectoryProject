require("dotenv").config();
const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const { AuthorizationCode } = require("simple-oauth2");

const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
  },
  auth: {
    tokenHost: "https://login.microsoftonline.com",
    tokenPath: `/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    authorizePath: `/${process.env.TENANT_ID}/oauth2/v2.0/authorize`,
  },
};

const oauth2Client = new AuthorizationCode(config);

async function getToken() {
  try {
    const accessToken = await oauth2Client.getToken({
      scope: "https://graph.microsoft.com/.default", // Modify scopes as needed
      grant_type: "client_credentials",
    });
    return accessToken.token.access_token;
  } catch (error) {
    console.error("Access Token Error:", error.message);
    return null;
  }
}

async function getUsers() {
  const accessToken = await getToken();
  if (accessToken) {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken); // Pass the token directly
      },
    });

    try {
      const result = await client.api("/users").get();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
}

getUsers();
