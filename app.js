const express   = require ('express')
const cors      = require ('cors')
const bodyparser = require('body-parser')


const bodyparserJSON = bodyparser.json()

const app = express()

const corsOptions = {
    origin:['*'],   
    methods: 'GET, POST, PUT, DELETE, OPTION',  
    allowedHeaders: ['Content-type', 'Authorization'] 
}

app.use(cors(corsOptions))










//porta da API
app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})