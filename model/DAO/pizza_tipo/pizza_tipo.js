/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do tipo na tabela de relação entre Pizza e Tipo
 * Data: 11/06/2026
 * Autor: Enzzo
 * Versão: 1.0
 *********************************************************************************/


const knex = require('knex')
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)

const insert_PizzaTipo = async function (pizzaTipo) {
    try {
        let sql = `insert into tbl_pizza_tipo (
            id_pizza,
            id_tipo
        )values (
            '${pizzaTipo.id_pizza}',
            '${pizzaTipo.id_tipo}'
        );`

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const select_ByIdPizzaTipo = async function (id) {
    try {
        let sql = `select * from tbl_pizza_tipo where id=${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const select_pizza_porID_tipo = async function (idTipo) {
    try {
        let sql = ` select tbl_pizza.*
                    from tbl_pizza_tipo
                        inner join tbl_pizza
                            on tbl_pizza.id = tbl_pizza_tipo.id_pizza
                        inner join tbl_tipo
                            on tbl_tipo.id = tbl_pizza_tipo.id_tipo

                    where tbl_tipo.id=${idTipo};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }        

    } catch (error) {
        return false
    }
}

const select_tipo_porID_pizza = async function (idPizza) {
    try {
        let sql = ` select tbl_tipo.*
                    from tbl_pizza_tipo
                        inner join tbl_tipo
                            on tbl_tipo.id = tbl_pizza_tipo.id_tipo
                        inner join tbl_pizza
                            on tbl_pizza.id = tbl_pizza_tipo.id_pizza

                    where tbl_pizza.id=${idPizza};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }        

    } catch (error) {
        return false
    }
}


const selectALL_PizzaTipo = async function () {
    try {
        let sql = 'select * from tbl_pizza_tipo order by id desc;'

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

const update_PizzaTipo = async function (pizzaTipo) {
    try {
        let sql = `update tbl_pizza_tipo set
        id_pizza            = '${pizzaTipo.id_pizza}',
        id_tipo             = '${pizzaTipo.id_tipo}',
        where id            = ${pizzaTipo.id};`

        let result = await knexConection.raw(sql)
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const delete_PizzaTipo = async function (id) {
    try {
        let sql = `delete from tbl_pizza_tipo where id=${id}`
        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteTipoByIdPizza = async function(idPizza){
    try {
        let sql = `delete from tbl_pizza_tipo where id_pizza=${idPizza}`
        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insert_PizzaTipo,
    update_PizzaTipo,
    selectALL_PizzaTipo,
    select_ByIdPizzaTipo,
    select_pizza_porID_tipo,
    select_tipo_porID_pizza,
    delete_PizzaTipo,
    deleteTipoByIdPizza
}