const renderTweets = function (tweets) {
  for (let i = 0; i < tweets.length; i++) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
    $('#tweets-container').append('<br>');
  }
};

const createTweetElement = function (tweetObject) {
  const $tweet = $('<article>').addClass('tweet bord');
  const $header = $('<header>');
  const $avname = $('<div>')
    .addClass('avname');
  const $src = tweetObject.user.avatars;
  const $image = $('<img>').attr('src', $src);
  $avname.append($image)
    .append(tweetObject.user.name)
  const $handle = $('<div>')
    .text(tweetObject.user.handle)
    .addClass('handle');

  const $avnamehandle = $('<div>')
    .append($avname)
    .addClass('avnamehandle');
  $avnamehandle.append($handle);
  $header.text(tweetObject.content.text);
  $header.append($avnamehandle);

 
  const $footer = $('<footer>');
  const $timeago = timeago.format(`${tweetObject.created_at}`);
  const $dateago = $('<div>')
    .append($timeago)
    .addClass('dateago');

  $ft_awesome_heart   = $('<i>').addClass('fas fa-heart');
  $ft_awesome_flag    = $('<i>').addClass('fas fa-flag');
  $ft_awesome_twitter = $('<i>').addClass('fab fa-twitter');


  $fontawesome = $('<div>').addClass('fontawesome');
  $fontawesome.append($ft_awesome_heart, $ft_awesome_flag, $ft_awesome_twitter);
  $footer.append($dateago, $fontawesome);
  $tweet.append($header, $footer);
  return $tweet;
};

$(document).ready(function () {
  const manipulateDOM = function () {
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
    });

    $('.fa-flag').hover(function () {
      $(this).css("color", "#ff6666");
    }, function () {
      $(this).css("color", $colorElement);
    });

    $('.fa-twitter').hover(function () {
      $(this).css("color", "#ff6666");
    }, function () {
      $(this).css("color", $colorElement);
    });
  }

  $('.error').hide();
  const BASE_URL = "http://localhost:8080/tweets";
  let data = [];
  $.ajax(BASE_URL, {
    "user": "user", "content": "content", "created_at": "created_at"
  })
    .done(function (dataTweets) {
      data = dataTweets;
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
      manipulateDOM();
      $("form").on("submit", function (event) {
        event.preventDefault();
        let $text = $(this).serialize();
        $text = $text.substring(5);
        $text = decodeURI($text);
        $text = $text.replace(/%20/g, " ")
          .replace(/%C3/g, " ")
          .replace(/%A8/g, " ")
          .replace(/%3A/g, " ")
          .trim();
        if ($text.trim().length === 0) {
          $('.empty').show();
        }
        else if ($text.trim().length >= 140) {
          $('.long').show();
        }
        else {
          if($text.length >= 80){
            let $text1 = $text.substring(0, 80) + '\n';
            $text = $text1 + $text.substring(81, $text.length);
          }
          $('.error').hide();
          $('#tweets-container').empty();
          data.push({
            "user":
            {
              "name": "Youssef",
              "avatars": "https://avatars.dicebear.com/api/personas/wwwwwwwwwwwwwur-custom-seed.svg",
              "handle": "@nafaay"
            },
            "content": {
              "text": $text
            },
            "created_at": Date.now()
          });
          renderTweets(data.reverse());
          manipulateDOM();

        }
      });
    });
});