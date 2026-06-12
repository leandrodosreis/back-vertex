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

const controllerPizza = require('./controller/pizza/controller_pizza.js')


//pizza
const pizzarouter = require('./routes/pizza.router.js')
app.use('/v1/senai/pizzaria/pizza', cors(), pizzarouter)


//tipo
const tiporouter = require('./routes/tipo.router.js')
app.use('/v1/senai/pizzaria/tipo', cors(), tiporouter)


//administrador
const administradorrouter = require('./routes/administrador.router.js')
app.use('/v1/senai/pizzaria/administrador')

//porta da API
app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})

