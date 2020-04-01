'use strict';

(function ($) {
    var radio_group_template = '<div class="col-lg-8 col-md-10">OPTIONS</div>';
    var radio_template = '<div class="form-check"><input class="form-check-input" type="radio" name="radios" id="KEY" value="VALUE" tabindex="INDEX"><label class="form-check-label label" for="KEY">TEXT</label></div>';

    var checkbox_group_template = '<div class="col-lg-8 col-md-10">OPTIONS</div>';
    var checkbox_template = '<div class="form-check"><input class="form-check-input" type="checkbox" value="VALUE" id="KEY" tabindex="INDEX"><label class="form-check-label label" for="KEY">TEXT</label></div>';

    var qs;

    var tryLoadQuestions = function (callback) {
        var test = (window.sfcoronavirus) && (window.sfcoronavirus.questions);

        setTimeout(function () {
            if (!test) {
                tryLoadQuestions(callback);
            } else {
                qs = window.sfcoronavirus.questions;
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

    var parseAnswers = function () {
        var page = localStorage.getItem('page');
        var allAnswers = JSON.parse(localStorage.getItem('answers'));
        var form_data = document.forms['form'].getElementsByTagName('input');
        if (checkAnswers(form_data)) {
            var newAnswers = [];

            for (var i = 0; i < form_data.length; i++) {
                if ($(form_data[i]).prop('checked')) {
                    var value = page.concat($(form_data[i]).val());
                    allAnswers.push(value);
                    newAnswers.push(value);
                }
            }
            localStorage.setItem('answers', JSON.stringify(allAnswers));

            var callback = function() {
                pageUp();
                fillPage();
            };
            trySendAnalytics('CoronavirusFunding', 'SelectAnswer', newAnswers.toString(), callback);
        } else {
            showAlert();
        }
        stopPropagation();
    }

    var stopPropagation = function() {
        event.preventDefault();
        setTimeout(function(){
            $(':focus').blur();
        }, 100);
    }

    var previousQuestion = function () {
        var page = localStorage.getItem('page');
        if (page > 1) {
            var answers = JSON.parse(localStorage.getItem('answers'));
            // account for cases where we've skipped optional questions depending on flow
            var lastPageWithAnswers = answers[answers.length-1].charAt(0);

            var previous_answers = answers.filter(function (answer) {
                return answer.charAt(0) != lastPageWithAnswers;
            });
            localStorage.setItem('answers', JSON.stringify(previous_answers));

            var answers_to_remove = answers.filter(function (answer) {
                return answer.charAt(0) == lastPageWithAnswers;
            });

            var callback = function() {
                pageDown(lastPageWithAnswers);
                fillPage();
            };
            trySendAnalytics('CoronavirusFunding', 'UndoAnswer', answers_to_remove.toString(), callback);
        }
        stopPropagation();
    };

    var cancel = function () {
        event.preventDefault();
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));

        var callback = function(){
            window.location.href = "./";
        };

        trySendAnalytics('CoronavirusFunding', 'CancelFlow', 'N/A', callback);
    };

    var showAlert = function () {
        if ($(".alert").length === 0) {
            let alertMessage = 'Please make a choice.'
            $("#alert_place").animate({
                height: '+=72px'
            }, 300);
            $('<div class="alert alert-danger customAlert">' +
                '<button type="button" class="close" data-dismiss="alert">' +
                '&times;</button>' + alertMessage + '</div>').hide().appendTo('#alert_place').fadeIn(1000);

            $(".alert").delay(3000).fadeOut(
                "normal",
                function () {
                    $(this).remove();
                });

            $("#alert_place").delay(4000).animate({
                height: '-=72px'
            }, 300);
        }
    }

    var checkAnswers = function (form_data) {
        var counter = 0;
        for (var i = 0; i < form_data.length; i++) {
            if ($(form_data[i]).prop('checked')) {
                counter++;
            }
        }

        return counter > 0;
    }

    var fillPage = function () {
        var answers = JSON.parse(localStorage.getItem('answers'));
        var result = '';
        var finalize = true;
        var outer_template = null;
        var inner_template = null;
        for (var i = 0; i < qs.length; i++) {
            var q = qs[i];
            if (q.number === parseInt(localStorage.getItem('page'))) {
                if (checkPrereqs(q.prerequisites, answers)) {
                    var answer_gaidance = $('#answer_gaidance')[0];
                    switch (q.type) {
                        case 'single':
                            answer_gaidance.textContent = "Select one"
                            outer_template = radio_group_template;
                            inner_template = radio_template;
                            break;
                        case 'multi':
                            answer_gaidance.textContent = "Select all that apply"
                            outer_template = checkbox_group_template;
                            inner_template = checkbox_template;
                            break;
                    }
                    $('#question_tittle').text(q.question.title);
                    $('#question_guidance').text(q.question.text);
                    var options = '';
                    for (var j = 0; j < q.answers.length; j++) {
                        var option = q.answers[j];
                        options = options.concat(inner_template.replace("KEY", 'key' + j)
                            .replace("KEY", 'key' + j)
                            .replace("INDEX", j)
                            .replace("TEXT", option.text)
                            .replace("VALUE", option.value));
                    }
                    result = result.concat(outer_template.replace("OPTIONS", options));
                    finalize = false;
                    break;
                } else {
                    pageUp();
                }
            }
        }

        document.getElementById('to_fill').innerHTML = result;

        $('#loading').hide();

        if (finalize)
            finish(answers);
    }

    var pageUp = function () {
        var page = localStorage.getItem('page');
        page = parseInt(page);
        localStorage.setItem('page', ++page);
        var pqButton = $('#previous_question')[0];
        if (pqButton !== null) {
            pqButton.onclick = previousQuestion;
            pqButton.textContent = 'Previous'
        }
    };

    var pageDown = function (targetPage) {
        var page = localStorage.getItem('page');
        page = parseInt(page);

        var newPage = targetPage || --page;
        localStorage.setItem('page', newPage);
        if (page === 1) {
            var pqButton = $('#previous_question')[0];
            if (pqButton !== null) {
                pqButton.onclick = cancel;
                pqButton.textContent = 'Cancel'
            }
        }
    };

    var finish = function (answers) {
        var callback = function() {
            window.location.href = "./guidance.html";
        };

        trySendAnalytics('CoronavirusFunding', 'SubmitAnswers', answers.toString(), callback);
    };

    var init = function () {
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));
        tryLoadQuestions(fillPage);
    }

    $(document).ready(function () {
        var nqButton = $('#next_question')[0];
        var pqButton = $('#previous_question')[0];
        if (pqButton !== null) {
            pqButton.onclick = cancel;
            pqButton.textContent = 'Cancel'
        }
        if (nqButton !== null) {
            nqButton.onclick = parseAnswers;
            init();
        }
    });
})(jQuery);