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

        loginElm.style.display="block"
        notLoginElm.style.display = "none";
        setCookie('websToken', websToken, 1)
    }
}


$(window).on('load', function() {
    var loginElm = document.getElementById("logged-in-element");
    var notLoginElm = document.getElementById("not-login-element");

    if(getCookie('websToken')) {
        loginElm.style.display = "block";
        notLoginElm.style.display = "none"
    } else {
        loginElm.style.display = "none";
        notLoginElm.style.display = "block"
    }
})


$(document).ready(function () {

    var token;

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
                if(!data.success){
                    alert(data.msg);
                }else{
                    console.log('server token',data.data.token.token)
                    $.modal.close()
                    var websToken = data.data.token.token
                    token = websToken;
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
                }
            }
        });

    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            return reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }

    var ktpOrg;
    var dokumenOrg;

    $("#ktp-org").change(function() {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);
            reader.onload = function () {
                ktpOrg = reader.result;
            };
        }
    });

    $("#dokumen-org").change(function() {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);
            reader.onload = function () {
                dokumenOrg = reader.result;
            };
        }
    });

    $('#create-organization').click(function(){
        var name = document.getElementById("organization-name").value;
        var about = document.getElementById("about-name").value;
        var subdomain = document.getElementById("sub-domain-name").value;
        var alamat = document.getElementById("alamat-org").value;

        var jsonRequest =
            {
                token: token,
                name: name,
                subdomain: subdomain,
                about: about,
                dokumenktp: ktpOrg,
                dokumenorganisasi: dokumenOrg,
                alamat: alamat
            }
            console.log('jsonRequest', jsonRequest);
        $.ajax({
            url: 'https://webs.id/api/organization',
            type: 'post',
            data: jsonRequest,
            success: function (data) {
                if (data.success) {
                    $.modal.close()
                }
            }
        });
    });
});
