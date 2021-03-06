const express = require('express'); //usamos express
const routerApi = require('./routes'); //usamos express
const passport = require('passport');
const cors = require('cors'); //usamo cors
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middleware/errorHandler');
const { checkApiKey } = require('./middleware/authHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require('./utils/auth');

//proteger con cors
/* const whitelist = ['http://localhost:8080/','http://127.0.0.1.5500/'] // son los mismos (si pego los links platzi me impide comentar)
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) !== 1) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  }
}

app.use(cors(options));
 */
app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola soy una nueva ruta');
});

app.get('/home', (req, res) => {
  res.send('Aquí encontrarás nuestra página principal');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
});
