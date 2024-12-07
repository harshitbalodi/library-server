import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function generateSecret(length = 64) {
    return crypto.randomBytes(length).toString('hex');
}

function generateSecrets() {
    const secrets = {
        JWT_ACCESS_SECRET: generateSecret(32),
        JWT_REFRESH_SECRET: generateSecret(32),
        BCRYPT_PASSWORD_SALT: generateSecret(16)
    };

    const envContent = Object.entries(secrets)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, envContent);

    console.log('Secrets generated and saved to .env file:');
    Object.keys(secrets).forEach(key => console.log(`- ${key} generated`));
}

generateSecrets();