$(document).ready(function() {
    $("#confirm_email").on("click",function() {
        var email = $("#email").val();
        console.log("email is "+email)

        const data = {
            email: email
        }
        axios.post('http://localhost:3000/api/user/edit_profile', data)
            .then(function (response) {
                

                

                
            })
        
    });
});


