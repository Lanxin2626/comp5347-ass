// for sign in 

$(document).ready(function() {
    $("#signinbtn").on("click",function() {
        var email = $("#email").val();
        var psw = $("#psw").val();

        var emailInput = $("#emailInput");
        var pswInput = $("#pswInput");

        const data = {
            email:email,
            psw:psw
        }
        axios.post('http://localhost:3000/api/user/signin', data)
            .then(function (response) {
                var error = response.data['error'];
                emailInput.text("");
                pswInput.text("");

                // if (error) {
                //     if (email == "") {
                //         emailInput.text(error.email);
                //     }
                //     if (pwd == "") {
                //         pswInput.text(error.password);
                //     }
                //     // 可能还需要加判断账号密码正确性
                // }

                if (response.data['success']) {
                    // alert 会优先执行并且阻塞页面渲染
                    setTimeout(function () {
                        alert(response.data['success']);
                        window.location.href = "Main.html";
                    }, 1000);
                    console.log("success - server")
                } else{
                    console.log("error occurs")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});