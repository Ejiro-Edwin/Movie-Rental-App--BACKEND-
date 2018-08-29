function admin(req,res,next){
    //401 unauthorized (no token provided)
    //403 forbidden    (token provided)
  if(!req.user.isAdmin) return res.status(403).send('Access Denied!');

    next();
}

module.exports = admin;