
// Hero Images
document.addEventListener('DOMContentLoaded', () => {
  const parallaxEffect = document.querySelectorAll('.parallax');
  M.Parallax.init(parallaxEffect, {});
});

// Modal, Dropdown, and Nav
$(document).ready(function(){
  $('.dropdown-trigger').dropdown();
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('#modal1').modal('open');
  $('#cls').click(function(){
    $('#modal1').modal('close');                   
  });
});

// Dropdown
$('.dropdown-trigger').dropdown();

// Images on Initial Modal
$(document).ready(function (jQuery) {
  var images = Array();
  var indexImages = Array();
  jQuery("#imgselection img").each(function (index) {
      images.push(jQuery(this).attr('src'));
      indexImages.push(index);
      jQuery(this).hide();
  });
 var selectedIndexImage = indexImages[Math.floor(Math.random() * indexImages.length)];
 jQuery('#imgselection img').eq(selectedIndexImage).show();
});

