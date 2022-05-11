function backToMainpage(){
// skip to Main page
location.href="MainPage.html";
}
function showing_CartArea(products_cart){
    var showing_Area=document.getElementById("productsInCart");
    showing_Area.innerHTML="";
    var total_price=0;
    var total_quality=0;
    document.getElementById("transactionButton").hidden=false;
    for(var i=0;i<products_cart.length;i++)
    {
        var tr_cart=document.createElement("tr");
        showing_Area.appendChild(tr_cart);
        var tds_index=document.createElement("td");
        var td_index=document.createElement("h3");
        td_index.innerHTML=i+1;
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
        //处理一下过长的title length<60
        td_product_title.innerHTML=products_cart[i].phone_id.title;
        console.log(products_cart[i].phone_id.title.length);
        //td_product_title.setAttribute("id","");

        var tds_product_price=document.createElement("td");
        tr_cart.appendChild(tds_product_price);
        var td_product_price=document.createElement("h3");
        tds_product_price.appendChild(td_product_price);
        td_product_price.setAttribute("name","product_price");
        td_product_price.innerHTML="$"+ products_cart[i].phone_id.price;

        var tds_product_quality=document.createElement("td");
        tr_cart.appendChild(tds_product_quality);
        var td_product_quality=document.createElement("input");
        tds_product_quality.appendChild(td_product_quality);
        td_product_quality.setAttribute("type","number");
        td_product_quality.setAttribute("class","w-25 pl-1");
        td_product_quality.setAttribute("name","product_quality");
        td_product_quality.setAttribute("id",products_cart[i].phone_id._id+"-"+products_cart[i].phone_id.price);
        td_product_quality.setAttribute("value",products_cart[i].number);

        var tds_total_price=document.createElement("td");
        tr_cart.appendChild(tds_total_price);
        var td_total_price=document.createElement("h3");
        tds_total_price.appendChild(td_total_price);
        td_total_price.setAttribute("name","total_price");
        td_total_price.setAttribute("id","total_price"+products_cart[i].phone_id._id);
        td_total_price.innerHTML="$"+ parseFloat(products_cart[i].money);

        var tds_delete_btn=document.createElement("td");
        tr_cart.appendChild(tds_delete_btn);
        var td_delete_btn=document.createElement("h3");
        tds_delete_btn.appendChild(td_delete_btn);
        td_delete_btn.setAttribute("id","del-"+products_cart[i].phone_id._id);
        td_delete_btn.setAttribute("class","btn btn-dark");
        td_delete_btn.innerHTML="Delete";
         // set td_delete_button onclick event
        td_delete_btn.onclick=function(){
            deleteProduct(this.id);
        };

        // td_product_quality setting onchange event here need to change the price and the total price setting
        td_product_quality.onchange=function(){
            console.log(this.id.split("-")[0]);
            changeAmount_Cart(this.id.split("-")[0],this.value);
            change_PartPrice(this.id.split("-")[0],this.value,this.id.split("-")[1]);
            change_SUM_Number_Price();
        };
        // 定点改变，不要全部刷新，设个ID后面
        total_quality+=products_cart[i].number;// 加上所有的quality
        total_price+=parseFloat(products_cart[i].money);//加上所有的总价
    }
    // price sum part
    console.log(total_price);
    document.getElementById("totalQuality_trasaction").innerHTML=total_quality;
    document.getElementById("totalPrice_trasaction").innerHTML="$"+parseFloat(total_price).toFixed(2);
}
function change_PartPrice(id,number_new,price_per){
    document.getElementById("total_price"+id).innerHTML="$"+(number_new*price_per);

}
function showing_Cart_FrontEnd(){
    let token=localStorage.getItem('token');
    if(!token)
    {
        alert("please login first");
        location.href="SignPage.html";
    }
    else{
        // button interface function
        axios.get('http://localhost:3000/api/cart/get_items',{
            headers:{
            Authorization: token
        }
        })
        .then(function(response){
            if(response.data.data.items.length!=0)
            {
                showing_CartArea(response.data.data.items);
            }
            else
            {
                emptyCart();
            }
            
        }).catch(function(error){
            
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
        if(value>0)
        {
            console.log(productID);
            axios.post('http://localhost:3000/api/cart/edit_item',{
                phoneId:productID,
                number:value
            },
            {
                headers:{
                    Authorization: token
                }
            }).then(function(response){
                console.log(response);
                change_SUM_Number_Price()
            }).catch(function(error){
                console.log(error);
            });
        }
        else
        {
            deleteProduct("del-"+productID);
        }

    }   
}
function deleteProduct(productID){
    let token=localStorage.getItem('token');
    console.log(productID.split("-")[1]);
    axios.post('http://localhost:3000/api/cart/del_item',{
        phoneId:productID.split("-")[1]
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
    }).catch(function(error){

    }
    );

}
function transaction_FrontEnd(){
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
            console.log(response.data.data.items);
            for(var i=0;i<response.data.data.items.length;i++)
            {
                number+=response.data.data.items[i].number;
                total_price+=response.data.data.items[i].money;
            }
            console.log(number);
            console.log(total_price);
            document.getElementById("totalQuality_trasaction").innerHTML=number;
            document.getElementById("totalPrice_trasaction").innerHTML='$'+parseFloat(total_price).toFixed(2);
            // 局部刷新一下
        });
    }
}
function emptyCart(){
    var showing_Area=document.getElementById("productsInCart");
    showing_Area.innerHTML="";
    var h1_empty=document.createElement('h1');
    h1_empty.innerHTML="Your cart is empty, go to add something to fill it";
    showing_Area.appendChild(h1_empty);
    document.getElementById("totalQuality_trasaction").innerHTML="";
    document.getElementById("totalPrice_trasaction").innerHTML="";
    document.getElementById("transactionButton").hidden=true;

}