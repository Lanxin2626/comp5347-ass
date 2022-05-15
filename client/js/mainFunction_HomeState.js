// home state product showing format
function homeState_init(array_phone,setName,viewLevel2){
    var loop=null;
    var type_phone_group=document.createElement('div');       
    var type_phone=document.createElement('h5');
    type_phone.setAttribute("class","type_phone");
    type_phone.innerHTML=setName;
    type_phone_group.appendChild(type_phone);
    type_phone_group.setAttribute("class","type_phone_group");
    type_phone_group.setAttribute("id",setName);
    if(setName=='Best Seller')
    {
        for(var i=0;i<array_phone.length;i++)
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
            cardImage.setAttribute("src",array_phone[i].image);
            cardImage.setAttribute("class","card-img-top");
    
            var cardBody=document.createElement('div');
            cardBody.setAttribute("class","card-body");
            //6 to 5
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            //seventh level
            var cardTitle=document.createElement('h3');
            cardTitle.setAttribute("class","card-title");
            //cardTitle.innerHTML="";
            console.log(array_phone[i].avgRating);
            cardTitle.innerHTML+=array_phone[i].avgRating.toFixed(1);
            rating_showingFunction(cardTitle,array_phone[i].avgRating.toFixed(1));
            var cardDescription=document.createElement('p');
            cardDescription.setAttribute("class","card-text");
            cardDescription.innerHTML=array_phone[i].title;
            var cardBtn=document.createElement('button');
            cardBtn.setAttribute("class","btn btn-success");
            cardBtn.setAttribute("value","phone");
            cardBtn.innerHTML="more details";
            //cardBtn.setAttribute('id',)
            //var id =1;
            //Go to the product detail page action
            cardBtn.setAttribute("onclick","showPhoneDetail_FrontEnd("+JSON.stringify(array_phone[i]._id)+")");
    
            //7 to 6
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBtn);     
        }
    }
    else
    {
        for(var i=0;i<array_phone.length;i++)
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
            cardImage.setAttribute("src",array_phone[i].image);
            cardImage.setAttribute("class","card-img-top");
    
            var cardBody=document.createElement('div');
            cardBody.setAttribute("class","card-body");
            //6 to 5
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            //seventh level
            var cardTitle=document.createElement('h3');
            cardTitle.setAttribute("class","card-title");
            cardTitle.innerHTML="Price: $"+array_phone[i].price;
            var cardDescription=document.createElement('p');
            cardDescription.setAttribute("class","card-text");
            cardDescription.innerHTML=array_phone[i].title;
            var cardBtn=document.createElement('button');
            cardBtn.setAttribute("class","btn btn-success");
            cardBtn.setAttribute("value","phone");
            cardBtn.innerHTML="get it";
            //var id =1;
            //Go to the product detail page action
            cardBtn.setAttribute("onclick","showPhoneDetail_FrontEnd("+JSON.stringify(array_phone[i]._id)+")");
    
            //7 to 6
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardBtn);     
        }
    }
    // 2-1.5
    viewLevel2.appendChild(type_phone_group);

}
// homestate html showing
function homeState(bestSeller,soldOut){
    sessionStorage.setItem("function","getHomeStateItems(");
    document.getElementById("dropDownFunction").hidden=true;
    document.getElementById("price-slider-area").hidden=true;
    document.getElementById("ul-cartshowing").hidden=true;
    var showingArea = document.getElementById("showingArea");
    showingArea.innerHTML="";
    var viewLevel1=document.createElement('div');
    viewLevel1.setAttribute("class","p-5");
    showingArea.appendChild(viewLevel1);

    var viewLevel2=document.createElement('div');
    viewLevel2.setAttribute("class","container");
    // 2 to 1
    viewLevel1.appendChild(viewLevel2);
    homeState_init(bestSeller,'Best Seller',viewLevel2);
    homeState_init(soldOut,'Sold Out Soon',viewLevel2);

    //From here to for loop

}
// get data to the home state
function getHomeStateItems(){
    sessionStorage.setItem("brand","All");
    sessionStorage.setItem("pricerange",100);
    axios.get('http://localhost:3000/api/phone/bestSeller')
    .then(function(response){
        axios.get('http://localhost:3000/api/phone/findSoldOut')
        .then(function(res)
        {
            homeState(response.data.success,res.data.success);
        })
    });
}