$(document).ready(function () {
    $('#loginForm').hide()
    $('#signupForm').show()

    $('#toSignUp').click(function () {
        toSignUp()
    })

    $('#toLogin').click(function () {
        toLogin()
    })

    function toLogin() {
        $('#loginForm').show()
        $('#signupForm').hide()
    }

    function toSignUp() {
        $('#loginForm').hide()
        $('#signupForm').show()
    }

    $("#signupbtn").on("click", function () {
        var firstname = $("#first_name").val();
        var lastname = $("#last_name").val();
        var email = $("#email").val();
        var pwd = $("#pwd").val();
        var cpwd = $("#cpwd").val();

        var firstnameInput = $("#firstnameInput");
        var lastnameInput = $("#lastnameInput");
        var emailInput = $("#emailInput");
        var pwdInput = $("#pwdInput");
        var cpwdInput = $("#cpwdInput");

        // Input field has empty value
        if (!firstname || !lastname || !email || !pwd || !cpwd) {
            if (!firstname) {
                firstnameInput.text("Filed must not be empty");
            }
            if (!lastname) {
                lastnameInput.text("Filed must not be empty");
            }
            if (!email) {
                emailInput.text("Filed must not be empty");
            }
            if (!pwd) {
                pwdInput.text("Filed must not be empty");
            }
            if (!cpwd) {
                cpwdInput.text("Filed must not be empty");
            }
            return false;
        }

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            pwd: pwd,
            cpwd: cpwd
        }


        axios.post('http://localhost:3000/api/user/signup', data)
            .then(function (response) {
                var error = response.data['error'];

                if (response.data['success']) {
                    alert('Sign up successfully, you can login now');
                    toLogin()
                    return false
                }

                firstnameInput.text("");
                lastnameInput.text("");
                emailInput.text("");
                pwdInput.text("");
                cpwdInput.text("");

                if (('pwdConfirm' in error)) {
                    cpwdInput.text(error['pwdConfirm']);
                }

                if (('password' in error)) {
                    pwdInput.text(error['possword']);
                }

                if (('email' in error)) {
                    emailInput.text(error['email']);
                }

                if (('fail' in error)) {
                    emailInput.text(error['fail']);
                }

                if (response.data['success']) {
                    alert('Sign up successfully, you can login now');
                    toLogin()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    function clearAll() {
        $('#first_name').text("");
        $('#last_name').text("");
        $('#email').text("");
        $('#pwd').text("");
        $('#cpwd').text("");

        $('#firstnameInput').text("");
        $('#lastnameInput').text("");
        $('#emailInput').text("");
        $('#pwdInput').text("");
        $('#cpwdInput').text("");
    }

    $('#clearButton').on('click', function () {
        clearAll()
    })

    $('#verify').on('click', function () {
        var email = $('#email').val();
        var data = {
            email: email
        }
        axios.post('http://localhost:3000/api/user/verificate', data)
            .then(function (response) {
                let data = response.data;
                if (data['success']) {
                    alert('Verification email sent successfully');
                } else {
                    alert(data['error']['email'])
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        return false;
    })

    $("#signinbtn").on("click", function () {
        var email = $("#email1").val();
        var pwd = $("#pwd1").val();

        var emailInput = $("#emailInput1");
        var pwdInput = $("#pwdInput1");

        if (!email || !pwd) {
            if (!email) {
                emailInput.text("Filed must not be empty");
            }
            if (!pwd) {
                pwdInput.text("Filed must not be empty");
            }
            return false;
        }

        const data = {
            email: email,
            pwd: pwd
        }
        axios.post('http://localhost:3000/api/user/signin', data)
            .then(function (response) {
                
                if (response.data['success']) {
                    var token = response.data['token'];
                    localStorage.setItem('token', token);
                    window.location.href = "User.html";
                } else {
                    pwdInput.text('Please check your account and password');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });

});

