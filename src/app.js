const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { homedir } = require('os')

//console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and customize views location
app.set('view engine', 'hbs') // handlebars set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

hbs.registerHelper("active", function(context, options) {
    if (context === options) {
      return "active";
    }
  });

// Setup statis directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        page: 'home',
        name: 'Raul Gonzalez'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        page: 'about',
        name: 'Raul Gonzalez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Call Raul if any.',
        title: 'Help',
        page: 'help',
        name: 'Raul Gonzalez'
    })
})

// Send array of objects and it gets stringified
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

        forecast(latitude, longitude, (error, forecastData, corgi) => {
            if (error) {
               return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
                corgi
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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

