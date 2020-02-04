$(document).ready(function() {
    let withAMPM = moment().format('LT');
    withAMPM = withAMPM.split(' ')[0];
    $('.item-clock').text(withAMPM);
})