$(document).ready(function(){
  $('#phonemenu').on('click', function(){
    $('#desktop-menu-links').fadeIn();
  })

  $("#desktop-menu-links").on('click', function(){
    $('#desktop-menu-links').fadeOut();
  })
})
$('#title').fadeIn(500, function(){$('#content').fadeIn()})
