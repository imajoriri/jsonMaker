/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createObject;

var _isJson = __webpack_require__(6);

var _isJson2 = _interopRequireDefault(_isJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// keyとvalueを取得
function createObject(type) {
  var obj = {};
  var i = 1;
  while (true) {
    var perTypeNum = ".per-" + type + "-" + String(i);
    var typeNumKey = "#" + type + "-" + String(i) + "-key";
    var typeNumValue = "#" + type + "-" + String(i) + "-value";

    var key = $(perTypeNum).find(typeNumKey).val(); // key取得
    var value = $(perTypeNum).find(typeNumValue).val(); // value取得

    // フォームの中がからだったら終了
    if (key === undefined || value === undefined) {
      break;
    }

    if (type === "slots" && key !== "") {
      obj[key] = {
        "name": key,
        "value": value
      };
    } else if (type === "attributes" && key !== "") {
      console.log(value);
      //obj[key] = value;
      if ((0, _isJson2.default)(value)) {
        obj[key] = JSON.parse(value);
      } else {
        obj[key] = value;
      }
    }
    i++;
  }
  return obj;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _launch = __webpack_require__(2);

var _launch2 = _interopRequireDefault(_launch);

var _sessionEnd = __webpack_require__(3);

var _sessionEnd2 = _interopRequireDefault(_sessionEnd);

var _intent = __webpack_require__(4);

var _intent2 = _interopRequireDefault(_intent);

var _setIntentRequest = __webpack_require__(5);

var _setIntentRequest2 = _interopRequireDefault(_setIntentRequest);

var _makePerStr = __webpack_require__(7);

var _makePerStr2 = _interopRequireDefault(_makePerStr);

var _copyTextToClipboard = __webpack_require__(8);

var _copyTextToClipboard2 = _interopRequireDefault(_copyTextToClipboard);

var _createObject = __webpack_require__(0);

var _createObject2 = _interopRequireDefault(_createObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function
$(function () {

  // slots入力フォーム作成
  var slotsAdd = $("#slots-add");
  var slots = $(".slots");
  var slotsNum = 1;
  // 画面を読み込んだ時に１つ表示
  slots.append((0, _makePerStr2.default)("slots", slotsNum));

  // ボタンを押した時にフォームを一つ追加
  slotsAdd.on('click', function () {
    slotsNum++;
    slots.append((0, _makePerStr2.default)("slots", slotsNum));
  });

  // attrubte
  var attributesAdd = $("#attributes-add");
  var attributes = $(".attributes");
  var attributesNum = 1;
  // 画面を読み込んだ時に１つ表示
  attributes.append((0, _makePerStr2.default)("attributes", attributesNum));

  // ボタンを押した時にフォームを一つ追加
  attributesAdd.on('click', function () {
    attributesNum++;
    attributes.append((0, _makePerStr2.default)("attributes", attributesNum));
  });

  // JSONを作成
  var createButton = $(".create-button");
  createButton.on("click", function () {
    var requestTypeVal = $("input[name='inlineRadioOptions']:checked").val();

    if (requestTypeVal === "IntentRequest") {
      var intentName = $("#intent-name").val();

      // インテント名が空だったら、アラートを表示させる
      if (!intentName) {
        alert('インテント名が空です。');
        return "";
      }

      // slotsとattributesの値をフォームから取得
      // slotsとattributesのオブジェクトを作
      var slots = (0, _createObject2.default)("slots"); // sltosのkeyとvalueを入れていく
      var attributes = (0, _createObject2.default)("attributes"); // attributesのkeyとvalueを入れていく

      var responseObj = (0, _setIntentRequest2.default)(_intent2.default, intentName, slots, attributes);
    } else if (requestTypeVal === "LaunchRequest") {
      var responseObj = _launch2.default;
    } else if (requestTypeVal === "SessionEndedRequest") {
      var responseObj = _sessionEnd2.default;
    }

    var responseStr = JSON.stringify(responseObj, null, " ");
    $("#json-pre").html(responseStr);
    //$("#json-pre").html("intentObj<br>&ensp;est");
  });

  // copy
  $('.copy-button').on('click', function () {
    console.log($("#json-pre").html());
    (0, _copyTextToClipboard2.default)($("#json-pre").html());
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//var launchObj = {
var launchObj = {
  "version": "0.1.0",
  "session": {
    "new": true,
    "sessionAttributes": {},
    "sessionId": "a29cfead-c5ba-474d-8745-6c1a6625f0c5",
    "user": {
      "userId": "V0qe",
      "accessToken": "XHapQasdfsdfFsdfasdflQQ7"
    }
  },
  "context": {
    "System": {
      "application": {
        "applicationId": "com.yourdomain.extension.pizzabot"
      },
      "user": {
        "userId": "V0qe",
        "accessToken": "XHapQasdfsdfFsdfasdflQQ7"
      },
      "device": {
        "deviceId": "096e6b27-1717-33e9-b0a7-510a48658a9b",
        "display": {
          "size": "l100",
          "orientation": "landscape",
          "dpi": 96,
          "contentLayer": {
            "width": 640,
            "height": 360
          }
        }
      }
    }
  },
  "request": {
    "type": "LaunchRequest"
  }
};
exports.default = launchObj;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sessionEndObj = { "version": "0.1.0", "session": { "new": false, "sessionAttributes": {}, "sessionId": "a29cfead-c5ba-474d-8745-6c1a6625f0c5", "user": { "userId": "V0qe", "accessToken": "XHapQasdfsdfFsdfasdflQQ7" } }, "context": { "System": { "application": { "applicationId": "com.yourdomain.extension.pizzabot" }, "user": { "userId": "V0qe", "accessToken": "XHapQasdfsdfFsdfasdflQQ7" }, "device": { "deviceId": "096e6b27-1717-33e9-b0a7-510a48658a9b", "display": { "size": "l100", "orientation": "landscape", "dpi": 96, "contentLayer": { "width": 640, "height": 360 } } } } }, "request": { "type": "SessionEndedRequest" } };
exports.default = sessionEndObj;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var intentObj = {
  "version": "1.0",
  "session": {
    "sessionId": "5b5ddf11-b826-457d-8ee8-eaef05a7794d",
    "user": {
      "userId": "KbiTcsmXQvy7qIF1PKw_nQ",
      "accessToken": "6fa03486-2a5e-4169-89ba-6a9886f0379e"
    },
    "new": true
  },
  "context": {
    "System": {
      "user": {
        "userId": "KbiTcsmXQvy7qIF1PKw_nQ",
        "accessToken": "6fa03486-2a5e-4169-89ba-6a9886f0379e"
      },
      "device": {
        "deviceId": "27366e7f-422b-4e30-9896-5f6199dc9798",
        "display": {
          "size": "l100",
          "orientation": "landscape",
          "dpi": 96,
          "contentLayer": {
            "width": 640,
            "height": 360
          }
        }
      }
    }
  },
  "request": {
    "type": "IntentRequest",
    "intent": {
      "name": "caracterIntent",
      "slots": {
        "caracter": {
          "name": "caracter",
          "value": "brown"
        }
      }
    }
  }
};

exports.default = intentObj;

//var intentObj = {
//  "version": "1.0",
//  "session": {
//    "new": true,
//    "sessionId": "amzn1.echo-api.session.f52e789e-f2fe-4ceb-820e-517a12f11f92",
//    "application": {
//      "applicationId": "amzn1.ask.skill.a2319f7b-731f-4f13-9a16-101600c4296c"
//    },
//    "user": {
//      "userId": "amzn1.ask.account.AGZXM36YT5GTZZKVSESPMG6PY64N3SXPUVF4NCM5CMH7M3F7BJFZNAOG2V5UN72HG4F5BD7ZHZRDSHL3Z4GU5TV5VS2EL2CBID3ZKRNVG6HTWY6WJ5L7NCKFBKTER57PPBUOYV63DDGNQSFYPXMIQV6TUPFTW4O36V3FUCCT47IF2MKRO7JLXEEQ3OITLXLCGTPZJ5CXZ6QOB3I"
//    }
//  },
//  "context": {
//    "AudioPlayer": {
//      "playerActivity": "IDLE"
//    },
//    "Display": {},
//    "System": {
//      "application": {
//        "applicationId": "amzn1.ask.skill.a2319f7b-731f-4f13-9a16-101600c4296c"
//      },
//      "user": {
//        "userId": "amzn1.ask.account.AGZXM36YT5GTZZKVSESPMG6PY64N3SXPUVF4NCM5CMH7M3F7BJFZNAOG2V5UN72HG4F5BD7ZHZRDSHL3Z4GU5TV5VS2EL2CBID3ZKRNVG6HTWY6WJ5L7NCKFBKTER57PPBUOYV63DDGNQSFYPXMIQV6TUPFTW4O36V3FUCCT47IF2MKRO7JLXEEQ3OITLXLCGTPZJ5CXZ6QOB3I"
//      },
//      "device": {
//        "deviceId": "amzn1.ask.device.AEU3UYTEB5IFSIWFMTKAW5YWD4IQ4CEZTO6342BK5G4VHABZ7MNMTJY45YHS22AJ7GMKUF467L2YH6QGPEGQXC4Z45IFJXVMPX53FEIPUTIVVIL66YB74WZOZQ44YWIW3264TGMGMGANUOZGD7BOVNYKB5AYLFENVP2LZKT2KZU4EDDLXA2TS",
//        "supportedInterfaces": {
//          "AudioPlayer": {},
//          "Display": {
//            "templateVersion": "1.0",
//            "markupVersion": "1.0"
//          }
//        }
//      },
//      "apiEndpoint": "https://api.amazonalexa.com",
//      "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.a5SDEwQZHsqfBNwQ"
//    }
//  },
//  "request": {
//    "type": "IntentRequest",
//    "requestId": "amzn1.echo-api.request.0e84a0c4-3d6e-4385-ba1d-cd1a94516fb6",
//    "timestamp": "2018-04-24T14:58:15Z",
//    "locale": "ja-JP",
//    "intent": {
//      "name": "singIntent",
//      "confirmationStatus": "NONE"
//    }
//  }
//}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setIntentRequest;

var _createObject = __webpack_require__(0);

var _createObject2 = _interopRequireDefault(_createObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// IntentRequest
// TODO インテント名を直接取得しない
function setIntentRequest(intentObj, intentName, slots, attributes) {
  //var slots = createObject("slots"); // sltosのkeyとvalueを入れていく
  //var attributes = createObject("attributes"); // attributesのkeyとvalueを入れていく
  // 値を代入
  intentObj["request"]["intent"]["name"] = intentName;
  if (Object.keys(slots).length === 0) {
    intentObj["request"]["intent"]["slots"] = null;
  } else {
    intentObj["request"]["intent"]["slots"] = slots;
  }
  if (Object.keys(attributes).length !== 0) {
    //console.log(JSON.parse(attributes.ff));
    console.log(attributes.ff);
    intentObj["session"]["sessionAttributes"] = attributes;
  }
  return intentObj;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJSON;
function isJSON(arg) {
  arg = typeof arg === "function" ? arg() : arg;
  if (typeof arg !== "string") {
    return false;
  }
  try {
    arg = !JSON ? eval("(" + arg + ")") : JSON.parse(arg);
    return true;
  } catch (e) {
    return false;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePerStr;
// input要素作成
function makePerStr(type, num) {
  num = String(num);
  var str = "<div class='per-" + type + "-" + num + "'>" + "<div class='row'>" + "<div class='form-group col-md-5'>" + "<input type='text' class='form-control' id='" + type + "-" + num + "-key" + "' placeholder='key'>" + "</div>" + "<div class='form-group col-md-5'>" + "<input type='text' class='form-control' id='" + type + "-" + num + "-value" + "' placeholder='value'>" + "</div>" + "</div>" + "</div>";
  return str;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copyTextToClipboard;
function copyTextToClipboard(textVal) {
  // テキストエリアを用意する
  var copyFrom = document.createElement("textarea");
  // テキストエリアへ値をセット
  copyFrom.textContent = textVal;

  // bodyタグの要素を取得
  var bodyElm = document.getElementsByTagName("body")[0];
  // 子要素にテキストエリアを配置
  bodyElm.appendChild(copyFrom);

  // テキストエリアの値を選択
  copyFrom.select();
  // コピーコマンド発行
  var retVal = document.execCommand('copy');
  // 追加テキストエリアを削除
  bodyElm.removeChild(copyFrom);
  // 処理結果を返却
  return retVal;
}

/***/ })
/******/ ]);