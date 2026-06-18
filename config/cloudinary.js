const cloudinary = require('cloudinary').v2;

// Configuração das credenciais secretas do Cloudinary
cloudinary.config({
  cloud_name: 'dm3ecd4sl',  
  api_key: '817313451681527',        
  api_secret: 'KKraqG6ALecTvavh5PGSuPoA-G8'  
});

module.exports = cloudinary;