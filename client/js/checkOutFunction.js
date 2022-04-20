

function backToMainpage(){
// skip to Main page
}
function changeAmount_Cart(productID,value){
    if(value!=0)
    {
        console.log(productID);
        // according to the id/other key information of product to change the value in cart
        axios.get('',JSON.stringify({
            productID:this.productID,
            amount:value
        })).then(function(response){
            console.log(response);
            // 局部刷新一下
        });
    }
    else{
        deleteProduct();
    }
    
}
function deleteProduct(productID){
    console.log(productID);
    // according to the id/other key information of product, to delete the product in cart
    axios.get('',JSON.stringify({
        productID:this.productID
    })).then(function(response){
        console.log(response);
        // cart 局部刷新一下
    });

}
function transaction_FrontEnd(){
    // get the checked checkboxes information
    var checked_products=[];
    // value(val()) is the product ID maybe 
    $('input[name="cart_checkboxes"]:checked').each(function(){
        checked_products.push($(this).val());
        });
        if(checked_products.length==0){
            alert("you didn't choose anything")
        }
        else{
            console.log(checked_products[0]);
            axios({
                url:'#',
                method:'post',
                data:checked_products,
                header:{
                    'Content-Type':'application/json'
                }
            }).then(function(response){
                console.response(response);
        
            })
            .catch(function (error) {

                console.log(error)
          
              });
        }


}