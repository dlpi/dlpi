var os = require('os')
var fs = require('fs')
var path = require('path')

var restify = require('restify')

let respond = (req, res, next) => {
  res.send('hello ' + req.params.name)
  next()
}

var server = restify.createServer()

server.get('/hello/:name', respond)

server.post('/upload/:filename', (req, res, next) => {
  let dir = path.join(os.tmpDir(), path.basename(req.params.filename))
  req.pipe(fs.createWriteStream(dir)).on('finish', function () {
    res.send('Upload completed!')
  })
})

server.listen(3000, () => {
  console.log('%s listening at %s', server.name, server.url)
})
