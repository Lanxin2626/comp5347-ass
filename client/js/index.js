
function test() {
    $(document).ready(function(){
        $("button").click(function(){
            $.get({url:"http://localhost:3000/user",success:function(result){
                    $("#div1").html(result['name']);
                }});
        });
    });
}