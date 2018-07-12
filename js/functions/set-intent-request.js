import createObject from "./create-object.js";

// IntentRequest
// TODO インテント名を直接取得しない
export default function setIntentRequest(intentObj, intentName){
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


