require("dotenv").config();
const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const { pca } = require("./server");

async function getToken() {
  try {
    const authResult = await pca.acquireTokenByClientCredential({
      scopes: ["https://graph.microsoft.com/.default"],
    });
    return authResult.accessToken;
  } catch (error) {
    console.log("Acess Token Error:", error.messaage);
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