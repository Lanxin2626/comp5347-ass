
function test() {
    $(document).ready(function(){
        $("button").click(function(){
            $.get({url:"http://localhost:3000/",success:function(result){
                    $("#div1").html(result);
                }});
        });
    });
}