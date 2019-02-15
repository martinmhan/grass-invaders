const http = require('http');
const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => { console.log('Listening on PORT: ', PORT); });
server.on('error', (err) => { console.error(err); });
