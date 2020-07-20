const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { getGeocode, getWeather } = require('./utils/utils')
// const { send } = require('process')
const mongoose = require('mongoose')
const mongodbUrl = require('./config')
const dailyModel = require('./models/dailyModel')

const app = express()

//  Define paths for Express config  
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

// Setup handlebars engine, views location and partials 
app.set('view engine', 'hbs')
app.set('views', viewsPath)  
hbs.registerPartials(partialsPath)

// Setup static directory to serve  
app.use(express.static(publicDirPath))
app.use(express.json())


// Database Connection
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(
    () => {
        console.log('MongoDB connection established...')
    }
)
.catch(e => console.log(e.reason))


// Sideline Routes
app.get('/api/covid/daily', async(req, res) => {
    const daily = await dailyModel.find({})
    res.send(daily)
})
app.post('/api/covid/daily', async(req, res) => {
    
    const newDaily = new dailyModel({
        totalConfirmed: req.body.confirmed,
        totalDeath: req.body.death,
        totalRecovered: req.body.recovered,
        reportDate: req.body.reportDate,
        newConfirmed: req.body.newConfirmed,
        newDeath: req.body.newDeath,
        newRecovered: req.body.newRecovered
    })
    await newDaily.save()
    res.send({message: "uploaded"})
})

// App Routes
app.get('/', (req, res) => {
   /*    const exterraGeoData = {
       lat: 10.434952,
       place_name: 'Exterra Trail',
        long: 123.966682
    }  */
     res.render('index', {
         title: 'paiTERRA Weather',
         name: 'Darrell Ponce'
     }) 
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the creator',
        name: 'Darrell Ponce'
    })
}) 
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Area',
        message: "This is the help page, you can contact me anytime"
    })
})
app.get('/weather', (req, res) => {
    const exterraGeoData = {
        lat: 10.434952,
        place_name: 'Exterra Trail',
        long: 123.966682
    }  
    // If no querry provided
    if(!req.query.address) {
        return getWeather(exterraGeoData, (error, data) => {
            if(error) return res.send({error})

            res.render('index', {...data, title: 'PaiTerra Weather'})
        })
    }
    // Add default value for data, for cases of invalid queries
    getGeocode(req.query.address, (error, data = exterraGeoData)=>{
        if(error) return res.send({error})

        getWeather(data, (error, data) => {
            if(error) return res.send({error})

            //res.render('index', {...data, title: 'PaiTerra Weather'})
            res.send(data)
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'oh snap! 404',
        name: 'Van Darrell Ponce',
        message: 'Help article not found :('
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title:'oh snap! 404',
        name: 'Van Darrell Ponce',
        message: 'Page not found :('
    })
})

/* app.get('/about/*', (req, res) => {
    res.send('About article not found!')
})
app.get('/weather/*', (req, res) => {
    res.send('Weather article not found!')
}) */

const port = process.env.PORT || 5000;

// Start server service
app.listen(port, ()=> {
    console.log('Server is Up. Listening on localhost port ' + port)
})