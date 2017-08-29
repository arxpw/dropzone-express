# dropzone-express
An example test application using dropzone with nodejs.

## Installation
```
git clone https://github.com/arxpw/dropzone-express.git
npm install
npm start
```

### Requirements
This application requires ImageMagick to be installed on a ( hopefully linux )-based system for thumbnail generation.
```
apt-get install imagemagick -y
```

### This application has been built with the following:

* [Dropzone](http://www.dropzonejs.com/) - Javascript framework for managing file uploads
* [Express-FileUpload](https://github.com/richardgirges/express-fileupload) - Upload middleware for managing multiple files and more
* [Express](https://expressjs.com/) - Framework
* [Pug](https://pugjs.org) - NodeJS Template engine
* [SASS/SCSS](http://sass-lang.com/) - Better management of CSS, functions, variables etc