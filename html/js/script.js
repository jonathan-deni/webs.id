function textAreaAdjust(element) {
    var textleft = document.getElementById('remaining-text');

    const max-length = 500;

    element.style.height = "1px";
    element.style.height = (25+element.scrollHeight)+"px";



}
$("#textarea").keyup(function(){
    $(this).style.height = "1px";
    $(this).style.height = (25+element.scrollHeight)+"px";
    $("#remaining-text").text((500 - $(this).val().length));
});
