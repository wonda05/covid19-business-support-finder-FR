'use strict';

(function ($) {
    var radio_group_template = '<div class="radio_group">OPTIONS</div>';
    var radio_template = '<div class="form-check"><input class="form-check-input" type="radio" name="radios" id="KEY" value="VALUE"><label class="form-check-label" for="KEY">TEXT</label></div>';

    var checkbox_group_template = '<div class="check_group">OPTIONS</div>';
    var checkbox_template = '<div class="form-check"><input class="form-check-input" type="checkbox" value="VALUE" id="KEY"><label class="form-check-label" for="KEY">TEXT</label></div>';

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
        event.preventDefault();
        var page = localStorage.getItem('page');
        var answers = JSON.parse(localStorage.getItem('answers'));
        var form_data = document.forms['form'].getElementsByTagName('input');
        if (checkAnswers(form_data)) {
            for (var i = 0; i < form_data.length; i++) {
                if ($(form_data[i]).prop('checked')) {
                    answers.push(page.concat($(form_data[i]).val()));
                }
            }
            localStorage.setItem('answers', JSON.stringify(answers));
            pageUp();
            fillPage();
        } else {
            showAlert();
        }
    }

    var showAlert = function () {
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
            finish();
    }

    var pageUp = function () {
        var page = localStorage.getItem('page');
        page = parseInt(page);
        localStorage.setItem('page', ++page);
    }

    var finish = function () {
        window.location.href = "/guidance.html";
    }

    // answers = ['1a','2b','3c'];
    // checkPrereqs(['1a','4d']) // pass, as 1a exists in answers
    // checkPrereqs(['1b,2c']) // fail, as neither 1b nor 2c exist in answers
    // checkPrereqs(['1a+4d']) // fail, as 1a and 4d don't both exist in answers
    // checkPrereqs(['1a+2b']) // pass, as 1a and 2b both exist in answers
    // checkPrereqs([]) // pass, as no items to check
    // checkPrereqs() // pass, as no items to check (edge case, as prerequisites should always exist)
    var checkPrereqs = function (pre, answers) {
        var showMustGoOn = false;
        if (pre.length === 0)
            return true;
        for (var z = 0; z < pre.length; z++) {
            var p = pre[z];
            if (p.indexOf(',') > 0) {
                var e = p.split(',');
                var counter = 0;
                for (var x = 0; x < e.length; x++) {
                    if (answers.includes(p))
                        counter++;
                }
                if (counter > 0)
                    showMustGoOn = true;
            } else if (p.indexOf('+') > 0) {
                var e = p.split('+');
                var counter = 0;
                for (var x = 0; x < e.length; x++) {
                    if (answers.includes(p))
                        counter++;
                }
                if (counter === e.length)
                    showMustGoOn = true;
            } else {
                if (answers.includes(p)) {
                    showMustGoOn = true;
                    break;
                }
            }
        }

        return showMustGoOn;
    }

    var init = function () {
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));
        tryLoadQuestions(fillPage);
    }

    $(document).ready(function () {
        var nqButton = $('#next_question')[0];
        if (nqButton !== null) {
            nqButton.onclick = parseAnswers;
            init();
        }
    });
})(jQuery);