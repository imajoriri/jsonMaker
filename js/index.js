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
    var requestTypeVal = $("input[name='inlineRadioOptions']:checked").val();

    if(requestTypeVal ==="IntentRequest"){
      var responseObj = setIntentRequest();
    }else if(requestTypeVal === "LaunchRequest"){
      var responseObj = launchObj;
    }else if(requestTypeVal === "SessionEndedRequest"){
      var responseObj = sessionEndObj;
    }

    var responseStr = JSON.stringify(responseObj, null, " ");
    $("#json-pre").html(responseStr);
    //$("#json-pre").html("intentObj<br>&ensp;est");

  });

});

// IntentRequest
function setIntentRequest(){
  var intentName = $("#intent-name").val();
  var slots = createObject("slots"); // sltosのkeyとvalueを入れていく
  var attributes = createObject("attributes"); // attributesのkeyとvalueを入れていく
  // 値を代入
  intentObj["request"]["intent"]["name"] = intentName;
  if(Object.keys(slots).length === 0){
    intentObj["request"]["intent"]["slots"] = null;
  }else{
    intentObj["request"]["intent"]["slots"] = slots;
  }
  if(Object.keys(attributes).length !== 0){
    //console.log(JSON.parse(attributes.ff));
    console.log(attributes.ff);
    intentObj["session"]["sessionAttributes"] = attributes;
  }
  return intentObj;
}



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
    if(key === undefined || value === undefined){
      break;
    }
    // それぞれ値がなかったら空で返す
    if(type === "slots" && key !== ""){
      obj[key] = {
        "name": key,
        "value": value
      }
    }else if(type === "attributes" && key !== ""){
      console.log(value);
      //obj[key] = value;
      if(isJSON(value)){
        obj[key] = JSON.parse(value);
      }else{
        obj[key] = value;
      }
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

function isJSON(arg) {
  arg = (typeof arg === "function") ? arg() : arg;
  if (typeof arg  !== "string") {
    return false;
  }
  try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
    return true;
  } catch (e) {
    return false;
  }
};
