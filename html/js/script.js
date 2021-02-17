$(document).ready(function () {
    $("#textarea").keyup(function () {
        $(this).css('overflow','hidden')
        while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height()+1);
            // if($(this).height > 500) $(this).height(500);
        };
        $("#remaining-text").text((500 - $(this).val().length));
    });

    $("#login-button").click(function () {
        var email = document.getElementById("input-email").value;
        var password = document.getElementById("input-password").value;
        console.log("EMAIL ", email, " PASSWORD ", password)
        // $(this).css('overflow','hidden')
        // while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        //     $(this).height($(this).height()+1);
        //     // if($(this).height > 500) $(this).height(500);
        // };
        // $("#remaining-text").text((500 - $(this).val().length));

    });
});
