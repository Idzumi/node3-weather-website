const request = require('request')
const saveRequest = require('./saveRequest')


// const url = 'http://api.weatherstack.com/current?access_key=2cec9185c6880b699db0339cfc13b720&query=latitude,longitude&units=f'

// // 2 parameters: url where to call and the function which will be run after the response received
// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log(response.body.error.info)
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + "\nIt is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees.")
//     }
// })

const forecast = (latitude, longitude, address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2cec9185c6880b699db0339cfc13b720&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            console.log(body)
            let corgi = 'default'
            if(body.current.temperature <= 0 || body.current.feelslike <= 0) {
                corgi = 'snow'
            } else if (body.current.wind_speed >= 20) {
                corgi = 'wind'
            }
            const dataToSave = {
                address,
                location: body.location.name,
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                wind_speed: body.current.wind_speed,
                weather_description: body.current.weather_descriptions[0],
                latitude,
                longitude,
                corgi
            }

            saveRequest(dataToSave)

            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees." + " The wind speed is " + body.current.wind_speed + ". Cloudcover is " + body.current.cloudcover + ".", corgi)
           
        }
    })
}

module.exports = forecast