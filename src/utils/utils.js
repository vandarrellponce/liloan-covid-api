const request = require('request')
const axios = require('axios')


const getGeocode = (address, geoCallback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hyZWRoZWFkMjEiLCJhIjoiY2tjZmxyZnZyMGhxMzJwcDZiMThsdTRmbSJ9.nkPCY4JFkwtuET-JO54Gug`
    request({url, json:true}, (error, response) => {

        if(error) return geoCallback(error)
        else if(!response.body.features)return geoCallback({error: 'Please specify a valid query'})

        const feature = response.body.features[0] 

        // If able to get response from geo api
        if (feature) {
            const place_name = feature.place_name 
            const long = feature.center[0] 
            const lat = feature.center[1] 
            const geoData = {place_name, lat, long}
            return geoCallback(undefined, geoData)
        }
        // If no response from geo api, set error and data to undefined 
        // and let the caller of function provide default value of data
        geoCallback(undefined, undefined)
        
    })
}
const getWeather = (geoData, weatherCallback) => {
     
    if(!geoData) return 
    const {lat, long} = geoData
    const url = `http://api.weatherstack.com/current?access_key=c88aa39b1209c0356ebc119f4c386865&query=${lat},${long}`
    request({url, json:true}, (error, response) => {
        if (error) weatherCallback(error)
        const {current} = response.body
        userData = {
            geoData,
            weatherData: current
        }
        weatherCallback(undefined, userData)
    })
}

getGeocodeURL = (query) => { 
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoic2hyZWRoZWFkMjEiLCJhIjoiY2tjZmxyZnZyMGhxMzJwcDZiMThsdTRmbSJ9.nkPCY4JFkwtuET-JO54Gug`
}

getWeatherstackURL = (lat, long) => {
    return `http://api.weatherstack.com/current?access_key=c88aa39b1209c0356ebc119f4c386865&query=${lat},${long}`
}
module.exports = ({
    getGeocode,
    getWeather,
    getGeocodeURL,
    getWeatherstackURL
})

