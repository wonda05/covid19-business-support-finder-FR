'use strict';

(function($) {
    var fileContents = {
        questions: null,
        responses: null
    };

    var init = function() {
        loadFile('questions');
        loadFile('responses');
    };

    var transformers = {
        // transforms questions.csv to the model to be consumed by the UI
        questions: function(content) {
            $('#parsed-file').append('<h2>Questions</h2>');

            var array = []

            // loop over each row in the file (headers are already removed by the jQuery CSV plugin)
            for (var i = 0; i < content.length; i++) {
                var original = content[i];

                // map to format in model.json
                var transformedQuestion = {
                    number: +original.questionSequence, // coerce to integer
                    question: {
                        title: original.questionTitle,
                        text: original.questionText
                    },
                    type: original.answerType,
                    prerequisites: original.prerequisites ? original.prerequisites.split(',') : [],
                    answers: [] // populated below
                }

                // the number of questions can vary - detecting it here to keep CSV file flexible
                var answerCount = (function() {
                    var keys = Object.keys(original);
                    var matches = keys.filter(function(key) {
                        return /^answerText/.test(key);
                    });

                    return matches.length;
                })();

                for (var j = 1; j <= answerCount; j++) { // increment from 1 to reflect human numbering in CSV
                    // only attempt to add the answer to the response if we have both text and value
                    if (original['answerText' + j] && original['answerText' + j]) {
                        var answer = {
                            text: original['answerText' + j],
                            value: original['answerValue' + j]
                        }

                        transformedQuestion.answers.push(answer);
                    }
                }

                array.push(transformedQuestion);

                // TODO debugging stuff, remove before use in production
                $('#parsed-file').append('<p>' + JSON.stringify(transformedQuestion) + '</p>');
            }

            return array;
        },
        // transforms responses.csv to the model to be consumed by the UI
        responses: function(content) {
            $('#parsed-file').append('<h2>Responses</h2>');

            var array = []

            // loop over each row in the file (headers are already removed by the jQuery CSV plugin)
            for (var i = 0; i < content.length; i++) {
                var original = content[i];

                // map to format in model.json
                var transformedResponse = {
                    number: +original.responseRef, // coerce to integer
                    guidance: {
                        title: original.guidanceTitle,
                        text: original.guidanceText
                    },
                    prerequisites: original.prerequisites ? original.prerequisites.split(',') : [],
                    links: [] // populated below
                }

                // the number of questions can vary - detecting it here to keep CSV file flexible
                var linkCount = (function() {
                    var keys = Object.keys(original);
                    var matches = keys.filter(function(key) {
                        return /^contentLabel/.test(key);
                    });

                    return matches.length;
                })();

                for (var j = 1; j <= linkCount; j++) { // increment from 1 to reflect human numbering in CSV
                    // only attempt to add the link to the response if we have both text and url
                    if (original['contentLabel' + j] && original['contentURL' + j]) {
                        var link = {
                            text: original['contentLabel' + j],
                            url: original['contentURL' + j]
                        }

                        transformedResponse.links.push(link);
                    }
                }

                array.push(transformedResponse);

                // TODO debugging stuff, remove before use in production
                $('#parsed-file').append('<p>' + JSON.stringify(transformedResponse) + '</p>');
            }

            return array;
        }
    }

    // takes a CSV file and maps it to an array of objects, also mapping headers to cell values
    var parseCsv = function(response, filename) {
        // TODO actually parse file into a format that makes sense to the UI flow.
        var raw = $.csv.toObjects(response);

        // TODO transform row into nested object first
        fileContents[filename] = transformers[filename](raw);
    };
    
    var loadFile = function(filename) {
        $.ajax({
            url: './static/data/' + filename + '.csv',
            statusCode: {
                200: function(response) {
                    parseCsv(response, filename);
                }
            },
            error: function(err) {
                alert(err.responseText || err.message || 'Something has gone wrong');
            }
        });
    };

    // $(document).ready(function() {
    //     init();
    // });
})(jQuery);
