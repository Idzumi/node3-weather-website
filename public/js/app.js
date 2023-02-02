// console.log('Client side javascript file is loaded!')

// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1IjoiaWR6dW1pIiwiYSI6ImNsY3hmdDc0bDFoMXkzd3F0NnJ1Nm56Y2wifQ.OVDimZ5rHbwmJp3pNlK59A&limit=1'

// fetch(url).then((response) => {

//     response.json().then((data) => {
//         if (data.features.length === 0) {
//             return console.log('You must provide valid location')
//         }
//         console.log(data.features[0])
//         console.log(data.features[0].place_name)
//         const latitude = data.features[0].center[0]
//         const longitude = data.features[0].center[1]
//         const forecastUrl = 'http://api.weatherstack.com/current?access_key=2cec9185c6880b699db0339cfc13b720&query=' + latitude + ',' + longitude

//         fetch(forecastUrl).then((forecastResponse) =>{
//             forecastResponse.json().then((forecastData) => {
// console.log(forecastData)
//             })
//         })
//         // const forecast = (latitude, longitude, callback) => {


//         //     request({ url, json: true }, (error, { body }) => {

//         //         if (error) {
//         //             callback('Unable to connect to weather service', undefined)
//         //         } else if (body.error) {
//         //             console.log(body)
//         //             callback(body.error.info, undefined)
//         //         } else {
//         //             callback(undefined, body.current.weather_descriptions[0] + "\nIt is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees.")
//         //         }
//         //     })
//         // }

//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = '123'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {

        response.json().then(({ error, location, forecast }) => {
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })

    })

})