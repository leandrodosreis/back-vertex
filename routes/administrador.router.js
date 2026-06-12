const express = require('express')
const bodyparser = require('body-parser')

const bodyparserJSON = bodyparser.json()
const router = express.Router()

const controlleradministrador = require('../controller/administrador/controller.administrador.js')

