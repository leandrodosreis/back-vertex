const express = require('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controllerPizza = require('../controller/pizza/controller_pizza.js')


router.post('/', bodyparserJSON, async function(request, response){

    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerPizza.inserirNovaPizza(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.get('/', bodyparserJSON, async function(request, response){

    let result = await controllerPizza.listarPizza()
    
    response.status(result.status_code)
    response.json(result)

})
