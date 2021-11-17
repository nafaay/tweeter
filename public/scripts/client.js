/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function (tweetObject) {

    const $tweet = $(`<article class="tweet bord"></article>`);
    $header = $(`<header></header>`);
    const $avnamehandle = $(`<div class="avnamehandle"></div>`);
    const $avname = $(`<div class="avname"></div>`);
    $avname.append(`<img src="${tweetObject.user.avatars}">`);
    $avname.append(`${tweetObject.user.name}`);
    $avnamehandle.append($avname);
    const $handle = $(`<div class="handle"></div>`);
    $handle.append(`${tweetObject.user.handle}`);
    $avnamehandle.append($handle);
    $header.append($avnamehandle);
    $header.append(`${tweetObject.content.text}`);
    $footer = $(`<footer></footer>`);
    $dateago = $(`<div class="dateago"></div>`);
    $timeago = timeago.format(`${tweetObject.created_at}`);
    $dateago.append(`${$timeago}`);
    $footer.append($dateago);
    $fontawesome = $(`<div class="fontawesome"></div>`);
    $fontawesome.append(`
      <i class="fas fa-heart"></i>
      <i class="fas fa-flag"></i>
      <i class="fab fa-twitter"></i>
      `);
    $footer.append($fontawesome);
    $tweet.append($header);
    $tweet.append($footer);
    return $tweet;
  }

  const renderTweets = function(tweets){
    for(let i=0; i<tweets.length; i++){
      const $tweet = createTweetElement(tweets[i]);
      $('#tweets-container').append($tweet);
      $('#tweets-container').append('<br>');
    }
  }

  renderTweets(data);

  $('article').hover(function () {
    $(this).css("box-shadow", "5px 10px #888888");
  }, function () {
    $(this).removeClass("bord");
    $(this).css("box-shadow", "5px 10px #f4f1ec");
    $(this).addClass("bord");
  });
  const $colorElement = $('.fa-heart').css('color');

  $('.fa-heart').hover(function () {
    $(this).css("color", "#ff6666");
  }, function () {
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



