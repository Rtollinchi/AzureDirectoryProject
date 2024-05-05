const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const { getToken } = require("./auth");

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

module.exports = { getUsers };
