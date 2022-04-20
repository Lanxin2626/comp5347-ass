//you have to insert this function into your javascript file
function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


    function loadBooks(data) {
        var tbBody = document.getElementById("TableContent")

        //loop for each row of book table
        for(var i = 0; i < data.length; i++) {
            var row = data[i];
            var tr = document.createElement("tr")


            tr.innerHTML = "<tr>\
                <td><img src=" + row.title +"></td>\
                <td>"+row.brand+"</td>\
                <td>"+row.image+"</td>\
                <td>"+row.stock+"</td>\
                <td>"+row.seller+"</td>\
                <td>"+row.price+"</td>\
            </tr>"
            tbBody.appendChild(tr)

        }

    }


//the main function must occur after the page is loaded, hence being inside the wondow.onload event handler.
window.onload = function(){

    var mainForm = document.getElementById("mainForm");

    bookList = []; // book list container
    getJsonObject('phonelisting.json',
        function(data) {
            bookList = data; // store the book list into bookList
            console.log(bookList); // print it into console (developer tools)
            //console.log(bookList[0]); // print the first book object into console
            loadBooks(bookList)
        },
        function(xhr) { console.error(xhr); }
    );

    

 
    
}