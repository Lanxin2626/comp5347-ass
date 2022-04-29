function init_NavBar(){
    var content_page=document.getElementById("page_content");
    var navigationBar=document.createElement('nav');
    navigationBar.setAttribute("class","navbar navbar-expand-lg navbar-dark bg-dark fixed-top");
    navigationBar.setAttribute("id","navBar-sellPhone");
    content_page.appendChild(navigationBar);
    
    var container_fluid=document.createElement('div');
    container_fluid.setAttribute("class","container-fluid");
    navigationBar.appendChild(container_fluid);

    var web_Brand=document.createElement('a');
    container_fluid.appendChild(web_Brand);
    web_Brand.setAttribute("class","navbar-brand");
    web_Brand.setAttribute("id","brand");
    web_Brand.setAttribute("href","#");
    web_Brand.innerHTML="SellPhone";

    var button_toggler=document.createElement('button');
    container_fluid.appendChild(button_toggler);
    var span_button_img=document.createElement('span');
    span_button_img.setAttribute("class","navbar-toggler-icon");
    button_toggler.appendChild(span_button_img);
    button_toggler.setAttribute("class","navbar-toggler");
    button_toggler.setAttribute("type","button");
    button_toggler.setAttribute("data-bs-toggle","collapse");
    button_toggler.setAttribute("data-bs-target","#navbarSupportedContent");
    button_toggler.setAttribute("aria-controls","navbarSupportedContent");
    button_toggler.setAttribute("aria-expanded","false");
    button_toggler.setAttribute("aria-label","Toggle navigation");

    var navbarSupportedContent=document.createElement('div');
    container_fluid.appendChild(navbarSupportedContent);
    navbarSupportedContent.setAttribute("class","collapse navbar-collapse");
    navbarSupportedContent.setAttribute("id","navbarSupportedContent");

    //define searchBox
    var search_Form=document.createElement('form');
    navbarSupportedContent.appendChild(search_Form);
    search_Form.setAttribute("class","d-flex");
    //add content to search_Area
    var input_search=document.createElement('input');
    var search_button=document.createElement('button');
    search_Form.appendChild(input_search);
    search_Form.appendChild(search_button);
    //define the element in area
    input_search.setAttribute("class","form-control me-2");
    input_search.setAttribute("type","search");
    input_search.setAttribute("placeholder","Search");
    input_search.setAttribute("aria-label","Search");
    input_search.setAttribute("id","searchBox");

    search_button.setAttribute("class","btn btn-outline-success");
    search_button.setAttribute("type","button");
    //search_button.setAttribute("onclick","searchFunction_FrontEnd()");
    search_button.onclick=function(){
        searchFunction_FrontEnd();
    }
    search_button.innerHTML="Search";

    //define dropDown area
    var ul_dropDown=document.createElement('ul');
    navbarSupportedContent.appendChild(ul_dropDown);
    ul_dropDown.setAttribute("class","navbar-nav me-auto mb-2 mb-lg-0");
    //add element to dropDown area
    var li_dropDown=document.createElement('li');
    ul_dropDown.appendChild(li_dropDown);
    li_dropDown.setAttribute("class","nav-item dropdown");
    li_dropDown.setAttribute("id","dropDownFunction");
    //define the element to li_dropDown
    var brand_selector=document.createElement('a');
    li_dropDown.appendChild(brand_selector);
    var brand_menu=document.createElement('ul');
    li_dropDown.appendChild(brand_menu);

    //set brand_selector attribute
    brand_selector.innerHTML="brand-selector";
    brand_selector.setAttribute("class","nav-link dropdown-toggle");
    //brand_selector.setAttribute("onclick","homeState()");
    brand_selector.setAttribute("id","navbarDropdown");
    brand_selector.setAttribute("role","button");
    brand_selector.setAttribute("data-bs-toggle","dropdown");
    brand_selector.setAttribute("aria-expanded","false");
    //加载brand_menu
    brand_menu.setAttribute("class","dropdown-menu");
    brand_menu.setAttribute("aria-labelledby","navbarDropdown");
    brand_menu.setAttribute("id","categoryList");
    getCategoryMenu(brand_menu);
    //define button_Perosnal Area
    var ul_button_Perosnal=document.createElement('ul');
    navbarSupportedContent.appendChild(ul_button_Perosnal);
    ul_button_Perosnal.setAttribute('class','ul2');

    //add element to button_personal_area
    var li_personal=document.createElement('li');
    var li_price_slider=document.createElement('li');
    ul_button_Perosnal.appendChild(li_personal);
    ul_button_Perosnal.appendChild(li_price_slider);
    li_personal.setAttribute("class","function-personal");
    li_personal.setAttribute("id","function-personal-button");
    li_price_slider.setAttribute("class","price-slider-area");

    //define li_personal
    whetherLogin_ButtonControl(li_personal);


    //define li_price_slider
    var span_priceRange=document.createElement('span');
    var input_PriceRange=document.createElement('input');
    var span_RangeResult=document.createElement('span');
    li_price_slider.appendChild(span_priceRange);
    li_price_slider.appendChild(input_PriceRange);
    li_price_slider.appendChild(span_RangeResult);

    span_priceRange.setAttribute("class","value");
    span_priceRange.innerHTML="price range";
    span_RangeResult.setAttribute("class","value");
    span_RangeResult.setAttribute("id","priceRangeGet");
    span_RangeResult.innerHTML="100 $";
    //define slider
    input_PriceRange.setAttribute("title","price Range");
    input_PriceRange.setAttribute("type","range");
    input_PriceRange.setAttribute("name","price-slider");
    input_PriceRange.setAttribute("id","price-slider");
    input_PriceRange.setAttribute("min","10");
    input_PriceRange.setAttribute("max","500");
    input_PriceRange.setAttribute("step","1");
    //input_PriceRange.setAttribute("value","100");
    input_PriceRange.setAttribute("oninput","getRange_Price()");
    input_PriceRange.setAttribute("onchange","rangeAction_Frontend(this.value)");
    
}
function homeState(){
    var showingArea = document.getElementById("showingArea");
    showingArea.innerHTML="";
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
    //console.log(searchResult.length);
    var showingArea = document.getElementById("showingArea");
    showingArea.innerHTML="";
    var viewLevel1=document.createElement('div');
    viewLevel1.setAttribute("class","p-5");
    showingArea.appendChild(viewLevel1);

    var viewLevel2=document.createElement('div');
    viewLevel2.setAttribute("class","container");
    // 2 to 1
    viewLevel1.appendChild(viewLevel2)

    //From here to for loop
    var loop=null;
    var type_phone_group=document.createElement('div');
        
    var type_phone=document.createElement('h5');
    type_phone.setAttribute("class","type_phone");
    type_phone.innerHTML="Below are the items that qualify";
    type_phone_group.appendChild(type_phone);
    type_phone_group.setAttribute("class","type_phone_group");
    viewLevel2.appendChild(type_phone_group);
    for(var set=0;set<searchResult.length;set++)
    {
        if(set%4==0)
        {
            var viewLevel3=document.createElement('div');
            viewLevel3.setAttribute("class","row g-4 py-5");
            loop=viewLevel3;           
        }
           //3 to 2
            type_phone_group.appendChild(loop);
            var viewLevel4=document.createElement('div');
            viewLevel4.setAttribute("class","col-lg-3");
            //4 to 3
            loop.appendChild(viewLevel4);
            //Fifth level
            var card=document.createElement('div');
            card.setAttribute("class","card shadow-lg");
            //5 to 4
            viewLevel4.appendChild(card);
            //sixth level
            var cardImage=document.createElement('img');
            cardImage.setAttribute("src",searchResult[set].image);
            cardImage.setAttribute("class","card-img-top");
    
            var cardBody=document.createElement('div');
            cardBody.setAttribute("class","card-body");
            //6 to 5
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            //seventh level
            var cardTitle=document.createElement('h3');
            cardTitle.setAttribute("class","card-title");
            cardTitle.innerHTML="Brand: "+searchResult[set].brand;
            //console.log(searchResult[set].brand+set)
            var cardDescription=document.createElement('p');
            cardDescription.setAttribute("class","card-text");
            cardDescription.innerHTML="Price: "+searchResult[set].price+" $";
            var cardBtn=document.createElement('button');
            cardBtn.setAttribute("class","btn btn-success");
            cardBtn.setAttribute("value","phone");
            cardBtn.innerHTML="See more";
            var id =1;
            //Go to the product detail page action
            cardBtn.setAttribute("onclick","showPhoneDetail("+searchResult[set].id+")");
    
            //7 to 6
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBtn);     
        // 2-1.5
        
    }
    
}
// drop down function
// function itemCatergory(categoryData){

