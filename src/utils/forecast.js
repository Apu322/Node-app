const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e4f03f045ce7ce8424b7e4419fbc433&query=' + longitude + ',' + latitude
    request({ url: url, json: true }, (error, { body }) => {

        if (error) {
            callback('cant connect to internet', undefined)
        } else if (body.error) {
            aa
            callback("anani", undefined)
        } else {
            callback(undefined, {
                location: body.location.name,
                temperature: body.current.temperature,
                observation: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast