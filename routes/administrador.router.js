const express = require('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controlleradministrador = require('../controller/administrador/controller.administrador.js')

router.post('/', bodyparserJSON, async function(request, response){

    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controlleradministrador.inserirNovoAdministrador(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})
router.get('/', bodyparserJSON, async function(request, response){

    let result = await controlleradministrador.listarAdministrador()
    
    response.status(result.status_code)
    response.json(result)

})
router.get('/:id', bodyparserJSON, async function(request, response){
    let id = request.params.id
    let result = await controlleradministrador.buscarAdministrador(id)
    
    response.status(result.status_code)
    response.json(result)

})
router.put('/:id', bodyparserJSON, async function(request, response){
    let id = request.params.id
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlleradministrador.atualizarAdministrador(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})
router.delete('/:id', bodyparserJSON, async function(request, response){
    let id = request.params.id
    let result = await controlleradministrador.excluirAdministrador(id)
    
    response.status(result.status_code)
    response.json(result)

})


module.exports = router