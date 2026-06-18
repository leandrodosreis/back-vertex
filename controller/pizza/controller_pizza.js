/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da pizza
 * Data: 20/06/2026
 * Autor: Enzzo (Ajustado para Upload de Imagens)
 * Versão: 1.1
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const pizzaDAO = require('../../model/DAO/pizza/pizza.js')

const controllerPizzaTipo = require('./controller_pizza_tipo.js')


const inserirNovaPizza = async function (pizza, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        const contentTypeUpper = String(contentType).toUpperCase();
        if (contentTypeUpper.includes('APPLICATION/JSON') || contentTypeUpper.includes('MULTIPART/FORM-DATA')) {
            
            let validar = await validarDados(pizza)
            if (validar) {
                return validar
            } else {
                let result = await pizzaDAO.insert_pizza(await tratarDados(pizza))
                if (result) {
                    pizza.id = result

                    // Garante que o array de tipos existe antes de rodar o loop (evita quebras se vier como string do form-data)
                    if (pizza.tipo) {
                        // Se o Postman enviar o array como texto, fazemos o parse dele
                        let listaTipos = typeof pizza.tipo === 'string' ? JSON.parse(pizza.tipo) : pizza.tipo;

                        for (let itemTipo of listaTipos) {
                            let pizzaTipo = {
                                "id_pizza": pizza.id,
                                "id_tipo": itemTipo.id
                            }

                            let resultPizzaTipo = await controllerPizzaTipo.inserirNovaPizzaTipo(pizzaTipo)
                            
                            if (!resultPizzaTipo.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING  //201 com alerta de cadastro
                            }
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pizza

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error("Erro na Controller Inserir:", error);
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarPizza = async function (pizza, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        const contentTypeUpper = String(contentType).toUpperCase();
        if (contentTypeUpper.includes('APPLICATION/JSON') || contentTypeUpper.includes('MULTIPART/FORM-DATA')) {

            let resultBuscarPizza = await buscarPizza(id)
            if (resultBuscarPizza.status) {

                let validar = await validarDados(pizza)
                if (!validar) {

                    pizza.id = Number(id)

                    let result = await pizzaDAO.update_pizza(await tratarDados(pizza))

                    if (result) {
                        let resultDeleteTipo = await controllerPizzaTipo.excluirTipoIdPizza(pizza.id)

                        if (resultDeleteTipo.status && pizza.tipo) {
                            let listaTipos = typeof pizza.tipo === 'string' ? JSON.parse(pizza.tipo) : pizza.tipo;

                            for (let itemTipo of listaTipos) {
                                let pizzaTipo = {
                                    "id_pizza": pizza.id,
                                    "id_tipo": itemTipo.id
                                }

                                let resultPizzaTipo = await controllerPizzaTipo.inserirNovaPizzaTipo(pizzaTipo)

                                if (!resultPizzaTipo.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING  
                                }
                            }
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = pizza

                        return customMessage.DEFAULT_MESSAGE 

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL   
                    }
                } else {
                    return validar  
                }

            } else {
                return resultBuscarPizza 
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  
    }
}


const listarPizza = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await pizzaDAO.selectALL_pizza()

        if (result) {
            if (result.length > 0) {

                for (let pizza of result) {
                    let resultTipos = await controllerPizzaTipo.buscarTipoIdPizza(pizza.id)
                    if (resultTipos.status) {
                        pizza.tipo = resultTipos.response.pizza_tipo
                    }
                }
                
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                
                // Reinicia ou cria o objeto interno de resposta para não duplicar dados na memória do Node
                customMessage.DEFAULT_MESSAGE.response = {
                    count: result.length,
                    pizza: result
                }

                return customMessage.DEFAULT_MESSAGE
            } else {
                return customMessage.ERROR_NOT_FOUND
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarPizza = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST 

        } else {
            let result = await pizzaDAO.select_ByIdPizza(id)

            if (result) {
                if (result.length > 0) {

                    for (let pizza of result) {
                        let resultTipos = await controllerPizzaTipo.buscarTipoIdPizza(pizza.id)
                        if (resultTipos.status) {
                            pizza.tipo = resultTipos.response.pizza_tipo
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response = {
                        pizza: result
                    }

                    return customMessage.DEFAULT_MESSAGE 
                } else {
                    return customMessage.ERROR_NOT_FOUND 
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL 
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirPizza = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarPizza = await buscarPizza(id)

        if (resultBuscarPizza.status) {
            let result = await pizzaDAO.delete_pizza(id)
            if (result)
                return customMessage.SUCCESS_DELETED_ITEM 
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL 
        } else {
            return resultBuscarPizza
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const validarDados = async function (pizza) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (pizza.nome == undefined || pizza.nome == '' || pizza.nome == null || pizza.nome.length > 40) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pizza.descricao == undefined || pizza.descricao == '' || pizza.descricao == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pizza.imagem == undefined || pizza.imagem == '' || pizza.imagem == null || pizza.imagem.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[IMAGEM] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const tratarDados = async function (pizza) {
    pizza.nome = String(pizza.nome).replaceAll("'", "")
    pizza.descricao = String(pizza.descricao).replaceAll("'", "")
    pizza.imagem = String(pizza.imagem).replaceAll("'", "")

    return pizza
}

module.exports = {
    inserirNovaPizza,
    listarPizza,
    atualizarPizza,
    buscarPizza,
    excluirPizza
}