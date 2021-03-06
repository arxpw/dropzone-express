# dropzone-express
An example test application using dropzone with nodejs.

## Installation
```
git clone https://github.com/arxpw/dropzone-express.git

npm install
npm start

Open in your browser..
http://localhost:5000
```

---

### Default application options
* [Uploads] By default, images and thumbnails currently go into:
  * /uploads
* [Javascript & CSS] By default, production JavaScript & CSS are placed into:
  * /public/dist/js
  * /public/dist/css
* [Access] By default, the application port is 5000, intended to be used with a reverse proxy with NGINX or APACHE

### Requirements
This application requires ImageMagick to be installed on a ( hopefully linux )-based system for thumbnail generation.

**On Debian & Ubuntu**
```
apt-get install imagemagick -y
```

### This application has been built with the following:

* [Dropzone](http://www.dropzonejs.com/) - Javascript framework for managing file uploads
* [bLazy](http://dinbror.dk/blog/blazy/) - Javascript lazy loading
* [Express-FileUpload](https://github.com/richardgirges/express-fileupload) - Upload middleware for managing multiple files and more
* [IOS CSS Checkbox](http://www.designcouch.com/home/why/2013/09/19/ios7-style-pure-css-toggle/) - ( copy and paste + modifications)
* [Express](https://expressjs.com/) - Framework
* [Pug](https://pugjs.org) - NodeJS Template engine
* [SASS/SCSS](http://sass-lang.com/) - Better management of CSS, functions, variables etc