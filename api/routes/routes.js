var appRouter = function (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.post("/add", function (req, res) {
        // TODO: add random error response
        res.status(200).send({
            status: true
        });
    });
}

module.exports = appRouter;
