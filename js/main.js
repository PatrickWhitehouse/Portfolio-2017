$('.hamburger').click(function(){
  $(this).toggleClass('is-active');
  $('nav').toggleClass('nav--grow');
  $('.trigger').toggleClass('trigger--open');
});
