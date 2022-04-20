function homeState(){
    var showingArea = document.getElementById("showingArea");
    var viewLevel1=document.createElement('div');
    viewLevel1.setAttribute("class","p-5");
    showingArea.appendChild(viewLevel1);

    var viewLevel2=document.createElement('div');
    viewLevel2.setAttribute("class","container");
    // 2 to 1
    viewLevel1.appendChild(viewLevel2)

    //From here to for loop
    var loop=null;
    for(var set=0;set<2;set++)
    {
        var type_phone_group=document.createElement('div');
        
        var type_phone=document.createElement('h5');
        type_phone.setAttribute("class","type_phone");
        type_phone.innerHTML="phone"+set;
        type_phone_group.appendChild(type_phone);
        type_phone_group.setAttribute("class","type_phone_group");
        type_phone_group.setAttribute("id","phoneSet"+set);
        for(var i=0;i<5;i++)
        {
           if(i==0){
            var viewLevel3=document.createElement('div');
            viewLevel3.setAttribute("class","row g-4");
            loop=viewLevel3;
           }
           else if(i==3){
            var viewLevel3=document.createElement('div');
            viewLevel3.setAttribute("class","row g-4 py-5 justify-content-center");
            loop=viewLevel3;
           }
           //3 to 2
            type_phone_group.appendChild(loop);
            var viewLevel4=document.createElement('div');
            viewLevel4.setAttribute("class","col-lg-4");
            //4 to 3
            loop.appendChild(viewLevel4);
            //Fifth level
            var card=document.createElement('div');
            card.setAttribute("class","card shadow-lg");
            //5 to 4
            viewLevel4.appendChild(card);
            //sixth level
            var cardImage=document.createElement('img');
            cardImage.setAttribute("src","/client/static/phone_default_images/Apple.jpeg");
            cardImage.setAttribute("class","card-img-top");
    
            var cardBody=document.createElement('div');
            cardBody.setAttribute("class","card-body");
            //6 to 5
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            //seventh level
            var cardTitle=document.createElement('h3');
            cardTitle.setAttribute("class","card-title");
            cardTitle.innerHTML="phone";
            var cardDescription=document.createElement('p');
            cardDescription.setAttribute("class","card-text");
            cardDescription.innerHTML="set"+set;
            var cardBtn=document.createElement('button');
            cardBtn.setAttribute("class","btn btn-success");
            cardBtn.setAttribute("value","phone");
            cardBtn.innerHTML="phone";
            var id =1;
            //Go to the product detail page action
            cardBtn.setAttribute("onclick","showPhoneDetail("+id+")");
    
            //7 to 6
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBtn);     
        }
        // 2-1.5
        viewLevel2.appendChild(type_phone_group);
    }


}
// showing after search function
function searchState(searchResult){

}
// drop down function
function itemCatergory(categoryData){

}
// show product detail page
function productDetail(){
    

}
//showing Login button or logout and profile button
function whetherLogin_ButtonControl(){

}
// main page button change function
function showingNavButtons_personal(){

}

//Following is the  interface writing part

// frontend range price showing
function getRange_Price(){
    var slider=document.getElementById("price-slider");
    var price=document.getElementById("priceRangeGet");
    price.innerHTML=slider.value+"$";  
}
function showPhoneDetail_FrontEnd(productID){
    //check wheter login first, get the Product number in the cart to show in the detail page
    console.log(productID);
    // according to the id/other key information of product, skip to their detailed page
    axios.get('',JSON.stringify({
        productID:this.productID
    })).then(function(response){
        console.log(response);
        //function about showing product in this price range
        productDetail();
    });

    
}
// search function area
function searchFunction_FrontEnd(){
    var searchBox=document.getElementById("searchBox");
    console.log(searchBox.value);
    // go to the search back end method
    axios.get('',JSON.stringify({
        content_search:searchBox.value
    })).then(function(response){
        console.log(response);
        searchState(response);
    });

}
function catergorySelector_FontEnd(){

    $('#categoryList li').on('click',function(){
        console.log($(this).children("a").get(0));
        console.log($(this).children(":first").attr("name"));
    });

    axios.get('',JSON.stringify({
        category:$(this).children(":first").attr("name")
    })).then(function(response){
        console.log($(this).children(":first").attr("name"));// category choice
       //渲染页面
       itemCatergory(response);
    });
}

function checkout_action(){
    //if logined, go to the checkoutpage(according to the userId maybe), else go to the login page
    axios.get('').then(function(response){

    })
    .catch(function (error) {
        console.log(error);
    });
}

// front end send data to backend
function rangeAction_Frontend(priceRange){
        //go to the backend rangeAction()
    console.log(priceRange);
    axios.get('',JSON.stringify({
        maximumPrice:priceRange
    })).then(function(response){
        console.log(response);
        //function about showing product in this price range
    });
}
//product Detail page function
function postComment(){
    var v=null;
    v=$('input[name="rating1"]:checked').val();
    if(v=null){
        alert("You haven't marked it");
    }
    else{
        console.log($('input[name="rating1"]:checked').val());
        // record in database
        // comment area 动态更新
    }
    

}
function addToCart(id){
    var pAmount = prompt("Please input the amount of this book you want to have :");
    var regulation_number = /^[1-9]+.?[0-9]*/;
    if(pAmount!=null)
    {
        if (!regulation_number.test(pAmount)) {
            alert("You should input valid number (number > = 0)");
        }
        else {
            alert("successful Phone"+id+"amount "+pAmount);
            axios.get('',JSON.stringify({
                productID:id,
                amount:this.pAmount 
                //user id maybe?
            })).then(function(response){
                console.log(response);
                // product in cart 实时更新
            });           
        }
    }

}