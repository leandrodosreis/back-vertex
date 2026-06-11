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
const controllerTipo = require('./controller/tipo/controller_tipo.js')

//pizza
app.post('/v1/senai/pizzaria/pizza', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPizza.inserirNovaPizza(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

app.get('/v1/senai/pizzaria/pizza', bodyParserJSON, async function(request, response){

    let result = await controllerPizza.listarPizza()
    
    response.status(result.status_code)
    response.json(result)

})





//tipo
app.post('/v1/senai/pizzaria/tipo', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerTipo.inserirnovotipo(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})
app.get('/v1/senai/pizzaria/tipo', bodyParserJSON, async function(request, response){

    let result = await controllerTipo.listartipo()
    
    response.status(result.status_code)
    response.json(result)

})
app.get('/v1/senai/pizzaria/tipo/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerTipo.buscartipo(id)
    
    response.status(result.status_code)
    response.json(result)

})
//porta da API
app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})

