const request = require('request')

//PROGNOZA SA darksky.com
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5313af9d9a77df2b8b8cdbbc6a434d38/' + latitude + ',' + longitude

    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Nije moguće uspostaviti vezu sa uslugom vremenske prognoze!', undefined)
        } else if (body.error) {
            callback('Nije moguće pronaći traženu lokaciju. Pokušajte sa novim unosom.', undefined)
        } else {
            callback(undefined, 'Trenutna temperatura je ' + body.currently.temperature + ' farenhajta. Vlažnost vazduha je ' + body.currently.humidity +'. ' + 'Šansa za kišu je: ' + body.currently.precipProbability + '%.')
        }
    })
}

module.exports = forecast



//PROGNOZA SA darksky.com (DESTRUKTURISANO I SKRAĆENO)

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/5313af9d9a77df2b8b8cdbbc6a434d38/' + latitude + ',' + longitude

//     request({url: url, json: true}, (error, response) => {
//         if(error) {
//             callback('Nije moguće uspostaviti vezu sa uslugom vremenske prognoze!', undefined)
//         } else if (response.body.error) {
//             callback('Nije moguće pronaći traženu lokaciju. Pokušajte sa novim unosom.', undefined)
//         } else {
//             callback(undefined, 'Trenutna temperatura je ' + response.body.currently.temperature + ' farenhajta. Šansa za kišu je: ' + response.body.currently.precipProbability + '%.')
//         }
//     })
// }

// module.exports = forecast