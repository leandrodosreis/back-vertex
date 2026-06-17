/***********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação de dados para realizar o CRUD de administrador
 * Data: 20/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 ***********************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const admDAO = require('../../model/DAO/administrador/administrador.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const inserirNovoAdministrador = async function (administrador, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(administrador)
            if (validar) {
                return validar
            } else {

                administrador.senha = await bcrypt.hash(
                    administrador.senha,
                    10
                )

                let result = await admDAO.insertAdministrador(await tratarDados(administrador))

                if (result) {
                    administrador.id = result
                    delete administrador.senha
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = administrador

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



const autenticarAdministrador = async function(
    administrador,
    contentType
){

    let customMessage =
        JSON.parse(JSON.stringify(configMessages))

    try{

        if(String(contentType).toUpperCase() !=
            'APPLICATION/JSON')
        {
            return customMessage.ERROR_CONTENT_TYPE
        }

        let result =
            await admDAO.selectAdministradorByNome(
                administrador.nome
            )
console.log(result)
        if(!result || result.length == 0){

            customMessage.ERROR_NOT_FOUND.field =
                '[ADMINISTRADOR]'

            return customMessage.ERROR_NOT_FOUND
        }

        const senhaValida =
            await bcrypt.compare(
                administrador.senha,
                result[0].senha
            )

        if(!senhaValida){

            customMessage.ERROR_UNAUTHORIZED = {
                status:false,
                status_code:401,
                message:'Usuário ou senha inválidos'
            }

            return customMessage.ERROR_UNAUTHORIZED
        }

        const token = jwt.sign(
            {
                id: result[0].id,
                nome: result[0].nome
            },
            process.env.JWT_SECRET ||
            'vertex_pizzaria',
            {
                expiresIn:'8h'
            }
        )

        return {
            status:true,
            status_code:200,
            token
        }

    }catch(error){

        console.log(error)

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}


const listarAdministrador = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let result = await admDAO.selectALLAdministrador()

        if (result) {
            if (result.length > 0) {

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.administrador = result

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

const buscarAdministrador = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == '' || id == null || isNaN(id) || id <= 0) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST //400

        } else {

            let result = await admDAO.selectByIdAdministrador(id)

            if (result) {


                if (result.length > 0) {

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.administrador = result

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


const atualizarAdministrador = async function (administrador, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarAdministrador = await buscarAdministrador(id)
            if (resultBuscarAdministrador.status) {

                //Chama a função para validar os dados no
                let validar = await validarDados(administrador)
                if (!validar) {

                    administrador.senha = await bcrypt.hash(
                            administrador.senha,
                            10
                        )
                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    administrador.id = Number(id)

                    //Chama a função para atualizar o filme no BD
                    let result = await admDAO.updateAdministrador(await tratarDados(administrador))

                    if (result) {

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATE_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATE_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATE_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = administrador

                        return customMessage.DEFAULT_MESSAGE //200 (atualizado)

                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL  //500 (Model)   
                    }
                } else {
                    return validar  //400 de validação dos campos do banco de dados
                }

            } else {
                return resultBuscarAdministrador //400(ID inválido) ou 404(não encontrado) ou 500
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER  //500(controller)
    }
}


const excluirAdministrador = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        let resultBuscarAdministrador = await buscarAdministrador(id)

        //Validação
        if (resultBuscarAdministrador.status) {

            let result = await admDAO.deleteAdministrador(id)

            if (result)
                return customMessage.SUCCESS_DELETED_ITEM //200 ou 204
            else
                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500 Model

        } else {
            return resultBuscarAdministrador
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 Controller
    }
}


const validarDados = async function (administrador) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (administrador.nome == undefined || administrador.nome == '' || administrador.nome == null || administrador.nome.length > 90) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (administrador.senha == undefined || administrador.senha == '' || administrador.senha == null || administrador.senha.length > 512) {
        customMessage.ERROR_BAD_REQUEST.field = '[SENHA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}



const tratarDados = async function (administrador) {
    //Tratamento para eliminar a chegada da aspas ('') como caracter inválido
    administrador.nome = administrador.nome.replaceAll("'", "")
    administrador.senha = administrador.senha.replaceAll("'", "")

    return administrador
}


module.exports = {
    inserirNovoAdministrador,
    listarAdministrador,
    atualizarAdministrador,
    buscarAdministrador,
    excluirAdministrador,
    autenticarAdministrador
}