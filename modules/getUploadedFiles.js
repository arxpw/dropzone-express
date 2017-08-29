var fs = require('fs')
module.exports = function(uploadFolder) {
  uploadFiles       = []
  fs.readdirSync('./' + uploadFolder + '/').forEach(file => {
    if(file.includes('thumb')) {
      uploadFiles.push(file)
    }
  })
  return uploadFiles
}