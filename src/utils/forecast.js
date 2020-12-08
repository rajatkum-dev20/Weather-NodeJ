const request=require('request')
const forecast=(latitude,longitude,callback)=>{
        const url='http://api.weatherstack.com/current?access_key=6395ce86e72ca764ecd756da11a2443f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' degress. There is a ' + body.current.precip + '% chance of rain and' + ' humidity is '+ body.current.humidity + ' %.')
            }
        })
}
module.exports=forecast