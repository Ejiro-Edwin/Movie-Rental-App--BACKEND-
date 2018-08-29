const winston = require('winston');
 
module.exports = function(err, req, res, next){
    //Log the Exception
  winston.error(err.message, err);
    //error
    //warn 
    //info
    //verbose
    //debug
    //silly

    res.status(500).send('something went wrong');
}
