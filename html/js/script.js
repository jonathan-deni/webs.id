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
        var email = document.getElementById("login-email-input").value;
        var password = document.getElementById("login-password-input").value;

        var jsonRequest =
        {
            email: email,
            password: password
        }
        $.ajax({
            url: 'https://webs.id/api/login',
            type: 'post',
            data: jsonRequest,
            success: function (data) {
                console.log("<<<LOGIN RESPONSE ", data)
                if(data.userId == 0){
                    alert(data.status.message);
                }else{
                    userid = data.userId;
                    setLoggedInUser(data);
                }
            }
        });
        console.log("LOGIN EMAIL ", email, " PASSWORD ", password)
        // $(this).css('overflow','hidden')
        // while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        //     $(this).height($(this).height()+1);
        //     // if($(this).height > 500) $(this).height(500);
        // };
        // $("#remaining-text").text((500 - $(this).val().length));

    });

    $("#regist-button").click(function () {
        var email = document.getElementById("regist-email-input").value;
        var password = document.getElementById("regist-password-input").value;
        var name = document.getElementById("regist-name-input").value;
        var username = document.getElementById("regist-username-input").value;
        
        console.log("REGISTER EMAIL ", email, " PASSWORD ", password)
        var jsonRequest =
        {
            email: email,
            name: name,
            username: username,
            password: password
        }
        $.ajax({
            url: 'https://webs.id/api/register',
            type: 'post',
            data: jsonRequest,
            success: function (data) {
                console.log("<<<REGIST RESPONSE ", data)
                if(data.userId == 0){
                    alert(data.status.message);
                }else{
                    userid = data.userId;
                    setLoggedInUser(data);
                }
            }
        });
        // $(this).css('overflow','hidden')
        // while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        //     $(this).height($(this).height()+1);
        //     // if($(this).height > 500) $(this).height(500);
        // };
        // $("#remaining-text").text((500 - $(this).val().length));

    });
});
