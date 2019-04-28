// figures out what set of credentials to return
const config = require('./config');


if (config.prod) {
    module.exports = {
        mongoURI: process.env.MONGODB,
        cookieKey: 'sdjlfkj3kj423kljk324jfpoi234sdf234234as'
    };
} else {
    module.exports = require('./dev');
}
