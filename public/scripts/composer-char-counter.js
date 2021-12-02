$(document).ready(function () {
  $('#tweet-text').focus(function () {
    $(this).css("background-color", "#e0ebeb");
  });

  const $colorCounter = $('.counter').css('color');
  const $counterVal = $('.counter').val();
  $('#tweet-text').keyup(function () {
    $('.counter').val($counterVal - $(this).val().length);
    if ($('.counter').val() <= 0) {
      $('.counter').css('color', 'red');
    }
    else {
      $('.counter').css('color', $colorCounter);
    }
  });
});
