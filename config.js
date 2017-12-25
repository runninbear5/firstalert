require('dotenv').config()

const env = process.env.NODE_ENV;
var config = {
    db: {
        type: 'mongodb',
        host: 'ds121456.mlab.com:21456',
        dbname: 'lieberlerts',
        username: process.env.DB_USER,
        password: process.env.DB_PWD
    },
    auth: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        }
    },
    tba: {
        api_url: 'https://www.thebluealliance.com/api/v3',
        api_key: process.env.TBA_API_KEY
    },
    email: {
        email_address: process.env.NOTI_EMAIL,
        email_password: process.env.NOTI_PASS
    }
};

// override production settings
if (env == 'production') {
    config.auth.google.callbackURL = "https://lieberlerts.herokuapp.com/auth/google/callback"
}

// export
module.exports = config;
