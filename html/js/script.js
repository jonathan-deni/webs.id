function getCookie(cname, cvalue, exdays) {
    var result = document.cookie.match(new RegExp(cname) + '=([^;]+)')

    result && (result = JSON.parse(result[1]));
    return result
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setLoggedInUser(websToken, email) {
    var loginElm = document.getElementById("logged-in-element");
    var notLoginElm = document.getElementById("not-login-element");

    if (!websToken) {
        loginElm.style.display = "none";
        notLoginElm.style.display = "block"
    } else {
        document.querySelector('#profile-email').textContent = email;
        document.querySelector('#profile-email').innerText = email;

        loginElm.style.display = "block"
        notLoginElm.style.display = "none";
        setCookie('websToken', websToken, 1)
    }
}


$(window).on('load', function () {
    var loginElm = document.getElementById("logged-in-element");
    var notLoginElm = document.getElementById("not-login-element");

    if (getCookie('websToken')) {
        loginElm.style.display = "block";
        notLoginElm.style.display = "none"
    } else {
        loginElm.style.display = "none";
        notLoginElm.style.display = "block"
    }
})


$(document).ready(function () {
    $("#textarea").keyup(function () {
        $(this).css('overflow', 'hidden')
        while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height() + 1);
            // if($(this).height > 500) $(this).height(500);
        };
        $("#remaining-text").text((500 - $(this).val().length));
    });

    $("#rightheader").on(function () {
        $(this).css('overflow', 'hidden')
        while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
            $(this).height($(this).height() + 1);
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
                if (!data.success) {
                    alert(data.msg);
                } else {
                    console.log('server token', data.data.token.token)
                    $.modal.close()
                    var websToken = data.data.token.token
                    setLoggedInUser(websToken, email);
                }
            }
        });
    });

    $("#regist-button").click(function () {
        var email = document.getElementById("regist-email-input").value;
        var password = document.getElementById("regist-password-input").value;
        var name = document.getElementById("regist-name-input").value;
        var username = document.getElementById("regist-username-input").value;

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
                if (data.success) {
                    $.modal.close()
                    $("#email-verify-popup").modal()
                }
            }
        });

    });

    $("#post-event-idea").click(function () {
        $("#choose-idea-popup").modal({
            closeExisting: false
        })
    })

    $('input:radio[name="idea"]').change(
        function () {
            if ($(this).is(':checked')) {
                $('#post-event-idea').val($(this).val())
            }
        });


});