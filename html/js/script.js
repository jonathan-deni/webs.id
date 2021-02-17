$(document).ready(function () {
    $("#textarea").keyup(function () {
        $(this).css('overflow','hidden')
        while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height()+1);
            // if($(this).height > 500) $(this).height(500);
        };
        $("#remaining-text").text((500 - $(this).val().length));
    });
});
