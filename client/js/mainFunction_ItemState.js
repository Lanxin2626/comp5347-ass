// show product detail page
function productDetail_State(item){
    sessionStorage.setItem("function","showPhoneDetail_FrontEnd("+item[0]._id);
    document.getElementById("dropDownFunction").hidden=true;
    document.getElementById("price-slider-area").hidden=true;
    var showingArea = document.getElementById("showingArea");
    showingArea.innerHTML="";
    var section=document.createElement('section');
    section.setAttribute('class','container productDetail my-1 pt-5');
    showingArea.appendChild(section);
    var div1_level1=document.createElement('div');
    section.appendChild(div1_level1);
    div1_level1.setAttribute('class','row mt-1');
    
    var div1_level1_1=document.createElement('div');
    div1_level1.appendChild(div1_level1_1);
    div1_level1_1.setAttribute('class','col-lg-5 col-md-12 col-12');
    var image_product=document.createElement('img');
    image_product.setAttribute('class','img-fluid w-100 productDetail_photo');
    image_product.setAttribute('src',item[0].image);
    div1_level1_1.appendChild(image_product);

    var div1_level1_2=document.createElement('div');
    div1_level1.appendChild(div1_level1_2);
    div1_level1_2.setAttribute('class','col-lg-6 col-md-12 col-12');
    var div1_level1_2_1=document.createElement('div');
    div1_level1_2.appendChild(div1_level1_2_1);
    div1_level1_2_1.setAttribute('class','phoneDetail-FunctionArea');
    console.log(item[0].title.length)
    if(item[0].title.length<90){
        var phoneDetail_Title =document.createElement('h3');
        phoneDetail_Title.setAttribute('class','phoneDetail-Title');
        div1_level1_2_1.appendChild(phoneDetail_Title);
        phoneDetail_Title.innerHTML=item[0].title;
    }
    else{
        var phoneDetail_Title =document.createElement('h6');
        phoneDetail_Title.setAttribute('class','phoneDetail-Title');
        div1_level1_2_1.appendChild(phoneDetail_Title);
        phoneDetail_Title.innerHTML=item[0].title;
    }
    var phoneDetail_Brand =document.createElement('h4');
    phoneDetail_Brand.setAttribute('class','phoneDetail-Brand');
    phoneDetail_Brand.innerHTML="Brand: "+item[0].brand;

    div1_level1_2_1.appendChild(phoneDetail_Brand);
    var phoneDetail_Price =document.createElement('h1');
    phoneDetail_Price.setAttribute('class','phoneDetail-Price');
    phoneDetail_Price.innerHTML="$"+item[0].price;
    div1_level1_2_1.appendChild(phoneDetail_Price);
    var phoneDetail_Seller=document.createElement('h5');
    div1_level1_2_1.appendChild(phoneDetail_Seller);
    phoneDetail_Seller.setAttribute("class","phoneDetail-Seller");
    phoneDetail_Seller.innerHTML="Seller: "+item[0].seller.firstname+" "+item[0].seller.lastname;
    var phoneDetail_Stock =document.createElement('h5');
    div1_level1_2_1.appendChild(phoneDetail_Stock);
    phoneDetail_Stock.innerHTML="Stock :"+item[0].stock;
    phoneDetail_Stock.setAttribute('class','phoneDetail-Stock');

    var div1_level1_2_1_2 =document.createElement('div');
    div1_level1_2_1.appendChild(div1_level1_2_1_2);
    div1_level1_2_1_2.setAttribute('class','addingFunction-area');
    var button_addingCart=document.createElement('button');
    button_addingCart.setAttribute('class','adding-btn btn btn-dark');
    button_addingCart.innerHTML='Add it to cart';
    button_addingCart.onclick=function(){
        addToCart(item[0]._id,item[0].stock);
    };
    div1_level1_2_1_2.appendChild(button_addingCart);
    var itemInCart=document.createElement('input');
    div1_level1_2_1_2.appendChild(itemInCart);
    itemInCart.setAttribute('type','text');
    itemInCart.setAttribute('class','cart-itemNum');
    itemInCart.setAttribute('id','itemInCart');
    itemInCart.setAttribute('title','The number of the this item in your cart');
    itemInCart.readOnly=true;
    get_ThisItemInCart(item[0]._id);


    var div1_level1_2_1_3 =document.createElement('div');
    div1_level1_2_1.appendChild(div1_level1_2_1_3);
    div1_level1_2_1_3.setAttribute('class','ratingAndComment');
    var rating_function=document.createElement('div');
    rating_function.setAttribute('class','rating-function');
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
    star5_radio.checked=true;
    //star5_radio.setAttribute('checked');
    rating_function.appendChild(star5_radio);
    var star5_label=document.createElement('label');
    star5_label.setAttribute('for','rating5');
    star5_label.setAttribute('class','fa fa-star checked');
    rating_function.appendChild(star5_label);
    var marking_tip=document.createElement('span');
    marking_tip.innerHTML="  Marking it";
    rating_function.appendChild(marking_tip);
    // 如果监听不到rating 就把 rating_fuction 这个区都传入post的onclick事件里，再在onclick getElementID

    var commentingFunction_area=document.createElement('div');
    div1_level1_2_1_3.appendChild(commentingFunction_area);
    commentingFunction_area.setAttribute('class','commentingFunction-area');
    var commentBox=document.createElement('textarea');
    commentBox.setAttribute('id','commentBox');
    commentingFunction_area.appendChild(commentBox);
    commentBox.setAttribute('title','input your comment about this product');
    //为什么要commentID
    //commentBox.setAttribute('id',);
    commentBox.setAttribute('cols','30');
    commentBox.setAttribute('rows','10');
    var button_post =document.createElement('button');
    button_post.setAttribute('id','comment-btn');
    button_post.setAttribute('class','comment-btn btn btn-success');
    button_post.setAttribute('title','comment Something');
    commentingFunction_area.appendChild(button_post);
    button_post.innerHTML="post it"
    button_post.onclick=function(){
        postComment(section,item[0]._id);
        //后续完善post函数
    };
    //show user comment
    showingUserComment(section,item[0].reviews);
}
//展示部分用户评论
function showingUserComment(section,commentSet){

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
    div2_level2.appendChild(users_comment_title);
    
    var div2_level3=document.createElement('div');
    div2_level2.appendChild(div2_level3);
    div2_level3.setAttribute('class','card');
    div2_level3.setAttribute('id','comments_body');
    showingAllComments(div2_level3,commentSet,3);

}
//展示所有用户评论
function showingAllComments(div2_level3,commentSet,input_Length)
{
    commentSet=commentSet.reverse();
    var length_Input=0;
    if(input_Length>commentSet.length)
    {
        length_Input=commentSet.length;
    }
    else
    {
        length_Input=input_Length;
    }
    div2_level3.innerHTML="";
    if(commentSet.length>0)
    {
        for(var i=0;i<length_Input;i++)
        {
            var commentRow =document.createElement('div');
            commentRow.setAttribute('id',"comment-"+i);
            commentRow.setAttribute('class','card-body');
            div2_level3.appendChild(commentRow);
            //Title 可以写得分
            var comment_Title =document.createElement('h5');
            comment_Title.setAttribute('class','card-title');
            commentRow.appendChild(comment_Title);
            rating_showingFunction(comment_Title,commentSet[i].rating);
            //subTitle 可以写用户名
            var comment_SubTitle =document.createElement('h6');
            commentRow.appendChild(comment_SubTitle);
            comment_SubTitle.setAttribute('class','card-subtitle mb-6');
            comment_SubTitle.innerHTML=commentSet[i].reviewer.firstname+" "+commentSet[i].reviewer.lastname;
            //记得判断一下p是否大于200;
            if(commentSet[i].comment.length>200)
            {
                console.log(commentSet[i].comment.length);
                var comment_commentText =document.createElement('p');
                commentRow.appendChild(comment_commentText);
                comment_commentText.setAttribute('class','card-text');
                comment_commentText.setAttribute('id',"text-"+i);            
                comment_commentText.innerHTML=showLimitWord(commentSet[i].comment)+'<br>';
                var comment_moreWord =document.createElement('button');
                comment_moreWord.setAttribute('class','btn btn-dark');
                comment_moreWord.id=i;
                comment_moreWord.name="comment-detail";
                //comment_moreWord.setAttribute('class','card-link');
                comment_moreWord.innerHTML="see full text";
                comment_commentText.appendChild(comment_moreWord);
                comment_moreWord.onclick=function(){
                    showEnsureComment(commentSet,this.id);
                }
            }
            else
            {
                var comment_commentText =document.createElement('p');
                commentRow.appendChild(comment_commentText);
                comment_commentText.setAttribute('class','card-text');
                comment_commentText.innerHTML=commentSet[i].comment;         
            }

        }
        if(length_Input<commentSet.length)
        {
            var comment_moreComment =document.createElement('button');
            comment_moreComment.setAttribute('class','btn btn-success');
            comment_moreComment.onclick=function(){
                showingAllComments(div2_level3,commentSet.reverse(),commentSet.length);
            };
            comment_moreComment.innerHTML="See more comments";
            div2_level3.appendChild(comment_moreComment);
        }
        else
        {

        }
    }

}
// showing Ensure Comment 展示特定用户评论
function showEnsureComment(commentSet,id){

    var commentRow=document.getElementById("comment-"+id);
    var commentText=document.getElementById("text-"+id);
    commentText.innerHTML="";
    console.log(id);
    commentText.innerHTML=commentSet[id].comment;
   commentRow.appendChild(commentText);
}
//product Detail page function
function postComment(section,phoneId){
    var rating=null;
    rating=$('input[name="rating1"]:checked').val();
    
    if(rating=null){
        alert("You haven't marked it");
    }
    else{
       // console.log($('input[name="rating1"]:checked').val());
        // record in database
        // comment area 动态更新
        //if token else
        let token=localStorage.getItem('token');
        if(!token) {
            alert("Please sign in first");
            location.href='SignPage.html';
        } else {
            //建立一个只获取review的接口
            //showingUserComment(section);
            comment_FrontEnd($('#commentBox').val(),section,phoneId,$('input[name="rating1"]:checked').val());
        }        
    }
    

}
// 接口 ---------------------------
function showPhoneDetail_FrontEnd(productID){
    //check wheter login first, get the Product number in the cart to show in the detail page
    const data={id: productID};
    // according to the id/other key information of product, skip to their detailed page
    axios.get('http://localhost:3000/api/phone/findOne',{
        params:data
    }).then(function(response){
        //console.log(response);
        //function about showing product in this price range
        productDetail_State(response.data.success);
        
    });    
}
function get_ThisItemInCart(id)
{
    let token=localStorage.getItem('token');
    if(!token)
    {

    }
    else
    {
        axios.get('http://localhost:3000/api/cart/get_items',{
            headers:{
            Authorization: token
        }
        })
        .then(function(response){
            if(response.data.data.items.length>0)
            {
               var result= findThisItem_Cart(response.data.data.items,id);
               document.getElementById("itemInCart").value=result;
            }
            else
            {
                document.getElementById("itemInCart").value=0;
            }
            
        }).catch(function(error){
            
        });      
    }  
}
function postComment_ShowingfrontEnd(section,id){
    const data={id: id};
    // according to the id/other key information of product, skip to their detailed page
    axios.get('http://localhost:3000/api/phone/findOne',{
        params:data
    }).then(function(response){
        showingAllComments(document.getElementById('comments_body'),response.data.success[0].reviews,3);       
    });

}
function comment_FrontEnd(comment,section,id,rating){
    let token=localStorage.getItem('token');
    if(!token)
    {
        alert("Please login first for your commenting");
    }
    else
    {
        axios.post('http://localhost:3000/api/phone/comment',{
            id:id,
            comments:comment,
            rating:rating
        },
        {
            headers:{
                Authorization: token
            }
        }
            
)    
    .then(function(response){
        postComment_ShowingfrontEnd(section,id);
        
    })
    }
}
function addToCart(id,stock){
    console.log(id);
    var pAmount = prompt("Please input the amount of this book you want to have :");
    var regulation_number = /^[1-9]+.?[0-9]*/;
    let token=localStorage.getItem('token');
    if(pAmount!=null||pAmount!="")
    {
        if (!regulation_number.test(pAmount)) {
            alert("You should input valid number (number > = 0)");
        }
        else {
            if(!token)
            {
                alert('please login first for adding it to your cart');
                //跳转到login 界面
                location.href='SignPage.html';
            }
            else{
                
                var existed_number=parseInt(document.getElementById("itemInCart").value);
                if(stock>=(parseInt(pAmount)+existed_number))
                {
                    axios.post('http://localhost:3000/api/cart/add_item',{
                        phoneId:id,
                        number:pAmount
                    },
                    {
                        headers:{
                            Authorization: token
                        }
                    }
                )    
                .then(function(response){
                   // postComment_ShowingfrontEnd(section,id);
                   alert("sucessful adding");
                   document.getElementById("itemInCart").value=(parseInt(pAmount)+existed_number);
                    
                }) 
                }
                else
                {
                    alert("Out of stock and cannot be added");
                }


            }
          
        }
    }

}
// 工具 ----------------------------
//showing this item amount in this user cart
function findThisItem_Cart(items,id){
    var result=0;
    for(var i=0;i<items.length;i++)
    {
        if(items[i].phone_id._id==id)
        {
            result=items[i].number;
        }
    }
    return result;

}
//showing Limit word
function showLimitWord(word){
    var word_array=word.split(/[\s\n]/);
    var return_Word="";
    var i=0;
    while(return_Word.length<200)
    {
        return_Word+=" "+word_array[i];
        i++;
    }   
    return return_Word;
}
// rating showing in comment part
function rating_showingFunction(part,rating){
    for(var i=0;i<Math.floor(rating);i++)
    {
        var star=document.createElement('label');
        star.setAttribute('class','fa fa-star checked');
        part.appendChild(star);
    }
    if(rating%1===0){
        for(var i=0;i<(5-rating);i++)
        {
            var star=document.createElement('label');
            star.setAttribute('class','fa fa-star');
            part.appendChild(star);     
        }
    }
    else{
        var star_half=document.createElement('label');
        star_half.setAttribute('class','fa fa-star-half-o checked');
        part.appendChild(star_half);
        for(var i=0;i<(5-Math.floor(rating)-1);i++)
        {
            var star=document.createElement('label');
            star.setAttribute('class','fa fa-star');
            part.appendChild(star);     
        }
    }
}
