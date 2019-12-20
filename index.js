const app = require('./app');
const port = process.env.PORT || 3001;
require('./database');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
