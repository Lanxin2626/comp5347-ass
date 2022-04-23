$(document).ready(function() {
    $("#update_password").on("click",function() {
        var new_password = $("#new_password").val();
        var new_password2 = $("#new_password2").val();
        console.log("new_password is "+new_password)
        console.log("new_password2 is "+new_password2)

        const data = {
            new_password: new_password,
            new_password2: new_password2
        }
        axios.post('http://localhost:3000/api/user/edit_profile', data)
            .then(function (response) {
                

                

                
            })
        
    });
});


