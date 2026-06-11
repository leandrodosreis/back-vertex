/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados na relação de pizzza e tipo para realizar o CRUD de ambos
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const pizTipDAO = require('./../../model/DAO/pizza_tipo/pizza_tipo.js')


const inserirNovaPizzaTipo = async function (pizzaTipo) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validar = await validarDados(pizzaTipo)

        if (validar) {
            return validar
        } else {
            let result = await pizTipDAO.insert_PizzaTipo(pizzaTipo)
            if (result) {
                filmeGenero.id = result
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = pizzaTipo

                return customMessage.DEFAULT_MESSAGE //201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarPizzaTipo = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await pizTipDAO.selectALL_PizzaTipo()
        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pizza_tipo = result

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

const buscarPizzaTipo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await pizTipDAO.select_ByIdPizzaTipo(id)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarPizzasIdTipo = async function (idTipo) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (idTipo == undefined || String(idTipo).replaceAll(' ', '') == '' || idTipo == '' || idTipo == null || isNaN(idTipo) || idTipo <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID_TIPO] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await pizTipDAO.select_pizza_porID_tipo(idTipo)
            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pizza_tipo = result

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

const atualizarPizzaTipo = async function (pizzaTipo, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarID = await buscarPizzaTipo(id)
        if (resultBuscarID.status) {

            let validar = await validarDados(pizzaTipo)
            if (!validar) {
                pizzaTipo.id = id
                let result = await filmeGenDAO.updateGenero(pizzaTipo)
                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = pizzaTipo
                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validar
            }
        } else {
            return resultBuscarID
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const excluirPizzaTipo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarID = await buscarPizzaTipo(id)

        if (resultBuscarID.status) {
            let result = await pizTipDAO.delete_PizzaTipo(id)
            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBuscarID
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirTipoIdPizza = async function (idPizza) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        
            //Chamar a função do DAO para excluir o genero
            let result = await pizTipDAO.deleteTipoByIdPizza(idPizza)
            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const validarDados = async function (pizzaTipo) {
    if (pizzaTipo.id_pizza == undefined || pizzaTipo.id_pizza == '' || pizzaTipo.id_pizza == null || pizzaTipo.id_pizza <= 0 || isNaN(pizzaTipo.id_pizza)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_PIZZA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (pizzaTipo.id_tipo == undefined || pizzaTipo.id_tipo == '' || pizzaTipo.id_tipo == null || pizzaTipo.id_tipo <= 0 || isNaN(pizzaTipo.id_tipo)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_TIPO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovaPizzaTipo,
    listarPizzaTipo,
    buscarPizzaTipo,
    atualizarPizzaTipo,
    excluirPizzaTipo,
    buscarPizzaTipo,
    buscarPizzasIdTipo,
    excluirPizzaTipo,
    excluirTipoIdPizza
}
