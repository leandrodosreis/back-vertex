/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do tipo no banco de dados
 * Data: 11/06/2026
 * Autor: Gabriel
 * Versão: 1.0
 *********************************************************************************/


const knex = require('knex')
const knexdatabaseConfig = require('../../database_config/knexConfig.js')
const knexConection = knex(knexdatabaseConfig.development)

const insertTipo = async function(tipo){
    try {
       let sql = `insert into tbl_tipo(
        nome
        ) value (
         '${tipo.nome}'
         );`
         let result = await knexConection.raw(sql)
         if(result)
            return result[0].insertId //Retorna o ID gerado no insert
        else
            return false
    } catch (error) {
        
        return false
    }
}
const selectByIdTipo = async function(id){
    try {
        let sql = `select * from tbl_tipo where id = ${id}`

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
const selectALLTipo = async function(){
    try {
        let sql = 'select * from tbl_tipo order by id desc'

        let result = await knexConection.raw(sql)
        if(result && result[0]){
            return JSON.parse(JSON.stringify(result[0])) 
        }else {
            return false
        }

    } catch (error) {
        return false
    }
}
const updateTipo = async function(tipo){
    try {
        let sql =`update tbl_tipo set
        nome = '${tipo.nome}'
        where id = ${tipo.id}`

        let result = await knexConection.raw(sql)
        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
const deleteTipo = async function(id){
    try {
        let sql = `delete from tbl_tipo where id = ${id}`
        let result = await knexConection.raw(sql)
      
       return result

    } catch (error) {
        return false
    }
}

module.exports={
    insertTipo,
    selectALLTipo,
    selectByIdTipo,
    updateTipo,
    deleteTipo
}