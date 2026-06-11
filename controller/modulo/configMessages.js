

//padronização dos retornos da API (cabeçalho)
const DEFAULT_MESSAGE = {
    api_descreiption: 'api para controlar pizzas',
    development: 'Vertex',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagens de ERRO 
const ERROR_BAD_REQUEST                = {status: false, status_code: 400, message: 'Não foi possível processar a requisição devido a erros de entrada '}
const ERROR_INTERNAL_SERVER_MODEL      = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um erro interno no servidor [CONTROLLER]'}
const ERROR_CONTENT_TYPE               = {status: false, status_code: 415, message: 'Não foi possível processar a requisição de dados encaminhado, pois não é suportado pelo servidor, apenas deve ser utilizado JSON.'}
const ERROR_NOT_FOUND                  = {status: false, status_code: 404, message: 'Não foram encontrados dados para retorno.'}

//Mensagens de SUCESSO 
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item inserido com sucesso!'}
const SUCCESS_CREATED_ITEM_WARNING = {status: true, status_code: 201, message: 'Item inserido com sucesso, porém alguns dados tiveram problemas no cadastro [DADOS DE RELACIONAMENTO]'}
const SUCCESS_RESPONSE     = {status: true, status_code: 200}
const SUCCESS_UPDATE_ITEM   = {status: true, status_code: 200, message: 'Item atualizado com sucesso!'}
const SUCCESS_DELETED_ITEM   = {status: true, status_code: 200, message: 'Item excluído com sucesso!'}


module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_NOT_FOUND,
    SUCCESS_RESPONSE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_CREATED_ITEM_WARNING
}
