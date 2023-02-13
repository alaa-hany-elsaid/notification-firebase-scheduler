const path = require('path');
const storage = path.join(__dirname, '../database/db.sqlite');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage
    },
    test: {
        dialect: 'sqlite',
        storage: storage
    },
    production: {
        dialect: 'sqlite',
        storage: storage
    }
};