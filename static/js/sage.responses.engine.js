'use strict';

(function ($) {
    var guidence_template = '<div class="row"><div class="col-md-7 text-left guidence" ><hr><h3>TITLE</h3></div></div><div class="row"><div class="col-md-7 text-left"><h6>TEXT</h6></div></div>'
    var link_template = '<div class="row"><div class="col-md-7 text-left link"><a href="URL" onclick="trackOutboundLink(TITLE); return true;" target="_blank">TEXT<img class="url_arrow" src="static/images/url_arrow.svg"></a></div></div>';
    var responses;

    var tryLoadResponses = function(callback) {
        var test = (window.sfcoronavirus) && (window.sfcoronavirus.responses);

        setTimeout(function () {
            if (!test) {
                tryLoadResponses(callback);
            } else {
                responses = window.sfcoronavirus.responses;
                callback();
            }
        }, 200)
    };

    var restart = function () {
        event.preventDefault();
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));

        ga('send', {
            hitType: 'event',
            eventCategory: 'CoronavirusFunding',
            eventAction: 'RestartFlow',
            eventLabel: 'N/A',
            hitCallback: function(){
                window.location.href = "/";
            }
        });
    };

    var fillPage = function () {
        var answers = JSON.parse(localStorage.getItem('answers'));
        var guidences = '';

        for (var i = 0; i < responses.length; i++) {
            var r = responses[i];
            if(checkPrereqs(r.prerequisites, answers)) {
                guidences = guidences.concat(guidence_template.replace('TITLE',r.guidance.title).replace('TEXT', r.guidance.text));
                for(var j=0;j<r.links.length;j++) {
                    var link = r.links[j];
                    guidences = guidences.concat(link_template.replace('TEXT', link.text).replace('URL', link.url).replace('TITLE', "'" + r.guidance.title + "'"));
                }
            }
        }

        document.getElementById('guidences').innerHTML = guidences;
    }

    // needs to be global as it's called directly by onclick handler
    window.trackOutboundLink = function(topic) {
        ga('send', {
            hitType: 'event',
            eventCategory: 'CoronavirusFunding',
            eventAction: 'OutboundLink',
            eventLabel: topic
        });
    };

    var init = function () {
        localStorage.setItem('page', '1');
        tryLoadResponses(fillPage);
    }

    $(document).ready(function () {
        var restartButton = $('#restart_button')[0];
        if (restartButton !== null) {
            restartButton.onclick = restart;
            init();
        }
        init();
    });
})(jQuery);