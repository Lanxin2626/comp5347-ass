$(document).ready(function() {

    var first_name = document.getElementById("first_name")
    var last_name = document.getElementById("last_name")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    function extract_profile() {
        // extract the user profile data from the database
        axios.get('http://localhost:3000/api/userop/profile', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data['data']
            first_name.value = data['firstname']
            last_name.value = data['lastname']
            email.value = data['email']
        }).catch(function (error) {
            alert(error.response.data['message'] + "\n Please login")
        })
    }

    extract_profile()


    $("#update_profile").on("click", function () {

        const data = {
            firstName: first_name.value,
            lastName: last_name.value,
            email: email.value,
            password: password.value
        }
        console.log(data)
        axios.post('http://localhost:3000/api/userop/edit_profile', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(function (response) {
                let message = response.data['message']
                password.value = "";
                alert(message)
                extract_profile()
            }).catch(function (error) {
                let message  = error.response.data['message']
                $('#updateProfile').text(message)
            })

    });

    $("#update_password").on("click", function () {
        var oldPassword = document.getElementById('cur_pwd')
        var newPassword = document.getElementById('new_pwd')

        data = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        }

        axios.post('http://localhost:3000/api/userop/edit_password', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let message = response.data['message']
            alert(message)

            oldPassword.value = ""
            newPassword.value = ""
            $('#updatePassword').text("")
            
        }).catch(function (error) {
            let message  = error.response.data['message']
            $('#updatePassword').text(message)
        })
    })



})