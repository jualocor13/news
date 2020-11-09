config = {
    'apiVersion': 1,
    'server': {
        'port': process.env.PM2_NODE_PORT ? process.env.PM2_NODE_PORT : 3000,
        'host': process.env.PM2_NODE_HOST ? process.env.PM2_NODE_HOST : "127.0.0.1"
    },
    'web': {
        'domain': process.env.PM2_WEB_DOMAIN ? process.env.PM2_WEB_DOMAIN : "127.0.0.1",
        'port': process.env.PM2_WEB_PORT ? process.env.PM2_WEB_PORT : "80",
        'secure': process.env.PM2_WEB_SECURE === "1"
    },
    'admin': {
        'admin': 'admin',
        'password': 'SWA.2019'
    },
    'auth': {
        'config': {
            local: {
                nickNameField: 'name',
                passwordField: 'password'
            },
            jwt: {
                'jwtSecret': 'SWA.2019'
            }
        },
        'baseToken': 'MFShdfcWpySzgG5z5Pw20bFjKhi6YHix+NJ0pRyH6e6fTU3DN1Cq1cm3II7Uwcis' +
            'PCOtVu/NMwloahTjFrbt3UwsDE8c6ytB3eBXH5DWfC15S19sEjzvTj9sJRBIzd9D' +
            'D3BWIz4Ul/z2e6M8foIpe2R+qzcFIARhOqIgskIFUXN/JmNZ/wsBpdqATLv3qjHE' +
            'EcQHUFSA43s9+C60eEGsr7K0H4kyxnNNFq4VOoAZoQ2u3ZALM5l6aEWy6uzSerSR' +
            'VeKxiKdyG3jlUJaV8qdmiQZYNYREU9sQ2pGHr7912OIbTVQCBes/njWN3BDhzRMf' +
            'LPZWSamnKgyZt4J1Z2dP8w==',
        'frontToken': '/dQkIpKUbxww8uPbjdJf5Ar4NFArfZjK6viY2M1n4T55lOE5qLvdT0VUHpbM1J2v' +
            'bQqTXdXZ9sosmHunnPhjNbAsn/g29m67vgpu80rM7BA3hNTVYtvVUG+XHgjeIPVV' +
            'PWVNI24bchsRl036ZG5wiibmLZj43ToREQfjZlz/epwj/FiaVvzYKOCGch6TLJM5' +
            'z12e02rRR203Q+TA1TXeH33wbi5z6IFCo9ysYvfqMGXa7YhgTOC5+16TlOTNB/p7' +
            'nG1aOvRt0fpiPqDIsRkBIfDjeA8zjB8owOjfAO5HAcwESCJtq9RlQKmgSfiS7Rld' +
            '5DPfm0UwWRjKlLPQsswhYg==',
        'tokenExpireTime': 24 * 365,
        'bearer': false,
        'jwt': true,
        'local': true,
        'third-party': false
    },
    'db': {
        user: encodeURIComponent('Jualo'),
        pass: encodeURIComponent('1234'),
        host: 'localhost',
        port: 27017,
        database: 'newsDB',
        options: {
            keepAlive: 30000,
            connectTimeoutMS: 60000,
            socketTimeoutMS: 300000,
            useCreateIndex: true,
            useNewUrlParser: true
        },
        debug: false
    },
    'cache': {
        expireTime: 60 * 60 * 24,
        enabled: false,
        save_statistics: true
    },
    'i18n': {
        locales: ['en', 'es'],
        defaultLocale: "es",
        directory: 'api/common/locales'
    },
    'kue': {
        "cleanupMinutes": 60
    },
    log: {
        'type': 'console',
        'loglevel': 'info',
        'logToDB': false,
        'logDBCollection': 'logs'
    },
    directoryProd: '/Users/jualo/Documents/versionFiles',
    directoryTest: './test/common/versionFiles',
    'testing': process.env.TESTING || false
};

module.exports = config;
