const express   = require ('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controllerTipo = require('../controller/tipo/controller_tipo.js')


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

module.exports = router