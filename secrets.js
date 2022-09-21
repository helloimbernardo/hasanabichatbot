// for dev environment variables (.env file)
require('dotenv').config()

// for production environment variables (Google Cloud Secret Manager)
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');


/**
 * Returns the secret string from Google Cloud Secret Manager
 * @param {string} name The name of the secret.
 * @return {payload} The string value of the secret.
 */
async function accessSecretCloud(name) {
    const client = new SecretManagerServiceClient();
    const projectId = process.env.PROJECT_ID;
    const [version] = await client.accessSecretVersion({
        name: `projects/${projectId}/secrets/${name}/versions/1`,
    });
    // Extract the payload as a string.
    return version.payload.data.toString('utf8');
}

/**
 * Returns the secret string from the environment variable
 * @param {string} name The name of the secret.
 * @returns {string|google.cloud.secretmanager.v1.IAddSecretVersionRequest.payload}
 */
async function accessSecret(name) {
    if (process.env.NODE_ENV === 'production') {
        return accessSecretCloud(name);
    } else {
        return process.env[name];
    }
}

module.exports = accessSecret;