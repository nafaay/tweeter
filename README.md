# Tweeter Project

When the page is loaded we get some data from "http://localhost:8080/tweets"; 
an API that contains some tweets which we can work with, we get data using 
$.ajax that fetch tweets asynchronously without refreshing the page.

The user can input some text and when they click on the button Tweeter the
tweet will be added on the top, here also we use $.ajax to stop refreshing the 
page.

The length of the text is by default 140 characters, when the user start typing 
the length of the zone starts decreasing until it overpasses 140, here if the user
clicks on submit, they got a message that this tweet is too long
Also if the zone is empty and the user clicks on submit, they got a message that
the tweet is empty.

