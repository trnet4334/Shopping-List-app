var itemurl="https://awiclass.monoame.com/api/command.php?type=get&name=itemdata"

//新增一個商品清單的物件
var shoplist={};
//商品清單的清單裡面是個陣列
shoplist.name="MyBuylist 購物清單";
shoplist.time="2018/7/10";
shoplist.list=[
  {name: "Keyboard",price: 300},
  {name: "Microphone",price: 9000},
  {name: "Laptop",price: 54555},
  {name: "iphone 9",price: 32000},
  {name: "Thanksgiving meal",price: 5000},
];

$.ajax({
  url: itemurl,
  success: function(res){
    shoplist.list=JSON.parse(res);
    showlist();
  }
});

//定義元素用的html模板，{{___}}代表資料要套入的地方
//項目清單
var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>X</div></li>";
//總價
var total_html="<li class='buy_item total'>Total<div class='price'>{{price}}</div></li>";

//1.製作動態清單(function包一組動作)
function showlist(){
  //在全部重新載入前先刪除原有的項目
  $("#items_list").html("");
  
  var total_price=0;
  
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    
    //parseInt:將數字轉換成數值
    total_price+= parseInt(item.price);
    
    //取代模板位置成資料replace(要取代的,取代成...)
    var current_item_html=
        item_html.replace("{{num}}",i+1)//i=0,所以編號是i+1
                 .replace("{{item}}",item.name)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                 .replace("{{price}}",item.price)
                 .replace("{{del_item_id}}",i)
    ;
    
    //append:加在後面
    $("#items_list").append(current_item_html);
    //叉叉按鈕例:<div id="del_item_0" data-delid(就是{{del_item_id}})="0" class="del_btn">
    
    //del_item_id="del_buyitem_"+i
    //選擇id當條件，前面要加"#"
    $("#"+del_item_id).click(
      function(){
        //remove_item是最下面寫的function
        remove_item(parseInt($(this).attr("data-delid")));
        //抓this按鈕上data-delid這個屬性，也就是i
      }
    );
  }
  //更新總價
  var current_total_html=
      total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
}
//先顯示一次，因為前面只定義好function 還沒有執行
showlist();

// 2.新增資料流程: 動態push一筆資料->呼叫showlist重新渲染清單
$(".addbtn").click(
  function(){
    //使用val()存取輸入的值，val("..") 有給參數是設定
    shoplist.list.push(
      {
        name:$("#input_name").val(),
        price:$("#input_price").val()
      }
    );
    //新增完input要歸零
    $("#input_name").val("");
    $("#input_price").val("");
    showlist();
  }
);

//3.刪除資料->重新根據資料渲染清單
//刪除項目的方式: 陣列.splice(位置,長度)
function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}