const knex = require('knex')
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)

const insert_algo = async function(pizza){
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
        
        if(result)
            return result[0].insertId //Retorna o ID gerado no insert
        else
            return false
    } catch (error) {
        return false
    }
}

const select_algo = async function(algo){
    try {
        
    } catch (error) {
        return false
    }
}

const selectALL_algo = async function(algo){
    try {
        
    } catch (error) {
        return false
    }
}

const update_algo = async function(algo){
    try {
        
    } catch (error) {
        return false
    }
}

const delet_algo = async function(algo){
    try {
        
    } catch (error) {
        return false
    }
}

module.exports={}