const dotenv = require('dotenv');
const app = require('./app.js');

const PORT = process.env.PORT || 3000;
dotenv.config();

app.listen(PORT, (err) => {
  if (err) { console.error(err); } else {
    console.log('Listening on PORT: ', PORT);
  }
});
