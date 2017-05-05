const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res ,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res ,next) => {
//     res.render('maitenance.hbs', {
//         pageTitle: 'Under Cons'
//     });
//     next();
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: 'Milosti proshu k nashemu shalashu!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.get('/projects', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: 'Portfolio Page',
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Oops! Some problem here!'
    })
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});
