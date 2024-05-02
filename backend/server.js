const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json()); //Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Welcome to the Azure Directory!");
});

//MSAL configuration
const msal = require("@azure/msal-node");

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET, // required for confidental clients.
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Info,
    },
  },
};

const pca = new msal.ConfidentialClientApplication(msalConfig);

// Route to redirect users to the login page
app.get("/signin", (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"], // scopes application requires
    redirectUri: "http://localhost:3000/redirect",
  };

  pca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((authUrl) => {
      console.log("Redirecting to:", authUrl); // Log the URL to which you are redirecting
      res.redirect(authUrl); // This line does the redirection
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error building auth URL");
    });
});

// Route to handle the redirect from Microsoft's login page
app.get("/redirect", (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: "http://localhost:3000/redirect",
  };

  pca
    .acquireTokenByCode(tokenRequest)
    .then((response) => {
      console.log("Access Token:", response.accessToken);
      res.send("Authentication successful!"); // Or redirect to another page
    })
    .catch((error) => {
      console.error("Error acquiring token:", error);
      res.status(500).send("Authentication failed");
    });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = { pca };
