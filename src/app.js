const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)

const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and customize views location
app.set('view engine', 'hbs') // handlebars set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statis directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raul Gonzalez'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Raul Gonzalez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Call Raul if any.',
        title: 'Help',
        name: 'Raul Gonzalez'
    })
})

//Send array of objects and it gets stringified
app.get('/array', (req, res) => {
    res.send([{
        name: 'Raul Gonzalez',
        age: 7
    },
    {
        name: 'Maria',
        age: 37
    }])
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     location: req.query.address,
    //     forecast: 'It is 15 degrees above zero.',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errormessage: 'Help article not found.',
        title: 'Error page',
        name: 'Raul Gonzalez'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errormessage: 'Page not found',
        title: '404',
        name: 'Raul Gonzalez'
    })
    res.statusCode = 404
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

