const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmlsYWRyaWdpcmkiLCJhIjoiY2p6c29qdzRoMGlkczNvcjF1NTJxN3E2OCJ9._FWDNRxs88A1GiMWSi2VeQ'
    request({ url , json: true }, (error , {body} = {}) => {
            if(error){
                callback('Unable to connect to GeoLocation Service!', undefined)
            }else if(body.features.length === 0){
                callback('Unable to find any Geo location. Try another search.', undefined)
            }else{
                callback( undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name

                })
            }
        })
}

module.exports = geocode