// }

// show product detail page
function productDetail_State(item){
    var showingArea = document.getElementById("showingArea");
    showingArea.innerHTML="";
    var section=document.createElement('section');
    section.setAttribute('class','container productDetail my-1 pt-5');
    showingArea.appendChild(section);
    var div1_level1=document.createElement('div');
    div1_level1.setAttribute('class','row mt-1');
    
    var div1_level1_1=document.createElement('div');
    div1_level1.appendChild(div1_level1_1);
    div1_level1_1.setAttribute('class','col-lg-5 col-md-12 col-12');
    var image_product=document.createElement('img');
    image_product.setAttribute('class','img-fluid w-100 productDetail_photo');
    image_product.setAttribute('src',item.image);
    div1_level1_1.appendChild(image_product);

    var div1_level1_2=document.createElement('div');
    div1_level1.appendChild(div1_level1_2);
    div1_level1_1.setAttribute('class','col-lg-6 col-md-12 col-12');
    var div1_level1_2_1=document.createElement('div');
    div1_level1_2.appendChild(div1_level1_2_1);
    div1_level1_2_1.setAttribute('class','phoneDetail-FunctionArea');

    var phoneDetail_Title =document.createElement('h3');
    phoneDetail_Title.setAttribute('class','phoneDetail-Title');
    div1_level1_2_1.appendChild(phoneDetail_Title);
    var phoneDetail_Brand =document.createElement('h4');
    phoneDetail_Brand.setAttribute('class','phoneDetail-Brand');
    div1_level1_2_1.appendChild(phoneDetail_Brand);
    var phoneDetail_Price =document.createElement('h1');
    phoneDetail_Price.setAttribute('class','phoneDetail-Price');
    div1_level1_2_1.appendChild(phoneDetail_Price);
    var phoneDetail_Stock =document.createElement('h6');
    div1_level1_2_1.appendChild(phoneDetail_Stock);
    phoneDetail_Stock.setAttribute('class','phoneDetail-Stock');

    var div1_level1_2_1_2 =document.createElement('div');
    div1_level1_2_1.appendChild(div1_level1_2_1_2);
    div1_level1_2_1_2.setAttribute('class','addingFunction-area');
    var button_addingCart=document.createElement('button');
    button_addingCart.setAttribute('class','adding-btn btn btn-dark');
    button_addingCart.innerHTML='Add it to cart';
    button_addingCart.onclick=function(){
        addToCart(item.id);
    };
    div1_level1_2_1_2.appendChild(button_addingCart);
    var itemInCart=document.createElement('input');
    div1_level1_2_1_2.appendChild(itemInCart);
    itemInCart.setAttribute('type','text');
    itemInCart.setAttribute('class','cart-itemNum');
    itemInCart.setAttribute('id','itemInCart');
    itemInCart.setAttribute('title','The number of the this item in your cart');
    itemInCart.setAttribute('readonly');


    var div1_level1_2_1_3 =document.createElement('div');
    div1_level1_2_1.appendChild(div1_level1_2_1_3);
    div1_level1_2_1_3.setAttribute('class','ratingAndComment');
    var rating_function=document.createElement('div');
    rating_function.setAttribute('class','rating_function');
    div1_level1_2_1_3.appendChild(rating_function);
    // init stars
    var star1_radio=document.createElement('input');
    star1_radio.setAttribute('type','radio');
    star1_radio.setAttribute('title','1 point');
    star1_radio.setAttribute('name',"rating1");
    star1_radio.setAttribute('id','rating1');
    star1_radio.setAttribute('value','1');
    rating_function.appendChild(star1_radio);
    var star1_label=document.createElement('label');
    star1_label.setAttribute('for','rating1');
    star1_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star1_label);

    var star2_radio=document.createElement('input');
    star2_radio.setAttribute('type','radio');
    star2_radio.setAttribute('title','2 point');
    star2_radio.setAttribute('name',"rating1");
    star2_radio.setAttribute('id','rating2');
    star2_radio.setAttribute('value','2');
    rating_function.appendChild(star2_radio);
    var star2_label=document.createElement('label');
    star2_label.setAttribute('for','rating2');
    star2_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star2_label);

    var star3_radio=document.createElement('input');
    star3_radio.setAttribute('type','radio');
    star3_radio.setAttribute('title','3 point');
    star3_radio.setAttribute('name',"rating1");
    star3_radio.setAttribute('id','rating3');
    star3_radio.setAttribute('value','3');
    rating_function.appendChild(star3_radio);
    var star3_label=document.createElement('label');
    star3_label.setAttribute('for','rating3');
    star3_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star3_label);

    var star4_radio=document.createElement('input');
    star4_radio.setAttribute('type','radio');
    star4_radio.setAttribute('title','4 point');
    star4_radio.setAttribute('name',"rating1");
    star4_radio.setAttribute('id','rating4');
    star4_radio.setAttribute('value','4');
    rating_function.appendChild(star4_radio);
    var star4_label=document.createElement('label');
    star4_label.setAttribute('for','rating4');
    star4_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star4_label);

    var star5_radio=document.createElement('input');
    star5_radio.setAttribute('type','radio');
    star5_radio.setAttribute('title','5 point');
    star5_radio.setAttribute('name',"rating1");
    star5_radio.setAttribute('id','rating5');
    star5_radio.setAttribute('value','5');
    star5_radio.setAttribute('checked');
    rating_function.appendChild(star5_radio);
    var star5_label=document.createElement('label');
    star5_label.setAttribute('for','rating5');
    star5_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star5_label);
    // 如果监听不到rating 就把 rating_fuction 这个区都传入post的onclick事件里，再在onclick getElementID

    var commentingFunction_area=document.createElement('div');
    div1_level1_2_1_3.appendChild(commentingFunction_area);
    commentingFunction_area.setAttribute('class','commentingFunction-area');
    var commentBox=document.createElement('textarea');
    commentingFunction_area.appendChild(commentBox);
    commentBox.setAttribute('title','input your comment about this product');
    commentBox.setAttribute('id',);
    commentBox.setAttribute('cols','30');
    commentBox.setAttribute('rows','10');
    var button_post =document.createElement('button');
    button_post.setAttribute('id','comment-btn');
    button_post.setAttribute('class','comment-btn btn btn-success');
    button_post.setAttribute('title','comment Something');
    commentingFunction_area.appendChild(button_post);
    button_post.onclick=function(){
        postComment(commentBox.innerHTML,section);
        //后续完善post函数
    };
    //后续确定接口 不一定是 showingUserComment(section);
}
function showingUserComment(section,commentSet){
    //section.appendChild(userCommentArea);
    var div2_level1=document.createElement('div');
    div2_level1.setAttribute('class','row mt-1');
    div2_level1.setAttribute('id','users_comment_Area')
    section.appendChild(div2_level1);
    
    var div2_level2=document.createElement('div');
    div2_level2.setAttribute('class','users_comment');
    div2_level1.appendChild(div2_level2);
    var users_comment_title=document.createElement('h3');
    users_comment_title.setAttribute('class','users_comment_title');
    users_comment_title.innerHTML='Users-Comment';
    var div2_level3=document.createElement('div');
    div2_level2.appendChild(div2_level3);
    div2_level3.setAttribute('class','card');
    for(var i=0;i<commentSet.length;i++)
    {
        var commentRow =document.createElement('div');
        commentRow.setAttribute('class','card-body');
        div2_level3.appendChild(commentRow);
        //Title 可以写得分
        var comment_Title =document.createElement('h5');
        comment_Title.setAttribute('class','card-title');
        commentRow.appendChild(comment_Title);
        //subTitle 可以写用户名
        var comment_SubTitle =document.createElement('h6');
        commentRow.appendChild(comment_SubTitle);
        comment_SubTitle.setAttribute('class','card-subtitle mb-6');
        //记得判断一下p是否大于200;
        var comment_commentText =document.createElement('p');
        commentRow.appendChild(comment_commentText);
        comment_commentText.setAttribute('class','card-text');
        var comment_moreWord =document.createElement('a');
        comment_moreWord.setAttribute('class','card-link');
        comment_moreWord.setAttribute('href','#');
        commentRow.appendChild(comment_moreWord);

    }
}
//showing Login button or logout and profile button
function whetherLogin_ButtonControl(li_functionPersonal){
    let token=localStorage.getItem('token');
    var button_checkout=document.createElement('button');
    button_checkout.setAttribute("class","btn btn-outline-light");
    li_functionPersonal.appendChild( button_checkout);
    button_checkout.innerHTML="Checkout";
    if(!token)
    {       
        var button_login=document.createElement('button');
        button_login.setAttribute("class","btn btn-outline-light");
        button_login.innerHTML="Login";
        li_functionPersonal.appendChild(button_login);
    }
    else
    {
        var button_profile=document.createElement('button');
        button_profile.setAttribute("class","btn btn-outline-light");
        var button_logout=document.createElement('button');
        button_logout.setAttribute("class","btn btn-outline-light");
        button_logout.innerHTML="Logout";
        button_profile.innerHTML="Profile";
        li_functionPersonal.appendChild(button.button_profile);
        li_functionPersonal.appendChild(button_logout);
    }

}
// main page button change function
function init_CategoryMenu(brandMenu,brandSet){
    for(var i=0;i<brandSet.length;i++)
    {
        var li_dropDown_item=document.createElement('li');
        brandMenu.appendChild(li_dropDown_item);
        var a_dropDown_item=document.createElement('a');
        li_dropDown_item.appendChild(a_dropDown_item);

        //set aDropDownItem
        a_dropDown_item.setAttribute("class","dropdown-item");
        var brand=JSON.stringify(brandSet[i]);
        //console.log(brand);
        a_dropDown_item.setAttribute("href","javascript:catergorySelector_FontEnd("+brand+");");
        //a_dropDown_item.setAttribute("onclick","catergorySelector_FontEnd("+brand+")");
        a_dropDown_item.setAttribute("name",brandSet[i]);
        a_dropDown_item.innerHTML=brandSet[i];
    }
        var li_divider=document.createElement("li");
        li_divider.setAttribute('class','dropdown-divider');
        var li_pastChoice=document.createElement("li");
        li_pastChoice.setAttribute('class','dropdown-item');
        li_pastChoice.setAttribute('id','pastChoice');
        
        brandMenu.appendChild(li_divider);
        brandMenu.appendChild(li_pastChoice);
        li_pastChoice.innerHTML="brand-selector";
        li_pastChoice.onclick=function(){
            catergorySelector_FontEnd(document.getElementById('pastChoice').innerHTML);
        };
        //console.log(response.data.success);

}

