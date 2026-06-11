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

const controllerPizza = require('./controller/pizza/controller_pizza')

app.post('/v1/senai/pizzaria/pizza', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPizza.inserirNovaPizza(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


app.get('/v1/senai/pizzaria/pizza', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPizza.listarPizza()
    
    response.status(result.status_code)
    response.json(result)

})


//porta da API
app.listen(7070, function(){
    console.log('API aguardadndo novas requisições ...')
})

