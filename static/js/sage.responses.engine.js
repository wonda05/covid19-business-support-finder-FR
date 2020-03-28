'use strict';

(function ($) {
    var guidence_template = '<div class="row justify-content-center"><div class="col-lg-8 col-md-10 text-left guidence" ><hr><h3>TITLE</h3></div></div><div class="row justify-content-center"><div class="col-lg-8 col-md-10 text-left"><h6>TEXT</h6></div></div>'
    var link_template = '<div class="row justify-content-center"><div class="col-lg-8 col-md-10 text-left link"><a href="URL" onclick="trackOutboundLink(TITLE); return true;" target="_blank">TEXT<img class="url_arrow" src="static/images/url_arrow.svg"></a></div></div>';
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

    var trySendAnalytics = function(category, action, label, callback) {
        if (window.ga) {
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                hitCallback: function(){
                    callback();
                }
            });
        } else {
            callback()
        }
    };

    var restart = function () {
        event.preventDefault();
        localStorage.setItem('page', '1');
        localStorage.setItem('answers', JSON.stringify([]));

        var callback = function(){
            window.location.href = "./";
        };
        trySendAnalytics('CoronavirusFunding', 'RestartFlow', 'N/A', callback);
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
        var callback = function() {};
        trySendAnalytics('CoronavirusFunding', 'OutboundLink', topic, callback);
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