//Following is the  interface writing part
function getCategoryMenu(brandMenu){

    //get all brands
    axios.get('http://localhost:3000/api/phone/brand')
    .then(function(response){
        //console.log(response.data.success);
        init_CategoryMenu(brandMenu,response.data.success);
    });

}
// frontend range price showing
function getRange_Price(){
    var slider=document.getElementById("price-slider");  
    var price=document.getElementById("priceRangeGet");
    console.log(slider.value);
    price.innerHTML=slider.value+"$";  
}
function showPhoneDetail_FrontEnd(productID){
    //check wheter login first, get the Product number in the cart to show in the detail page
    console.log(productID);
    // according to the id/other key information of product, skip to their detailed page
    axios.get('',JSON.stringify({
        productID:this.productID
    })).then(function(response){
        //console.log(response);
        //function about showing product in this price range
        productDetail_State();
    });

    
}
// search function area
function searchFunction_FrontEnd(){
    var searchBox=document.getElementById("searchBox");
    if(searchBox.value=="")
    {
        homeState();
    }
    else
    {
        const data={title: searchBox.value};
        // go to the search back end method
        axios.get('http://localhost:3000/api/phone/search',{
            params:data
        }).then(function(response){
            console.log(response.data.success);
            searchState(response.data.success);
        });
    }


}
function catergorySelector_FontEnd(brandName){
    const data={brand: brandName};
    console.log(brandName);
    // go to the search fliter end method
    axios.get('http://localhost:3000/api/phone/filter',{
        params:data
    }).then(function(response){
        document.getElementById('navbarDropdown').innerHTML=brandName;
        if(brandName=='brand-selector')
        {
            homeState();
        }
        else{
            searchState(response.data.success);
        }
        

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
    //console.log(priceRange);
    const data={price:priceRange}
    axios.get('http://localhost:3000/api/phone/range',{
        params:data
    }).then(function(response){
        //console.log(response.data.success);
        searchState(response.data.success);
    })
}
//product Detail page function
function postComment(comment,section){
    var v=null;
    v=$('input[name="rating1"]:checked').val();
    if(v=null){
        alert("You haven't marked it");
    }
    else{
       // console.log($('input[name="rating1"]:checked').val());
        // record in database
        // comment area 动态更新
        //if token else
        showingUserComment(section);
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
                //console.log(response);
                // product in cart 实时更新
            });           
        }
    }

}