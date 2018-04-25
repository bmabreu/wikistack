const express = require('express')
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const static = require('static');
const path = require('path');
const models = require('./models');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));

// models.User.sync()
// .then(function () {
//     console.log('User table created!');
//     return models.Page.sync();
// })
// .then(function () {
//     console.log('Page table created!');
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });
// })
// .catch(console.error.bind(console));



models.db.sync({force: true})
.then(function () {
    console.log('All tables created!');
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));



// let server = app.listen(3000, () => (console.log('listening on port 3000')));