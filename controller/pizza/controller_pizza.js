/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD da pizza
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const pizzaDAO = require('../../model/DAO/pizza/pizza.js')

const controllerPizzaTipo = require('./controller_pizza_tipo.js')


const inserirNovaPizza = async function (pizza, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(pizza)
            if (validar) {
                return validar
            } else {
                let result = await pizzaDAO.insert_pizza(await tratarDados(pizza))
                if (result) {
                    pizza.id = result

                    for (itemTipo of pizza.tipo) {


                        let pizzaTipo = {
                            "id_pizza": pizza.id,
                            "id_tipo": itemTipo.id
                        }


                        let resultPizzaTipo = await controllerPizzaTipo.inserirNovaPizzaTipo(pizzaTipo)

                        //Validação para verificar se todos os itens de relacionamento foram inseridos
                        if (!resultPizzaTipo.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING  //201 com alerta de cadastro
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
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarPizza = async function (pizza, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarPizza = await buscarPizza(id)
            if (resultBuscarPizza.status) {

                //Chama a função para validar os dados no
                let validar = await validarDados(pizza)
                if (!validar) {

                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    pizza.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await pizzaDAO.update_pizza(await tratarDados(pizza))

                    if (result) {

                        //Excluir as relações entre o Filme e os Generos (Tabela de relação)
                        let resultDeleteTipo = await controllerPizzaTipo.excluirTipoIdPizza(pizza.id)

                        if (resultDeleteTipo.status) {

                            for (itemGenero of filme.genero) {


                                let pizzaTipo = {
                                    "id_pizza": pizza.id,
                                    "id_tipo": itemTipo.id
                                }


                                let resultPizzaTipo = await controllerPizzaTipo.inserirNovaPizzaTipo(pizzaTipo)

                                //Validação para verificar se todos os itens de relacionamento foram inseridos
                                if (!resultPizzaTipo.status) {
                                    return customMessage.SUCCESS_CREATED_ITEM_WARNING  //201 com alerta de cadastro
                                }

                            }
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = pizza

                        return customMessage.DEFAULT_MESSAGE //200 (atualizado)

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL  //500 (Model)   
                    }
                } else {
                    return validar  //400 de validação dos campos do banco de dados
                }

            } else {
                return resultBuscarFilme //400(ID inválido) ou 404(não encontrado) ou 500
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  //500(controller)
    }
}


const listarPizza = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await pizzaDAO.selectALL_pizza()

        if (result) {
            if (result.length > 0) {

                for (pizza of result) {

                    let resultTipos = await controllerPizzaTipo.buscarTipoIdPizza(pizza.id)

                    if (resultTipos.status) {

                        pizza.tipo = resultTipos.response.pizza_tipo

                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.pizza = result

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
            return customMessage.ERROR_BAD_REQUEST //400

        } else {

            let result = await pizzaDAO.select_ByIdPizza(id)

            if (result) {


                if (result.length > 0) {

                    for (pizza of result) {


                        let resultTipos = await controllerPizzaTipo.buscarTipoIdPizza(pizza.id)

                        if (resultTipos.status) {

                            pizza.tipo = resultTipos.response.pizza_tipo

                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.pizza = result

                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

const excluirPizza = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarPizza = await buscarPizza(id)

        //Validação
        if (resultBuscarPizza.status) {

            let result = await pizzaDAO.delete_pizza(id)

            if (result)
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 Model

        } else {
            return resultBuscarFilme
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 Controller
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
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    pizza.nome = pizza.nome.replaceAll("'", "")
    pizza.descricao = pizza.descricao.replaceAll("'", "")
    pizza.imagem = pizza.imagem.replaceAll("'", "")

    return pizza
}

module.exports = {
    inserirNovaPizza,
    listarPizza,
    atualizarPizza,
    buscarPizza,
    excluirPizza
}