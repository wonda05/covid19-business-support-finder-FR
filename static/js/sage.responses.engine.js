'use strict';

(function ($) {
    var guidence_template = '<div class="row"><div class="col-md-7 text-left guidence" ><h3>TITLE</h3></div></div><div class="row"><div class="col-md-7 text-left"><h6>TEXT</h6></div></div>'
    var link_template = '<div class="row"><div class="col-md-7 text-left link"><a href="URL" target="_blank">TEXT</a></div></div>';
    var fillPage = function () {
        var answers = JSON.parse(localStorage.getItem('answers'));
        var guidences = '';
        var responses = input.responses;

        for (var i = 0; i < responses.length; i++) {
            var r = responses[i];            
            if(checkPrereqs(r.prerequisites, answers)) {
                guidences = guidences.concat(guidence_template.replace('TITLE',r.guidance.title).replace('TEXT', r.guidance.text));
                for(var j=0;j<r.links.length;j++) {
                    var link = r.links[j];
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
        fillPage();
    }

    $(document).ready(function () {
        init();
    });
})(jQuery);