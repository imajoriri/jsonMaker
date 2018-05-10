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

});

function makePerStr(type, num){
  num = String(num);
  var str = "<div class='per-" + type + "'>"
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


