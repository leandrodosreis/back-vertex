/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da pizza
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const pizzaDAO = require('../../model/DAO/pizza/pizza.js')


const inserirNovaPizza = async function (pizza, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(pizza)
            if(validar){
                return validar
            }else{
                let result =  await pizzaDAO.insert_pizza(await tratarDados(pizza))
                if(result){
                    pizza.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pizza

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
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


let customMessage = JSON.parse(JSON.stringify(configMessages))

const validarDados = async function (pizza) {
if(pizza.nome == undefined || pizza.nome == '' || pizza.nome == null ||  pizza.nome.length > 40){
    customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    return customMessage.ERROR_BAD_REQUEST
}else if(pizza.descricao == undefined || pizza.descricao == '' || pizza.descricao == null ){
    customMessage.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
    return customMessage.ERROR_BAD_REQUEST
}else if(pizza.imagem == undefined || pizza.imagem == '' || pizza.imagem == null ||  pizza.imagem.length > 255){
    customMessage.ERROR_BAD_REQUEST.field = '[IMAGEM] INVÁLIDA'
    return customMessage.ERROR_BAD_REQUEST
}else{
    return false
}
}



const tratarDados = async function(pizza){
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    pizza.nome               = pizza.nome.replaceAll("'", "")
    pizza.descricao          = pizza.descricao.replaceAll("'", "")
    pizza.imagem             = pizza.imagem.replaceAll("'", "")

    return pizza
}

module.exports = {
inserirNovaPizza
}