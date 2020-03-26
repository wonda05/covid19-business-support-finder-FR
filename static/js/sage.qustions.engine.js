'use strict';

(function ($) {
    let select_template = '<div class="row"><div class="col-md-7 col-centered"><div class="input-group mb-3"><div class="input-group-prepend"><label class="input-group-text" for="inputGroupSelect01">LABEL</label></div><select class="custom-select" id="inputGroupSelect01"><option selected></option>OPTIONS</select></div></div></div>';
    let option_template = '<option value="VALUE">TEXT</option>';

    let parseAnswers = function () {
        event.preventDefault();
        let page = localStorage.getItem('page');
        let answers = JSON.parse(localStorage.getItem('answers'));
        let form_data = document.forms["form"].getElementsByTagName("select");
        for (let i = 0; i < form_data.length; i++) {
            answers.push(page.concat($(form_data[i]).find('option:selected').val()));
        }
        localStorage.setItem('answers', JSON.stringify(answers));
        pageUp();
        fillPage();
    }

    let fillPage = function () {        
        let answers = JSON.parse(localStorage.getItem('answers'));
        let result = '';
        let qs = input.questions;
        let finalize = true;
        for (let i = 0; i < qs.length; i++) {
            let q = qs[i];
            if (q.number === parseInt(localStorage.getItem('page'))) {
                if (checkPrereqs(q.prerequisites, answers)) {
                    $('#question_tittle').text(q.question.title);
                    $('#question_gaidance').text(q.question.text);
                    let options = '';
                    for (let j = 0; j < q.answers.length; j++) {
                        let option = q.answers[j];
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

    let pageUp = function () {
        let page = localStorage.getItem('page');
        page = parseInt(page);
        localStorage.setItem('page', ++page);
    }

    let finish = function () {
        window.location.href = "/guidance";
    }

    // answers = ['1a','2b','3c'];
    // checkPrereqs(['1a','4d']) // pass, as 1a exists in answers
    // checkPrereqs(['1b,2c']) // fail, as neither 1b nor 2c exist in answers
    // checkPrereqs(['1a+4d']) // fail, as 1a and 4d don't both exist in answers
    // checkPrereqs(['1a+2b']) // pass, as 1a and 2b both exist in answers
    // checkPrereqs([]) // pass, as no items to check
    // checkPrereqs() // pass, as no items to check (edge case, as prerequisites should always exist)
    let checkPrereqs = function (pre, answers) {
        let showMustGoOn = false;
        if (pre.length === 0)
            return true;
        for (let z = 0; z < pre.length; z++) {
            let p = pre[z];
            if (p.indexOf(',') > 0) {
                let e = p.split(',');
                let counter = 0;
                for (let x = 0; x < e.length; x++) {
                    if (answers.includes(p))
                        counter++;
                }
                if (counter > 0)
                    showMustGoOn = true;
            } else if (p.indexOf('+') > 0) {
                let e = p.split('+');
                let counter = 0;
                for (let x = 0; x < e.length; x++) {
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

    let init = function () {
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));
        fillPage();
    }

    $(document).ready(function() {
        let nqButton = $('#next_question')[0];
        if(nqButton !== null){
            nqButton.onclick = parseAnswers;
            init();
        }
    });
})(jQuery);