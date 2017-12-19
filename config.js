<<<<<<< HEAD
.require('dotenv').config()
=======
require('dotenv').config()
>>>>>>> 078250b52aab1e1c475704994181e7e10a18f73b

const env = process.env.NODE_ENV;

var config = {
    db: {
        type: 'mongodb',
        host: 'ds161016.mlab.com:61016',
        dbname: 'om_lieberlerts',
        username: process.env.DB_USER,
        password: process.env.DB_PWD
    },
    auth: {
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    },
    tba: {
        api_url: 'https://www.thebluealliance.com/api/v3',
        api_key: process.env.TBA_API_KEY
    }
};

// override production settings
if (env == 'production') {
    config.auth.google.callbackURL = "http://lieberlerts.herokuapp.com/auth/google/callback"
}

// export
<<<<<<< HEAD
module.exports = config;
=======
module.exports = config;
>>>>>>> 078250b52aab1e1c475704994181e7e10a18f73b
