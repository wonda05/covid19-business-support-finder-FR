'use strict';

(function ($) {
    var radio_group_template = '<div class="radio_group">OPTIONS</div>';
    var radio_template = '<div class="form-check"><input class="form-check-input" type="radio" name="radios" id="KEY" value="VALUE"><label class="form-check-label label" for="KEY">TEXT</label></div>';

    var checkbox_group_template = '<div class="check_group">OPTIONS</div>';
    var checkbox_template = '<div class="form-check"><input class="form-check-input" type="checkbox" value="VALUE" id="KEY"><label class="form-check-label label" for="KEY">TEXT</label></div>';

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

            ga('send', {
                hitType: 'event',
                eventCategory: 'CoronavirusFunding',
                eventAction: 'SelectAnswer',
                eventLabel: newAnswers.toString(),
                hitCallback: function(){
                    pageUp();
                    fillPage();
                }
            });
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
            var previous_answers = answers.filter(function (answer) {
                return answer.charAt(0) != page - 1;
            });
            localStorage.setItem('answers', JSON.stringify(previous_answers));

            var answers_to_remove = answers.filter(function (answer) {
                return answer.charAt(0) == page - 1;
            });

            ga('send', {
                hitType: 'event',
                eventCategory: 'CoronavirusFunding',
                eventAction: 'UndoAnswer',
                eventLabel: answers_to_remove.toString(),
                hitCallback: function(){
                    pageDown();
                    fillPage();
                }
            });
        }
        stopPropagation();
    };

    var cancel = function () {
        event.preventDefault();
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));

        ga('send', {
            hitType: 'event',
            eventCategory: 'CoronavirusFunding',
            eventAction: 'CancelFlow',
            eventLabel: 'N/A',
            hitCallback: function(){
                window.location.href = "/";
            }
        });
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
                    switch (q.type) {
                        case 'single':
                            outer_template = radio_group_template;
                            inner_template = radio_template;
                            break;
                        case 'multi':
                            outer_template = checkbox_group_template;
                            inner_template = checkbox_template;
                            break;
                    }
                    $('#question_tittle').text(q.question.title);
                    $('#question_gaidance').text(q.question.text);
                    var options = '';
                    for (var j = 0; j < q.answers.length; j++) {
                        var option = q.answers[j];
                        options = options.concat(inner_template.replace("KEY", 'key' + j)
                            .replace("KEY", 'key' + j)
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
            pqButton.textContent = 'Previous Question'
        }
    };

    var pageDown = function () {
        var page = localStorage.getItem('page');
        page = parseInt(page);
        localStorage.setItem('page', --page);
        if (page === 1) {
            var pqButton = $('#previous_question')[0];
            if (pqButton !== null) {
                pqButton.onclick = cancel;
                pqButton.textContent = 'Cancel'
            }
        }
    };

    var finish = function (answers) {
        ga('send', {
            hitType: 'event',
            eventCategory: 'CoronavirusFunding',
            eventAction: 'SubmitAnswers',
            eventLabel: answers.toString(),
            hitCallback: function(){
                window.location.href = "/guidance.html";
            }
        });
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