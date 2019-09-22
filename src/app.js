const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Niladri Giri'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Niladri Giri'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Niladri Giri'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location } = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/weatherbygeocode',(req, res) => {
    if(!req.query.latitude || !req.query.longitude){
        return res.send({
            error: 'Unable to fetch your current location!'
        })
    }

    forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
        if(error){
            return res.send({ error })
        }

        return res.send({
            forecast: forecastData,
            address: req.query.address
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMsg: 'Help article not found',
        title: '404',
        name: 'Niladri Giri'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMsg: 'Page not found',
        title: '404',
        name: 'Niladri Giri'
        
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port '+ port)
})