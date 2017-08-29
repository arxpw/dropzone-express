Dropzone.autoDiscover = false;
$(function() {
  var bLazy = new Blazy();
  $("form#dropzone").dropzone({
    url: "/upload",
    resizeQuality: 0.08,
    maxThumbnailFilesize: 30,
    parallelUploads: 3,
    init: function() {
      this.on('addedfile', function(file) {
        // console.log('file added');
      }),
      this.on('success', function(success) {
        if(success.status == 'success') {
          var previewElem = $(success.previewElement);
          previewElem.find('.dz-filename').wrap('<a target="_blank" href="/uploads/' + success.xhr.response + '"></a>');
        }
      }),
      this.on('queuecomplete', function(complete) {
        window.setTimeout(function() {
          console.log('queue complete... let\'s refresh!');
          location.reload();
        }, 1200);
      })
    }
  });


  $('.delet-button').on('click', function(cl) {
    cl.preventDefault();
    // console.log('delete button clicked');
    var parentItem = $(this).parents('.thumb-item');
    var toDelete = $(this).attr('href');
    var ajaxPost = $.get(toDelete, function(response) {
      console.log('response is');
      console.log(response);
      if(response == true) {
        parentItem.remove();
      }
    });
  });

  $('.thumb-item').on('click', function(e) {
    if(e.target != this) return;
    $('.modal .image').css('background-image', 'url(' + $(this).find('.link-button').attr('href') + ')').parent().removeClass('hidden');
  });

  $('.modal').on('click', function() {
    $(this).addClass('hidden');
  })
})