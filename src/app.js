const path=require('path')
const express=require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app=express()
const port=process.env.PORT || 3000
//const assestsDirectoryPath=path.join(__dirname,'../assests')
const partialsPath = path.join(__dirname,'../views/partials')
const publicDirectoryPath = path.join(__dirname)
console.log(publicDirectoryPath)
app.set('view engine','hbs')
//app.use(express.static(assestsDirectoryPath))
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:' The Weather App !',
        name : 'Rajat'
    })
}
)
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return res.send({error})
            }
            res.send(
                {
                    forecast:foreCastData,
                    location,
                    address:req.query.address

                }
            )
        })

    })
})

app.get('*',(req,res)=>{
    res.send('404 Page not Found')
})
app.listen(port,()=>{
    console.log('server is up and running on port'+port)
})