'use strict';
//---------------------------------------------------------------------------------------404 Function
function handle404(req, res, next) {
    const errorObject = {
      status: 404,
      message: 'Sorry, we could not find what you were looking for'
    }
    res.status(404).json(errorObject);
  }
//---------------------------------------------------------------------------------------export My Function  
module.exports = handle404;