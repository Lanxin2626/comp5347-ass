$(document).ready(function () {
    showProfileTab()

    // implement tab switching
    function showProfileTab() {
        $('#profileForm').show();
        $('#changePasswordForm').hide();
        $('#manageListingForm').hide();
        $('#addListingForm').hide();
        $('#viewCommentForm').hide();
        extract_profile();
    }

    function showChangePasswordTab() {
        $('#profileForm').hide();
        $('#changePasswordForm').show();
        $('#manageListingForm').hide();
        $('#addListingForm').hide();
        $('#viewCommentForm').hide();
    }

    function showManageListingTab() {
        $('#profileForm').hide();
        $('#changePasswordForm').hide();
        $('#manageListingForm').show();
        $('#addListingForm').hide();
        $('#viewCommentForm').hide();

        retrieveListings()
    }

    function showAddListingTab() {
        $('#profileForm').hide();
        $('#changePasswordForm').hide();
        $('#manageListingForm').hide();
        $('#addListingForm').show();
        $('#viewCommentForm').hide();
    }

    function showViewCommentTab() {
        $('#profileForm').hide();
        $('#changePasswordForm').hide();
        $('#manageListingForm').hide();
        $('#addListingForm').hide();
        $('#viewCommentForm').show();

        retrieveComments()
    }

    $('#profileTab').click(function () {
        showProfileTab()
    })

    $('#changePasswordTab').click(function () {
        showChangePasswordTab()
    })

    $('#manageListingTab').click(function () {
        showManageListingTab()
    })

    $('#addListingTab').click(function (event) {
        event.preventDefault()
        showAddListingTab()
    })

    $('#viewCommentTab').click(function () {
        showViewCommentTab()
    })


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
            alert(error.response.data['message'])
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
            alert(error.response.data['message'])
            
            if (error.response.status === 404) {
                let tableContent = document.getElementById("TableContent")
                tableContent.innerHTML = ""
            }
        })
    }

    function createTableRow(listing) {
        let row = document.createElement('tr')
        let brand = document.createElement('td')
        let image = document.createElement('td')
        let price = document.createElement('td')
        let stock = document.createElement('td')
        let title = document.createElement('td')

        let disabledButtonCell = document.createElement('td')
        let deleteButtonCell = document.createElement('td')
        

        brand.innerText = listing['brand']
        image.innerText = listing['image']
        price.innerText = listing['price']
        stock.innerText = listing['stock']
        title.innerText = listing['title']


        let disableButton = document.createElement('Button')
        let content = ""
        let state = ""
        if (listing['disabled'] === "false") {
            content = "Disable"
            state = "true"
        } else {
            content = "Enable"
            state = "false"
        }
        disableButton.innerHTML = content
        disableButton.setAttribute('value', listing['_id'])
        disableButton.setAttribute('value1', state)

        disabledButtonCell.appendChild(disableButton)

        disableButton.onclick = function (event) {
            event.preventDefault()

            let phoneId = this.getAttribute('value')
            let disabled = this.getAttribute('value1')
            let data = {
                "phoneId": phoneId,
                "disabled": state
            }

            axios.post('http://localhost:3000/api/userop/listing_op', data, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            }).then(function (response) {
                let message = response.data['message']
                alert(message)
                retrieveListings()
            }).catch(function (error) {
                let message = error.response.data['message']
                $('#tableError').text(message)
            })
        }


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
 

        row.appendChild(title)
        row.appendChild(brand)
        row.appendChild(image)
        row.appendChild(stock)
        row.appendChild(price)
        row.appendChild(disabledButtonCell)
        row.appendChild(deleteButtonCell)
        return row
    }

    function retrieveComments() {

        axios.get('http://localhost:3000/api/userop/comments', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            // all comments of phone listing
            let data = response.data['data']['Comments']
            console.log("data is ", data)
            // use createTable function to create multiple tables
            let divPart = document.getElementById('viewCommentContainer')
            divPart.innerHTML = ""
            for(let i=0;i<data.length;i++) {
                let tempData = data[i]
                if (tempData["reviews"].length == 0) {
                    continue
                }
                let tempTable = createTable(tempData['title'], tempData['brand'], tempData['reviews'])
                divPart.appendChild(tempTable)
            }

        }).catch(function (error) {
            alert(error.response.data['message'])
        })

    }

    function createTable(title, brand, reviews) {

        let table = document.createElement('table')
        let tableCaption = document.createElement('caption')
        let tableHead = document.createElement('thead')
        let tableBody = document.createElement('tbody')

        tableCaption.innerHTML = `title: ${title}<br>brand: ${brand}`
        table.appendChild(tableCaption)

        // table head has four columns named firstname, lastname, rating and comment
        let tableHeadRow = document.createElement('tr')
        let tableHeadFirstName = document.createElement('th')
        tableHeadFirstName.innerHTML = "First Name"
        tableHeadRow.appendChild(tableHeadFirstName)
        let tableHeadLastName = document.createElement('th')
        tableHeadLastName.innerHTML = "Last Name"
        tableHeadRow.appendChild(tableHeadLastName)
        let tableHeadRating = document.createElement('th')
        tableHeadRating.innerHTML = "Rating"
        tableHeadRow.appendChild(tableHeadRating)
        let tableHeadComment = document.createElement('th')
        tableHeadComment.innerHTML = "Comment"
        tableHeadRow.appendChild(tableHeadComment)

        tableHead.appendChild(tableHeadRow)
        table.appendChild(tableHead)

        // create the table body part of the reviews
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i]
            let tableBodyRow = document.createElement('tr')
            let tableBodyFirstName = document.createElement('td')
            tableBodyFirstName.innerHTML = review['reviewer']['firstname']
            tableBodyRow.appendChild(tableBodyFirstName)
            let tableBodyLastName = document.createElement('td')
            tableBodyLastName.innerHTML = review['reviewer']['lastname']
            tableBodyRow.appendChild(tableBodyLastName)
            let tableBodyRating = document.createElement('td')
            tableBodyRating.innerHTML = review['rating']
            tableBodyRow.appendChild(tableBodyRating)
            let tableBodyComment = document.createElement('td')
            tableBodyComment.innerHTML = review['comment']
            tableBodyRow.appendChild(tableBodyComment)
            tableBody.appendChild(tableBodyRow)
        }

        table.appendChild(tableBody)
        return table
    }

})