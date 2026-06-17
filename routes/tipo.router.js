const express   = require ('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controllerTipo  = require('../controller/tipo/controller_tipo.js')
const verifyJWT = require('../middleware/middlewareJWT.js')

router.post('/', verifyJWT, bodyparserJSON, async function(request, response){

    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerTipo.inserirnovotipo(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
    
})
router.get('/', bodyparserJSON, async function(request, response){

    let result = await controllerTipo.listartipo()

    response.status(result.status_code)
    response.json(result)

})

router.get('/:id', bodyparserJSON, async function(request, response){

    let id = request.params.id

    let result = await controllerTipo.buscartipo(id)

    response.status(result.status_code)
    response.json(result)

})
router.put('/:id', verifyJWT, bodyparserJSON, async function(request, response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerTipo.atualizartipo(dados, contentType, id)
    
    response.status(result.status_code)
    response.json(result)
})
router.delete('/:id', verifyJWT, bodyparserJSON, async function(request, response){
    let id = request.params.id
    let result = await controllerTipo.excluirtipo(id)
    
    response.status(result.status_code)
    response.json(result)

})


module.exports = router