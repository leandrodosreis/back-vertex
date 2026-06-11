
const configMessages = require('../modulo/configMessages.js')
const tipoDAO = require('../../model/DAO/tipo/tipo.js')

const inserirnovotipo = async function(tipo, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))
        try {
                if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                    let validar = await validardados(tipo)
                    if (validar){
                        return validar
                    }else{
                        
                        let resultado = await tipoDAO.insertTipo( await tratardados(tipo))
                        console.log(resultado)
                        if(resultado){
                            
                            
                            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                            customMessage.DEFAULT_MESSAGE.response = tipo
        
                            return customMessage.DEFAULT_MESSAGE
                        }else{
                            return customMessage.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }
                }else{
                    return customMessage.ERROR_CONTENT_TYPE
                }
            } catch (error) {
                console.log(error)
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
            }
}
const listartipo = async function() {

    let customMessage = JSON.parse(JSON.stringify(configMessages))
        try {
                let result = await tipoDAO.selectALLTipo()   
                if (result) {
                    if (result.length>0) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                        customMessage.DEFAULT_MESSAGE.response.count = result.length
                        customMessage.DEFAULT_MESSAGE.response.tipo = result
                        
                        return customMessage.DEFAULT_MESSAGE
                    }else{
                        return customMessage.ERROR_NOT_FOUND
                    }
                }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } catch (error) {
                console.log(error)
            return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 controll
            }
}
const buscartipo = async function(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id <= 0){
            customMessage.ERROR_BAD_REQUEST = '[ID] inválido'
            return customMessage
        }else{
            let result = await tipoDAO.deletTipo(id)

            if(result){

                if(result.length>0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.tipo = result

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_NOT_FOUND
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validardados = async function(tipo) {

   let customMessage = JSON.parse(JSON.stringify(configMessages))

        if(tipo.nome == undefined  || tipo.nome == null || tipo.nome == '' || tipo.nome.length > 40){
            customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST
        }
        else{
            return false 
        }
}
const tratardados = async function(tipo) {
    tipo.nome =    tipo.nome.replaceAll("'", "")

    return tipo
}

module.exports={
    inserirnovotipo,
    listartipo,
    buscartipo
}