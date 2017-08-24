Dropzone.autoDiscover = false;
$(function() {
  $("form#dropzone").dropzone({ 
      url: "/upload",
      resizeQuality: 0.08,
      maxThumbnailFilesize: 30,
      parallelUploads: 2,
      init: function() {
        this.on('addedfile', function(file) {
          // console.log('file added');
        }),
        this.on('success', function(success) {
          if(success.status == 'success') {
            var previewElem = $(success.previewElement);
            previewElem.find('.dz-filename').wrap('<a target="_blank" href="/uploads/' + success.xhr.response + '"></a>');
          }
        })
      }
    }
  );
})