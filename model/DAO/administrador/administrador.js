/*******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do administrador no banco de dados
 * Data: 11/06/2026
 * Autor: Gabriel
 * Versão: 1.0
 *********************************************************************************/

const knexConection = require('../../database_config/connection.js')

const insertAdministrador = async function(administrador){
    try {
        let sql = `insert into tbl_administrador (
        senha,
        nome
        ) values (
         '${administrador.senha}',
         '${administrador.nome}'
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

const selectAdministradorByNome = async function(nome){
    try {

        let sql = `select * from tbl_administrador
                   where nome = '${nome}'`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0] 
        else
            return false

    } catch(error){
        return false
    }
}

const selectByIdAdministrador = async function(id){
    try {
        let sql = `select * from tbl_administrador where id = ${id}`

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)
        
        if(Array.isArray(result))
            return result[0] 
        else
            return false
    } catch (error) {
        return false
    }
}

const selectALLAdministrador = async function(){
    try {
        let sql = `select * from tbl_administrador order by id desc`

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)
        
        if(result && result[0])
            return JSON.parse(JSON.stringify(result[0]))
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAdministrador = async function(administrador){
    try {
        let sql = `update tbl_administrador set 
        senha = '${administrador.senha}',
        nome = '${administrador.nome}'
        where id = ${administrador.id}`

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)
        
        if(result)
            return true
    } catch (error) {
        return false
    }
}

const deleteAdministrador = async function(id){
    try {
        let sql = `delete from tbl_administrador where id = ${id}`

        //Encaminha para o BD o scriptSQL
        let result = await knexConection.raw(sql)
        
        return result
        
    } catch (error) {
        return false
    }
}

module.exports={
    insertAdministrador,
    selectByIdAdministrador,
    selectALLAdministrador,
    updateAdministrador,
    deleteAdministrador,
    selectAdministradorByNome
}