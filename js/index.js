$(function(){

  // slots
  var slotsAdd = $("#slots-add")
  var slots = $(".slots")
  var slotsNum = 1;
  slots.append(makePerStr("slots", slotsNum)); // 画面を読み込んだ時に１つ表示

  slotsAdd.on('click', function(){
    slotsNum++;
    slots.append(makePerStr("slots", slotsNum));
  });

  // attrubte
  var attributesAdd = $("#attributes-add")
  var attributes = $(".attributes");
  var attributesNum = 1;
  attributes.append(makePerStr("attributes", attributesNum));

  attributesAdd.on('click', function(){
    attributesNum++;
    attributes.append(makePerStr("attributes", attributesNum));
  });

  //create
  var createButton = $(".create-button");
  createButton.on("click", function(){
    var slots = createObject("slots"); // sltosのkeyとvalueを入れていく
    var attributes = createObject("attributes"); // attributesのkeyとvalueを入れていく
    console.log(slots);
    $("#json-pre").html(JSON.stringify(slots));
  });

});

// keyとvalueを取得
function createObject(type){
  var obj = {};
  var i = 1;
  while(true){
    var perTypeNum = `.per-${type}-${String(i)}`;
    var typeNumKey = `#${type}-${String(i)}-key`;
    var typeNumValue = `#${type}-${String(i)}-value`;
    var key = $(perTypeNum).find(typeNumKey).val(); // key取得
    var value = $(perTypeNum).find(typeNumValue).val(); // value取得
    obj[key] = value;
    if(key === undefined || value === undefined){
      break;
    }
    i++;
  }
  return obj;
}



// input要素作成
function makePerStr(type, num){
  num = String(num);
  var str = "<div class='per-" + type + "-" + num + "'>"
    + "<div class='row'>"
    + "<div class='form-group col-md-5'>"
    + "<input type='text' class='form-control' id='" + type + "-" + num + "-key" + "' placeholder='key'>"
    + "</div>"
    + "<div class='form-group col-md-5'>"
    + "<input type='text' class='form-control' id='" + type + "-" + num + "-value" + "' placeholder='value'>"
    + "</div>"
    + "</div>"
    + "</div>";
  return str;
}


