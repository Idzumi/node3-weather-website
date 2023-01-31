const request = require('request')

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

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2cec9185c6880b699db0339cfc13b720&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            console.log(body)
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + "\nIt is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast