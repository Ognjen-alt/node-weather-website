const request = require('request')

//GEOGRAFSKA ŠIRINA I DUŽINA SA mapbox.com
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1Ijoiam9lMTExMSIsImEiOiJjazJjdjIxemYwOWszM29xYmhkN3ZyaXBjIn0.gYQE11Mqe9i4oH1cg5iKFA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Nije moguće uspostaviti vezu sa uslugom lociranja!', undefined)
        } else if (body.features.length === 0) {
            callback('Tražena lokacija nije dostupna. Pokušajte novu pretragu.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode



// //GEOGRAFSKA ŠIRINA I DUŽINA SA mapbox.com (SKRAĆENO I DESTRUKTURISANO)

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1Ijoiam9lMTExMSIsImEiOiJjazJjdjIxemYwOWszM29xYmhkN3ZyaXBjIn0.gYQE11Mqe9i4oH1cg5iKFA&limit=1'

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Nije moguće uspostaviti vezu sa uslugom lociranja!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Tražena lokacija nije dostupna. Pokušajte novu pretragu.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports = geocode