var appRouter = function (app) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post('/add', function (req, res) {
    res.status(200).send(true)
  });

  app
    .use('/users', function(req, res, next) {
      setTimeout(next, 2000)
    })
    .get('/users', function (req, res) {
      res.status(200).send([
        {
          text: 'test',
          value: 'example@o2.pl'
        },
        {
          text: 'Example Person1',
          value: 'meeting1@gmail.com'
        },
        {
          text: 'Example Person2',
          value: 'meeting2@gmail.com'
        },
        {
          text: 'Very real example1',
          value: 'real1@example.com'
        },
        {
          text: 'Very real example2',
          value: 'real2@gmail.com'
        },
        {
          text: 'Your email',
          value: 'john.xyz@gmail.com'
        },
        {
          text: 'My email',
          value: 'bard.xyz@gmail.com'
        },
        {
          text: 'This is just an example',
          value: 'paul.xyz@gmail.com'
        }
      ]);
    });
}

module.exports = appRouter;
