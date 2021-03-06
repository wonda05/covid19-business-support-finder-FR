'use strict';

(function ($) {
    var button;
    var buttonLoading;
    var start = function () {
        buttonLoading.hidden = false
        button.hidden = true;
        window.location.href = "./assessment.html";
    }

    $(document).ready(function () {
        button = $('#start_button')[0];
        buttonLoading = $('#start_button_loading')[0];
        if (button !== null) {
            button.onclick = start;
        }
    });
})(jQuery);