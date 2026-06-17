const express   = require ('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controllerPizza = require('../controller/pizza/controller_pizza.js')
const verifyJWT = require('../middleware/middlewareJWT.js')

router.post('/', verifyJWT, bodyparserJSON, async function(request, response){

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
router.get('/:id', bodyparserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerPizza.buscarPizza(id)
    
    response.status(result.status_code)
    response.json(result)

})
router.put('/:id', verifyJWT, bodyparserJSON, async function(request, response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerPizza.atualizarPizza(dados, contentType, id)
    
    response.status(result.status_code)
    response.json(result)
})
router.delete('/:id', verifyJWT, bodyparserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerPizza.excluirPizza(id)
    
    response.status(result.status_code)
    response.json(result)

})


module.exports = router