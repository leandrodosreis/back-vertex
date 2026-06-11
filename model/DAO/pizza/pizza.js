/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da pizza no banco de dados
 * Data: 11/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/

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

        
        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const select_ByIdPizza = async function (id) {
    try {
        let sql = `select * from tbl_pizza where id=${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectALL_pizza = async function () {
    try {

        let sql = 'select * from tbl_pizza order by id desc'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const update_pizza = async function (pizza) {
    try {
        let sql = `update tbl_filme set
        nome             = '${pizza.nome}',
        descricao         = '${pizza.descricao}',
        imagem             = '${pizza.imagem}',
         where id             = ${pizza.id};`

        let result = await knexConection.raw(sql)
        if (result)
            return true

        else
            return false
    } catch (error) {
        return false
    }
}

const delete_pizza = async function (id) {
    try {
        let sql = `delete from tbl_pizza where id=${id}`

        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insert_pizza,
    selectALL_pizza,
    select_ByIdPizza,
    update_pizza,
    delete_pizza
}