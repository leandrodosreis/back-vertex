const express   = require ('express')
const cors      = require ('cors')
const bodyparser = require('body-parser')


const bodyParserJSON = bodyparser.json()

const app = express()

const corsOptions = {
    origin:['*'],   
    methods: 'GET, POST, PUT, DELETE, OPTION',  
    allowedHeaders: ['Content-type', 'Authorization'] 
}



app.use(cors(corsOptions))
app.use('/uploads', express.static('uploads'))

//tipo
const tiporouter = require('./routes/tipo.router.js')
app.use('/v1/senai/pizzaria/pizza/tipo', cors(), tiporouter)

//pizza
const pizzarouter = require('./routes/pizza.router.js')
app.use('/v1/senai/pizzaria/pizza', cors(), pizzarouter)

//administrador
const administradorrouter = require('./routes/administrador.router.js')
app.use('/v1/senai/pizzaria/administrador', cors(),administradorrouter)

//porta da API
app.listen(8080, function(){
    console.log('API aguardadndo novas requisições ...')
})

