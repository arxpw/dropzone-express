const express = require('express')
const app     = express()

const fs      = require('fs')
const im      = require('imagemagick-stream')
const upload  = require('express-fileupload')

const uploadFolder = 'uploads'
const port         = 80


app.use(express.static('public'))
app.use('/' + uploadFolder, express.static(uploadFolder))

app.use(upload())
app.set('view engine', 'pug')

var getUploadedFiles = require('./modules/getUploadedFiles.js')

app.get('/', function (req, res) {
  // queries all files within
  res.render('pages/home', { 
    title: 'ThatMemeSite', 
    content: 'Upload things here',
    uploads: getUploadedFiles(uploadFolder), 
    uploadDirectory: '/' + uploadFolder 
  })
})

app.get('/delete/:id', function(req, res) {
  if(req.params.id === undefined) 
    return res.send('No Image ID defined')
  
  var id = req.params.id
  fs.stat(uploadFolder + '/' + id, function(err, stat) {
   if(err == null) {
      fs.unlinkSync(uploadFolder + '/' + id.replace('_thumb',''))
      fs.unlinkSync(uploadFolder + '/' + id)
      return res.send(true)
    } else if(err.code == 'ENOENT') {
      return res.send('No image found by that ID')
    }
    return res.send('error')
  })
})

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.')
 
  let file      = req.files.file
  let filesize  = file.data.length/1024/1000
  let sizeLimit = 12

  var randomString = function(length) {
    var text = ''
    var possible = "abcdefghijklmnopqrstuvwxyz"
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  if(filesize > sizeLimit)
    return res.status(500).send('This file is too large, please upload files under ' + sizeLimit + 'MB')

  let cleanish = file.name.replace(/[|&;$%@"<>()+,]/g, "")
  let fileType = cleanish.toLowerCase().substring(cleanish.indexOf('.')+1, cleanish.length)
  
  var multipleDots = /\.{1}.*\./gm.test(cleanish)

  if(multipleDots == true)
    fileType = cleanish.toLowerCase().substring(cleanish.lastIndexOf('.')+1, cleanish.length)

  var allowedFileTypes = ['jpg','png','gif','bmp']
  if(allowedFileTypes.indexOf(fileType) == -1)
    return res.status(500).send('This filetype is not allowed.')

  var theDate = Date.now().toString()
  var fileNameString = theDate + randomString(10) + '.' + fileType

  file.mv(uploadFolder + '/' + fileNameString, function(err) {
    if (err)
      return res.status(500).send(err)

    var thumbnailFinalPath   = uploadFolder + '/' + fileNameString.substring(0,fileNameString.indexOf('.')) + '_thumb' + fileNameString.substring(fileNameString.indexOf('.'), fileNameString.length)
    var thumbnailWriteStream = fs.createWriteStream(thumbnailFinalPath)
    
    // low quality for now
    im(uploadFolder + '/' + fileNameString).resize('362').quality(84).pipe(thumbnailWriteStream)
    return res.status(200).send(fileNameString)
  })
})

app.get('/uploads/*', function(req,res) {
  res.sendfile('public/dist/404.jpg')
})

app.listen(port, function () {
  console.log('Upload application listening on port ' + port)
})