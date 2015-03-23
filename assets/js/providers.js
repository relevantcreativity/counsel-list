$(document).ready(function(){
    $('input[name=toggleCentralIssue]').change(function(){
        var v = $(this).val();
        console.log(v);
        $('div[data-central-child] select').val('').trigger("chosen:updated");
        $('div[data-central-child]').hide();
        $('div[data-central-child='+ v +']').show();
    });
});
