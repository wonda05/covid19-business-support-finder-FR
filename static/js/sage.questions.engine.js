'use strict';

(function ($) {
    var select_template = '<div class="row"><div class="col-md-7 col-centered"><div class="input-group mb-3"><div class="input-group-prepend"><label class="input-group-text" for="inputGroupSelect01">LABEL</label></div><select class="custom-select" id="inputGroupSelect01"><option disabled="disabled" selected></option>OPTIONS</select></div></div></div>';
    var option_template = '<option value="VALUE">TEXT</option>';
    var qs;

    var tryLoadQuestions = function(callback) {
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
        var form_data = document.forms["form"].getElementsByTagName("select");
        if (checkAnswers(form_data)) {
            for (var i = 0; i < form_data.length; i++) {
                answers.push(page.concat($(form_data[i]).find('option:selected').val()));
            }
            localStorage.setItem('answers', JSON.stringify(answers));
            pageUp();
            fillPage();
        } else {
            showAlert();
        }
    }

    var showAlert = function() {
        let alertMessage = 'Please make a choice.'
        $("#alert_place").animate({
            height: '+=72px'
        }, 300);
       $('<div class="alert alert-danger customAlert">' +
                '<button type="button" class="close" data-dismiss="alert">' +
                '&times;</button>'+alertMessage+'</div>').hide().appendTo('#alert_place').fadeIn(1000);

      $(".alert").delay(3000).fadeOut(
      "normal",
      function(){
        $(this).remove();
      });

       $("#alert_place").delay(4000).animate({
            height: '-=72px'
        }, 300);
    }

    var checkAnswers = function (form_data) {
        var counter = 0;
        for (var i = 0; i < form_data.length; i++) {
            if ($(form_data[i]).find('option:selected').val().length > 0) {
                counter++;
            }
        }

        return counter === form_data.length;
    }

    var fillPage = function () {
        var answers = JSON.parse(localStorage.getItem('answers'));
        var result = '';
        var finalize = true;
        for (var i = 0; i < qs.length; i++) {
            var q = qs[i];
            if (q.number === parseInt(localStorage.getItem('page'))) {
                if (checkPrereqs(q.prerequisites, answers)) {
                    $('#question_tittle').text(q.question.title);
                    $('#question_gaidance').text(q.question.text);
                    var options = '';
                    for (var j = 0; j < q.answers.length; j++) {
                        var option = q.answers[j];
                        options = options.concat(option_template.replace("TEXT", option.text).replace("VALUE", option.value));
                    }
                    result = result.concat(select_template.replace("LABEL", 'Choose..').replace("OPTIONS", options));
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