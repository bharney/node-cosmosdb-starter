import { start } from './server'
import express from "express";
import keyVault from 'azure-keyvault'
import msRestAzure from 'ms-rest-azure';
import { config } from "dotenv"

config()
// msRestAzure.loginWithAppServiceMSI({ msiEndpoint: process.env.vaultUri, msiSecret: process.env.clientSecret })
msRestAzure.loginWithServicePrincipalSecret(process.env.clientId, process.env.clientSecret, process.env.tenantId)
    .then((credentials) => {
        let kvClient = new keyVault.KeyVaultClient(credentials);
        const connectionString = kvClient.getSecret(process.env.vaultUri, "ConnectionString", "")
            .then((bundle) => {
                console.log("Successfully retrieved 'test-secret'");
                console.log(bundle);
            })
            .catch((err) => {
                console.log(err);
            });
        start(connectionString)
    })
    .catch(error => {
        console.log(error);
    });

const app = express()

app.get('/', async (req, res) => {
    res.send("Hello World!");
});


// Start the server, listen at port 3000 (-> http://127.0.0.1:3000/)
// Also print a short info message to the console (visible in
// the terminal window where you started the node server).
app.listen(3001, () => console.log('Node.js listening on port 3001!'))
