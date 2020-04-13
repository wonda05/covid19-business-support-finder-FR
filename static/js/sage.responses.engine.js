'use strict';

(function ($) {
    var guidence_template = '<div class="justify-content-center"><div class="text-left guidence" ><hr><h3>TITLE</h3></div></div><div class="justify-content-center"><div class="text-left"><p>TEXT</p></div></div>'
    var link_template = '<div class="justify-content-center"><div class="text-left link"><a href="URL" onclick="trackOutboundLink(TITLE); return true;" target="_blank">TEXT<img class="url_arrow" src="static/images/url_arrow.svg"></a></div></div>';
    var questions_heading = '<div class="justify-content-center"><div class="text-left"><h3>Your responses were</h3></div></div>';
    var question_template = '<div class="justify-content-center"><div class="text-left"><h6>QUESTION</h6></div></div>';
    var answer_template = '<div class="justify-content-center"><div class="text-left"><p>ANSWER</p></div></div>';

    var responses;
    var questions;

    var tryLoadResponses = function(callback) {
        var test = (window.sfcoronavirus) && (window.sfcoronavirus.responses);

        setTimeout(function () {
            if (!test) {
                tryLoadResponses(callback);
            } else {
                questions = window.sfcoronavirus.questions;
                responses = window.sfcoronavirus.responses;
                callback();
            }
        }, 200)
    };

    var trySendAnalytics = function(category, action, label, callback) {
        // Creates a timeout to invoke callback after 200ms.
        setTimeout(invokeCallback, 200);

        var callbackInvoked = false;

        var invokeCallback = function() {
            if (!callbackInvoked) {
                callbackInvoked = true;
                callback();
            }
        };

        if (window.ga) {
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                hitCallback: invokeCallback
            });
        } else {
            invokeCallback()
        }
    };

    var restart = function () {
        event.preventDefault();
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));

        var callback = function(){
            window.location.href = "./";
        };
        trySendAnalytics('CoronavirusFundingFR_CA', 'RestartFlow', 'N/A', callback);
    };

    var showUserAnswers = function(answers) {
        // start with only the header, we'll add to this as we match the user's responses back to Q&A text labels
        var userAnswers = questions_heading;

        for (var i = 0; i < questions.length; i++) {
            var q = questions[i];

            // check if question has any answers (some questions are optional depending on flow)
            var answersToQ = answers.filter(function(answer) {
                return answer.charAt(0) === q.number + '';
            });

            if (answersToQ.length) {
                // if the user answered a question, we must display the question text
                userAnswers = userAnswers.concat(question_template.replace('QUESTION',q.question.title));

                var arrayOfAnswerLabels = [];

                // then we add the answer text to the view (comma-separated in the case of multiple choice)
                for (var j = 0; j < answersToQ.length; j++) {
                    var a = q.answers.find(function(answer) {
                        return answer.value === answersToQ[j].charAt(1);
                    });
                    arrayOfAnswerLabels.push(a.text);
                }
                var stringOfAnswerLabels = arrayOfAnswerLabels.join(', ');
                userAnswers = userAnswers.concat(answer_template.replace('ANSWER',stringOfAnswerLabels));
            }
        }

        document.getElementById('guidance-items').innerHTML = userAnswers;
        $('#loading').hide();
    };

    var fillPage = function () {
        var answers = JSON.parse(localStorage.getItem('answers'));
        var guidanceItems = '';

        var guidanceFound = false;

        for (var i = 0; i < responses.length; i++) {
            var r = responses[i];
            if(checkPrereqs(r.prerequisites, answers)) {
                guidanceFound = true;
                guidanceItems = guidanceItems.concat(guidence_template.replace('TITLE',r.guidance.title).replace('TEXT', r.guidance.text));
                for(var j=0;j<r.links.length;j++) {
                    var link = r.links[j];
                    guidanceItems = guidanceItems.concat(link_template.replace('TEXT', link.text).replace('URL', link.url).replace('TITLE', "'" + r.guidance.title + "'"));
                }
            }
        }

        if (guidanceFound) {
            $('#guidance-summary').show();
            document.getElementById('guidance-items').innerHTML = guidanceItems;
            $('#loading').hide();
        } else {
            $('#no-guidance-found').show();
            showUserAnswers(answers);
        }
    };

    // needs to be global as it's called directly by onclick handler
    window.trackOutboundLink = function(topic) {
        var callback = function() {};
        trySendAnalytics('CoronavirusFundingFR_CA', 'OutboundLink', topic, callback);
    };

    var init = function () {
        localStorage.setItem('page', '1');
        tryLoadResponses(fillPage);
    }

    $(document).ready(function () {
        var restartButton = $('#restart_button')[0];
        if (restartButton !== null) {
            restartButton.onclick = restart;
        }

        $('.restart_link').each(function() {
            $(this).on('click', function(event) {
                event.preventDefault();
                restart();
            });
        });

        init();
    });
})(jQuery);