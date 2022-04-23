// for sign up
$(document).ready(function() {
    $("#signupbtn").on("click",function() {
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

        const data = {
            firstname: firstname,
            lastname:lastname,
            email:email,
            pwd:pwd,
            cpwd:cpwd
        }
        axios.post('http://localhost:3000/api/user/signup', data)
            .then(function (response) {
                var error = response.data['error'];
                firstnameInput.text("");
                lastnameInput.text("");
                emailInput.text("");
                pwdInput.text("");
                cpwdInput.text("");

                if (error) {
                    if (firstname == "") {
                        firstnameInput.text(error.firstname);
                    }
                    if (lastname == "") {
                        lastnameInput.text(error.lastname);
                    }
                    if (email == "") {
                        emailInput.text(error.email);
                    }
                    if (pwd == "") {
                        pwdInput.text(error.password);
                    }
                    if (cpwd == "" || pwd != cpwd) {
                        cpwdInput.text(error.pwdConfirm);
                    }
                    // 可能还需要加
                }

                if (response.data['success']) {
                    // alert 会优先执行并且阻塞页面渲染
                    setTimeout(function () {
                        alert(response.data['success']);
                        window.location.href = "Signin.html";
                    }, 1000);
                    console.log("success - server")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});