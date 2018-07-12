import isJSON from "./is-json.js";

// keyとvalueを取得
export default function createObject(type){
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



