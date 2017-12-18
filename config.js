var config = {
    db: {
        type: 'mongodb',
        host: 'ds161016.mlab.com:61016',
        dbname: 'om_lieberlerts',
        username: 'app_user',
        password: 'testing123'
    },
    auth: {
        google: {
            clientID: "826465670781-51ktnva0pfdd69h2v5thekp4qn8uv4us.apps.googleusercontent.com",
            clientSecret: "uwtOvjdRxVkq4cXWoU9pBbk8",
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    },
    tba: {
        api_url: 'https://www.thebluealliance.com/api/v3',
        api_key: 'J9XyDSN69eZMHqanEDaevzAywDjxL9iyBYAQh2erLJJ9MtZVG60HsEYeKVwloFGe'
    }
};

// export
module.exports = config;