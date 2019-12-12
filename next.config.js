require('dotenv').config();

// in production we set the variables in google cloud run
const envVariables =
    process.env.NODE_ENV === 'production'
        ? {}
        : {
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_USER: process.env.DB_USER,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_HOST: process.env.DB_HOST
        };

module.exports = {
    env: envVariables
};
