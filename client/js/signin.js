// for sign in 
console.log("entered")
$(document).ready(function () {
    $("#signinbtn").on("click", function () {
        var email = $("#email").val();
        var pwd = $("#pwd").val();

        var emailInput = $("#emailInput");
        var pwdInput = $("#pwdInput");

        const data = {
            email: email,
            pwd: pwd
        }
        axios.post('http://localhost:3000/api/user/signin', data)
            .then(function (response) {
                var error = response.data['error'];
                emailInput.text("");
                pwdInput.text("");

                if (error) {
                    if (email == "") {
                        emailInput.text(error.email);
                        console.log("this is error" + error);
                        console.log("error in email")
                    }
                    if (pwd == "") {
                        pwdInput.text(error.password);
                        console.log("this is error2" + error);
                        // pwd.innerHTML="error in password";
                        console.log("error in password")
                    }
                    // 可能还需要加判断账号密码正确性
                }

                if (response.data['success']) {
                    // alert 会优先执行并且阻塞页面渲染
                    setTimeout(function () {
                        alert(response.data['success']);
                        window.location.href = "Main.html";
                    }, 1000);
                    console.log("success - server")
                } else {
                    console.log("error occurs")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});