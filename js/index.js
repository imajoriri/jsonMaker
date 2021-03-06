import launchObj from "./launch.js";
import sessionEndObj from "./sessionEnd.js";
import intentObj from "./intent.js";
// function
import setIntentRequest from "./functions/set-intent-request.js";
import makePerStr from "./functions/make-per-str.js";
import copyTextToClipboard from "./functions/copy-text-to-clipboard.js";
import createObject from "./functions/create-object.js";

$(function(){

  // slots入力フォーム作成
  var slotsAdd = $("#slots-add")
  var slots = $(".slots")
  var slotsNum = 1;
  // 画面を読み込んだ時に１つ表示
  slots.append(makePerStr("slots", slotsNum)); 

  // ボタンを押した時にフォームを一つ追加
  slotsAdd.on('click', function(){
    slotsNum++;
    slots.append(makePerStr("slots", slotsNum));
  });

  // attrubte
  var attributesAdd = $("#attributes-add")
  var attributes = $(".attributes");
  var attributesNum = 1;
  // 画面を読み込んだ時に１つ表示
  attributes.append(makePerStr("attributes", attributesNum));

  // ボタンを押した時にフォームを一つ追加
  attributesAdd.on('click', function(){
    attributesNum++;
    attributes.append(makePerStr("attributes", attributesNum));
  });

  // JSONを作成
  var createButton = $(".create-button");
  createButton.on("click", function(){
    var requestTypeVal = $("input[name='inlineRadioOptions']:checked").val();

    if(requestTypeVal ==="IntentRequest"){
      var intentName = $("#intent-name").val();

      // インテント名が空だったら、アラートを表示させる
      if(!intentName){
        alert('インテント名が空です。');
        return "";
      }

      // slotsとattributesの値をフォームから取得
      // slotsとattributesのオブジェクトを作
      var slots = createObject("slots"); // sltosのkeyとvalueを入れていく
      var attributes = createObject("attributes"); // attributesのkeyとvalueを入れていく

      var responseObj = setIntentRequest(intentObj, intentName, slots, attributes);
    }else if(requestTypeVal === "LaunchRequest"){
      var responseObj = launchObj;
    }else if(requestTypeVal === "SessionEndedRequest"){
      var responseObj = sessionEndObj;
    }

    var responseStr = JSON.stringify(responseObj, null, " ");
    $("#json-pre").html(responseStr);
    //$("#json-pre").html("intentObj<br>&ensp;est");

  });
  
  // copy
  $('.copy-button').on('click', function(){
    console.log($("#json-pre").html());
    copyTextToClipboard($("#json-pre").html());
    alert('copied');
    
  });

});

//// IntentRequest
//// TODO インテント名を直接取得しない
//function setIntentRequest(intentObj, intentName){
//  var slots = createObject("slots"); // sltosのkeyとvalueを入れていく
//  var attributes = createObject("attributes"); // attributesのkeyとvalueを入れていく
//  // 値を代入
//  intentObj["request"]["intent"]["name"] = intentName;
//  if(Object.keys(slots).length === 0){
//    intentObj["request"]["intent"]["slots"] = null;
//  }else{
//    intentObj["request"]["intent"]["slots"] = slots;
//  }
//  if(Object.keys(attributes).length !== 0){
//    //console.log(JSON.parse(attributes.ff));
//    console.log(attributes.ff);
//    intentObj["session"]["sessionAttributes"] = attributes;
//  }
//  return intentObj;
//}



//// keyとvalueを取得
//function createObject(type){
//  var obj = {};
//  var i = 1;
//  while(true){
//    var perTypeNum = `.per-${type}-${String(i)}`;
//    var typeNumKey = `#${type}-${String(i)}-key`;
//    var typeNumValue = `#${type}-${String(i)}-value`;
//    var key = $(perTypeNum).find(typeNumKey).val(); // key取得
//    var value = $(perTypeNum).find(typeNumValue).val(); // value取得
//    if(key === undefined || value === undefined){
//      break;
//    }
//    // それぞれ値がなかったら空で返す
//    if(type === "slots" && key !== ""){
//      obj[key] = {
//        "name": key,
//        "value": value
//      }
//    }else if(type === "attributes" && key !== ""){
//      console.log(value);
//      //obj[key] = value;
//      if(isJSON(value)){
//        obj[key] = JSON.parse(value);
//      }else{
//        obj[key] = value;
//      }
//    }
//    i++;
//  }
//  return obj;
//}



//// input要素作成
//function makePerStr(type, num){
//  num = String(num);
//  var str = "<div class='per-" + type + "-" + num + "'>"
//    + "<div class='row'>"
//    + "<div class='form-group col-md-5'>"
//    + "<input type='text' class='form-control' id='" + type + "-" + num + "-key" + "' placeholder='key'>"
//    + "</div>"
//    + "<div class='form-group col-md-5'>"
//    + "<input type='text' class='form-control' id='" + type + "-" + num + "-value" + "' placeholder='value'>"
//    + "</div>"
//    + "</div>"
//    + "</div>";
//  return str;
//}

//function isJSON(arg) {
//  arg = (typeof arg === "function") ? arg() : arg;
//  if (typeof arg  !== "string") {
//    return false;
//  }
//  try {
//    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
//    return true;
//  } catch (e) {
//    return false;
//  }
//};

//function copyTextToClipboard(textVal){
//  // テキストエリアを用意する
//  var copyFrom = document.createElement("textarea");
//  // テキストエリアへ値をセット
//  copyFrom.textContent = textVal;
//
//  // bodyタグの要素を取得
//  var bodyElm = document.getElementsByTagName("body")[0];
//  // 子要素にテキストエリアを配置
//  bodyElm.appendChild(copyFrom);
//
//  // テキストエリアの値を選択
//  copyFrom.select();
//  // コピーコマンド発行
//  var retVal = document.execCommand('copy');
//  // 追加テキストエリアを削除
//  bodyElm.removeChild(copyFrom);
//  // 処理結果を返却
//  return retVal;
//}
