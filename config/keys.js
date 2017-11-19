if(process.env.NODE_ENV === 'production')
    exports = module.exports = require('./prod');
else
    exports = module.exports = require('./dev');