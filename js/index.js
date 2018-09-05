let itemurl="https://api.myjson.com/bins/1bqnec";

// Add a new object for list
var shoplist={};
// Formatted to be an array
shoplist.name="Shopping list";
shoplist.time="2018/7/10";
shoplist.list=[];

$.ajax({
  url: itemurl,
  success: function(res){
    shoplist.list=JSON.parse(res);
    showlist();
  }
});

let item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";

let total_html="<li class='buy_item total'>Total<div class='price'>{{price}}</div></li>";

function showlist(){
  $("#items_list").html("");
  
  var total_price=0;
  
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    
    total_price+= parseInt(item.price);
    
    var current_item_html=
        item_html.replace("{{num}}",i+1)
                 .replace("{{item}}",item.name)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                 .replace("{{price}}",item.price)
                 .replace("{{del_item_id}}",i)
    ;
    
    $("#items_list").append(current_item_html);
    $("#"+del_item_id).click(
      function(){
        remove_item(parseInt($(this).attr("data-delid")));
      }
    );
  }
  // Total value of shopping list
  let current_total_html=
      total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
}

showlist();


$(".addbtn").click(
  function(){
    shoplist.list.push(
      {
        name:$("#input_name").val(),
        price:$("#input_price").val()
      }
    );
    $("#input_name").val("");
    $("#input_price").val("");
    showlist();
  }
);

function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}