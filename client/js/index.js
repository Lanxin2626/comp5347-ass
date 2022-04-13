
function jQueryAJAXTest() {
    $(document).ready(function(){
        $.get({url:"http://localhost:3000/user",success:function(result){
                $("#div1").html(result['Name']);
        }});
    });
}

function axiosTest() {
    axios.get('http://localhost:3000/user')
        .then(function (response) {
            //native javascript
            // var div1 = document.getElementById('div1');
            // div1.innerHTML = response.data['Name'];

            //jQuery
            $("#div1").html(response.data['Name']);
        })
        .catch(function (error) {
            console.log(error);
        });

}