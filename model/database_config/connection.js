/*******************************************************************************
 * Objetivo: Arquivo único responsável por criar e exportar a conexão com o banco
 * Versão: 1.0
 *********************************************************************************/

const knex = require('knex')
const knexdatabaseConfig = require('./knexConfig.js')

// Define o ambiente: usa o valor de NODE_ENV (definido no Render como 'production'),
// ou 'development' como padrão quando rodar localmente
const ambiente = process.env.NODE_ENV || 'development'

// Cria a conexão única, baseada no ambiente atual
const knexConection = knex(knexdatabaseConfig[ambiente])

module.exports = knexConection