$(document).ready(function() {
  $('.error').hide();
  let data = [];
  $.ajax("http://localhost:8080/tweets", {
    "user": "user", "content": "content", "created_at": "created_at" })
    .done(function(dataTweets) {
      data = dataTweets;
      console.log(data);
      renderTweets(data);

  /**
   * this function makes a shadow when hovering over the article
   * remove the classe responsible for the border
   * remove the shadow when outside the article
   * add the class responsible for the border to the article
   * NOTE: WE REMOVE THE BORDER AND REPLACE THE BORDER
   * WE HAVE TO DO THAT BECAUSE THE BORDER WILL BE CUT WHERE THE BORDER
   * IS MADE
   */
      $('article').hover(function() {
        $(this).css("box-shadow", "5px 10px #888888");
      }, function() {
        $(this).removeClass("bord");
        $(this).css("box-shadow", "5px 10px #f4f1ec");
        $(this).addClass("bord");
      });
      const $colorElement = $('.fa-heart').css('color');

      $('.fa-heart').hover(function() {
        $(this).css("color", "#ff6666");
      }, function() {
        $(this).css("color", $colorElement);
      });

      $('.fa-flag').hover(function() {
        $(this).css("color", "#ff6666");
      }, function() {
        $(this).css("color", $colorElement);
      });

      $('.fa-twitter').hover(function() {
        $(this).css("color", "#ff6666");
      }, function() {
        $(this).css("color", $colorElement);
      });

      $("form").on("submit", function(event) {
        event.preventDefault();
        const $text = $(this).serialize();
        console.log("text ", $text);
        if($text.trim().length - 5  === 0){
          $('.empty').show();
        }
        else if($text.trim().length > 145 ){
          $('.long').show();
        }
        else{
          $('.error').hide();
          $('#tweets-container').empty();
          data.push({
            "user":
            {
              "name": "Youssef",
              "avatars": "https://avatars.dicebear.com/api/personas/wwwwwwwwwwwwwur-custom-seed.svg",
              "handle": "@Youssef"
            },
            "content": {
              "text": $text.replace(/%20/g, " ")
                .replace(/%C3/g, " ")
                .replace(/%A8/g, " ")
                .replace('text=', '')
                .trim()
            },
            "created_at": Date.now()
          });
          renderTweets(data.reverse());

        }

        ///////
        // call ajax 
        //////
      });
    });
});

const createTweetElement = function (tweetObject) {
  const $tweet = $(`<article class="tweet bord"></article>`);
  const $header = $(`<header></header>`);
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
  const $footer = $(`<footer></footer>`);
  const $dateago = $(`<div class="dateago"></div>`);
  const $timeago = timeago.format(`${tweetObject.created_at}`);
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
};

const renderTweets = function (tweets) {
  for (let i = 0; i < tweets.length; i++) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
    $('#tweets-container').append('<br>');
  }
};




