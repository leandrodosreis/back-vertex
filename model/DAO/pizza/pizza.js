const knex = require('knex')
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)

const insert_pizza = async function (pizza) {
    try {
        let sql = `insert into tbl_pizza (
            nome,
            descricao,
            imagem

        ) values (
            '${pizza.nome}',
            '${pizza.descricao}',
            '${pizza.imagem}'
        );`

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId //Retorna o ID gerado no insert
        else
            return false
    } catch (error) {
        return false
    }
}

const select_pizza = async function () {
    try {


    } catch (error) {
        return false
    }
}

const selectALL_pizza = async function () {
    try {
        //Script SQL para listar todos os filmes
        let sql = 'select * from tbl_pizza order by id desc'

        //Executa no BD o script e guarda o retorno do BD, Pode ser um ERRO (false) Ou um Array com os dados
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do BD é um Array ou um Boolean (False)
        if (Array.isArray(result)) {
            return result[0]  //Retorna somente o indice com a lista de filmes
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const update_algo = async function (algo) {
    try {

    } catch (error) {
        return false
    }
}

const delet_algo = async function (algo) {
    try {

    } catch (error) {
        return false
    }
}

module.exports = {
    insert_pizza,
    selectALL_pizza
}