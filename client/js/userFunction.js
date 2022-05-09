$(document).ready(function () {

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
                let message = error.response.data['message']
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
            let message = error.response.data['message']
            $('#updatePassword').text(message)
        })
    })

    $("#addListingSubmit").on("click", function () {
        var brand = document.getElementById('addBrand');
        var imageUrl = document.getElementById('addImageUrl');
        var price = document.getElementById('addPrice');
        var stock = document.getElementById('addStock');
        var title = document.getElementById('addTitle');
        var disabled = document.getElementById('addDisabled');

        data = {
            "brand": brand.value,
            "image": imageUrl.value,
            "price": parseFloat(price.value),
            "stock": parseInt(stock.value),
            "title": title.value,
            "disabled": disabled.value
        }

        axios.post('http://localhost:3000/api/userop/add_listing', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let message = response.data['message'];
            alert(message)

            brand.value = ""
            imageUrl.value = ""
            price.value = ""
            stock.value = ""
            title.value = ""
            disabled.value = ""
            $('#addListingError').text("")
            retrieveListings()
        }).catch(function (error) {
            let message = error.response.data['message']
            $('#addListingError').text(message)
        })
    })

    function retrieveListings() {
        axios.get('http://localhost:3000/api/userop/listing', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data['data']['listings']
            let tableContent = document.getElementById("TableContent")
            tableContent.innerHTML = ""
            // data is a list of listings
            for (let i = 0; i < data.length; i++) {
                let listing = data[i]
                let tempRow = createTableRow(listing)
                tableContent.appendChild(tempRow)
            }
            console.log(tableContent)
        }).catch(function (error) {
            alert(error.response.data['message'] + "\n Please login")
        })
    }

    function createTableRow(listing) {
        let row = document.createElement('tr')
        let brand = document.createElement('td')
        let image = document.createElement('td')
        let price = document.createElement('td')
        let stock = document.createElement('td')
        let title = document.createElement('td')
        let disabled = document.createElement('td')

        let deleteButtonCell = document.createElement('td')

        brand.innerText = listing['brand']
        image.innerText = listing['image']
        price.innerText = listing['price']
        stock.innerText = listing['stock']
        title.innerText = listing['title']
        disabled.innerText = listing['disabled']


        let deleteButton = document.createElement('Button')
        deleteButton.innerHTML = "Delete"
        deleteButton.setAttribute('id', listing['_id'])

        deleteButtonCell.appendChild(deleteButton)

        deleteButton.onclick = function (event) {

            event.preventDefault()
            
            let id = this.getAttribute('id')
            axios.post(`http://localhost:3000/api/userop/del_listing?phoneId=${id}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            }
            ).then(function (response) {
                let message = response.data['message']
                alert(message)
                retrieveListings()
            }).catch(function (error) {
                let message = error.response.data['message']
                $('#tableError').text(message)
            })
        }
        row.appendChild(brand)
        row.appendChild(image)
        row.appendChild(price)
        row.appendChild(stock)
        row.appendChild(title)
        row.appendChild(disabled)
        row.appendChild(deleteButtonCell)
        return row
    }

    retrieveListings()
})