'use strict';
//---------------------------------------------------------------------------------------500 Function
function handle500(err, req, res, next) {
  const error = err.message ? err.message : err;
  const errorObject = {
    status: 500,
    message: error
  }
  res.status(500).json(errorObject);
}
//---------------------------------------------------------------------------------------export My Function
module.exports = handle500;