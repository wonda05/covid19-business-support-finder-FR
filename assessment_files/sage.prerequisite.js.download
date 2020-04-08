// answers = ['1a','2b','3c'];
// checkPrereqs(['1a','4d']) // pass, as 1a exists in answers
// checkPrereqs(['1b,2c']) // fail, as neither 1b nor 2c exist in answers
// checkPrereqs(['1a+4d']) // fail, as 1a and 4d don't both exist in answers
// checkPrereqs(['1a+2b']) // pass, as 1a and 2b both exist in answers
// checkPrereqs(['1a+2b','1a+2c']) // pass, as 1a and 2b both exist in answers
// checkPrereqs([]) // pass, as no items to check
// checkPrereqs() // pass, as no items to check (edge case, as prerequisites should always exist)
function checkPrereqs(prerequisites, answers) {
    // if no pre-requisites defined, return true
    if (prerequisites.length === 0) {
        return true;
    }

    // check each pre-requisite, returning true as soon as a match is found
    for (var z = 0; z < prerequisites.length; z++) {
        var counter = 0;
        var prereq = prerequisites[z];

        // split any pre-requisites with a + so we can check compound pre-requisites too
        var group = prereq.split('+');

        // for each group (some may be single entry), return true if all answers in the group were provided
        for (var x = 0; x < group.length; ++x) {
            var foundAnswer = answers.find(function(answer) {
                return answer === group[x];
            });

            if (foundAnswer) {
                counter++;
            }

            // return true as soon as the number of matches equals the length of the group
            // (works for simple and compound pre-requisites)
            if (counter === group.length) {
                return true;
            }
        }
    }

    return false;
}