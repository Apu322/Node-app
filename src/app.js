const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// set directories
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set settings
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Alp Ertan',
        title: 'Help page'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'alp' 
    })
})


app.get('/weather*', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'no address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, placename } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, { location, temperature, observation } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                temperature,
                observation,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'article nf',
        name: 'Alp Ertan',
        title: 'Error'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'sex',
        name: 'Alp Ertan',
        title: 'Error'
    })
})


app.listen(3000, () => {
    console.log(chalk.bgGreen.black('SUCCESS') + '  SERVER HAS BEEN INITIALZIED')
})

app.get('/weather', (req, res) => {
    res.send('weather')
})