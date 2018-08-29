const config = require('config');

module.exports= function(){
    if (!config.get('JwtPrivateKey')) {
       throw new Error('FATAL ERROR: JWT not Defined');
    } 
}