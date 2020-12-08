const request=require('request')

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFqYWt1bTIwIiwiYSI6ImNraDIzeHV3bTBlN3IzM25hNmg1aHgyemUifQ.7is3lz878b6h3uK_iX1vEw'
    request({url:url,json:true},(error,response)=>{
        if(error){
                callback('Unable to connect to location services',undefined)
        }else if(response.body.features.length===0){
                callback('Unable to find location. Try Another Search',undefined)
        }else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude  : response.body.features[0].center[1],
                location  : response.body.features[0].place_name

            })
            
        }
    })
}

module.exports=geocode