// answers = ['1a','2b','3c'];
// checkPrereqs(['1a','4d']) // pass, as 1a exists in answers
// checkPrereqs(['1b,2c']) // fail, as neither 1b nor 2c exist in answers
// checkPrereqs(['1a+4d']) // fail, as 1a and 4d don't both exist in answers
// checkPrereqs(['1a+2b']) // pass, as 1a and 2b both exist in answers
// checkPrereqs([]) // pass, as no items to check
// checkPrereqs() // pass, as no items to check (edge case, as prerequisites should always exist)
function checkPrereqs(pre, answers) {
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