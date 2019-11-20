const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//ODREĐIVANJE STAZA ZA express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//POSTAVKE handlebars i view LOKACIJA
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//POSTAVKE STATIČNOG DIREKTORIJUMA ZA POSLUŽIVANJE
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ognjen Bunijevac'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'O meni',
        name: 'Ognjen Bunijevac'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pomocTekst: 'Ovo je tekst pomoći.',
        title: 'Pomoć',
        name: 'Ognjen Bunijevac'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Morate unijeti termin za pretragu.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:['Half-Life 2', 'Civilization 2']
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Ognjen Bunijevac',
        errorMessage:'Članak nije pronađen.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Ognjen Bunijevac',
        errorMessage:'Stranica nije pronađena.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})