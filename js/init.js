
// Hero Images
document.addEventListener('DOMContentLoaded', () => {
  const parallaxEffect = document.querySelectorAll('.parallax');
  M.Parallax.init(parallaxEffect, {});
});

// Modal
$(document).ready(function(){
  $('.modal').modal();
  $('#modal1').modal('open');
  $('#cls').click(function(){
    $('#modal1').modal('close');                   
  });
});

// Dropdown
// document.addEventListener('DOMContentLoaded', function(){
//   var drop = document.querySelectorAll('.dropdown-trigger')
//   M.Dropdown.init(drop{
//     coverTrigger:false,
//     closeOnClick:true,
// })
// });

// Images on Initial Modal
$(document).ready(function (jQuery) {
  var images = Array();
  var indexImages = Array();
  jQuery("#imgselection img").each(function (index) {
      images.push(jQuery(this).attr('src'));
      indexImages.push(index);
      jQuery(this).hide();
  });
  // var selectedImage = images[Math.floor(Math.random() * images.length)];
  // jQuery('body').css('background-image', 'url(' + selectedImage + ')');
// // OR Show one image
 var selectedIndexImage = indexImages[Math.floor(Math.random() * indexImages.length)];
 jQuery('#imgselection img').eq(selectedIndexImage).show();
});

