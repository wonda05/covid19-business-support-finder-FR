'use strict';

(function ($) {
    let guidence_template = '<div class="row"><div class="col-md-7 text-left guidence" ><h3>TITLE</h3></div></div><div class="row"><div class="col-md-7 text-left"><h6>TEXT</h6></div></div>'
    let link_template = '<div class="row"><div class="col-md-7 text-left link"><a href="URL" target="_blank">TEXT</a></div></div>';
    let fillPage = function () {
        let answers = JSON.parse(localStorage.getItem('answers'));
        let guidences = '';
        let responses = input.responses;

        for (let i = 0; i < responses.length; i++) {
            let r = responses[i];            
            if(checkPrereqs(r.prerequisites, answers)) {
                guidences = guidences.concat(guidence_template.replace('TITLE',r.guidance.title).replace('TEXT', r.guidance.text));
                for(let j=0;j<r.links.length;j++) {
                    let link = r.links[j];
                    guidences = guidences.concat(link_template.replace('TEXT', link.text).replace('URL', link.url));
                }
            }
        }

        document.getElementById('guidences').innerHTML = guidences;
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

    var init = function () {
        localStorage.setItem('page', '1');
        fillPage();
    }

    $(document).ready(function () {
        init();
    });
})(jQuery);