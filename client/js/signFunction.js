$(document).ready(function () {
    $('#loginForm').show()
    $('#signupForm').hide()
    $('#resetForm').hide()

    $('#toSignUp').click(function () {
        toSignUp()
    })

    $('#toLogin').click(function () {
        toLogin()
    })

    $('#resetPasswordButton').click(function () {
        toReset()
    })

    function toLogin() {
        $('#loginForm').show()
        $('#signupForm').hide()
        $('#resetForm').hide()
    }

    function toSignUp() {
        $('#loginForm').hide()
        $('#signupForm').show()
        $('#resetForm').hide()
    }

    function toReset() {
        $('#loginForm').hide()
        $('#signupForm').hide()
        $('#resetForm').show()
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

        firstnameInput.text("")
        lastnameInput.text("")
        emailInput.text("")
        pwdInput.text("")
        cpwdInput.text("")

        // Input field has empty value
        if (!firstname || !lastname || !email || !pwd || !cpwd) {
            if (!firstname) {
                firstnameInput.text("Field must not be empty");
            }
            if (!lastname) {
                lastnameInput.text("Field must not be empty");
            }
            if (!email) {
                emailInput.text("Field must not be empty");
            }
            if (!pwd) {
                pwdInput.text("Field must not be empty");
            }
            if (!cpwd) {
                cpwdInput.text("Field must not be empty");
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
                if (('password' in error)) {
                    cpwdInput.text(error['password']);
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
                    alert(data['success']);
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

        emailInput.text("")
        pwdInput.text("")

        if (!email || !pwd) {
            if (!email) {
                emailInput.text("Field must not be empty");
            }
            if (!pwd) {
                pwdInput.text("Field must not be empty");
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
        			showMain_history();
                    //window.location.href = "MainPage.html";
                    emailInput.text("")
                    pwdInput.text("")
                } else {
                    pwdInput.text('Please check your account and password');
                }
            })
            .catch(function (error) {
                console.log(error);
                emailInput.text('')
                pwdInput.text('')
            });
    });

    $('#sendRestEmail').on("click", function (event) {
        event.preventDefault()


        let email = $('#resetEmail').val()
        let data = {
            email: email
        }

        axios.post('http://localhost:3000/api/user/resetPwd', data)
            .then(function (response) {
                let data = response.data;
                if (data['success']) {
                    alert(data['success']);
                    console.log("xxxxxx click");
                    $('#sendRestEmail').prop('disabled', true);
                } else {
                    alert(data['error']['email'])
                }
            })
            .catch(function (error) {
                let data = error.response.data;
                alert(data['error']['email'])
            })
    })

    $('#sendResetPassword').on("click", function (event) {
        event.preventDefault()
        console.log("xxxxx you ard click");
        let pwd1 = $('#reset_new_password').val()
        let pwd2 = $('#reset_new_password2').val() 
        $('#errorpwd1').text("");
        $('#errorpwd2').text("");
        //errorpwd1.text("")
        //errorpwd2.text("")

        let data =  {
            "pwd": pwd1,
            "cpwd": pwd2
        }

        axios.post("http://localhost:3000/api/user/inputPwd", data).then(function (response) {
            let data = response.data;
                if (data['success']) {
                    alert(data['success']);
                    $('#errorpwd1').text("");
                    $('#errorpwd2').text("");
                    $('#sendResetPassword').prop('disabled', true);
                    location.href='SignPage.html';
                }     
                else {
                    let errorMessage = data['error']
                 
                    if (pwd1==""&&errorMessage['pwd']) {
                        $('#errorpwd1').text(errorMessage['pwd'])
                    }
                    if (pwd2==""&&errorMessage['cpwd']) {
                        $('#errorpwd2').text(errorMessage['cpwd'])
                    }
                    if(pwd1!=""&&errorMessage['pwdlen']){
                        $('#errorpwd1').text(errorMessage['pwdlen'])
                    }
                    if (errorMessage['fail']) {
                        $('#errorpwd2').text(errorMessage['fail'])
                    }

                }    

        })
    })
});