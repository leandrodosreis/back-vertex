

const jwt = require('jsonwebtoken')
// const SECRET = 'abc123'
// const EXPIRES = 60

// const createJWT = async function (payLoad) {
//     const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})
//     return token
// }

// const validateJWT = async function (token) {

//     let status = false

//     jwt.verify(token, SECRET, async function (err, decode) {
//         if(!err)
//             status = true
//         return status
//     })
// }

// module.exports = {
//     createJWT,
//     validateJWT
// }

const verifyJWT = async function(req, res, next){

    try{

        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                status:false,
                message:'Token não enviado'
            })
        }

        const token = authHeader.replace('Bearer ', '')

        jwt.verify(
            token,
            process.env.JWT_SECRET || 'vertex_pizzaria',
            (error, decoded)=>{

                if(error){
                    return res.status(403).json({
                        status:false,
                        message:'Token inválido'
                    })
                }

                req.usuario = decoded

                next()
            }
        )

    }catch(error){

        return res.status(500).json({
            status:false,
            message:'Erro interno'
        })

    }

}

module.exports = verifyJWT