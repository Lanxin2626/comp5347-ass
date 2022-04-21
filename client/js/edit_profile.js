// Edit profile: the page shows editable textboxes for first name, last name, email that are pre-filled with the current value. The page includes a button “Update profile” to update the data in the database. When the button is clicked, the user needs to fill in the correct password first.
$(document).ready(function() {
    $("#update_profile").on("click",function() {
        var firstname = $("#first_name").val();
        var lastname = $("#last_name").val();
        var email = $("#email").val();

        console.log("firstname is "+firstname)
        console.log("lastname is "+lastname)
        console.log("email is "+email)

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email
        }
        axios.post('http://localhost:3000/api/user/edit_profile', data)
            .then(function (response) {
                

                

                
            })
        
    });
});


