const express = require('express')
const thumb   = require('node-thumbnail').thumb;
const app     = express()
const upload  = require('express-fileupload')
const fs      = require('fs')

const uploadFolder = 'uploads';

app.use(express.static('public'))
app.use('/' + uploadFolder, express.static(uploadFolder))

app.use(upload());
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  uploadFiles = []
  fs.readdirSync('./' + uploadFolder + '/').forEach(file => {
    if(file.includes('thumb')) {
      uploadFiles.push(file)
    }
  })
  res.render('index', { 
    title: 'Uploader', 
    message: 'Click and drag files into this box!', 
    uploads: uploadFiles, 
    uploadDirectory: '/' + uploadFolder 
  })
})

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.')
 
  let file      = req.files.file
  let filesize  = file.data.length/1024/1000
  let sizeLimit = 24

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

  // console.log('FILE TYPE IS ' + fileType)
  var allowedFileTypes = ['jpg','png','gif','webm','bmp']
  if(allowedFileTypes.indexOf(fileType) == -1)
    return res.status(500).send('This filetype is not allowed.')

  var theDate = Date.now().toString()
  var fileNameString = theDate + randomString(10) + '.' + fileType

  file.mv(uploadFolder + '/' + fileNameString, function(err) {
    if (err)
      return res.status(500).send(err)

    
    // console.log('SUCCESS')
    thumb({
        source: uploadFolder + '/' + fileNameString, 
        destination: uploadFolder,
        suffix: '_thumb',
        concurrency: 8,
        width: 240
      }).then(function() {
        console.log('thumb for ' + fileNameString + ' done');
      }).catch(function(e) {
        console.log('thumb for ' + fileNameString + ' ERROR!');
      });
      return res.status(200).send(fileNameString)
    
  })
})

const port = 80
app.listen(port, function () {
  console.log('Upload application listening on port ' + port)
})