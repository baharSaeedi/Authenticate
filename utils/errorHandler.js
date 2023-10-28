function NotFound(req, res, next) {
  res.status(404).send({ statusCode: 404, message: "route not found" });
}

function errHandler(err, req, res, next) {
  const status = err?.statusCode ?? err?.status ?? 500;
  res.status(status).send({
    statusCode: status,
    errors: err.message,
  });
}

module.exports = {
  NotFound,
  errHandler,
};
