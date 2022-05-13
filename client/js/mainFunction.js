function init_MainPage(){
    var functionName=sessionStorage.getItem("function");
    console.log(functionName);
    if(functionName!=null)  
    {
        if(functionName.split('(')[0]=='showPhoneDetail_FrontEnd')
        {        
            $(document).ready(function(){
                showPhoneDetail_FrontEnd(functionName.split('(')[1]);
                sessionStorage.setItem("function","");
            });
        }
        else if(functionName=="")
        {
            $(document).ready(function(){
                getHomeStateItems();
            });
            
        }
        else if(functionName.split('(')[0]=="getHomeStateItems")
        {
            $(document).ready(function(){
                getHomeStateItems();
            });
        }
        else if(functionName.split('(')[0]=="searchFunction_FrontEnd")
        {
            $(document).ready(function(){
                searchFunction_FrontEnd();
            });
            
        }
        else if(functionName.split('(')[0]=="catergorySelector_FontEnd")
        {
            $(document).ready(function(){
                catergorySelector_FontEnd(functionName.split('(')[1]);
            });
            
        }
        else if(functionName.split('(')[0]=="rangeAction_Frontend"){
            $(document).ready(function(){
                rangeAction_Frontend(functionName.split('(')[1]);
            });
            
        }
        else
        {
            
        }
    } 
    else
    {
        getHomeStateItems();
    }
}
function init_NavBar(){
    //define searchFunction
    var search_button=document.getElementById("searchButton");
    search_button.onclick=function(){
        searchFunction_FrontEnd();
    }

    //set brand_selector function
    var brand_selector=document.getElementById("navbarDropdown");
    brand_selector.innerHTML="brand-selector";
    var brand_menu=document.getElementById("categoryList");
    getCategoryMenu(brand_menu);
    document.getElementById("dropDownFunction").hidden=true;
    document.getElementById("price-slider-area").hidden=true;


    //define li_personal button
    var li_personal=document.getElementById("function-personal-button");
    whetherLogin_ButtonControl(li_personal);
    
}
//showing Login button or logout and profile button in navbar
function whetherLogin_ButtonControl(li_functionPersonal){
    let token=localStorage.getItem('token');
    var button_checkout=document.createElement('button');
    button_checkout.setAttribute("class","btn btn-outline-light");
    li_functionPersonal.appendChild(button_checkout);
    button_checkout.innerHTML="Checkout";
    button_checkout.setAttribute('onclick',"location.href='CheckoutPage.html'");
    if(!token)
    {       
        var button_login=document.createElement('button');
        button_login.setAttribute("class","btn btn-outline-light");
        button_login.innerHTML="Login";
        button_login.setAttribute('onclick',"location.href='SignPage.html'");
        li_functionPersonal.appendChild(button_login);
        //button_login.onclick=window.location.reload("SignPage.html");
        
    }
    else
    {
        var button_profile=document.createElement('button');
        button_profile.setAttribute("class","btn btn-outline-light");
        var button_logout=document.createElement('button');
        button_logout.setAttribute("class","btn btn-outline-light");
        button_logout.innerHTML="Logout";
        button_logout.onclick=function(){
            logout_frontEnd();
        }
        button_profile.innerHTML="Profile";
        button_profile.setAttribute('onclick',"location.href='UserPage.html'");
        li_functionPersonal.appendChild(button_profile);
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
        var li_divider_1=document.createElement("li");
        li_divider_1.setAttribute('class','dropdown-divider');
        brandMenu.appendChild(li_divider_1);
        var li_allChoice=document.createElement("li");
        li_allChoice.setAttribute('class','dropdown-item');
        li_allChoice.setAttribute('id','All_brand');
        li_allChoice.innerHTML="All";
        brandMenu.appendChild(li_allChoice);
        li_allChoice.onclick=function(){
            catergorySelector_FontEnd(document.getElementById("All_brand").innerHTML);
        }
        
        var li_divider_2=document.createElement("li");
        li_divider_2.setAttribute('class','dropdown-divider');
        var li_pastChoice=document.createElement("li");
        li_pastChoice.setAttribute('class','dropdown-item');
        li_pastChoice.setAttribute('id','pastChoice');
        
        brandMenu.appendChild(li_divider_2);
        brandMenu.appendChild(li_pastChoice);
        li_pastChoice.innerHTML="brand-selector";
        li_pastChoice.onclick=function(){
            catergorySelector_FontEnd(document.getElementById('pastChoice').innerHTML);
        };
        //console.log(response.data.success);

}

//Following is the  interface writing part
function logout_frontEnd(){
    axios.get('http://localhost:3000/api/user/logout')
    .then(function(response){
        localStorage.removeItem('token');
        var li_personal=document.getElementById("function-personal-button");
        li_personal.innerHTML="";
        whetherLogin_ButtonControl(li_personal);
    });
}
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


