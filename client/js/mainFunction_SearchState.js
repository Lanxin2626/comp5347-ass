// showing search state the html layout
function searchState(searchResult){
    document.getElementById("dropDownFunction").hidden=false;
    document.getElementById("price-slider-area").hidden=false;
    document.getElementById("priceRangeGet").innerHTML=sessionStorage.getItem("range");
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
            
            cardBtn.setAttribute("onclick","showPhoneDetail_FrontEnd("+JSON.stringify(searchResult[set]._id)+")");
    
            //7 to 6
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBtn);     
        // 2-1.5
        
    }
    
}
// search function area
function searchFunction_FrontEnd(){
    sessionStorage.setItem("function","searchFunction_FrontEnd(");
    
    var searchBox=document.getElementById("searchBox");
    if(searchBox.value=="")
    {
        document.getElementById("dropDownFunction").hidden=true;
        document.getElementById("price-slider-area").hidden=true;
        getHomeStateItems();
    }
    else
    {
        sessionStorage.setItem("search",searchBox.value);
        var brand="";
        document.getElementById("dropDownFunction").hidden=false;
        document.getElementById("price-slider-area").hidden=false;
        if(document.getElementById('navbarDropdown').innerHTML=='brand-selector')
        {
            brand="All";
        }
        else
        {
            brand=document.getElementById('navbarDropdown').innerHTML;
        }      
        const data={
            title: searchBox.value,
            brand:brand,
            price: document.getElementById('price-slider').value
        };
        // go to the search back end method
        
        axios.get('http://localhost:3000/api/phone/searchPhoneList',{
            params:data
        }).then(function(response){
            console.log(response.data.success);
            searchState(response.data.success);
        });
    }


}
//catergory selector area
function catergorySelector_FontEnd(brandName){
    sessionStorage.setItem("function","catergorySelector_FontEnd("+brandName); 
    const data={
        title: document.getElementById('searchBox').value,
        price: document.getElementById('price-slider').value,
        brand: brandName};
    console.log(brandName);
    // go to the search fliter end method
    axios.get('http://localhost:3000/api/phone/searchPhoneList',{
        params:data
    }).then(function(response){
        document.getElementById('navbarDropdown').innerHTML=brandName;
        if(brandName=='brand-selector')
        {
            //sessionStorage.setItem("category","brand");
            getHomeStateItems();
        }
        else{
            sessionStorage.setItem("category",brandName);
            searchState(response.data.success);
        }
        

    });
}
// price range area
function rangeAction_Frontend(priceRange){
    sessionStorage.setItem("function","rangeAction_Frontend("+priceRange);
    sessionStorage.setItem("range",parseInt(priceRange));
    //console.log(sessionStorage.getItem("range"));
    const data={
        price:priceRange,
        title: document.getElementById('searchBox').value,
        brand: document.getElementById('navbarDropdown').innerHTML
    }
    axios.get('http://localhost:3000/api/phone/searchPhoneList',{
        params:data
    }).then(function(response){
        //console.log(response.data.success);
        searchState(response.data.success);
    })
}