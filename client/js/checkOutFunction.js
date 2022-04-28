function backToMainpage(){
// skip to Main page
window.location.href="MainPage.html";
}
function showing_CartArea(products_cart){
    var showing_Area=document.getElementById("productsInCart");
    var total_price=0;
    var total_quality=0;
    for(var i=0;i<products_cart.length;i++)
    {
        var tr_cart=document.createElement("tr");
        showing_Area.appendChild(tr_cart);
        var tds_index=document.createElement("td");
        var td_index=document.createElement("h3");
        td_index.innerHTML=i;
        tds_index.appendChild(td_index);
        tr_cart.appendChild(tds_index);

        var tds_img=document.createElement("td");
        tr_cart.appendChild(tds_img);
        var td_img=document.createElement("img");
        tds_img.appendChild(td_img)
        td_img.setAttribute("src",products_cart[i].phone_id.image);

        var tds_product_title=document.createElement("td");
        tr_cart.appendChild(tds_product_title);
        var td_product_title=document.createElement("h3");
        tds_product_title.appendChild(td_product_title);
        td_product_title.setAttribute("name","product_title");
        td_product_title.innerHTML=products_cart[i].phone_id.title;
        //td_product_title.setAttribute("id","");

        var tds_product_price=document.createElement("td");
        tr_cart.appendChild(tds_product_price);
        var td_product_price=document.createElement("h3");
        tds_product_price.appendChild(td_product_price);
        td_product_price.setAttribute("name","product_price");
        td_product_price.innerHTML=products_cart[i].phone_id.price;

        var tds_product_quality=document.createElement("td");
        tr_cart.appendChild(tds_product_quality);
        var td_product_quality=document.createElement("input");
        tds_product_quality.appendChild(td_product_quality);
        td_product_quality.setAttribute("type","number");
        td_product_quality.setAttribute("class","w-25 pl-1");
        td_product_quality.setAttribute("name","product_quality");
        td_product_quality.setAttribute("value",products_cart[i].number);

        var tds_total_price=document.createElement("td");
        tr_cart.appendChild(tds_total_price);
        var td_total_price=document.createElement("h3");
        tds_total_price.appendChild(td_total_price);
        td_total_price.setAttribute("name","total_price");
        td_total_price.innerHTML=products_cart[i].money;

        var tds_delete_btn=document.createElement("td");
        tr_cart.appendChild(tds_delete_btn);
        var td_delete_btn=document.createElement("h3");
        tds_delete_btn.appendChild(td_delete_btn);
        td_delete_btn.setAttribute("class","btn btn-dark");
        td_delete_btn.innerHTML="Delete";
         // set td_delete_button onclick event
        td_delete_btn.onclick=function(){
            deleteProduct(JSON.stringify(products_cart[i].phone_id._id));
        };

        // td_product_quality setting onchange event here need to change the price and the total price setting
        td_product_quality.onchange=function(){
            changeAmount_Cart(products_cart[i].phone_id._id,td_product_quality.value);
            td_product_price=td_product_quality.value*products_cart[i].phone_id.price;
            change_SUM_Number_Price();
        };
        // 定点改变，不要全部刷新，设个ID后面
        total_quality+=0;// 加上所有的quality
        total_price+=0;//加上所有的总价
    }
    // price sum part
    document.getElementById("totalQuality_trasaction").innerHTML=total_quality;
    document.getElementById("totalPrice_trasaction").innerHTML=total_price;
}
function showing_Cart_FrontEnd(){
    let token=localStorage.getItem('token');
    if(!token)
    {
        window.location.href="Signin.html";
    }
    else{
        // button interface function
        axios.get('http://localhost:3000/api/cart/get_items',{
            headers:{
            Authorization: token
        }
        })
        .then(function(response){
            console.log(response);
            showing_CartArea(response.data.items);
            // 局部刷新一下
        });
    }

}
function changeAmount_Cart(productID,value){
    let token=localStorage.getItem('token');
    if(!token)
    {

    }
    else
    {
        // if(value!=0)
        // {
            console.log(productID);
            // const data=JSON.stringify({
            //     phoneId:this.productID,
            //     number:value
            // });
            // according to the id/other key information of product to change the value in cart
            axios.post('http://localhost:3000/api/cart/edit_item',{
                phoneId:this.productID,
                number:value
            },
            {
                headers:{
                    Authorization: token
                }
            }).then(function(response){
                console.log(response);
                // 局部刷新一下
                //showing_Cart_FrontEnd(); 刷新整个购物车的话用这个，后续再看
            });
        // }
        // // else{
        // //     deleteProduct();
        // // }
    }   
}
function deleteProduct(productID){
    console.log(productID);
    // const data=JSON.stringify({
    //     phoneId:productID
    // });
    // according to the id/other key information of product, to delete the product in cart
    axios.get('http://localhost:3000/api/cart/del_item',{
        phoneId:productID
    },
    {
        headers:{
            Authorization: token
        }
    }
    ).then(function(response){
        console.log(response);
        showing_Cart_FrontEnd();
        // cart 局部刷新一下
    });

}
function transaction_FrontEnd(){
    // get the checked checkboxes information
    // var checked_products=[];
    // value(val()) is the product ID maybe
    // $('input[name="cart_checkboxes"]:checked').each(function(){
    //    checked_products.push($(this).val());
    //     });
    //     if(checked_products.length==0){
    //         alert("you didn't choose anything")
    //     }
    //     else{
    //         console.log(checked_products[0]);
            let token=localStorage.getItem('token');
            if(!token)
            {

            }
            else
            {
                axios.post('http://localhost:3000/api/cart/checkout',{
                    headers:token
    
                })
                .then(function(response){
                    console.response(response);
            
                })
                .catch(function (error) {
    
                    console.log(error)
              
                  });
            }

        //}


}
function change_SUM_Number_Price(){
    let token=localStorage.getItem('token');
    if(!token)
    {

    }
    else{
        // button interface function
        axios.get('http://localhost:3000/api/cart/get_items',{
            headers:{
            Authorization: token
        }
        })
        .then(function(response){
            var number=0;
            var total_price=0;
            console.log(response.data.items);
            for(var i=0;i<response.data.items.length;i++)
            {
                number+=response.data.items[i].number;
                total_price+=response.data.items[i].money;
            }
            document.getElementById("totalQuality_trasaction").innerHTML=number;
            document.getElementById("totalPrice_trasaction").innerHTML=total_price;
            // 局部刷新一下
        });
    }
}
function emptyCart(){
    // 后续可能写，但不一定写

}