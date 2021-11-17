/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $('article').hover(function(){
    $(this).css("box-shadow", "5px 10px #888888");
  }, function () {
    $(this).css("box-shadow", "5px 10px #f4f1ec");
  });
  const $colorElement = $('.fa-heart').css('color');

  $('.fa-heart').hover(function(){
    $(this).css("color", "#ff6666");
  }, function(){
    $(this).css("color", $colorElement);
  })

  $('.fa-flag').hover(function () {
    $(this).css("color", "#ff6666");
  }, function () {
    $(this).css("color", $colorElement);
  })

  $('.fa-twitter').hover(function () {
    $(this).css("color", "#ff6666");
  }, function () {
    $(this).css("color", $colorElement);
  })

});