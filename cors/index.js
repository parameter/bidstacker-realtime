const cors = require('cors');

const corsOptions = {
    origin: 'https://bidstacker.vercel.app',
    optionsSuccessStatus: 200
}

module.exports = cors(corsOptions);