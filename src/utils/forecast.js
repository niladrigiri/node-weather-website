const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
const url = 'https://api.darksky.net/forecast/56c074df6b818a2eb1c7acd125102f73/'+latitude+','+longitude+'?units=si'
request({ url, json: true }, (error , {body} = {}) => {

    if(error){
        callback('Unable to connect to weather service!', undefined)
    }else if(body.error){
        callback('Unable to find location.', undefined)
    }else{
        callback(undefined, 
            body.daily.data[0].summary +' It is currently '+ 
            body.currently.temperature + ' degrees out. The high today is '+ body.daily.data[0].temperatureHigh 
            + ' with a low of '+body.daily.data[0].temperatureLow  +' degrees. There is a '+ 
            body.currently.precipProbability + '% chance of precipitation.'
        )    
    }
  
})

}

module.exports = forecast
